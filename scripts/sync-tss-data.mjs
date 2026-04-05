#!/usr/bin/env node
/*
 * TSS Data Sync
 * Fetches the "表單回覆 1" sheet (Google Form responses) from the private
 * Google Sheet using a Google Cloud service account, and regenerates
 * client/public/tss_data.json at build time.
 *
 * Runs automatically via `npm run prebuild` on every Netlify deploy.
 *
 * Required env var:
 *   GOOGLE_SERVICE_ACCOUNT_JSON – the full JSON key file for a service account
 *   that has at least Viewer access to the spreadsheet (share the sheet
 *   directly with the service account email).
 */

import { writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createSign } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUTPUT_PATH = resolve(ROOT, "client/public/tss_data.json");
const OUTPUT_PATH_SRC = resolve(ROOT, "client/src/data/tss_data.json");
// Build-time image download targets. Images are served from the same
// origin as the site so mobile carriers / ad blockers / missing Google
// cookies can't block them. If a given Drive file can't be downloaded
// (service account lacks access, network error, etc.) we fall back to
// the drive.google.com/thumbnail URL for that file only — the page
// still works for viewers with a Google session.
const RIDER_PHOTOS_DIR = resolve(ROOT, "client/public/rider-photos");
const TEAM_LOGOS_DIR = resolve(ROOT, "client/public/team-logos");

const DOC_ID = "1rS5R-ECwJIcGepccHrVL2IzZPieYAIS6_MaN-SW0z3M";
// Pull from the Google Form responses tab, not the 選手總表 aggregate.
const SHEET_NAME = "表單回覆 1";
// Form columns span A..AD; pad generously for future fields.
const RANGE = `${SHEET_NAME}!A1:AD2000`;

// Column index → field mapping for "表單回覆 1"
// Row 0 = header row, rows 1+ = form submissions.
const COL = {
  timestamp: 0,   // A 時間戳記
  name: 2,        // C 車手姓名
  teamName: 11,   // L 車隊名稱
  bio: 14,        // O 車手自我介紹
  photo: 15,      // P 車手大頭照
  teamLogo: 16,   // Q 車隊商標圖檔LOGO
  className: 17,  // R 參賽組別
  bikeBrand: 18,  // S 參賽車輛廠牌
  bikeModel: 19,  // T 參賽車輛型號
  bikeNumber: 20, // U 參賽車號碼(1-999)
};

function classCc(name) {
  const m = (name || "").match(/(\d+)/);
  return m ? m[1] : "";
}

// ---------- Service account auth (JWT → OAuth2 access token) ----------

function b64url(input) {
  const b =
    input instanceof Buffer ? input : Buffer.from(String(input), "utf8");
  return b
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope:
      "https://www.googleapis.com/auth/spreadsheets.readonly " +
      "https://www.googleapis.com/auth/drive.readonly",
    aud: sa.token_uri || "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(
    JSON.stringify(claim)
  )}`;
  const signer = createSign("RSA-SHA256");
  signer.update(signingInput);
  signer.end();
  const signature = b64url(signer.sign(sa.private_key));
  const jwt = `${signingInput}.${signature}`;

  const res = await fetch(sa.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }).toString(),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `[tss-sync] OAuth token exchange failed: HTTP ${res.status} ${res.statusText} – ${body}`
    );
  }
  const data = await res.json();
  if (!data.access_token) {
    throw new Error(
      `[tss-sync] OAuth response missing access_token: ${JSON.stringify(data)}`
    );
  }
  return data.access_token;
}

async function fetchSheetValues(accessToken) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${DOC_ID}/values/${encodeURIComponent(
    RANGE
  )}?majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE`;
  console.log(`[tss-sync] Fetching via Sheets API: ${RANGE}`);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `[tss-sync] Sheets API HTTP ${res.status} ${res.statusText} – ${body}. ` +
        `Make sure the spreadsheet is shared with the service account email as Viewer.`
    );
  }
  const data = await res.json();
  return data.values || [];
}

/**
 * Extract a Drive file ID from any supported share URL, or null if the
 * string isn't a Drive URL.
 */
function extractDriveId(url) {
  if (!url) return null;
  const s = String(url).trim();
  if (!s) return null;
  let m = s.match(/[?&]id=([^&]+)/);
  if (!m) m = s.match(/\/d\/([^/=?&]+)/);
  return m ? m[1] : null;
}

