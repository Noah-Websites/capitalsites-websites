# Production launch checklist: `ops-positioning-2026-11`

Do not run any of this until the owner approves the preview. Nothing here has been executed.

## 0. Before merging

- [ ] Owner reviews the Vercel preview for the branch (signed in to Vercel) on a phone and a computer.
- [ ] Owner settles the open items in `docs/staging/qa-report.md` → "Could not do or verify" and "Copy to confirm", or accepts them as they are.
- [ ] Decide whether `docs/staging/` stays in the repository after launch (it holds notes and QA results only; the screenshots are not committed).

## 1. Merge

On GitHub: open a pull request from `ops-positioning-2026-11` into `main`, check the Vercel preview link on it, then **Squash and merge**.

Or locally:

```bash
git checkout main && git pull --ff-only
git merge --squash ops-positioning-2026-11 && git commit
git push origin main
```

Vercel builds and deploys `main` to production automatically. Wait for the commit's Vercel status to read "Deployment has completed".

## 2. Redirect and URL check

No route was renamed, so there are no 301 redirects to add. Confirm every existing URL still answers 200:

- `/`, `/pricing`, `/services`, `/portfolio`, `/portfolio/fade-and-co`, `/portfolio/ember-kitchen`, `/portfolio/maison-noir`, `/audit`, `/contact`, `/thanks`
- `/contact?service=fix` opens with **Website Fix** selected (live outreach emails and the Instagram bio use it)
- `/contact?service=rebuild` and `/contact?service=new-site` open with **Website Plan** selected
- New pages: `/demo`, `/about`, `/privacy`

## 3. Sitemap and Search Console

- [ ] Open `https://www.capitalsites.ca/sitemap.xml` (12 URLs, including `/demo`, `/about`, `/privacy`) and `https://www.capitalsites.ca/robots.txt`.
- [ ] Google Search Console → Sitemaps → resubmit `https://www.capitalsites.ca/sitemap.xml`.
- [ ] URL Inspection → Request indexing for `/`, `/services`, `/pricing`, `/demo` and `/about`.

## 4. Post-deploy smoke test (about 10 minutes)

- [ ] Each page loads on a phone and a computer, with no sideways scrolling.
- [ ] Nav: Home · Services · Pricing · Demo · About · Contact.
- [ ] Home hero reads "Better systems. Better business." and the Fix link goes to `/contact?service=fix`.
- [ ] Pricing shows the three tables and the payment section; prices match `src/data/offers.ts`.
- [ ] Contact: change the dropdown and watch the price, description, summary and message prompt change.
- [ ] Demo: send a request, move the clock +3 days on the Quotes tab, and check the day-3 reminder; confirm the fictional banner stays on screen.
- [ ] One real test enquiry through the contact form, sent by Noah, arrives at capitalsitesottawa@gmail.com and lands on `/thanks`. (Not done in staging: real submissions need the owner's go-ahead.)

## 5. Rollback

If anything is wrong after launch: Vercel dashboard → the project → **Deployments** → open the previous production deployment (commit `67f1f46`, the current live site) → **Promote to Production** (Instant Rollback). Then `git revert` the merge commit on `main` so the repository matches what's live.
