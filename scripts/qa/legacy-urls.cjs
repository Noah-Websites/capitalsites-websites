/**
 * Legacy and outreach URL check. Run against the live site, a local Netlify build or a Netlify deploy:
 *
 *   NODE_PATH=<playwright node_modules> node scripts/qa/legacy-urls.cjs <base-url>
 *
 * 1. Status and redirect for every page, the old trailing-slash form, a retired page and an unknown path.
 * 2. Every ?service= value the contact page accepts (current slugs, older aliases, odd casing, junk),
 *    checking which option ends up selected and which slug the form would send.
 * Read-only: nothing is submitted.
 */
const { chromium } = require("playwright");

const BASE = (process.argv[2] || "").replace(/\/$/, "");
if (!/^https?:\/\//.test(BASE)) {
  console.error("Usage: node scripts/qa/legacy-urls.cjs <base-url>");
  process.exit(2);
}

const PATHS = [
  "/", "/services", "/pricing", "/demo", "/about", "/contact", "/audit", "/portfolio",
  "/portfolio/ember-kitchen", "/portfolio/fade-and-co", "/portfolio/maison-noir", "/privacy", "/thanks",
  "/robots.txt", "/sitemap.xml", "/icon.png", "/apple-icon.png", "/favicon.ico",
  "/about/", "/pricing/", "/silentstack", "/no-such-page",
];

// [query value, slug the form should send ("" = nothing preselected)]
const SERVICES = [
  ["fix", "fix"], ["plan", "plan"], ["premium", "premium"], ["estimate-requests", "estimate-requests"],
  ["quote-follow-up", "quote-follow-up"], ["booking", "booking"], ["integration", "integration"],
  ["care", "care"], ["not-sure", "not-sure"],
  ["rebuild", "plan"], ["new-site", "plan"], ["website-plan", "plan"],
  ["FIX", "fix"], [" fix ", "fix"], ["silentstack", ""], ["", ""],
];

(async () => {
  const out = { base: BASE, paths: [], services: [] };
  for (const p of PATHS) {
    const r = await fetch(BASE + p, { redirect: "manual" });
    out.paths.push({ path: p, status: r.status, location: r.headers.get("location") || "" });
  }
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  // See site-qa.cjs: work around `netlify serve` hanging on local images behind /_next/image.
  if (process.env.EMULATE_NETLIFY_IMAGES) {
    await ctx.route(/\/_next\/image\?url=%2F/, (route) => {
      const u = new URL(route.request().url());
      const q = u.searchParams;
      return route.continue({ url: `${u.origin}/.netlify/images?url=${encodeURIComponent(q.get("url"))}&w=${q.get("w")}&q=${q.get("q") || 75}` });
    });
  }
  const page = await ctx.newPage();
  for (const [q, want] of SERVICES) {
    const url = `${BASE}/contact${q === "" ? "" : `?service=${encodeURIComponent(q)}`}`;
    for (let attempt = 1; ; attempt++) {
      try {
        await page.goto(url, { waitUntil: "load" });
        // Bounded: a local emulator can hold a connection open, so don't wait forever for "idle".
        await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
        break;
      } catch (e) {
        if (attempt >= 3) throw e; // a dropped connection, not a site problem: try again
      }
    }
    const sent = await page.locator("[data-testid=service-slug]").inputValue();
    const label = await page.locator("#package").inputValue();
    out.services.push({ query: q, expected: want, sentSlug: sent, selectedLabel: label, ok: sent === want });
  }
  await browser.close();
  console.log(JSON.stringify(out, null, 2));
  const bad = out.services.filter((s) => !s.ok);
  if (bad.length) {
    console.error(`\n${bad.length} service link(s) did not resolve as expected.`);
    process.exit(1);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