/**
 * Fallback URL (used when we can't download the file at build time).
 * drive.google.com/thumbnail works for anyone with a Google session.
 */
function thumbnailUrl(fileId) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
}

/**
 * Detect image format from the first bytes. Anything that isn't a real
 * JPEG / PNG / GIF / WebP (e.g. a Google sign-in HTML page) returns
 * null so we can reject it instead of writing garbage to disk.
 */
function detectImageExt(buf) {
  if (!buf || buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47)
    return "png";
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return "gif";
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  )
    return "webp";
  return null;
}

/**
 * Download a Drive file using the service-account bearer token and
 * write it to the local filesystem. Returns the site-relative path on
 * success, or "" on any failure (auth, network, non-image payload).
 * The caller is responsible for falling back to thumbnailUrl().
 */
async function downloadDriveFile(fileId, kind, accessToken) {
  const apiUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const outDir = kind === "logo" ? TEAM_LOGOS_DIR : RIDER_PHOTOS_DIR;
  const publicPrefix = kind === "logo" ? "/team-logos" : "/rider-photos";
  try {
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      redirect: "follow",
    });
    if (!res.ok) {
      return "";
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = detectImageExt(buf);
    if (!ext) {
      return "";
    }
    const filename = `${fileId}.${ext}`;
    writeFileSync(resolve(outDir, filename), buf);
    return `${publicPrefix}/${filename}`;
  } catch {
    return "";
  }
}

/**
 * Resolve every unique Drive file ID to a final URL. Tries the Drive
 * API first (same-origin local file); falls back to the thumbnail URL
 * when download fails. Returns a map keyed by `${kind}:${fileId}`.
 */
async function resolveDriveImages(jobs, accessToken) {
  const BATCH = 8;
  const result = new Map();
  const arr = Array.from(jobs.values());
  let localCount = 0;
  let fallbackCount = 0;
  for (let i = 0; i < arr.length; i += BATCH) {
    const slice = arr.slice(i, i + BATCH);
    const resolved = await Promise.all(
      slice.map(async (j) => {
        const local = await downloadDriveFile(j.fileId, j.kind, accessToken);
        if (local) {
          localCount++;
          return [`${j.kind}:${j.fileId}`, local];
        }
        fallbackCount++;
        return [`${j.kind}:${j.fileId}`, thumbnailUrl(j.fileId)];
      })
    );
    for (const [k, v] of resolved) result.set(k, v);
  }
  console.log(
    `[tss-sync]   ↳ ${localCount} downloaded locally, ${fallbackCount} fell back to drive thumbnail URL`
  );
  return result;
}

function cellTrim(v) {
  return (v || "").toString().trim();
}

