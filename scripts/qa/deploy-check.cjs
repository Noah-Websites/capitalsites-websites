/**
 * Checks a real deployment against the live site: SEO tags, robots/sitemap, redirects, headers, compression,
 * logos and every image through the image CDN, and failed network requests in a real browser.
 *
 *   NODE_PATH=<playwright node_modules> node scripts/qa/deploy-check.cjs https://<name>.netlify.app [https://www.capitalsites.ca]
 */
const https = require("https");
const zlib = require("zlib");
const { chromium } = require("playwright");

const BASE = (process.argv[2] || "").replace(/\/$/, "");
const LIVE = (process.argv[3] || "https://www.capitalsites.ca").replace(/\/$/, "");
if (!/^https:\/\//.test(BASE)) {
  console.error("Usage: node scripts/qa/deploy-check.cjs <https-base-url> [live-url]");
  process.exit(2);
}
const UA = "Mozilla/5.0 (compatible; deploy-check)";
const PAGES = ["/", "/services", "/pricing", "/demo", "/about", "/contact", "/contact?service=fix", "/privacy", "/audit",
  "/portfolio", "/portfolio/fade-and-co", "/portfolio/ember-kitchen", "/portfolio/maison-noir", "/thanks"];
const HDRS = ["x-robots-tag", "strict-transport-security", "content-security-policy", "x-frame-options", "x-content-type-options",
  "referrer-policy", "permissions-policy", "cross-origin-opener-policy", "content-type"];

const pick = (s, re) => { const m = s.match(re); return m ? m[1].trim() : null; };
const meta = (h, attr, val) =>
  pick(h, new RegExp(`<meta[^>]*${attr}="${val}"[^>]*content="([^"]*)"`, "i")) ??
  pick(h, new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${val}"`, "i"));
const seo = (h) => ({
  title: pick(h, /<title[^>]*>([^<]*)<\/title>/i),
  description: meta(h, "name", "description"),
  canonical: pick(h, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i),
  robots: meta(h, "name", "robots"),
  ogTitle: meta(h, "property", "og:title"),
  ogDescription: meta(h, "property", "og:description"),
  ogUrl: meta(h, "property", "og:url"),
  ogImage: meta(h, "property", "og:image"),
  twitterCard: meta(h, "name", "twitter:card"),
  jsonLd: (h.match(/<script[^>]*application\/ld\+json/gi) || []).length,
  lang: pick(h, /<html[^>]*lang="([^"]*)"/i),
});
const get = async (url, opts = {}) => {
  const r = await fetch(url, { redirect: "manual", headers: { "user-agent": UA }, ...opts });
  return { status: r.status, headers: Object.fromEntries(r.headers), body: await r.text() };
};
const raw = (url) =>
  new Promise((res, rej) => {
    https.get(url, { headers: { "accept-encoding": "br, gzip", "user-agent": UA } }, (r) => {
      const c = [];
      r.on("data", (d) => c.push(d));
      r.on("end", () => res({ status: r.statusCode, enc: r.headers["content-encoding"] || "none", buf: Buffer.concat(c) }));
    }).on("error", rej);
  });

