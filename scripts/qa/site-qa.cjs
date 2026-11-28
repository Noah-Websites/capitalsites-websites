/**
 * CapitalSites staging QA (Playwright + axe-core). Never submits the real contact form:
 * every request to formsubmit.co is intercepted and answered locally.
 *
 *   npm run build && npx next start -p 3100
 *   npm i --no-save playwright @axe-core/playwright   (or point NODE_PATH at an install)
 *   node scripts/qa/site-qa.cjs http://localhost:3100 docs/staging/after docs/staging/qa-results.json
 */
const { chromium } = require("playwright");
const { AxeBuilder } = require("@axe-core/playwright");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const BASE = process.argv[2] || "http://localhost:3100";
const SHOTS = process.argv[3] || "docs/staging/after";
const RESULTS = process.argv[4] || "docs/staging/qa-results.json";
fs.mkdirSync(SHOTS, { recursive: true });

const PAGES = [
  "/",
  "/services",
  "/pricing",
  "/demo",
  "/about",
  "/contact",
  "/contact?service=fix",
  "/privacy",
  "/audit",
  "/portfolio",
  "/portfolio/fade-and-co",
  "/portfolio/ember-kitchen",
  "/portfolio/maison-noir",
  "/thanks",
];
const VIEWPORTS = [
  { w: 1440, h: 900 },
  { w: 390, h: 844 },
];
const snap = JSON.parse(
  execFileSync(process.execPath, ["--no-warnings", path.join(__dirname, "offers-snapshot.mjs")], { encoding: "utf8" }),
);
const ALLOWED = new Set(snap.allowed);
const slugOf = (p) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/[/?=&]/g, "_"));
const R = { base: BASE, ranAt: new Date().toISOString(), pages: [], axe: [], keyboard: {}, links: {}, prices: [], contact: {}, demo: {}, regression: {} };

async function settle(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

async function newContext(browser, vp, extra = {}) {
  // EMULATE_NETLIFY_IMAGES=1 is for the local `netlify serve` emulator only. Two emulator faults are worked
  // around: (1) it hangs on local images (url=/...) behind its /_next/image rewrite, so those go straight to
  // /.netlify/images, as production does; (2) with an edge function in the path it labels pages gzip while
  // sending them uncompressed, so pages are requested uncompressed. Real deployments run without the flag.
  const local = process.env.EMULATE_NETLIFY_IMAGES ? { extraHTTPHeaders: { "Accept-Encoding": "identity" } } : {};
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, reducedMotion: "reduce", ...local, ...extra });
  if (process.env.EMULATE_NETLIFY_IMAGES) {
    await ctx.route(/\/_next\/image\?url=%2F/, (route) => {
      const u = new URL(route.request().url());
      const q = u.searchParams;
      const to = `${u.origin}/.netlify/images?url=${encodeURIComponent(q.get("url"))}&w=${q.get("w")}&q=${q.get("q") || 75}`;
      return route.continue({ url: to });
    });
  }
  return ctx;
}

/** Visible focus: an outline or a box-shadow ring on the element (or, for the service select, on its visible field). */
async function focusInfo(page) {
  return page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const target = el.classList.contains("service-select") ? el.previousElementSibling : el;
    const cs = getComputedStyle(target);
    const outline = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
    const ring = cs.boxShadow && cs.boxShadow !== "none";
    const name = (el.getAttribute("aria-label") || el.textContent || el.getAttribute("name") || el.id || el.tagName).trim().replace(/\s+/g, " ").slice(0, 60);
    return { tag: el.tagName.toLowerCase(), role: el.getAttribute("role") || "", name, visible: outline || ring };
  });
}

