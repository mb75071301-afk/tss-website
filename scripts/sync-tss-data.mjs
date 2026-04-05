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

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createSign } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUTPUT_PATH = resolve(ROOT, "client/public/tss_data.json");
const OUTPUT_PATH_SRC = resolve(ROOT, "client/src/data/tss_data.json");

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
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
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
 * Convert a Google Drive share URL into a reliably-embeddable public CDN URL.
 *
 * We use Google's user-content CDN (lh3.googleusercontent.com/d/FILE_ID)
 * instead of drive.google.com/thumbnail because the latter often 403s on
 * mobile browsers (Safari iOS, Chrome Android) that don't carry Google
 * auth cookies the same way desktop Chrome does. The lh3 domain is the
 * same CDN that serves Drive previews publicly and works cross-device.
 *
 * Accepts:
 *  - https://drive.google.com/open?id=FILE_ID
 *  - https://drive.google.com/file/d/FILE_ID/view
 *  - https://drive.google.com/uc?id=FILE_ID
 *  - https://drive.google.com/thumbnail?id=FILE_ID
 * Returns: https://lh3.googleusercontent.com/d/FILE_ID=w1000
 */
function driveToImg(url) {
  if (!url) return "";
  const s = String(url).trim();
  if (!s) return "";
  let m = s.match(/[?&]id=([^&]+)/);
  if (!m) m = s.match(/\/d\/([^/]+)/);
  if (!m) return s; // leave non-Drive URLs as-is
  return `https://lh3.googleusercontent.com/d/${m[1]}=w1000`;
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
        logo: driveToImg(cellTrim(r[COL.teamLogo])),
        riders: [],
      };
    }
    // First non-empty team logo wins (preserves team branding from earliest
    // complete submission; later members with blank Q don't clobber it).
    if (!teams[teamName].logo) {
      teams[teamName].logo = driveToImg(cellTrim(r[COL.teamLogo]));
    }

    const className = cellTrim(r[COL.className]);
    const brand = cellTrim(r[COL.bikeBrand]);
    const model = cellTrim(r[COL.bikeModel]);
    const bike = [brand, model].filter(Boolean).join(" ");
    const number = parseInt(cellTrim(r[COL.bikeNumber]), 10) || 0;

    const newRider = {
      name,
      intro: cellTrim(r[COL.bio]),
      photo: driveToImg(cellTrim(r[COL.photo])),
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
  const driveLogos = teamNames.filter((n) =>
    (teams[n].logo || "").includes("drive.google.com")
  ).length;

  console.log(
    `[tss-sync] ✓ Wrote ${teamNames.length} teams, ${riderCount} riders ` +
      `(updated ${updated} via resubmission, skipped ${skipped} blank rows) → ${OUTPUT_PATH}`
  );
  console.log(
    `[tss-sync]   Logos: ${withLogo}/${teamNames.length} teams have a logo; ${driveLogos} use drive.google.com thumbnails`
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
