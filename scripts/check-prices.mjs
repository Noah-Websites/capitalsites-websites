#!/usr/bin/env node
/**
 * Price consistency check.
 *
 * Fails (exit 1) if any dollar amount in the built site, or hard-coded in the source,
 * does not come from src/data/offers.ts.
 *
 *   npm run build && node scripts/check-prices.mjs
 *
 * 1. Built HTML: every prerendered CapitalSites page in .next/server/app is scanned for "$" amounts
 *    (visible text, metadata and JSON-LD). The fictional demos (/demo and the three concept sites)
 *    carry made-up prices (menu items, products, sample quotes); they are checked in the browser by
 *    the QA suite instead, where their fictional regions can be told apart.
 * 2. Source: no "$<digits>" literal may appear in src/ outside offers.ts and the fictional content files.
 *
 * Needs Node 22.18+ or 23.6+ (TypeScript type stripping) to import offers.ts directly.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { allPriceAmounts } from "../src/data/offers.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const allowed = new Set(allPriceAmounts());
const AMOUNT = /\$\s?\d{1,3}(?:,\d{3})*(?:\.\d+)?/g;
const norm = (s) => s.replace(/\s/g, "").replace(/\.0+$/, "");

// Pages whose prices are fictional business content; checked in the browser instead.
const FICTIONAL_PAGES = new Set(["demo.html", "portfolio/fade-and-co.html", "portfolio/ember-kitchen.html", "portfolio/maison-noir.html"]);
// Source files that hold fictional prices (menus, products, sample quotes) or the price source itself.
const SOURCE_EXEMPT = new Set([
  "src/data/offers.ts",
  "src/app/portfolio/fade-and-co/page.tsx",
  "src/app/portfolio/ember-kitchen/page.tsx",
  "src/app/portfolio/maison-noir/page.tsx",
  // MapleDemo.tsx and ops-core.js format made-up quote amounts at run time and hold no literal prices,
  // so they are checked like any other file.
]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const problems = [];
let pagesChecked = 0;
let amountsSeen = 0;

const appDir = join(root, ".next/server/app");
for (const file of walk(appDir).filter((f) => f.endsWith(".html"))) {
  const rel = relative(appDir, file);
  if (FICTIONAL_PAGES.has(rel) || rel.startsWith("_")) continue;
  pagesChecked++;
  // Strip inline JS/RSC payloads so each amount is counted once, from the rendered HTML.
  const html = readFileSync(file, "utf8").replace(/<script(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/g, "");
  for (const m of html.matchAll(AMOUNT)) {
    amountsSeen++;
    if (!allowed.has(norm(m[0]))) problems.push(`built ${rel}: ${m[0]} is not a price from offers.ts`);
  }
}

for (const file of walk(join(root, "src")).filter((f) => /\.(tsx?|jsx?|mjs)$/.test(f))) {
  const rel = relative(root, file);
  if (SOURCE_EXEMPT.has(rel)) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/\$\d{1,3}(?:,\d{3})*/g)) problems.push(`source ${rel}:${i + 1}: hard-coded ${m[0]}`);
  });
}

console.log(`Allowed amounts (from offers.ts): ${[...allowed].join(", ")}`);
console.log(`Built pages checked: ${pagesChecked}; dollar amounts found: ${amountsSeen}`);
if (problems.length) {
  console.error(`FAIL: ${problems.length} price(s) not from offers.ts`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log("PASS: every price in the built pages and the source comes from offers.ts");
