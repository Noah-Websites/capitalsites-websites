/**
 * Google Analytics QA: consent, events, duplicates, PII. Every hit to Google Analytics is intercepted and
 * answered locally, so nothing reaches the GA property. gtag.js itself loads from Google, as it would for a
 * visitor, so the property's real stream settings (enhanced measurement) are exercised.
 *
 * Needs a build that allows analytics on localhost:
 *   NEXT_PUBLIC_ANALYTICS_HOSTS=localhost npm run build && npx next start -p 3100
 *   NODE_PATH=<playwright + @axe-core/playwright> node scripts/qa/analytics-qa.cjs http://localhost:3100 [shots-dir]
 */
const { chromium } = require("playwright");
const { AxeBuilder } = require("@axe-core/playwright");
const path = require("path");
const fs = require("fs");

const BASE = (process.argv[2] || "http://localhost:3100").replace(/\/$/, "");
const SHOTS = process.argv[3] || "docs/staging/analytics";
fs.mkdirSync(SHOTS, { recursive: true });
const KEY = "cs-analytics-consent-v1";
const COLLECT = /^https:\/\/([a-z0-9-]+\.)*(google-analytics\.com|analytics\.google\.com)\/g\/collect/;
const GOOGLE = /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net/;
const TEST = { name: "Test Person", business: "Test Contracting", email: "test@example.com", message: "Stubbed analytics test" };

const results = [];
const check = (name, ok, detail = {}) => results.push({ name, ok: !!ok, detail });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** Parses GA4 collect hits (query string plus one line per batched event in the body). */
function parseHit(url, body) {
  const u = new URL(url);
  const common = Object.fromEntries(u.searchParams);
  const lines = (body || "").split("\n").map((l) => l.trim()).filter(Boolean);
  const evs = (lines.length ? lines : [""]).map((l) => ({ ...common, ...Object.fromEntries(new URLSearchParams(l)) }));
  return evs.map((e) => ({
    name: e.en,
    params: Object.fromEntries(Object.entries(e).filter(([k]) => k.startsWith("ep.") || k.startsWith("epn.")).map(([k, v]) => [k.replace(/^epn?\./, ""), v])),
    dl: e.dl,
    gcs: e.gcs,
    raw: `${url}\n${body || ""}`,
  }));
}

async function session(browser, vp = { w: 1440, h: 900 }, consent) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  if (consent) await ctx.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, consent]);
  const s = { ctx, events: [], google: [], scripts: 0, formPosts: 0 };
  await ctx.route(COLLECT, (route) => {
    const r = route.request();
    s.events.push(...parseHit(r.url(), r.postData()));
    return route.fulfill({ status: 204, body: "" });
  });
  // Stand-in for FormSubmit: accept the POST and send the browser on to /thanks, as FormSubmit's _next does.
  await ctx.route(/formsubmit\.co/, (route) => {
    s.formPosts++;
    return route.fulfill({ status: 200, contentType: "text/html", body: `<script>location.replace(${JSON.stringify(BASE + "/thanks")})</script>` });
  });
  ctx.on("request", (r) => {
    if (GOOGLE.test(r.url())) s.google.push(r.url());
    if (/googletagmanager\.com\/gtag\/js/.test(r.url())) s.scripts++;
  });
  s.page = await ctx.newPage();
  s.count = (name, pred = () => true) => s.events.filter((e) => e.name === name && pred(e)).length;
  s.waitFor = async (name, pred = () => true, n = 1, ms = 10000) => {
    const t = Date.now();
    while (Date.now() - t < ms) {
      if (s.count(name, pred) >= n) return true;
      await wait(200);
    }
    return false;
  };
  return s;
}

const banner = (page) => page.getByRole("region", { name: "Analytics choice" });
const cookies = async (ctx) => (await ctx.cookies()).filter((c) => c.name === "_ga" || c.name.startsWith("_ga_"));
async function fillContact(page) {
  if (!(await page.$eval("#package", (el) => el.value))) await page.selectOption("#package", { index: 1 });
  await page.fill("#name", TEST.name);
  await page.fill("#business", TEST.business);
  await page.fill("#email", TEST.email);
  await page.fill("#message", TEST.message);
}