async function main() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error(
      "[tss-sync] GOOGLE_SERVICE_ACCOUNT_JSON env var is not set. " +
        "Add the full service-account JSON as a Netlify environment variable."
    );
  }
  let sa;
  try {
    sa = JSON.parse(raw);
  } catch (e) {
    throw new Error(
      "[tss-sync] GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON: " + e.message
    );
  }
  if (!sa.client_email || !sa.private_key) {
    throw new Error(
      "[tss-sync] GOOGLE_SERVICE_ACCOUNT_JSON missing client_email or private_key"
    );
  }
  console.log(`[tss-sync] Auth as service account: ${sa.client_email}`);

  const token = await getAccessToken(sa);
  console.log(`[tss-sync] ✓ Got OAuth access token`);

  const rows = await fetchSheetValues(token);
  console.log(`[tss-sync] ✓ Received ${rows.length} rows from "${SHEET_NAME}"`);
  if (rows.length < 2) {
    throw new Error(`[tss-sync] Sheet only has ${rows.length} rows; aborting.`);
  }

  // ----- Pass 1: collect every unique Drive file ID we need, then
  // resolve them in parallel (local download with thumbnail fallback).
  if (existsSync(RIDER_PHOTOS_DIR)) rmSync(RIDER_PHOTOS_DIR, { recursive: true });
  if (existsSync(TEAM_LOGOS_DIR)) rmSync(TEAM_LOGOS_DIR, { recursive: true });
  mkdirSync(RIDER_PHOTOS_DIR, { recursive: true });
  mkdirSync(TEAM_LOGOS_DIR, { recursive: true });

  const imageJobs = new Map(); // key = `${kind}:${fileId}`
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const photoId = extractDriveId(cellTrim(r[COL.photo]));
    if (photoId)
      imageJobs.set(`photo:${photoId}`, { fileId: photoId, kind: "photo" });
    const logoId = extractDriveId(cellTrim(r[COL.teamLogo]));
    if (logoId)
      imageJobs.set(`logo:${logoId}`, { fileId: logoId, kind: "logo" });
  }
  console.log(`[tss-sync] → Resolving ${imageJobs.size} unique Drive images…`);
  const imageMap = await resolveDriveImages(imageJobs, token);

  // Helper: sheet cell → final URL (local path if we have it, otherwise
  // thumbnail URL fallback, or "" if the cell wasn't a Drive URL at all).
  const imgUrl = (cell, kind) => {
    const id = extractDriveId(cell);
    if (!id) return cell || "";
    return imageMap.get(`${kind}:${id}`) || thumbnailUrl(id);
  };

  // ----- Pass 2: build teams using resolved URLs.
  const teams = {};
  let riderCount = 0;
  let updated = 0;
  let skipped = 0;

  // Rows 1..N are form submissions (row 0 is the header).
  // Iterating in chronological order means later submissions overwrite earlier
  // ones for the same rider, which lets riders update their photo/bio/class by
  // re-submitting the form.
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const name = cellTrim(r[COL.name]);
    if (!name) {
      skipped++;
      continue;
    }

    const teamName = cellTrim(r[COL.teamName]) || "獨立車手";
    if (!teams[teamName]) {
      teams[teamName] = {
        logo: imgUrl(cellTrim(r[COL.teamLogo]), "logo"),
        riders: [],
      };
    }
    // First non-empty team logo wins (preserves team branding from earliest
    // complete submission; later members with blank Q don't clobber it).
    if (!teams[teamName].logo) {
      teams[teamName].logo = imgUrl(cellTrim(r[COL.teamLogo]), "logo");
    }

    const className = cellTrim(r[COL.className]);
    const brand = cellTrim(r[COL.bikeBrand]);
    const model = cellTrim(r[COL.bikeModel]);
    const bike = [brand, model].filter(Boolean).join(" ");
    const number = parseInt(cellTrim(r[COL.bikeNumber]), 10) || 0;

    const newRider = {
      name,
      intro: cellTrim(r[COL.bio]),
      photo: imgUrl(cellTrim(r[COL.photo]), "photo"),
      class: className,
      cc: classCc(className),
      bike,
      number,
    };

    // Dedupe by (name + class) within same team: a rider who registers for
    // multiple classes appears once per class, but resubmitting the same
    // (name, class) pair updates the existing row instead of duplicating it.
    const existingIdx = teams[teamName].riders.findIndex(
      (x) => x.name === name && x.class === className
    );
    if (existingIdx === -1) {
      teams[teamName].riders.push(newRider);
      riderCount++;
    } else {
      // Latest resubmission for the same (name, class) wins on every field.
      teams[teamName].riders[existingIdx] = {
        ...teams[teamName].riders[existingIdx],
        ...newRider,
      };
      updated++;
    }
  }

  const output = { teams, generatedAt: new Date().toISOString() };
  const json = JSON.stringify(output, null, 2);

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, json, "utf8");
  mkdirSync(dirname(OUTPUT_PATH_SRC), { recursive: true });
  writeFileSync(OUTPUT_PATH_SRC, json, "utf8");

  const teamNames = Object.keys(teams);
  const withLogo = teamNames.filter((n) => teams[n].logo).length;

  console.log(
    `[tss-sync] ✓ Wrote ${teamNames.length} teams, ${riderCount} riders ` +
      `(updated ${updated} via resubmission, skipped ${skipped} blank rows) → ${OUTPUT_PATH}`
  );
  console.log(
    `[tss-sync]   Logos: ${withLogo}/${teamNames.length} teams have a logo`
  );
  // Sample first 3 team logos so the Netlify deploy log shows what was produced.
  for (const n of teamNames.slice(0, 5)) {
    console.log(`[tss-sync]   ${n} → ${(teams[n].logo || "(none)").substring(0, 120)}`);
  }
}

main().catch((err) => {
  console.error("[tss-sync] FATAL:", err);
  process.exit(1);
});
