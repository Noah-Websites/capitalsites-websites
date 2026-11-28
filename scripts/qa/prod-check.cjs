/**
 * Production check after the DNS switch: https://www.capitalsites.ca served by Netlify.
 * Paced (Netlify answers bursts of automated requests with 403).
 *
 *   NODE_PATH=<playwright node_modules> node scripts/qa/prod-check.cjs [https://www.capitalsites.ca] [https://capitalsites-websites.netlify.app]
 */
const { chromium } = require("playwright");

const PROD = (process.argv[2] || "https://www.capitalsites.ca").replace(/\/$/, "");
const TEST = (process.argv[3] || "https://capitalsites-websites.netlify.app").replace(/\/$/, "");
const APEX = PROD.replace("://www.", "://");
const UA = "Mozilla/5.0 (compatible; prod-check)";
const PAGES = ["/", "/services", "/pricing", "/demo", "/about", "/contact", "/contact?service=fix", "/privacy", "/audit",
  "/portfolio", "/portfolio/fade-and-co", "/portfolio/ember-kitchen", "/portfolio/maison-noir", "/thanks"];
const MAJOR = ["/", "/services", "/pricing", "/demo", "/about", "/contact", "/audit", "/portfolio", "/privacy", "/thanks"];
const pause = (ms) => new Promise((r) => setTimeout(r, ms));

