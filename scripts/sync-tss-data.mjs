#!/usr/bin/env node
/*
 * TSS Data Sync
 * Fetches the "選手總表" sheet from the (private) Google Sheet using a
 * Google Cloud service account, and regenerates client/public/tss_data.json
 * at build time.
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
// Sheet tab name for the "選手總表" tab (gid 1066812969).
const SHEET_NAME = "選手總表";
// Pull a wide range so columns A..AG (0..32) are always included.
const RANGE = `${SHEET_NAME}!A1:AG1000`;

// Column index → field mapping for "選手總表"
// Row 0 header, row 1 totals, rows 2+ rider data
const COL = {
  name: 0,
  c150s: 2, c150sp: 3,
  c250s: 4, c250sp: 5,
  c300s: 6, c300sp: 7,
  c400s: 8, c400sp: 9,
  sp600: 10, sp1000: 11,
  teamName: 23,   // 車隊名稱
  bio: 26,        // 車手自我介紹
  photo: 27,      // 車手大頭照
  teamLogo: 28,   // 車隊商標圖檔LOGO
  className1: 29, // 參賽組別(1)
  bikeBrand: 30,  // 參賽車輛廠牌(1)
  bikeModel: 31,  // 參賽車輛型號(1)
  bikeNumber: 32, // 參賽車號碼(1-999)(1)
};

// Ordered from biggest cc to smallest, Stock before Sport.
const CLASS_COLS = [
  { col: COL.c400s, name: "Super Stock 400", cc: "400" },
  { col: COL.c400sp, name: "Super Sport 400", cc: "400" },
  { col: COL.c300s, name: "Super Stock 300", cc: "300" },
  { col: COL.c300sp, name: "Super Sport 300", cc: "300" },
  { col: COL.c250s, name: "Super Stock 250", cc: "250" },
  { col: COL.c250sp, name: "Super Sport 250", cc: "250" },
  { col: COL.c150s, name: "Super Stock 150", cc: "150" },
  { col: COL.c150sp, name: "Super Sport 150", cc: "150" },
  { col: COL.sp600, name: "Super Pole 600", cc: "600" },
  { col: COL.sp1000, name: "Super Pole 1000", cc: "1000" },
];

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
 * Convert a Google Drive share URL into a reliably-embeddable thumbnail URL.
 * Accepts:
 *  - https://drive.google.com/open?id=FILE_ID
 *  - https://drive.google.com/file/d/FILE_ID/view
 *  - https://drive.google.com/uc?id=FILE_ID
 * Returns: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
 */
function driveToImg(url) {
  if (!url) return "";
  const s = String(url).trim();
  if (!s) return "";
  let m = s.match(/[?&]id=([^&]+)/);
  if (!m) m = s.match(/\/d\/([^/]+)/);
  if (!m) return s; // leave non-Drive URLs as-is
  return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`;
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
  console.log(`[tss-sync] ✓ Received ${rows.length} rows from Sheets API`);
  if (rows.length < 3) {
    throw new Error(`[tss-sync] Sheet only has ${rows.length} rows; aborting.`);
  }

  const teams = {};
  let riderCount = 0;
  let skipped = 0;

  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    const name = cellTrim(r[COL.name]);
    if (!name) {
      skipped++;
      continue;
    }

    const classes = [];
    for (const c of CLASS_COLS) {
      if (cellTrim(r[c.col]) === "1") classes.push(c);
    }
    if (classes.length === 0) {
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
    // Fill in the team logo if this rider has one and the team didn't yet.
    if (!teams[teamName].logo) {
      teams[teamName].logo = driveToImg(cellTrim(r[COL.teamLogo]));
    }

    const primary = classes[0]; // already in 400→150 order
    const brand = cellTrim(r[COL.bikeBrand]);
    const model = cellTrim(r[COL.bikeModel]);
    const bike = [brand, model].filter(Boolean).join(" ");
    const numberRaw = cellTrim(r[COL.bikeNumber]);
    const number = parseInt(numberRaw, 10) || 0;

    teams[teamName].riders.push({
      name,
      intro: cellTrim(r[COL.bio]),
      photo: driveToImg(cellTrim(r[COL.photo])),
      class: primary.name,
      cc: primary.cc,
      bike,
      number,
    });
    riderCount++;
  }

  const output = { teams, generatedAt: new Date().toISOString() };
  const json = JSON.stringify(output, null, 2);

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, json, "utf8");
  // Keep src/data copy in sync so developers see the latest locally.
  mkdirSync(dirname(OUTPUT_PATH_SRC), { recursive: true });
  writeFileSync(OUTPUT_PATH_SRC, json, "utf8");

  const teamNames = Object.keys(teams);
  const withLogo = teamNames.filter((n) => teams[n].logo).length;
  const driveLogos = teamNames.filter((n) =>
    (teams[n].logo || "").includes("drive.google.com")
  ).length;

  console.log(
    `[tss-sync] ✓ Wrote ${teamNames.length} teams, ${riderCount} riders (skipped ${skipped} rows) → ${OUTPUT_PATH}`
  );
  console.log(
    `[tss-sync]   Logos: ${withLogo}/${teamNames.length} teams have a logo; ${driveLogos} use drive.google.com thumbnails`
  );
  // Sample first 3 team logos so the Netlify deploy log shows what was produced.
  for (const n of teamNames.slice(0, 3)) {
    console.log(`[tss-sync]   ${n} → ${(teams[n].logo || "(none)").substring(0, 120)}`);
  }
}

main().catch((err) => {
  console.error("[tss-sync] FATAL:", err);
  process.exit(1);
});
