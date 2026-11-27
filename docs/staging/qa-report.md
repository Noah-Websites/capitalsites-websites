# QA report: `ops-positioning-2026-11` (staging)

Run on 2026-11-27 against a local production build (`next build` + `next start`) of this branch. The Vercel preview is behind Vercel's login, so the automated crawl ran on the identical local build; the preview's own build status is checked separately.

Raw results: `docs/staging/qa-results.json`. Scripts: `scripts/check-prices.mjs`, `scripts/qa/site-qa.cjs`, `scripts/qa/offers-snapshot.mjs`.
Nothing was submitted to FormSubmit: every request to `formsubmit.co` was intercepted and answered locally.

## Summary

| # | Check | Result | Numbers |
|---|---|---|---|
| 1 | Screenshots, horizontal scroll, console errors | PASS | 14 pages × 2 widths = 28 captures; 0 pages wider than the viewport; 0 console errors |
| 2 | Accessibility (axe-core, keyboard, focus, contrast) | PASS | 0 serious or critical axe violations on 28 page loads; keyboard runs pass on nav, contact form, demo and mobile menu |
| 3 | Links | PASS | 39 internal links and anchors, 0 broken; 1 external link (Calendly) returns 200; 1 mailto listed |
| 4 | Pricing consistency | PASS | 96 dollar amounts in 9 built pages, all from `offers.ts`; 0 hard-coded prices in `src/`; rendered pages: 0 amounts outside `offers.ts` |
| 5 | Contact form | PASS | 14/14 `?service=` values preselect correctly; 9/9 dropdown changes update price, description, summary and placeholder; empty and bad-email submits blocked; stubbed submit carries the `service` slug and lands on `/thanks` |
| 6 | Demo flows and network | PASS | 13/13 steps at 1440 and 13/13 at 390; 0 network requests during the demo |
| 7 | Lighthouse (mobile) | PASS | Home 97 / 100 / 100 / 100; Pricing 99 / 100 / 100 / 100; Demo 98 / 100 / 100 / 100 (Performance / Accessibility / Best practices / SEO) |
| 8 | Copy audit | PASS with notes | 0 banned claims on CapitalSites' own pages; remaining matches listed and justified below |
| 9 | Regression | PASS | `/contact?service=fix` preselects Website Fix; all existing URLs 200; sitemap 12 URLs all 200; robots.txt valid; build and lint pass |

## 1. Screenshots, horizontal scroll, console errors

- Pages: `/`, `/services`, `/pricing`, `/demo`, `/about`, `/contact`, `/contact?service=fix`, `/privacy`, `/audit`, `/portfolio`, `/portfolio/fade-and-co`, `/portfolio/ember-kitchen`, `/portfolio/maison-noir`, `/thanks`.
- Widths: 1440×900 and 390×844, full page, reduced motion (so scroll reveals are settled).
- Before: `docs/staging/before/<page>-<width>.jpg` (22 files, taken from `main` before any change). After: `docs/staging/after/<page>-<width>.jpg` (28 files). Both folders are kept on this machine and are not committed (about 14 MB); everything else in `docs/staging/` is.
- Horizontal scroll: `document.documentElement.scrollWidth` never exceeded the viewport (0 of 28).
- Console errors: 0 of 28 page loads. Fixed on the way: two concept-demo photos that Unsplash no longer serves (404s on Fade & Co. and Ember Kitchen) were replaced, and the site now has a favicon (browsers request `/favicon.ico`; it was a 404 on every page and is the only item Lighthouse docked on best practices before the fix).

## 2. Accessibility

