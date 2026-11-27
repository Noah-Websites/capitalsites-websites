# Netlify migration: Vercel to Netlify Free

Prepared 2026-11-27 on branch `netlify-migration-prep`. Nothing has been deployed to Netlify, no DNS
record has been changed, nothing has been bought, and the Vercel project is untouched. The live site
keeps running on Vercel until you change DNS yourself (step E).

## 1. What's done and verified

| Check | Result |
|---|---|
| `netlify.toml` (build `npm run build`, publish `.next`, Node 22, HSTS header) | Added. Netlify's Next.js adapter is applied automatically (v5.16.9 in the local run). |
| Build on Netlify's build system (`netlify build --offline`, CLI 27.20.1) | Passes. All 21 routes static, same as Vercel. 26 s on a warm machine. |
| Site served by Netlify's local emulator (`netlify serve`) | Full QA suite run against it: see `qa-report.md` (Netlify section). |
| Every page and old URL (22 paths, 16 `?service=` links incl. old `rebuild` / `new-site` aliases) | Identical status, redirects and preselected service on local Netlify and live. |
| SEO: title, description, canonical, Open Graph, Twitter, robots, JSON-LD on 14 pages; `robots.txt`; `sitemap.xml` | Identical to live. |
| Trailing slash (`/about/` → `/about`, 308), unknown path (404), `/silentstack` (404) | Identical to live. |
| HSTS `max-age=63072000` on pages, assets and 404 | Identical to live. |
| Static assets cached 1 year, immutable | Identical to live. |
| Contact and audit forms | Unchanged: they post to FormSubmit, not to Netlify, so the host change doesn't touch delivery. Dry run passes; the real send waits for your approval (`form-delivery-test.md`). |
| Interactive demo | Runs fully in the browser; all demo steps pass on local Netlify with zero network requests. |

**One item can only be confirmed on a real Netlify deploy:** the two logo images. The local emulator
hangs on local images behind Next's `/_next/image` address (remote photos and Netlify's image service
itself work, and production Netlify handles this rewrite itself). Step C checks it.

## 2. What needs you

1. **Approve this preview** (Vercel preview of this branch) and the merge to `main`. Merging also puts
   the copy corrections live on Vercel. Nothing else changes for visitors.
2. **Approve creating the Netlify project.** The first deploy is public at `<name>.netlify.app` (Free
   has no password protection). It costs 15 of the 300 monthly credits; no money.
