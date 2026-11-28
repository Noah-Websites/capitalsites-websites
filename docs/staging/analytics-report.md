# Google Analytics 4: implementation report (2026-11-27)

Measurement ID `G-C5722KERH0`. **Approved by the owner on 2026-11-27 and deployed** as one Netlify production
deploy (15 credits) from `netlify-migration-prep`, together with the HSTS fix and the migration docs. Before the
deploy, the owner completed the pre-deploy GA4 privacy settings (manual steps 1–5 below), created the Gmail filter
for FormSubmit, and got the sitemap processed in Search Console (12 pages). The Vercel fallback is untouched.

## What was built

| Requirement | Implementation |
|---|---|
| GA4 on every production page | `src/components/Analytics.tsx` in the root layout loads gtag.js once, only after consent. Covers the concept pages too |
| No duplicate tags or page views | One gtag.js and one `config` per page load. In-app navigation is counted by GA4's own history-change page view (enhanced measurement), so there are no manual page_view calls. Tested: exactly one page_view per page |
| Exclude development and previews | Runs only when the hostname is `www.capitalsites.ca` (`src/lib/analytics.ts`). Localhost, `capitalsites-websites.netlify.app`, deploy previews, branch deploys and Vercel previews never show the banner or load Google. Tests widen the list at build time with `NEXT_PUBLIC_ANALYTICS_HOSTS`; the shipped bundle contains only www |
| Architecture | Every route still prerenders as static. The demo, forms and FormSubmit fields are unchanged |
| Consent | Opt-in banner: "Can we use Google Analytics?" with equal **Allow** / **Don't allow** buttons. Nothing loads from Google and no cookies are set until Allow. The choice is stored in localStorage. **Cookie settings** (footer and privacy page) reopens it; Don't allow then deletes `_ga` cookies and stops sending |
| No advertising | Consent mode: `ad_storage`, `ad_user_data`, `ad_personalization` denied, `analytics_storage` granted. `allow_google_signals: false`, `allow_ad_personalization_signals: false` (hits carry `npa=1`). No Ads link, no remarketing |
| Cookie lifetime | 395 days, about 13 months (Google's default is 2 years). Note: gtag.js ignores `cookie_expires` passed only in `config`, so it is set with `gtag('set')` as well; verified |

### Events

| Event | Fires when | Parameters (no personal data) |
|---|---|---|
| `generate_lead` | A contact or audit form passed validation, FormSubmit accepted it and sent the visitor to `/thanks`. Counted once (a reload or a direct visit to /thanks doesn't count; an invalid or blocked form never counts) | `form_type` (`contact` / `audit`), `service` (slug such as `fix`, `estimate-requests`, `audit`) |
| `click_email` | Any `mailto:` link | `link_location` (`nav` / `page` / `footer`). The address itself is never sent |
| `cta_click` | A primary call to action: red or white pill buttons and the nav Contact button (`data-cta="primary"`). Ghost (secondary) buttons are not counted | `cta_text`, `cta_destination` (path, or `calendly.com` for external), `cta_location` |
| `demo_start` | First action inside the Maple demo (a button or tab) | `demo_name: maple_home_services` |
| `demo_complete` | Once all five demo sections have been opened | `demo_name`, `sections: 5` |
| `click_phone` | Wired for `tel:` links, but **the site has no phone number**, so it never fires today | `link_location` |
| `service_view` | **Not implemented: there are no individual service pages** (`/services` is one page). The `/services` and `/pricing` page views cover it. Can be added if service pages are created | — |

How leads are counted: when a valid form is sent, a note saying only which form it was is kept in that tab's
sessionStorage (30 minutes). FormSubmit's redirect to `/thanks` turns it into one `generate_lead`, provided the
visitor has allowed analytics (also if they allow it on /thanks). If they declined, the note is discarded.

### Small copy changes (needed for accuracy)
- Privacy policy, "Analytics and cookies": rewritten to describe GA4, consent, what is and isn't collected, cookies,
  IP handling, storage outside Canada, retention and that ad features are off. "The demo": adds that analytics
  records only that the demo was started or finished. "Questions" became "Questions and your choices": the owner is
  responsible for personal information; access, correction, deletion and withdrawal by email.
- Demo page notice: "Nothing here is sent anywhere." → "Nothing you type here is sent anywhere." (analytics may
  record that the demo was used). The product screenshots (images) still show the old line; cosmetic.
- Footer: a "Cookie settings" button under Studio.

### Consolidated into the same deploy (saves a deploy)
- `next.config.ts`: `Strict-Transport-Security: max-age=63072000` on pages, restoring the 2-year value Vercel
  sent (Netlify currently adds its own 1-year value to pages).
- Migration docs and QA scripts (no effect on the site).
- **Not included, by the owner's decision:** the netlify.app → www redirect. The test address stays unchanged until
  the migration has been stable for 48 hours; the redirect is then one more deploy (see `netlify-migration.md`, E).

## Test results (local production build, every Google Analytics hit intercepted, nothing sent to the property)

`scripts/qa/analytics-qa.cjs`: **33/33 passed** (`docs/staging/analytics/analytics-qa-results.json`).
- Before a choice: no request to any Google host, at 1440 and 390 wide. Banner inside the viewport, no page
  overflow, both buttons the same size, axe: 0 violations.
- Don't allow: no Google requests across pages and a form send, no `_ga` cookies, choice remembered, form still sends.
- Allow: one page_view for the landing page; in-app navigation one page_view per page, no duplicates; gtag.js once,
  config once; consent string `gcs=G101` (analytics granted, ads denied) on every hit; `npa=1` on every hit;
  `_ga` and `_ga_C5722KERH0` set for 395 days.
- Events: cta_click (primary only, ghost not counted), nav Contact, click_email (no address), demo_start once,
  demo_complete once after all sections, generate_lead for contact (`fix`) and audit, not on reload, direct
  visit or invalid send; undecided visitor who allows on /thanks is counted once.
- Withdraw: Cookie settings reopens the choice with focus on Allow and shows the current state; Don't allow removes
  the cookies and nothing more is sent.
- Personal data: no name, business name, email, message, `@` or `%40` in any hit.
- Other hostname (stands in for netlify.app and previews): no banner, no Google requests.
- Events seen in the run: page_view 18, user_engagement 5, scroll 5, cta_click 2, click_email 1, demo_start 1,
  demo_complete 1, generate_lead 2. No `form_start` / `form_submit`: the stream's form-interaction tracking
  appears to be off already. Keep it off (see manual steps).

Regression (`scripts/qa/site-qa.cjs`, visitor who has declined): 28 page loads, no console errors, no horizontal
overflow, axe 0 serious and 0 minor, 0 broken links, all prices from offers.ts, every `?service=` preselect and
dropdown option OK, validation OK, demo **30/30** steps at both widths (including zero network requests),
keyboard checks OK, sitemap 12. The contact form posts exactly the same fields to the same FormSubmit address.

Performance (phone width): CLS 0 and no console errors with and without consent. Added code before any choice:
the layout chunk grows from 2.1 KB to 4.4 KB gzipped (+2.3 KB, includes the banner). After Allow, Google's gtag.js
(about 184 KB compressed) loads asynchronously after the page, so it doesn't delay first paint.

## Privacy assessment (Canada). Not legal advice

- **PIPEDA** (federal; applies to CapitalSites' commercial activity in Ontario): analytics identifiers, IP-derived
  location and device data can be personal information. The Office of the Privacy Commissioner expects
  identified purposes, meaningful consent, limited collection and retention, openness and an accountable person.
  Implied consent with a clear opt-out may be acceptable for non-sensitive analytics, but opt-in is the stronger
  position, and it's what this build does.
- **Quebec Law 25** (very likely Gatineau visitors): technologies that can identify, locate or profile someone must
  be off by default, with the person informed (section 8.1). The banner keeps analytics off until Allow, with no
  pre-ticked choice. The privacy policy must be published in clear terms (done), with the title and contact of the
  person in charge of personal information (done: "the owner", by email). Before personal information leaves
  Quebec (Google may store data in the US), the business should assess whether it is adequately protected
  (section 17). **Recommended: a one-page written note on file** covering what GA4 collects, why, safeguards
  (consent, no ads features, no IP storage, 14-month maximum) and Google's terms.
- **CASL**: not affected (no commercial electronic messages).
- **Ontario**: no separate private-sector privacy law; PIPEDA applies.
- Google's terms require disclosing GA use and obtaining consent where the law requires it: done.
- Not addressed: a French version of the site or banner (relevant if Quebec consumers are a target market).

## Manual configuration (free; in Google Analytics unless noted)

**Before deploying** (done by the owner, 2026-11-27):
1. Admin → Data streams → the web stream → **Enhanced measurement**:
   - keep Page views on, with "Page changes based on browser history events" on (in-app page views depend on it);
   - turn **Form interactions off**. FormSubmit's form address contains an email address, and `generate_lead`
     already counts real sends.
2. Same stream page → **Redact data**: turn on **Email** redaction, as a safety net.
3. Admin → Data collection and modification → **Data retention**: 14 months (the default is 2 months). The privacy
   policy says "14 months at most", which is true either way.
4. Admin → Data collection and modification → Data collection: confirm **Google signals is off**. Don't link Google Ads; create no remarketing audiences.
5. Admin → Account settings → Account details → **Data sharing settings**: turn off the optional sharing settings.

**After deploying:**
6. Admin → Data display → Events: mark **generate_lead** as a **key event**.
7. Admin → Data display → Custom definitions → event-scoped custom dimensions: `form_type`, `service`, `cta_text`,
   `cta_destination`, `cta_location`, `link_location`, `demo_name`.
8. Verify with Tag Assistant (tagassistant.google.com) or Admin → Data display → DebugView. Open https://www.capitalsites.ca,
   click Allow, then:
   - browse two pages;
   - click a red button;
   - open all five demo sections.

   The events appear within seconds. A real `generate_lead` check needs one form send, which needs approval.
9. Optional: exclude your own visits by clicking Don't allow on your devices, or define internal traffic by IP and
   activate the filter.
10. Search Console: submit **https://www.capitalsites.ca/sitemap.xml**, and link Search Console to GA4 (Admin →
    Product links → Search Console links).

## Search Console and SEO (checked on production after the migration)
- Sitemap: https://www.capitalsites.ca/sitemap.xml, 12 URLs, all on www, all 200.
- robots.txt: allows everything except `/thanks`, and points to the sitemap.
- Canonicals: every page points to its www URL.
- Indexability: no `X-Robots-Tag` and no noindex meta on production pages except `/thanks`, by design.
- This change doesn't alter titles, descriptions, canonicals or the sitemap.

## Limitations
- Opt-in means visitors who ignore or decline the banner aren't counted, so numbers will run low. Ad blockers and
  browser tracking protection hide more. Safari keeps script-set cookies for 7 days, so returning-visitor counts
  are approximate.
- `generate_lead` means "FormSubmit accepted the form and sent the visitor to /thanks". It can't see what happens
  to the email afterwards; Gmail put the test messages in Spam.
- Event verification was done by intercepting the hits. DebugView needs your Google login, so it's step 8 after
  deploy.
- The 2-year HSTS on pages can only be confirmed on the real deploy.
- The privacy policy shows "Last updated 27 November 2026"; update the date if the deploy happens on a later day.