- axe-core 4.10 with WCAG 2.0/2.1/2.2 A and AA rules, every page at both widths: 0 serious, 0 critical, 0 other violations.
- Fixed on the way (concept demo pages, which were already live): low-contrast text and buttons on Ember Kitchen and Fade & Co. (white on orange and white at 30–40% opacity), and missing labels on their booking-form selects and date field.
- Keyboard only:
  - Nav: Tab reaches the logo, Home, Services, Pricing, Demo, About and Contact in order, each with a visible focus ring (white on the red bar).
  - Contact form: Tab order runs service, name, business, email, website, message, send, privacy link; every stop shows a visible focus ring (the service dropdown's ring is drawn on its visible field).
  - Demo: Tab reaches the view tabs; arrow keys switch views (Home/End too); Tab moves into the active view; a time slot books with Enter.
  - Mobile menu (390): the menu button opens with Enter; the first link takes focus with a visible ring.
- Contrast: text pairs stay within the documented system (ink-2 #6E6E73 is 5.07:1 on white and 4.66:1 on snow; white on red #C8102E is 5.88:1). The demo's status colours (used only in the demo, always with words): green #1E7B3C on #E6F4EA 4.7:1, amber #8A5A00 on #FBF0DC 5.3:1, red #B3261E on #FBE9E7 5.6:1.

## 3. Links

- Crawl of every link on all 14 pages: 39 unique internal URLs and anchors (`/services#websites`, `#operations`, `#care`, `#website-fix`, `/pricing#faq` and others): all 200, all anchors present.
- External links, checked once: `https://calendly.com/capitalsitesottawa/website-consult` 200. `mailto:capitalsitesottawa@gmail.com` listed, not fetched.

## 4. Pricing consistency

- `src/data/offers.ts` is the only place prices live. Allowed amounts derived from it: $149, $0, $99, $79, $1,188 (12 × $99, shown as the Website Plan's first-year total), $2,500, $129, $399, $299, $199, $799.
- `node scripts/check-prices.mjs` (after `next build`): scans the built HTML of every CapitalSites page, including metadata, and greps `src/` for hard-coded amounts. Result: 96 amounts in 9 pages, all allowed; 0 hard-coded. It fails the run on anything else (it did, correctly, on a first draft of its own pattern).
- In the browser (`site-qa.cjs`): every page including the demos, with fictional regions (`data-fictional`: menu items, products, the demo's made-up quote amounts) set aside and the CapitalSites banners inside them kept. Result: 0 amounts outside `offers.ts`.
- Page titles, descriptions and Open Graph tags that mention prices build them from `offers.ts`.

## 5. Contact form

- Form config, unchanged: `POST https://formsubmit.co/capitalsitesottawa@gmail.com`; hidden `_captcha=false`, `_subject`, `_template=table`, `_next=https://www.capitalsites.ca/thanks`; fields `package*`, `name*`, `business_name*`, `email*`, `current_website`, `message*`. New hidden field: `service` (the selected slug, for counting enquiries per product). `package` now submits the readable option label.
- `?service=` preselects (14/14): `fix`, `plan`, `premium`, `estimate-requests`, `quote-follow-up`, `booking`, `integration`, `care`, `not-sure`, plus the older `rebuild`, `new-site` and `website-plan` (all three select Website Plan), plus an invalid value and none (both show "Choose one").
- Changing the dropdown (9/9 options): price line, short description, "You picked" summary, message placeholder and hidden slug all update at once.
- Validation: empty submit blocked by the browser (name, business name, email and message flagged); a malformed email blocked. A valid stubbed submit sent `service=estimate-requests` and `package=Estimate Request Setup (founding pilot, register interest)` and landed on `/thanks`.
- Audit form: same action and hidden fields (`_next` included); fields `name*`, `email*`, `website_url*`.

## 6. Demo (`/demo`)

Run at 1440 and 390; every step passed at both widths:

1. Starts with the five sample requests.
2. Submit a request with made-up details: new row, owner alert queued and delivered to the on-page outbox.
3. Repeat request merges into the existing row (no second row, no second alert).
4. Invalid requests rejected (missing contact details; postal code outside the service area).
5. Book a visit.
6. Double-booking blocked.
7. Cancel frees the slot.
8. Create a quote (recorded as sent).
9. Clock +3 days: day-3 owner reminder appears.
10. Accepted quote stops reminders (no day-7 reminder after +4 more days; the check lists "quote accepted").
11. Sync to the stand-in second app works, then stops when access is revoked.
12. Simulated outage: health goes Red, then back to Green after retrying.
13. Network: 0 requests from the page while all of the above ran.

How it's kept safe: client-only component, lazy-loaded with `next/dynamic` (`ssr: false`), all state in memory, no `fetch`/XHR, no storage, no form `action`, inputs have no `name` attributes, and every submit handler calls `preventDefault` first. `src/lib/ops-core.js` is byte-for-byte the supplied file (SHA-256 `e0bf2948ef68488a…`).

## 7. Lighthouse (mobile, simulated throttling, local production build)

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home | 97 | 100 | 100 | 100 | 0.8 s | 2.5 s | 20 ms | 0 |
| Pricing | 99 | 100 | 100 | 100 | 0.8 s | 2.3 s | 10 ms | 0 |
| Demo | 98 | 100 | 100 | 100 | 0.8 s | 2.4 s | 10 ms | 0 |

Targets (Performance 85+, Accessibility 95+, SEO 95+) met. The first run scored 96 on best practices on all three pages, entirely from the missing favicon's 404; after adding the icon it is 100. Scores on Vercel's CDN will differ slightly from a local server.

## 8. Copy audit

Searched `src/` and the built pages for: guarantee, unlimited, trusted by, clients love, #1, AI-powered, 24/7, $1,200, $1,500.

| Phrase | Where | Why it stays |
|---|---|---|
| unlimited | Digital Care description (`offers.ts`) and the Pricing FAQ | Negation the brief requires: Digital Care is "not unlimited and not 24/7" |
| 24/7 | Same two places | Same negation |
| guarantee / guaranteed | Fade & Co. and Ember Kitchen concept pages ("guaranteed seating", "guarantee your spot") | Fictional restaurant and barbershop copy on labelled concept sites, not a CapitalSites claim |
| #1 | Only inside CSS colour values (`#111…`) in the concept pages | Not text |
| trusted by, clients love, AI-powered, $1,200, $1,500 | None | — |

Also checked:
- "AI" appears once on the site (About: "We use modern tools, including AI, to build and test faster. You get a normal system you own.").
- "free" is used only for the free website audit, never for the website offers.
- The Ember Kitchen concept page shows "4.8★ Google Rating" and "2K+ Monthly Guests". They're figures for the fictional restaurant on a labelled concept page, pre-existing, and not CapitalSites claims.

## 9. Regression

- `/contact?service=fix` preselects Website Fix and shows $149 one-time (used in outreach emails and the Instagram bio).
- Existing URLs all 200: `/`, `/pricing`, `/services`, `/portfolio`, `/portfolio/fade-and-co`, `/portfolio/ember-kitchen`, `/portfolio/maison-noir`, `/audit`, `/contact`, `/thanks`. No route was renamed, so no 301s were needed.
- New: `/demo`, `/about`, `/privacy`.
- `sitemap.xml`: 12 URLs (all public pages; `/thanks` excluded), each 200. `robots.txt`: allow all, disallow `/thanks`, sitemap linked (unchanged).
- `next build`: passes (21 static routes, including the new favicon and app icons). `next lint`: no warnings or errors. `tsc --noEmit`: clean.
- Design detector (`impeccable detect`): no blocking findings; advisories only (type sizes on the documented ramp, the demo-only status colours, pre-existing device-frame radii, and the Maison Noir concept page's purple text).

## Could not do or verify

- **Crawling the Vercel preview itself:** it requires your Vercel login, and changing protection would mean changing Vercel settings (out of bounds). All checks ran on the identical local production build; the preview's build status was checked through GitHub.
- **Third-party integrations:** none are claimed or verified. The demo's sync uses an in-memory stand-in.
- **A real form submission:** not sent, per the brief.
- **Spam protection:** the forms send `_captcha=false` and have no honeypot, so FormSubmit's own filtering is the only spam protection today. Unchanged; adding FormSubmit's `_honey` field is a one-line option.