(async () => {
  const browser = await chromium.launch();

  /* 1. Nothing from Google before a choice; the banner is there, fits, and passes axe. */
  for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
    const s = await session(browser, vp);
    await s.page.goto(BASE + "/", { waitUntil: "networkidle" });
    await wait(2500);
    const b = banner(s.page);
    const visible = await b.isVisible();
    const box = visible ? await b.boundingBox() : null;
    const btns = await b.getByRole("button").all();
    const sizes = await Promise.all(btns.map((x) => x.boundingBox()));
    const overflow = await s.page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    const axe = await new AxeBuilder({ page: s.page }).include('[aria-label="Analytics choice"]').withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    await s.page.screenshot({ path: path.join(SHOTS, `banner-home-${vp.w}.png`) });
    check(`@${vp.w} no Google request before a choice`, s.google.length === 0, { google: s.google.length });
    check(`@${vp.w} banner shown, inside the viewport, no page overflow`, visible && box && box.x >= 0 && box.x + box.width <= vp.w && box.y + box.height <= vp.h && !overflow, { box });
    check(`@${vp.w} Allow and Don't allow are the same size`, sizes.length === 2 && Math.abs(sizes[0].width - sizes[1].width) < 1 && Math.abs(sizes[0].height - sizes[1].height) < 1, { sizes });
    check(`@${vp.w} banner axe: no violations`, axe.violations.length === 0, { violations: axe.violations.map((v) => `${v.id}/${v.impact}`) });
    await s.ctx.close();
  }

  /* 2. Don't allow: nothing loads, no cookies, the choice sticks, and a sent form is not counted. */
  {
    const s = await session(browser);
    await s.page.goto(BASE + "/", { waitUntil: "networkidle" });
    await banner(s.page).getByRole("button", { name: "Don't allow" }).click();
    await s.page.getByRole("link", { name: "Services" }).first().click();
    await s.page.waitForURL(/\/services/);
    await s.page.goto(BASE + "/contact?service=fix", { waitUntil: "networkidle" });
    await fillContact(s.page);
    await s.page.locator("form button[type=submit]").click();
    await s.page.waitForURL(/\/thanks/);
    await s.page.waitForLoadState("networkidle");
    await wait(2000);
    const stored = await s.page.evaluate((k) => localStorage.getItem(k), KEY);
    check("Don't allow: no Google requests across pages and a form send", s.google.length === 0, { google: s.google.slice(0, 3) });
    check("Don't allow: no _ga cookies, choice stored, banner gone", (await cookies(s.ctx)).length === 0 && stored === "denied" && !(await banner(s.page).isVisible()));
    check("Don't allow: form still sends", s.formPosts === 1);
    await s.ctx.close();
  }

  /* 3. Allow: one gtag.js, one page_view per page (also for in-app navigation), consent mode, 13-month cookie. */
  {
    const s = await session(browser);
    await s.page.goto(BASE + "/", { waitUntil: "networkidle" });
    await banner(s.page).getByRole("button", { name: "Allow", exact: true }).click();
    const firstPv = await s.waitFor("page_view");
    await wait(2500);
    const homeViews = s.count("page_view");
    await s.page.locator("header").getByRole("link", { name: "Services" }).first().click();
    await s.page.waitForURL(/\/services$/);
    const svc = await s.waitFor("page_view", (e) => /\/services$/.test(e.dl));
    await wait(2500);
    await s.page.locator("header").getByRole("link", { name: "Pricing" }).first().click();
    await s.page.waitForURL(/\/pricing$/);
    await s.waitFor("page_view", (e) => /\/pricing$/.test(e.dl));
    await wait(2500);
    const byUrl = {};
    for (const e of s.events.filter((x) => x.name === "page_view")) byUrl[new URL(e.dl).pathname] = (byUrl[new URL(e.dl).pathname] || 0) + 1;
    const ga = await cookies(s.ctx);
    const days = ga.length ? Math.round((ga[0].expires * 1000 - Date.now()) / 86400000) : null;
    const gcs = [...new Set(s.events.map((e) => e.gcs).filter(Boolean))];
    const config = await s.page.evaluate(() => (window.dataLayer || []).filter((a) => a && a[0] === "config").length);
    check("Allow: page_view for the landing page, exactly once", firstPv && homeViews === 1, { homeViews });
    check("Allow: in-app navigation gives one page_view per page, no duplicates", svc && Object.values(byUrl).every((n) => n === 1) && Object.keys(byUrl).length === 3, { byUrl });
    check("Allow: gtag.js loaded once, config pushed once", s.scripts === 1 && config === 1, { scripts: s.scripts, config });
    check("Allow: consent mode analytics granted, ads denied (gcs G101)", gcs.length > 0 && gcs.every((g) => g === "G101"), { gcs });
    check("Allow: every hit marked non-personalized for ads (npa=1)", s.events.length > 0 && s.events.every((e) => /[?&]npa=1(&|$)/.test(e.raw.split("\n")[0])), {
      sample: s.events[0] && s.events[0].raw.split("\n")[0].match(/[?&]npa=[^&]*/),
    });
    check("Allow: _ga cookies set, about 13 months", ga.length >= 1 && days >= 390 && days <= 396, { cookies: ga.map((c) => c.name), days });

    /* 4. Primary CTA clicks; secondary (ghost) buttons are not counted; email link clicks. */
    await s.page.goto(BASE + "/", { waitUntil: "networkidle" });
    await s.page.getByRole("link", { name: "See pricing" }).first().click();
    await s.page.waitForURL(/\/pricing$/);
    await wait(1500);
    const ghost = s.count("cta_click");
    await s.page.goto(BASE + "/", { waitUntil: "networkidle" });
    await s.page.locator('main a[data-cta="primary"]').first().click();
    const hero = await s.waitFor("cta_click", (e) => e.params.cta_location === "page");
    await s.page.goto(BASE + "/services", { waitUntil: "networkidle" });
    await s.page.locator('header a[data-cta="primary"]').click();
    const nav = await s.waitFor("cta_click", (e) => e.params.cta_location === "nav" && e.params.cta_destination === "/contact");
    await s.page.goto(BASE + "/thanks", { waitUntil: "networkidle" });
    await s.page.evaluate(() => window.addEventListener("click", (e) => e.target.closest('a[href^="mailto:"]') && e.preventDefault()));
    await s.page.locator('footer a[href^="mailto:"]').click();
    const mail = await s.waitFor("click_email", (e) => e.params.link_location === "footer");
    const ctaSample = s.events.find((e) => e.name === "cta_click");
    check("cta_click: ghost (secondary) button not counted", ghost === 0, { ghost });
    check("cta_click: primary button on the page", hero, { sample: ctaSample && ctaSample.params });
    check("cta_click: nav Contact button", nav);
    check("click_email: footer email link, no address sent", mail && s.events.filter((e) => e.name === "click_email").every((e) => !JSON.stringify(e.params).includes("@")));

    /* 5. Demo: demo_start on the first action, demo_complete once all five sections are opened. */
    await s.page.goto(BASE + "/demo", { waitUntil: "networkidle" });
    await s.page.waitForSelector("[data-testid=maple-demo]");
    const tabs = ["Requests and alerts", "Scheduling", "Quotes", "Sync and health"];
    await s.page.getByRole("tab", { name: new RegExp(tabs[0]) }).click();
    const started = await s.waitFor("demo_start");
    const beforeAll = s.count("demo_complete");
    for (const t of tabs.slice(1)) await s.page.getByRole("tab", { name: new RegExp(t) }).click();
    const completed = await s.waitFor("demo_complete");
    for (const t of tabs) await s.page.getByRole("tab", { name: new RegExp(t) }).click();
    await wait(2500);
    check("demo_start once on the first action", started && s.count("demo_start") === 1);
    check("demo_complete only after every section, once", beforeAll === 0 && completed && s.count("demo_complete") === 1, {
      params: (s.events.find((e) => e.name === "demo_complete") || {}).params,
    });

    /* 6. Leads: counted on /thanks after a send, once; not on reload, direct visits or invalid sends. */
    await s.page.goto(BASE + "/contact?service=fix", { waitUntil: "networkidle" });
    await s.page.locator("form button[type=submit]").click(); // empty: the browser blocks it
    await wait(800);
    const flagAfterInvalid = await s.page.evaluate(() => sessionStorage.getItem("cs-pending-lead"));
    await fillContact(s.page);
    await s.page.locator("form button[type=submit]").click();
    await s.page.waitForURL(/\/thanks/);
    const lead = await s.waitFor("generate_lead", (e) => e.params.form_type === "contact" && e.params.service === "fix");
    await s.page.reload({ waitUntil: "networkidle" });
    await wait(2500);
    const afterReload = s.count("generate_lead");
    await s.page.goto(BASE + "/audit", { waitUntil: "networkidle" });
    await s.page.fill("#name", TEST.name);
    await s.page.fill("#email", TEST.email);
    await s.page.fill("#website", "https://example.com");
    await s.page.locator("form button[type=submit]").click();
    await s.page.waitForURL(/\/thanks/);
    const audit = await s.waitFor("generate_lead", (e) => e.params.form_type === "audit" && e.params.service === "audit");
    await s.page.goto(BASE + "/thanks", { waitUntil: "networkidle" });
    await wait(2500);
    check("generate_lead: invalid (empty) form not counted", flagAfterInvalid === null);
    check("generate_lead: contact form, once, with form_type and service only", lead && afterReload === 1, {
      params: (s.events.find((e) => e.name === "generate_lead") || {}).params,
    });
    check("generate_lead: audit form counted; direct visit to /thanks not counted", audit && s.count("generate_lead") === 2, { total: s.count("generate_lead") });
    check("forms still post to FormSubmit (stand-in)", s.formPosts === 2, { posts: s.formPosts });

    /* 7. Withdraw: Cookie settings reopens the choice; Don't allow removes cookies and stops sending. */
    await s.page.goto(BASE + "/about", { waitUntil: "networkidle" });
    await wait(2500); // let gtag flush the page_view before withdrawing
    await s.page.locator("footer").getByRole("button", { name: "Cookie settings" }).click();
    const reopened = await banner(s.page).isVisible();
    const focused = await s.page.evaluate(() => document.activeElement && document.activeElement.textContent.trim());
    const nowText = await banner(s.page).innerText();
    await banner(s.page).getByRole("button", { name: "Don't allow" }).click();
    const before = s.events.length;
    await s.page.locator("header").getByRole("link", { name: "Services" }).first().click();
    await s.page.waitForURL(/\/services$/);
    await s.page.locator('main a[data-cta="primary"]').first().click();
    await wait(3000);
    check("Cookie settings reopens the choice, focus on Allow, shows current state", reopened && focused === "Allow" && /on\./.test(nowText), { focused });
    check("withdraw: _ga cookies removed, nothing more sent", (await cookies(s.ctx)).length === 0 && s.events.length === before, { after: s.events.length - before });

    /* 8. No personal data in any hit. */
    const all = s.events.map((e) => e.raw).join("\n");
    const pii = [TEST.name, TEST.business, TEST.email, TEST.message, "example.com", "%40", "@"].filter((t) => all.includes(t) || all.includes(encodeURIComponent(t)));
    const enhancedForms = s.events.filter((e) => /^form_/.test(e.name)).map((e) => ({ name: e.name, params: e.params }));
    check("no names, emails, messages or '@' in any hit", pii.length === 0, { found: pii, enhancedForms: enhancedForms.slice(0, 4) });
    const names = {};
    for (const e of s.events) names[e.name] = (names[e.name] || 0) + 1;
    results.push({ name: "events seen (for the report)", ok: true, detail: names });
    await s.ctx.close();
  }

  /* 9. Undecided when sending: the lead waits for the choice on /thanks. */
  {
    const s = await session(browser);
    await s.page.goto(BASE + "/contact?service=estimate-requests", { waitUntil: "networkidle" });
    await fillContact(s.page);
    await s.page.locator("form button[type=submit]").click();
    await s.page.waitForURL(/\/thanks/);
    await s.page.waitForLoadState("networkidle");
    const none = s.google.length === 0 && (await banner(s.page).isVisible());
    await banner(s.page).getByRole("button", { name: "Allow", exact: true }).click();
    const lead = await s.waitFor("generate_lead", (e) => e.params.form_type === "contact");
    check("undecided at send: nothing sent until Allow on /thanks, then the lead counts once", none && lead && s.count("generate_lead") === 1);
    await s.ctx.close();
  }

  /* 10. Another hostname (stands in for netlify.app and previews): no banner, nothing from Google. */
  {
    const s = await session(browser);
    await s.page.goto(BASE.replace("localhost", "127.0.0.1") + "/", { waitUntil: "networkidle" });
    await wait(2000);
    check("non-production host: no banner, no Google requests", !(await banner(s.page).isVisible()) && s.google.length === 0);
    await s.ctx.close();
  }

  await browser.close();
  const failed = results.filter((r) => !r.ok);
  console.log(JSON.stringify({ base: BASE, passed: results.length - failed.length, failed: failed.length, results }, null, 1));
  process.exit(failed.length ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(2);
});