(async () => {
  const out = { base: BASE, live: LIVE, ranAt: new Date().toISOString(), seoDiffs: [], headers: {}, problems: [] };
  const problem = (s) => out.problems.push(s);

  /* ---------- SEO and headers, page by page, against the live site ---------- */
  for (const p of PAGES) {
    const [n, l] = await Promise.all([get(BASE + p), get(LIVE + p)]);
    if (n.status !== 200) problem(`${p}: status ${n.status}`);
    if (!/noindex/i.test(n.headers["x-robots-tag"] || "")) problem(`${p}: no X-Robots-Tag noindex on the test address`);
    const a = seo(n.body), b = seo(l.body);
    for (const k of Object.keys(a)) if (a[k] !== b[k]) out.seoDiffs.push({ page: p, field: k, netlify: a[k], live: b[k] });
    if (a.canonical && !a.canonical.startsWith("https://www.capitalsites.ca")) problem(`${p}: canonical ${a.canonical}`);
    if (p === "/") {
      out.headers.netlify = Object.fromEntries(HDRS.map((h) => [h, n.headers[h] || null]));
      out.headers.live = Object.fromEntries(HDRS.map((h) => [h, l.headers[h] || null]));
      out.headers.netlifyCache = n.headers["cache-control"] || null;
    }
  }

  /* ---------- robots.txt, sitemap, 404, redirects ---------- */
  const [rn, rl] = await Promise.all([get(BASE + "/robots.txt"), get(LIVE + "/robots.txt")]);
  out.robotsTxtSame = rn.body === rl.body;
  if (!out.robotsTxtSame) out.robotsTxt = { netlify: rn.body, live: rl.body };
  const locs = (x) => [...x.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]).sort();
  const [sn, sl] = await Promise.all([get(BASE + "/sitemap.xml"), get(LIVE + "/sitemap.xml")]);
  out.sitemap = { netlify: locs(sn.body).length, live: locs(sl.body).length, same: JSON.stringify(locs(sn.body)) === JSON.stringify(locs(sl.body)), allWww: locs(sn.body).every((u) => u.startsWith("https://www.capitalsites.ca")) };
  const nf = await get(BASE + "/this-page-does-not-exist");
  out.notFound = { status: nf.status, title: seo(nf.body).title };
  out.redirects = {};
  for (const p of ["/silentstack", "/silentstack/anything", "/services/"]) {
    const r = await get(BASE + p);
    out.redirects[p] = `${r.status} -> ${r.headers.location || "(none)"}`;
  }
  const http = await get(BASE.replace("https://", "http://") + "/");
  out.redirects["http://"] = `${http.status} -> ${http.headers.location || "(none)"}`;

  /* ---------- compression: whatever encoding is declared must decode ---------- */
  out.compression = {};
  for (const p of ["/", "/demo", "/robots.txt"]) {
    const r = await raw(BASE + p);
    let ok = false;
    try {
      const b = r.enc === "br" ? zlib.brotliDecompressSync(r.buf) : r.enc === "gzip" ? zlib.gunzipSync(r.buf) : r.buf;
      ok = b.length > 0 && (p.endsWith(".txt") || b.toString("utf8").includes("<html"));
    } catch {}
    out.compression[p] = `${r.enc} ${ok ? "decodes" : "BROKEN"}`;
    if (!ok) problem(`${p}: body does not decode as ${r.enc}`);
  }

  /* ---------- logos as plain files ---------- */
  out.logoFiles = {};
  for (const f of ["/logo-full.png", "/logo-mark-white.png"]) {
    const r = await fetch(BASE + f, { headers: { "user-agent": UA } });
    const len = (await r.arrayBuffer()).byteLength;
    out.logoFiles[f] = `${r.status} ${r.headers.get("content-type")} ${len}B`;
    if (r.status !== 200 || !/^image\//.test(r.headers.get("content-type") || "")) problem(`${f}: ${out.logoFiles[f]}`);
  }

  /* ---------- real browser: every image renders, no failed requests ---------- */
  out.browser = [];
  const browser = await chromium.launch();
  for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    await ctx.route(/formsubmit\.co/, (r) => r.abort());
    const page = await ctx.newPage();
    let bad = [];
    page.on("response", (r) => r.status() >= 400 && bad.push(`${r.status()} ${r.url()}`));
    page.on("requestfailed", (r) => !/formsubmit\.co/.test(r.url()) && bad.push(`failed ${r.url()} ${r.failure()?.errorText}`));
    for (const p of PAGES) {
      bad = [];
      await page.goto(BASE + p, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("networkidle").catch(() => {});
      const imgs = await page.evaluate(() =>
        Array.from(document.images).map((i) => ({ src: i.currentSrc || i.src, ok: i.complete && i.naturalWidth > 0 })));
      const logos = await page.evaluate(() => ({
        nav: !!Array.from(document.images).find((i) => /logo-mark-white/.test(i.src) && i.complete && i.naturalWidth > 0),
        footer: !!Array.from(document.images).find((i) => /logo-full/.test(i.src) && i.complete && i.naturalWidth > 0),
        viaImageCdn: Array.from(document.images).filter((i) => /logo/.test(i.src)).every((i) => /\/_next\/image|\/\.netlify\/images/.test(i.currentSrc || i.src)),
      }));
      const broken = imgs.filter((i) => !i.ok).map((i) => i.src);
      out.browser.push({ page: p, width: vp.w, images: imgs.length, broken, logos, failedRequests: bad.slice() });
      if (broken.length) problem(`${p}@${vp.w}: ${broken.length} broken image(s)`);
      if (!logos.nav || !logos.footer) problem(`${p}@${vp.w}: logo missing (nav ${logos.nav}, footer ${logos.footer})`);
      if (bad.length) problem(`${p}@${vp.w}: ${bad.length} failed request(s): ${bad[0]}`);
    }
    await ctx.close();
  }
  await browser.close();

  console.log(JSON.stringify(out, null, 1));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
