#!/usr/bin/env node
/*
 * TSS Data Sync
 * Fetches the "選手總表" sheet from the public Google Sheet and
 * regenerates client/public/tss_data.json at build time.
 *
 * Runs automatically via `npm run prebuild` on every Netlify deploy.
 * To trigger a refresh, re-deploy (Netlify → Trigger deploy → Clear cache and deploy).
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUTPUT_PATH = resolve(ROOT, "client/public/tss_data.json");
const OUTPUT_PATH_SRC = resolve(ROOT, "client/src/data/tss_data.json");

const DOC_ID = "1rS5R-ECwJIcGepccHrVL2IzZPieYAIS6_MaN-SW0z3M";
// gid of "選手總表" tab
const GID = "1066812969";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${DOC_ID}/gviz/tq?tqx=out:csv&gid=${GID}`;

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

function parseCSV(text) {
  const rows = [];
  let cur = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        cur.push(field);
        field = "";
      } else if (c === "\n") {
        cur.push(field);
        rows.push(cur);
        cur = [];
        field = "";
      } else if (c === "\r") {
        /* skip */
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || cur.length > 0) {
    cur.push(field);
    rows.push(cur);
  }
  return rows;
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
  console.log(`[tss-sync] Fetching CSV: ${CSV_URL}`);
  const res = await fetch(CSV_URL, {
    redirect: "follow",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; TSS-Website-Sync/1.0; +https://taiwansuperbikeseries.com)",
      Accept: "text/csv,text/plain,*/*",
    },
  });
  if (!res.ok) {
    throw new Error(
      `[tss-sync] HTTP ${res.status} ${res.statusText} when fetching Google Sheet CSV. ` +
        `Make sure the sheet is shared as "Anyone with the link can view".`
    );
  }
  const csv = await res.text();
  console.log(`[tss-sync] ✓ Fetched ${csv.length} bytes from Google Sheet`);

  const rows = parseCSV(csv);
  if (rows.length < 3) {
    throw new Error(`[tss-sync] CSV only has ${rows.length} rows; aborting.`);
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
