# Netlify migration: Vercel to Netlify Free

Updated 2026-11-27. Approved: a real Netlify deployment for testing, on Netlify Free, from the business
Netlify account (capitalsitesottawa@gmail.com). Not approved yet: any DNS change. Vercel stays live and
untouched; nothing is merged into `main` (Vercel deploys `main` to production automatically).

**Netlify deploys the `netlify-migration-prep` branch directly.** Once the project exists, every push to that
branch is a production deploy (15 of the 300 monthly credits), so changes are batched into as few pushes
as possible. Vercel also builds a private preview of each push, which doesn't affect production.

## 1. What's in this branch and verified locally

| Item | Status |
|---|---|
| `netlify.toml`: build `npm run build`, publish `.next`, Node 22, HSTS `max-age=63072000` | Done |
| Netlify build (`netlify build --offline`, CLI 27.20.1, Next.js adapter 5.16.9) | Passes; all routes static |
| `/silentstack` → `/services` (permanent redirect, in `next.config.ts`) | Done |
| `X-Robots-Tag: noindex, nofollow` on every `*.netlify.app` address (edge function `netlify/edge-functions/noindex-netlify-app.ts`); www.capitalsites.ca never gets it | Done; confirm on the real deploy |
| Maple demo on OpsCore v0.2.1 (in reliability testing, not certified) | Done; see `qa-report.md` |
| Alert wording: no time target; "checked about every 5 minutes, and email delivery times can vary" | Done |
| Contract terms (ownership, cancellation) | Exactly as live; waiting for your separate approval |
| Old and outreach URLs, SEO tags, sitemap, robots, headers | Identical to live on the local Netlify build |

## 2. Costs and limits (Netlify Free, credit-based; checked 2026-11-27)

- **$0. 300 credits a month, hard limit, never billed.** At the limit, *every project on the team
  pauses* until the next monthly cycle.
- Production deploy: **15 credits**. Deploy Previews and branch deploys: none. Rollback to an earlier
  deploy: none.
- Bandwidth 20 credits/GB · web requests 2 credits/10,000 · compute 10 credits/GB-hour. The noindex edge
  function skips code and image requests and does almost no work, so its share is negligible.
- Measured page weight: first visit ≈ 450 KB / 30 requests; each further page ≈ 50 KB / 25 requests.

| Month | Visits | Production deploys | Credits (approx.) |
|---|---|---|---|
| Quiet | 1,000 | 4 | 30 + 60 = **90** (30%) |
| Busy | 3,000 | 6 | 90 + 90 = **180** (60%) |
| Too much | 5,000 | 10 | 150 + 150 = **300**: site pauses |

Keep production deploys to 8 or fewer a month, and check Team settings → Usage weekly for the first month.

## 3. Checklist

### A. Create the project (you, guided step by step in chat)
- [ ] Sign in to app.netlify.com with **capitalsitesottawa@gmail.com** (not another Netlify login).
- [ ] Add new project → Import an existing project → GitHub → authorize Netlify → give it access to
      `Noah-Websites/capitalsites-websites` only.
- [ ] Branch to deploy: **`netlify-migration-prep`**. Build settings come from `netlify.toml`; leave them.
      No environment variables.
- [ ] Deploy. Then Project configuration → change the project name (sets `<name>.netlify.app`).
- [ ] Don't add a domain and don't use Netlify DNS yet.

### B. Test the real deployment (me, from outside)
- [ ] Both logos (header and footer) and all photos load through Netlify's Image CDN.
- [ ] All public pages at desktop and phone widths: status, layout, console, accessibility, links, prices.
- [ ] Demo flows, including the v0.2.1 repeat-enquiry alerts; no demo data leaves the page.
- [ ] Legacy URLs: all `?service=` links, old aliases, `/about/` → `/about`, `/silentstack` → `/services`.
- [ ] SEO: tags identical to live; canonical URLs point to www.capitalsites.ca; `X-Robots-Tag: noindex`
      present on the netlify.app address.
- [ ] Security headers: HSTS on pages, assets and 404.
- [ ] The two approved form delivery tests (`form-delivery-test.md`), with Gmail receipt checked.

### C. Before the switch (you; only after you approve the deployment)
- [ ] Namecheap → Domain List → capitalsites.ca → Manage → **Advanced DNS**: set TTL to **5 min** on the
      `@` A record and the `www` CNAME. Values unchanged. Wait at least 30 minutes; a day is safest.

### D. The switch (you; a quiet hour)
- [ ] Netlify → Domain management → Add a domain → `www.capitalsites.ca`; accept adding `capitalsites.ca`;
      make **www the primary domain**.
- [ ] Namecheap → Advanced DNS, change two records, nothing else:
      - `A` · `@` · `216.198.79.1` → **`75.2.60.5`** · TTL 5 min
      - `CNAME` · `www` · `760e6e681f7930de.vercel-dns-017.com.` → **`<name>.netlify.app.`** · TTL 5 min
- [ ] Netlify → Domain management → HTTPS → Verify DNS configuration → Provision certificate.
- [ ] I re-run every check in B against https://www.capitalsites.ca (no noindex header there).

### E. Later
- [ ] After 48 stable hours: enable the `netlify.app` → www redirect in `netlify.toml` (one deploy).
- [ ] After 14 stable days: TTLs back to 30 min.
- [ ] Bring `main` in line without triggering Vercel: disconnect the Vercel project's Git connection
      first (or delete the project; your decision), then merge `netlify-migration-prep` into `main` and
      switch Netlify's production branch to `main`.

## 4. Rollback

| Type | Host | Vercel value (rollback) |
|---|---|---|
| A | @ | `216.198.79.1` |
| CNAME | www | `760e6e681f7930de.vercel-dns-017.com.` |

- **Before the switch:** nothing to roll back; Vercel is live. The Netlify project can simply be deleted.
- **After the switch, if anything is wrong:** put the two values above back in Namecheap (TTL 5 min).
  Visitors return to Vercel within about 5–30 minutes. Vercel keeps serving the domain throughout,
  because its project and domains stay attached.
- **A bad deploy on Netlify:** Deploys → last good deploy → **Publish deploy** (instant, no credits).
- **Credits run out:** switch DNS back to Vercel as above, or wait for the monthly reset.

## 5. Differences from Vercel you might notice

- Apex → www and http → https answer 301 on Netlify (307/308 on Vercel); same destinations.
- Photos are resized by Netlify's Image CDN; same sizes, format chosen per browser.
- The 404 page is sent with `no-store`; no visible difference.
- Before the switch, the forms' confirmation page is www.capitalsites.ca/thanks on Vercel (the forms send
  people to the real domain). After the switch the same address is served by Netlify.
