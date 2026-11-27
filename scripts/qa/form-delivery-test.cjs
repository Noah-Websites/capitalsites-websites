/**
 * Contact and audit form delivery test. See docs/staging/form-delivery-test.md.
 *
 * Default (dry run): fills both forms with TEST data, catches the POST to FormSubmit inside the
 * browser and blocks it, then prints exactly what would have been sent. Nothing leaves the machine.
 *
 *   NODE_PATH=<playwright node_modules> node scripts/qa/form-delivery-test.cjs <base-url>
 *
 * Real send (only with the owner's approval): add --send. It submits each form once, lets the
 * browser follow FormSubmit's redirect, and prints the send time so the email's arrival can be timed.
 *
 *   NODE_PATH=<playwright node_modules> node scripts/qa/form-delivery-test.cjs <base-url> --send
 */
const { chromium } = require("playwright");

const BASE = (process.argv[2] || "").replace(/\/$/, "");
const SEND = process.argv.includes("--send");
if (!/^https?:\/\//.test(BASE)) {
  console.error("Usage: node scripts/qa/form-delivery-test.cjs <base-url> [--send]");
  process.exit(2);
}

const stamp = new Date().toISOString().replace(/\.\d+Z$/, "Z");
const TEST = {
  name: "TEST - CapitalSites delivery check",
  business: "TEST (please ignore)",
  email: "delivery-test@example.com",
  message: `TEST ONLY: end-to-end delivery check of the website contact form, sent ${stamp} from ${BASE}. No action needed.`,
};

async function run(page, label, url, fill) {
  await page.goto(url, { waitUntil: "load" });
  await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
  await fill(page);
  let posted = null;
  if (!SEND) {
    await page.route("https://formsubmit.co/**", (route) => {
      posted = { url: route.request().url(), body: route.request().postData() };
      // Answer locally instead of sending: the request never reaches FormSubmit.
      return route.fulfill({ status: 200, contentType: "text/html", body: "<p>Dry run: not sent.</p>" });
    });
  }
  const sentAt = new Date();
  const nav = page.waitForURL((u) => !u.href.startsWith(url), { timeout: SEND ? 60000 : 5000 }).catch(() => null);
  await page.locator("form button[type=submit]").first().click();
  await nav;
  if (SEND) {
    console.log(JSON.stringify({ form: label, sent: true, sentAtUtc: sentAt.toISOString(), landedOn: page.url() }, null, 2));
  } else {
    await page.unroute("https://formsubmit.co/**");
    const fields = posted ? Object.fromEntries(new URLSearchParams(posted.body)) : null;
    console.log(JSON.stringify({ form: label, sent: false, blockedPostTo: posted && posted.url, fields }, null, 2));
  }
}

(async () => {
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

  await run(page, "contact (Website Fix)", `${BASE}/contact?service=fix`, async (p) => {
    await p.fill("#name", TEST.name);
    await p.fill("#business", TEST.business);
    await p.fill("#email", TEST.email);
    await p.fill("#message", TEST.message);
  });

  await run(page, "audit", `${BASE}/audit`, async (p) => {
    await p.fill("#name", TEST.name);
    await p.fill("#email", TEST.email);
    await p.fill("#website", "https://www.capitalsites.ca");
  });

  await browser.close();
  if (!SEND) console.log("\nDry run only: both POSTs were blocked in the browser. Nothing was sent.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