(async () => {
  const browser = await chromium.launch();

  /* ---------- 1 + 2: screenshots, overflow, console errors, axe ---------- */
  for (const vp of VIEWPORTS) {
    const ctx = await newContext(browser, vp);
    await ctx.route(/formsubmit\.co/, (r) => r.abort());
    const page = await ctx.newPage();
    let errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    for (const p of PAGES) {
      errors = [];
      const resp = await page.goto(BASE + p, { waitUntil: "networkidle" });
      if (p === "/demo") await page.waitForSelector("[data-testid=maple-demo]");
      await settle(page);
      const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, vw: document.documentElement.clientWidth }));
      const file = path.join(SHOTS, `${slugOf(p)}-${vp.w}.jpg`);
      await page.screenshot({ path: file, fullPage: true, type: "jpeg", quality: 80 });
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      const serious = axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      R.axe.push({
        page: p,
        width: vp.w,
        serious: serious.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, sample: v.nodes.slice(0, 3).map((n) => n.target.join(" ")) })),
        other: axe.violations.filter((v) => !serious.includes(v)).map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
      });
      R.pages.push({ page: p, width: vp.w, status: resp.status(), scrollWidth: o.sw, viewport: o.vw, noHorizontalScroll: o.sw <= o.vw, consoleErrors: errors.slice(), screenshot: file });
    }
    await ctx.close();
  }

  /* ---------- 4: prices on the rendered pages (fictional regions set aside, their CapitalSites banners kept) ---------- */
  {
    const ctx = await newContext(browser, { w: 1440, h: 900 });
    await ctx.route(/formsubmit\.co/, (r) => r.abort());
    const page = await ctx.newPage();
    for (const p of PAGES) {
      await page.goto(BASE + p, { waitUntil: "networkidle" });
      if (p === "/demo") await page.waitForSelector("[data-testid=maple-demo]");
      const found = await page.evaluate(() => {
        const clone = document.documentElement.cloneNode(true);
        const kept = [];
        clone.querySelectorAll("[data-fictional]").forEach((f) => {
          f.querySelectorAll("[data-site-prices]").forEach((s) => kept.push(s.textContent));
          f.remove();
        });
        clone.querySelectorAll("script:not([type='application/ld+json'])").forEach((s) => s.remove());
        const metas = [...document.querySelectorAll("meta[content]")].map((m) => m.getAttribute("content"));
        const text = [clone.textContent, ...kept, ...metas, document.title].join("\n");
        return [...text.matchAll(/\$\s?\d{1,3}(?:,\d{3})*(?:\.\d+)?/g)].map((m) => m[0].replace(/\s/g, ""));
      });
      const bad = found.filter((a) => !ALLOWED.has(a));
      R.prices.push({ page: p, amounts: found.length, unique: [...new Set(found)], notFromOffers: [...new Set(bad)] });
    }
    await ctx.close();
  }

  /* ---------- 3: links (internal crawl + anchors; external checked once) ---------- */
  {
    const ctx = await newContext(browser, { w: 1440, h: 900 });
    const page = await ctx.newPage();
    const internal = new Map();
    const external = new Map();
    for (const p of PAGES) {
      await page.goto(BASE + p, { waitUntil: "domcontentloaded" });
      const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
      for (const h of hrefs) {
        if (h.startsWith("mailto:") || h.startsWith("tel:")) external.set(h, p);
        else if (/^https?:/.test(h)) external.set(h, p);
        else internal.set(h.startsWith("#") ? p.split("?")[0] + h : h, p);
      }
    }
    const res = [];
    for (const [h, from] of internal) {
      const [pathq, hash] = h.split("#");
      const r = await page.goto(BASE + (pathq || "/"), { waitUntil: "domcontentloaded" });
      let anchorOk = true;
      if (hash) anchorOk = await page.evaluate((id) => !!document.getElementById(id), hash);
      res.push({ href: h, from, status: r.status(), anchorOk });
    }
    const ext = [];
    for (const [h, from] of external) {
      if (h.startsWith("mailto:")) {
        ext.push({ href: h, from, status: "mailto (not fetched)" });
        continue;
      }
      try {
        const r = await fetch(h, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 (link check)" } });
        ext.push({ href: h, from, status: r.status });
      } catch (e) {
        ext.push({ href: h, from, status: `error: ${e.message}` });
      }
    }
    R.links = { internalChecked: res.length, broken: res.filter((x) => x.status >= 400 || !x.anchorOk), internal: res, external: ext };
    for (const f of ["/robots.txt", "/sitemap.xml"]) {
      const r = await page.request.get(BASE + f);
      R.regression[f] = { status: r.status(), body: (await r.text()).slice(0, 2500) };
    }
    const locs = [...R.regression["/sitemap.xml"].body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const locStatus = [];
    for (const u of locs) {
      const r = await page.request.get(BASE + new URL(u).pathname);
      locStatus.push({ url: u, status: r.status() });
    }
    R.regression.sitemapUrls = locStatus;
    await ctx.close();
  }

  /* ---------- 5: contact form ---------- */
  {
    const ctx = await newContext(browser, { w: 1440, h: 900 });
    const page = await ctx.newPage();
    const read = () =>
      page.evaluate(() => {
        const sel = document.querySelector("select[name=package]");
        const sum = document.querySelector("[data-testid=picked-summary]");
        return {
          selected: sel.value,
          shown: sel.previousElementSibling.textContent.trim(),
          slug: document.querySelector("input[name=service]").value,
          price: document.querySelector("[data-testid=service-price]")?.textContent.trim() || "",
          description: document.querySelector("[data-testid=service-description]")?.textContent.trim() || "",
          summary: sum && !sum.classList.contains("hidden") ? sum.textContent.trim() : "",
          placeholder: document.querySelector("textarea[name=message]").placeholder,
        };
      });
    const byLabel = Object.fromEntries(snap.options.map((o) => [o.slug, o]));
    const params = [...snap.options.map((o) => o.slug), "rebuild", "new-site", "website-plan", "bogus", ""];
    const preselect = [];
    for (const v of params) {
      await page.goto(BASE + "/contact" + (v ? `?service=${v}` : ""), { waitUntil: "networkidle" });
      const s = await read();
      const alias = snap.aliases[v];
      const exp = alias ? { ...byLabel[alias.slug], placeholder: alias.placeholder } : byLabel[v];
      const ok = exp
        ? s.selected === exp.label && s.slug === exp.slug && s.summary.includes(exp.name) && s.placeholder === exp.placeholder && (!exp.priceLine || s.price.includes(exp.priceLine))
        : s.selected === "" && s.slug === "" && s.shown === "Choose one" && !s.summary;
      preselect.push({ param: v || "(none)", ok, ...s });
    }
    await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
    const changes = [];
    for (const o of snap.options) {
      await page.selectOption("select[name=package]", { label: o.label });
      const s = await read();
      const ok = s.slug === o.slug && s.summary.includes(o.name) && s.placeholder === o.placeholder && !!s.description && (!o.priceLine || s.price.includes(o.priceLine));
      changes.push({ option: o.label, ok, ...s });
    }
    // Validation and a stubbed submission (never reaches FormSubmit).
    const posts = [];
    await ctx.route(/formsubmit\.co/, async (route) => {
      posts.push({ url: route.request().url(), method: route.request().method(), body: route.request().postData() });
      await route.fulfill({ status: 303, headers: { location: BASE + "/thanks" } });
    });
    await page.goto(BASE + "/contact?service=estimate-requests", { waitUntil: "networkidle" });
    await page.click("button[type=submit]");
    await page.waitForTimeout(300);
    const invalid = await page.$$eval("form :invalid", (els) => els.filter((e) => e.name).map((e) => `${e.name}: ${e.validationMessage}`));
    const emptyBlocked = posts.length === 0;
    await page.fill("[name=name]", "Test Person");
    await page.fill("[name=business_name]", "Test Contracting");
    await page.fill("[name=email]", "not-an-email");
    await page.fill("[name=message]", "Stubbed test only");
    await page.click("button[type=submit]");
    await page.waitForTimeout(300);
    const badEmailBlocked = posts.length === 0;
    await page.fill("[name=email]", "test@example.com");
    await Promise.all([page.waitForURL(/\/thanks/, { timeout: 8000 }).catch(() => {}), page.click("button[type=submit]")]);
    const form = await page.goto(BASE + "/contact", { waitUntil: "networkidle" }).then(() =>
      page.$eval("form", (f) => ({ action: f.action, method: f.method, hidden: Object.fromEntries([...f.querySelectorAll("input[type=hidden]")].map((i) => [i.name, i.value])), fields: [...f.elements].filter((e) => e.name && e.type !== "hidden").map((e) => `${e.name}${e.required ? "*" : ""}`) })),
    );
    await page.goto(BASE + "/audit", { waitUntil: "networkidle" });
    const auditForm = await page.$eval("form", (f) => ({ action: f.action, method: f.method, hidden: Object.fromEntries([...f.querySelectorAll("input[type=hidden]")].map((i) => [i.name, i.value])), fields: [...f.elements].filter((e) => e.name && e.type !== "hidden").map((e) => `${e.name}${e.required ? "*" : ""}`) }));
    R.contact = {
      preselect,
      dropdown: changes,
      validation: { emptySubmitBlocked: emptyBlocked, invalidFields: invalid, badEmailBlocked },
      stubbedSubmission: posts.map((p) => ({ url: p.url, method: p.method, body: decodeURIComponent((p.body || "").replace(/\+/g, " ")) })),
      contactForm: form,
      auditForm,
    };
    await ctx.close();
  }

  /* ---------- 6: demo flows, with a network watch ---------- */
  for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
    const ctx = await newContext(browser, vp);
    const page = await ctx.newPage();
    await page.goto(BASE + "/demo", { waitUntil: "networkidle" });
    await page.waitForSelector("[data-testid=maple-demo]");
    await settle(page); // let link prefetches finish before the watch starts
    await page.waitForLoadState("networkidle");
    const requests = [];
    page.on("request", (r) => requests.push(`${r.method()} ${r.url()}`));
    const steps = [];
    const step = async (name, fn) => {
      try {
        const detail = await fn();
        steps.push({ step: name, ok: detail.ok, detail });
      } catch (e) {
        steps.push({ step: name, ok: false, detail: String(e).slice(0, 300) });
      }
    };
    const tab = (n) => page.getByRole("tab", { name: n }).click();
    const rows = async () => {
      await tab(/Requests and alerts/);
      return page.locator(vp.w >= 768 ? "[data-testid=register-row]" : "[data-testid=register-cards] > li").count();
    };
    await step("starts with the five sample requests", async () => ({ ok: (await rows()) === 5, rows: await rows() }));
    await step("submit a request (made-up details)", async () => {
      await tab(/Enquiry form/);
      await page.getByRole("button", { name: "Send request" }).click();
      const msg = await page.locator("#demo-panel-enquiry p.status-ok").first().textContent();
      return { ok: /request was received/.test(msg) && (await rows()) === 6, message: msg };
    });
    await step("repeat request merges", async () => {
      await tab(/Enquiry form/);
      await page.getByRole("button", { name: /Repeat from Priya/ }).click();
      const n = await rows();
      const repeats = vp.w >= 768 ? await page.locator("[data-testid=register-row]").first().locator("td").nth(3).textContent() : "see card";
      const urgent = await page.locator("[data-testid=demo-outbox] li", { hasText: "URGENT repeat enquiry" }).count();
      return { ok: n === 6 && urgent === 1, rows: n, priyaRepeats: repeats, urgentAlerts: urgent };
    });
    // OpsCore v0.2.1: same service + a new message merges AND alerts the owner; the identical message again does not.
    await step("repeat with a new message alerts the owner; identical repeat does not", async () => {
      const repeatAlerts = () => page.locator("[data-testid=demo-outbox] li", { hasText: "Repeat enquiry (possible new job)" }).count();
      await tab(/Enquiry form/);
      await page.getByRole("button", { name: /Priya again, same service, new message/ }).click();
      const first = await repeatAlerts();
      const rows1 = await rows();
      await tab(/Enquiry form/);
      await page.getByRole("button", { name: /Priya again, same service, new message/ }).click();
      const second = await repeatAlerts();
      const rows2 = await rows();
      return { ok: first === 1 && second === 1 && rows1 === 6 && rows2 === 6, first, second, rows1, rows2 };
    });
    await step("returning customer, different service: new linked row", async () => {
      await tab(/Enquiry form/);
      await page.getByRole("button", { name: /Priya again, a different job/ }).click();
      const n = await rows();
      const sel = vp.w >= 768 ? "[data-testid=register-row]" : "[data-testid=register-cards] > li";
      const tagged = await page.locator(sel, { hasText: "Returning customer, new job" }).count();
      const alerts = await page.locator("[data-testid=demo-outbox] li", { hasText: "(returning customer, new job)" }).count();
      return { ok: n === 7 && tagged === 1 && alerts === 1, rows: n, tagged, alerts };
    });
    await step("invalid requests rejected", async () => {
      await tab(/Enquiry form/);
      await page.getByRole("button", { name: /Missing contact details/ }).click();
      await page.getByRole("button", { name: /Outside the service area/ }).click();
      const n = await rows();
      const rejected = await page.locator("[data-testid=demo-rejected] li").count();
      return { ok: n === 7 && rejected === 2, rows: n, rejected };
    });
    await step("book a visit", async () => {
      await tab(/Scheduling/);
      await page.locator("[data-testid=demo-slots] button:not([aria-disabled])").first().click();
      const confirmed = await page.locator("[data-testid=demo-bookings] li", { hasText: "Confirmed" }).count();
      return { ok: confirmed === 1, confirmed };
    });
    await step("double-booking blocked", async () => {
      await page.getByRole("button", { name: "Try to double-book the first visit" }).click();
      const msg = await page.locator("#demo-panel-schedule p.status-bad").first().textContent();
      return { ok: /Blocked/.test(msg) && (await page.locator("[data-testid=demo-bookings] li").count()) === 1, message: msg };
    });
    await step("cancel frees the slot", async () => {
      const takenBefore = await page.locator("[data-testid=demo-slots] button[aria-disabled]").count();
      await page.getByRole("button", { name: /Cancel the visit/ }).click();
      const takenAfter = await page.locator("[data-testid=demo-slots] button[aria-disabled]").count();
      const cancelled = await page.locator("[data-testid=demo-bookings] li", { hasText: "Cancelled" }).count();
      return { ok: cancelled === 1 && takenAfter < takenBefore, takenBefore, takenAfter };
    });
    await step("create a quote", async () => {
      await tab(/Quotes/);
      await page.getByRole("button", { name: "Record as sent" }).click();
      const status = await page.locator("[data-testid=quote-row]").first().textContent();
      return { ok: /Sent/.test(status) && /none yet/.test(status), row: status.trim() };
    });
    await step("+3 days: day-3 owner reminder appears", async () => {
      await page.getByRole("button", { name: "+3 days" }).click();
      const rem = await page.locator("[data-testid=quote-reminders]").first().textContent();
      const outbox = await page.evaluate(() => document.querySelectorAll("[data-testid=demo-outbox] li").length);
      return { ok: rem.includes("day 3"), reminders: rem, outboxItemsRendered: outbox };
    });
    await step("accepted quote stops reminders", async () => {
      await page.getByRole("button", { name: "Mark accepted" }).click();
      await page.getByRole("button", { name: "+3 days" }).click();
      await page.getByRole("button", { name: "+1 day" }).click();
      const rem = await page.locator("[data-testid=quote-reminders]").first().textContent();
      const check = await page.locator("[data-testid=demo-last-check]").textContent();
      return { ok: rem.trim() === "day 3" && /quote accepted/.test(check), reminders: rem, lastCheck: check };
    });
    await step("sync: works, then stops when access is revoked", async () => {
      await tab(/Sync and health/);
      await page.getByRole("button", { name: "Run sync" }).click();
      const ok1 = await page.locator("#demo-panel-health p[class*=status-]").first().textContent();
      // Only changed requests are pushed, so change one before revoking access.
      await tab(/Requests and alerts/);
      await page.locator(vp.w >= 768 ? "[data-testid=register-row] select" : "[data-testid=register-cards] select").nth(1).selectOption("Contacted");
      await tab(/Sync and health/);
      await page.selectOption("#d-sync-mode", "PERMISSION");
      await page.getByRole("button", { name: "Run sync" }).click();
      const ok2 = await page.locator("#demo-panel-health p[class*=status-]").first().textContent();
      return { ok: /Pushed [1-9]/.test(ok1) && /Stopped/.test(ok2), working: ok1, revoked: ok2 };
    });
    await step("simulated outage shows red, then recovers", async () => {
      await page.getByRole("button", { name: "Reset" }).click();
      await tab(/Sync and health/);
      const before = await page.locator("[data-testid=demo-health]").textContent();
      await page.selectOption("#d-mail-mode", "PERMISSION");
      await page.getByRole("button", { name: "Send a test alert" }).click();
      const red = await page.locator("[data-testid=demo-health]").textContent();
      await page.selectOption("#d-mail-mode", "ok");
      await page.getByRole("button", { name: "Retry failed alerts" }).click();
      const after = await page.locator("[data-testid=demo-health]").textContent();
      return { ok: /^Green/.test(before.trim()) && /^Red/.test(red.trim()) && /^Green/.test(after.trim()), before, red, after };
    });
    await step("zero network requests during the demo", async () => {
      // Next.js prefetches linked pages (GET /_next/static/... code and GET /page?_rsc=... content) when a
      // link scrolls into view. That carries no demo data, so it's listed separately; anything else
      // (a fetch, a POST, another host) fails the step.
      const codePrefetch = requests.filter(
        (r) => r.startsWith(`GET ${BASE}/_next/static/`) || (r.startsWith(`GET ${BASE}/`) && /[?&]_rsc=/.test(r)),
      );
      const other = requests.filter((r) => !codePrefetch.includes(r));
      return { ok: other.length === 0, requests: other, codePrefetch };
    });
    R.demo[`w${vp.w}`] = steps;
    await ctx.close();
  }

  /* ---------- 2b: keyboard-only runs ---------- */
  {
    const ctx = await newContext(browser, { w: 1440, h: 900 });
    const page = await ctx.newPage();
    // Nav
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const nav = [];
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      nav.push(await focusInfo(page));
    }
    // Contact form
    await page.goto(BASE + "/contact?service=fix", { waitUntil: "networkidle" });
    const form = [];
    for (let i = 0; i < 40 && form.length < 9; i++) {
      await page.keyboard.press("Tab");
      const f = await focusInfo(page);
      if (f && (form.length || f.name === "package" || f.tag === "select")) form.push(f);
    }
    // Demo: reach the tabs, arrow to Scheduling, book a slot with Enter
    await page.goto(BASE + "/demo", { waitUntil: "networkidle" });
    await page.waitForSelector("[data-testid=maple-demo]");
    const demo = [];
    let onTab = false;
    for (let i = 0; i < 40 && !onTab; i++) {
      await page.keyboard.press("Tab");
      const f = await focusInfo(page);
      demo.push(f);
      onTab = f && f.role === "tab";
    }
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    const selectedTab = await page.evaluate(() => document.activeElement.textContent.trim());
    let onSlot = false;
    for (let i = 0; i < 12 && !onSlot; i++) {
      await page.keyboard.press("Tab");
      onSlot = await page.evaluate(() => document.activeElement.classList.contains("demo-slot"));
    }
    const slotFocus = await focusInfo(page);
    await page.keyboard.press("Enter");
    const booked = await page.locator("[data-testid=demo-bookings] li", { hasText: "Confirmed" }).count();
    // Mobile menu by keyboard
    const m = await newContext(browser, { w: 390, h: 844 });
    const mp = await m.newPage();
    await mp.goto(BASE + "/", { waitUntil: "networkidle" });
    let onMenu = false;
    for (let i = 0; i < 6 && !onMenu; i++) {
      await mp.keyboard.press("Tab");
      onMenu = await mp.evaluate(() => document.activeElement.getAttribute("aria-controls") === "mobile-menu");
    }
    await mp.keyboard.press("Enter");
    const menuOpen = await mp.locator("#mobile-menu").isVisible();
    await mp.keyboard.press("Tab");
    const firstMenuLink = await focusInfo(mp);
    await m.close();
    R.keyboard = {
      nav,
      navAllVisible: nav.filter(Boolean).every((f) => f.visible),
      contactForm: form,
      contactAllVisible: form.every((f) => f.visible),
      demo: { reachedTabs: onTab, tabsPressedTo: selectedTab, slotFocus, bookedWithEnter: booked === 1, tabFocusVisible: demo.filter(Boolean).every((f) => f.visible) },
      mobileMenu: { opensWithEnter: menuOpen, firstLink: firstMenuLink },
    };
    await ctx.close();
  }

  await browser.close();
  fs.writeFileSync(RESULTS, JSON.stringify(R, null, 2));

  const sum = {
    pages: R.pages.length,
    overflowFailures: R.pages.filter((x) => !x.noHorizontalScroll).map((x) => `${x.page}@${x.width}`),
    consoleErrors: R.pages.filter((x) => x.consoleErrors.length).map((x) => `${x.page}@${x.width}: ${x.consoleErrors[0]}`),
    axeSerious: R.axe.filter((x) => x.serious.length).map((x) => `${x.page}@${x.width}: ${x.serious.map((v) => `${v.id}(${v.nodes})`).join(", ")}`),
    axeOther: R.axe.filter((x) => x.other.length).map((x) => `${x.page}@${x.width}: ${x.other.map((v) => `${v.id}/${v.impact}`).join(", ")}`),
    brokenLinks: R.links.broken,
    externalLinks: R.links.external,
    pricesNotFromOffers: R.prices.filter((x) => x.notFromOffers.length),
    contactPreselectFailures: R.contact.preselect.filter((x) => !x.ok).map((x) => x.param),
    dropdownFailures: R.contact.dropdown.filter((x) => !x.ok).map((x) => x.option),
    validation: R.contact.validation,
    stubbedSubmission: R.contact.stubbedSubmission,
    demo: Object.fromEntries(Object.entries(R.demo).map(([k, v]) => [k, v.map((s) => `${s.ok ? "PASS" : "FAIL"} ${s.step}`)])),
    keyboard: { navAllVisible: R.keyboard.navAllVisible, contactAllVisible: R.keyboard.contactAllVisible, demo: R.keyboard.demo, mobileMenu: R.keyboard.mobileMenu },
    sitemap: R.regression.sitemapUrls,
  };
  console.log(JSON.stringify(sum, null, 1));
})();