3. **Connect GitHub to Netlify** (an authorization screen only you can approve).
4. **Change two DNS records at Namecheap** at a time you choose (step E). I can't and won't do this.
5. **Approve the real form delivery test** (sends 2 test emails to capitalsitesottawa@gmail.com).
6. Optional: skim Netlify's Self-Serve Subscription Agreement
   (<https://www.netlify.com/pdf/self-serve-subscription-agreement.pdf>). Netlify's pricing and terms
   pages put no personal-use limit on Free (unlike Vercel Hobby), but I couldn't machine-read that PDF.

## 3. Costs and limits (Netlify Free, credit-based; checked on netlify.com/pricing 2026-11-27)

- **$0. 300 credits a month, hard limit, never billed.** At the limit, *every project on the team
  pauses* until the next monthly cycle. This is the main risk to manage.
- Production deploy: **15 credits** each (about 20 a month would use everything). Deploy Previews and
  branch deploys: no credits.
- Bandwidth 20 credits/GB · web requests 2 credits/10,000 · server compute 10 credits/GB-hour ·
  custom domain with SSL included · Netlify Forms free (not used).
- Rolling back to an earlier deploy costs no credits.

Measured on the live site today: first visit to the home page ≈ 450 KB and 30 requests; each further
page ≈ 50 KB and 25 requests (desktop and phone similar). A three-page visit ≈ 0.55 MB, 80 requests.

| Month | Visits | Production deploys | Credits (approx.) | Share of 300 |
|---|---|---|---|---|
| Quiet | 1,000 | 4 | 30 traffic + 60 deploys = **90** | 30% |
| Busy | 3,000 | 6 | 90 + 90 = **180** | 60% |
| Too much | 5,000 | 10 | 150 + 150 = **300** | site pauses |

Traffic figures include a 2× allowance for bots. Rules that keep the site safe:

- **Batch changes; at most 8 production deploys a month.** Every push to `main` is a production
  deploy. Review work on branches and pull requests, which build Deploy Previews at no cost.
- Look at Team settings → Usage weekly for the first month and compare with the table.
- If usage passes ~200 credits in a month, stop deploying until the cycle resets. A paid plan is the
  other option; that's a cost decision for you.

## 4. Checklist

### A. Approve and merge (you)
- [ ] Review the Vercel preview of `netlify-migration-prep`.
- [ ] Merge into `main`. Vercel deploys it as usual; check www.capitalsites.ca once.

### B. Create the Netlify project (you, after approval; about 10 minutes)
- [ ] app.netlify.com → **Add new project → Import an existing project → GitHub** → authorize →
      pick `Noah-Websites/capitalsites-websites`.
- [ ] Branch to deploy: `main`. Leave build settings as detected; `netlify.toml` supplies them.
      Don't add environment variables (the site needs none).
- [ ] Project configuration → General → rename the project (e.g. `capitalsites`), which sets the
      address `capitalsites.netlify.app` (use whatever name Netlify accepts below).
- [ ] Decline Netlify DNS if offered; DNS stays at Namecheap.

### C. Check the Netlify address before touching DNS (I can do this once it exists)
- [ ] Run, against `https://<name>.netlify.app`:
      `node scripts/qa/site-qa.cjs`, `node scripts/qa/legacy-urls.cjs`, `node scripts/qa/form-delivery-test.cjs` (dry run).
- [ ] Logos and photos load (header logo, footer mark, portfolio photos); Image CDN serves WebP/AVIF.
- [ ] `curl -sI https://<name>.netlify.app` shows `server: Netlify` and the HSTS header.

### D. The day before the switch (you, Namecheap; 2 minutes)
- [ ] Namecheap → Domain List → capitalsites.ca → **Manage → Advanced DNS**.
- [ ] Note the current values (also recorded in section 5), then set **TTL to 5 min** on the `@` A record
      and the `www` CNAME. Don't change their values yet. Wait at least 30 minutes (the old TTL);
      a day is safest.

### E. The switch (you; pick a quiet hour, 30–60 minutes)
- [ ] Netlify → Domain management → **Add a domain** → `www.capitalsites.ca`. Accept adding
      `capitalsites.ca` too. Make **www the primary domain** (the apex then redirects to www, as today).
      Netlify shows "Awaiting External DNS"; that's expected.
- [ ] Namecheap → Advanced DNS, change two records:
      - `A` · Host `@` · `216.198.79.1` → **`75.2.60.5`** · TTL 5 min
      - `CNAME` · Host `www` · `760e6e681f7930de.vercel-dns-017.com.` → **`<name>.netlify.app.`** · TTL 5 min
      - Change nothing else. (There are no MX, TXT or CAA records, so email and certificates aren't affected.)
- [ ] Netlify → Domain management → HTTPS → **Verify DNS configuration**, then **Provision certificate**.
      Usually minutes. Until it's issued, a visitor whose DNS has already switched can get a
      certificate warning, which is why this goes in a quiet hour.
- [ ] Check: `dig +short capitalsites.ca A` → `75.2.60.5`; `dig +short www.capitalsites.ca CNAME` → `<name>.netlify.app.`

### F. Right after the switch (I can run these)
- [ ] `curl -sI https://www.capitalsites.ca` → `server: Netlify`, 200, HSTS present.
- [ ] `http://capitalsites.ca`, `https://capitalsites.ca`, `http://www.capitalsites.ca` all land on
      `https://www.capitalsites.ca/` (Netlify answers 301 where Vercel answered 307/308; same destination).
- [ ] `legacy-urls.cjs` and `site-qa.cjs` against `https://www.capitalsites.ca`.
- [ ] Form delivery test B (`form-delivery-test.md`), if approved.
- [ ] Watch for 48 hours: Netlify deploy log, Usage page, Gmail for normal enquiries.

### G. Later
- [ ] After 48 stable hours: optional, uncomment the `netlify.app` → www redirect in `netlify.toml`
      (one production deploy). Canonical tags already point search engines at www.
- [ ] After 14 stable days: set the two Namecheap TTLs back to 30 min.
- [ ] Only then, and only if you decide to: disconnect or delete the Vercel project. Until then leave it
      connected; it's the rollback target.

## 5. Rollback

Current Vercel records (the rollback values):

| Type | Host | Value |
|---|---|---|
| A | @ | `216.198.79.1` |
| CNAME | www | `760e6e681f7930de.vercel-dns-017.com.` |

- **Before step E:** nothing to roll back. Vercel is still live; delete the Netlify project if you
  want it gone.
- **Site wrong after the switch:** in Namecheap, put the two values above back (TTL 5 min). Visitors
  return to Vercel within about 5–30 minutes. Vercel keeps serving the domain the whole time, because
  the project and its domains stay attached.
- **A bad deploy on Netlify later:** Netlify → Deploys → the last good deploy → **Publish deploy**.
  Instant, no credits. Then fix forward on a branch.
- **Credits run out and the site pauses:** switch DNS back to Vercel as above (works while the Vercel
  project exists), or wait for the monthly reset.

## 6. Differences you might notice

- Apex to www and http to https redirects answer 301 on Netlify (307/308 on Vercel). Same destinations.
- Photos are resized by Netlify's Image CDN instead of Vercel's. Same sizes; formats picked per browser.
- The 404 page is sent with `no-store` instead of `max-age=0`; no visible difference.
- Builds run on Netlify with Node 22 (pinned in `netlify.toml`).