const pick = (s, re) => { const m = s.match(re); return m ? m[1].trim() : null; };
const meta = (h, a, v) => pick(h, new RegExp(`<meta[^>]*${a}="${v}"[^>]*content="([^"]*)"`, "i")) ?? pick(h, new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${a}="${v}"`, "i"));
const seo = (h) => ({
  title: pick(h, /<title[^>]*>([^<]*)<\/title>/i), description: meta(h, "name", "description"),
  canonical: pick(h, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i), robots: meta(h, "name", "robots"),
  ogUrl: meta(h, "property", "og:url"), ogImage: meta(h, "property", "og:image"),
  jsonLd: (h.match(/<script[^>]*application\/ld\+json/gi) || []).length,
});
const get = async (url) => {
  const r = await fetch(url, { redirect: "manual", headers: { "user-agent": UA } });
  return { status: r.status, h: Object.fromEntries(r.headers), body: await r.text() };
};

(async () => {
  const out = { prod: PROD, ranAt: new Date().toISOString(), problems: [], pages: [], seoDiffsVsTestAddress: [] };
  const problem = (s) => out.problems.push(s);

  /* pages: served by Netlify, indexable, HSTS, same SEO as the tested deploy */
  for (const p of PAGES) {
    const [a, b] = [await get(PROD + p), await get(TEST + p)];
    const s = seo(a.body);
    out.pages.push({ page: p, status: a.status, server: a.h.server, xRobotsTag: a.h["x-robots-tag"] || null, hsts: a.h["strict-transport-security"] || null, canonical: s.canonical });
    if (a.status !== 200) problem(`${p}: status ${a.status}`);
    if (!/netlify/i.test(a.h.server || "")) problem(`${p}: server ${a.h.server}`);
    if (a.h["x-robots-tag"]) problem(`${p}: X-Robots-Tag "${a.h["x-robots-tag"]}" on production`);
    if (/noindex/i.test(s.robots || "")) problem(`${p}: robots meta ${s.robots}`);
    if (!a.h["strict-transport-security"]) problem(`${p}: no HSTS`);
    if (!/noindex/i.test(b.h["x-robots-tag"] || "")) problem(`${p}: test address lost its noindex header`);
    const t = seo(b.body);
    for (const k of Object.keys(s)) if (s[k] !== t[k]) out.seoDiffsVsTestAddress.push({ page: p, field: k, prod: s[k], test: t[k] });
    await pause(300);
  }

  /* robots, sitemap, 404 */
  const robots = await get(PROD + "/robots.txt");
  out.robotsTxt = { status: robots.status, body: robots.body.trim(), xRobotsTag: robots.h["x-robots-tag"] || null };
  if (/disallow:\s*\/\s*$/im.test(robots.body)) problem("robots.txt disallows everything");
  const sm = await get(PROD + "/sitemap.xml");
  const locs = [...sm.body.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  out.sitemap = { url: PROD + "/sitemap.xml", status: sm.status, contentType: sm.h["content-type"], urls: locs.length, allWww: locs.every((u) => u.startsWith("https://www.capitalsites.ca")) };
  const sitemapStatuses = [];
  for (const u of locs) { const r = await fetch(u, { redirect: "manual", headers: { "user-agent": UA } }); sitemapStatuses.push(`${r.status} ${u}`); await pause(250); }
  out.sitemap.allReturn200 = sitemapStatuses.every((s) => s.startsWith("200"));
  if (!out.sitemap.allReturn200) problem(`sitemap URL not 200: ${sitemapStatuses.filter((s) => !s.startsWith("200")).join(", ")}`);
  const nf = await get(PROD + "/this-page-does-not-exist");
  out.notFound = nf.status;

  /* redirects */
  const redirect = async (from, expectStatus, expectLoc) => {
    const r = await get(from);
    const ok = r.status === expectStatus && (r.h.location || "") === expectLoc;
    if (!ok) problem(`redirect ${from}: got ${r.status} -> ${r.h.location}, expected ${expectStatus} -> ${expectLoc}`);
    return `${ok ? "OK " : "BAD"} ${from} -> ${r.status} ${r.h.location || ""}`;
  };
  out.redirects = [
    await redirect(APEX + "/", 301, PROD + "/"),
    await redirect(APEX + "/pricing", 301, PROD + "/pricing"),
    await redirect(APEX + "/contact?service=fix", 301, PROD + "/contact?service=fix"),
    await redirect(PROD.replace("https://", "http://") + "/", 301, PROD + "/"),
    await redirect(APEX.replace("https://", "http://") + "/", 301, APEX + "/"),
    await redirect(PROD + "/silentstack", 308, "/services"),
    await redirect(PROD + "/silentstack/old", 308, "/services"),
    await redirect(PROD + "/services/", 308, "/services"),
  ];

  /* browser: logos, images, sales links on the major pages */
  out.browser = [];
  const salesLinks = new Map();
  const browser = await chromium.launch();
  for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    await ctx.route(/formsubmit\.co/, (r) => r.abort());
    const page = await ctx.newPage();
    let httpErrors = [];
    page.on("response", (r) => r.status() >= 400 && httpErrors.push(`${r.status()} ${r.url()}`));
    for (const p of MAJOR) {
      httpErrors = [];
      await page.goto(PROD + p, { waitUntil: "load" });
      const res = await page.evaluate(async () => {
        const imgs = Array.from(document.images);
        for (const img of imgs) {
          if (img.offsetParent === null && getComputedStyle(img).position !== "fixed") continue; // hidden at this width
          img.scrollIntoView({ block: "center" });
          if (!img.complete) await Promise.race([new Promise((r) => { img.onload = img.onerror = r; }), new Promise((r) => setTimeout(r, 10000))]);
        }
        window.scrollTo(0, 0);
        const visible = imgs.filter((i) => i.offsetParent !== null);
        return {
          visibleImages: visible.length,
          broken: visible.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.currentSrc || i.src),
          navLogo: imgs.some((i) => /logo-mark-white/.test(i.src) && i.naturalWidth > 0),
          footerLogo: imgs.some((i) => /logo-full/.test(i.src) && i.naturalWidth > 0),
          links: Array.from(document.querySelectorAll("a[href]")).map((a) => a.getAttribute("href")),
          demoMounted: !!document.querySelector("[data-testid=maple-demo]"),
        };
      });
      for (const l of res.links) if (/^(\/contact|\/audit|https:\/\/calendly|mailto:|\/pricing|\/demo)/.test(l)) salesLinks.set(l, p);
      const row = { page: p, width: vp.w, visibleImages: res.visibleImages, broken: res.broken, navLogo: res.navLogo, footerLogo: res.footerLogo, httpErrors: httpErrors.slice() };
      if (p === "/demo") row.demoMounted = res.demoMounted;
      out.browser.push(row);
      if (res.broken.length) problem(`${p}@${vp.w}: broken image ${res.broken[0]}`);
      if (!res.navLogo || !res.footerLogo) problem(`${p}@${vp.w}: logo missing (nav ${res.navLogo}, footer ${res.footerLogo})`);
      if (httpErrors.length) problem(`${p}@${vp.w}: ${httpErrors[0]}`);
      if (p === "/demo" && !res.demoMounted) problem("demo did not mount");
      await pause(500);
    }
    await ctx.close();
  }
  await browser.close();

  /* sales links: every contact/audit/calendly/pricing/demo link found on those pages */
  out.salesLinks = [];
  for (const [l, from] of salesLinks) {
    if (l.startsWith("mailto:")) { out.salesLinks.push(`mailto ${l} (on ${from})`); continue; }
    const url = l.startsWith("http") ? l : PROD + l;
    const r = await fetch(url, { redirect: "follow", headers: { "user-agent": UA } });
    out.salesLinks.push(`${r.status} ${l}`);
    if (r.status !== 200) problem(`sales link ${l} (on ${from}): ${r.status}`);
    await pause(300);
  }

  console.log(JSON.stringify(out, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
