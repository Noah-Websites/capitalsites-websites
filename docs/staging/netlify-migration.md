# Netlify migration: Vercel to Netlify Free

**Status, 2026-11-27 (evening, Ottawa time): switched. www.capitalsites.ca is served by Netlify.**
- Project `capitalsites-websites` (Netlify Free, business account capitalsitesottawa@gmail.com, site id
  `4cdaff3a-3727-4c39-b5cc-753ebcfeefc2`), production branch `netlify-migration-prep` at a2ec83e.
- Primary domain www.capitalsites.ca; capitalsites.ca 301s to it.
- Certificate: Let's Encrypt, covers both names, issued 2026-11-28 02:41 UTC, expires 2027-02-26, and
  renews automatically.
- DNS stays at Namecheap. Only two records changed (section 4); the Search Console TXT record is untouched.
- Vercel project and its domain settings are kept, unchanged, as the rollback until verification is complete.
- Nothing is merged into `main`, because Vercel deploys `main` automatically.

Earlier approvals: a real Netlify test deployment, then the DNS switch after the owner's visual review.

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

A and B are done (A: project `capitalsites-websites`; new projects in this team start **private**, so
Project configuration → General → Visitor access → Public was needed. B: see `qa-report.md`).

### C. Before the switch
- [x] Skipped the pre-switch TTL wait: the new records were set to TTL 5 min at the switch, which is what
      makes a rollback fast. The old 30-minute TTL only slowed the move itself, while Vercel kept serving.

### D. The switch (done 2026-11-27 evening)
- [x] Netlify → Domain management → Add a domain → `www.capitalsites.ca`. Netlify first treated the bare
      domain as primary (www redirected to capitalsites.ca); fixed with Options → Set as primary domain on www.
- [x] Namecheap → Advanced DNS, two records changed, nothing else:
      - `A` · `@` · `216.198.79.1` → **`75.2.60.5`** · TTL 5 min
      - `CNAME` · `www` · `760e6e681f7930de.vercel-dns-017.com.` → **`capitalsites-websites.netlify.app.`** · TTL 5 min
      - Kept: `TXT` · `@` · `google-site-verification=JRCQ…` (Search Console). No AAAA, CAA or MX records exist.
- [x] Netlify → Domain management → HTTPS → **Check DNS** ("DNS looks right") → Let's Encrypt certificate issued
      about 10 minutes after the change.
- [x] Production checks and the two approved TEST form submissions: see `qa-report.md`.

### E. Later
- [ ] Now: Gmail filter `from:submissions@formsubmit.co` → Never send it to Spam (the TEST emails landed in Spam).
- [ ] After 48 stable hours: enable the `netlify.app` → www redirect in `netlify.toml` (one deploy).
- [ ] Optional, with a later deploy: pages send Netlify's 1-year HSTS instead of the 2-year value in
      `netlify.toml`, which only reaches redirects. Setting it in `next.config.ts` headers would restore 2 years.
- [ ] Netlify → Domain management → HTTPS: turn on "Always use a secure connection" if shown (http → https
      already redirects).
- [ ] Narrow the Netlify GitHub app to `capitalsites-websites` only (GitHub → Settings → Applications).
- [ ] After 14 stable days: TTLs back to 30 min (optional).
- [ ] Bring `main` in line without triggering Vercel: disconnect the Vercel project's Git connection
      first (or delete the project; your decision), then merge `netlify-migration-prep` into `main` and
      switch Netlify's production branch to `main`.

## 4. Rollback

| Type | Host | Vercel value (rollback) |
|---|---|---|
| A | @ | `216.198.79.1` |
| CNAME | www | `760e6e681f7930de.vercel-dns-017.com.` |

Netlify values now live: `A` `@` `75.2.60.5`; `CNAME` `www` `capitalsites-websites.netlify.app.` (both TTL 5 min).

**To switch back to Vercel** (keep this until production verification is complete and the Vercel project
is retired):
1. Namecheap → Domain List → capitalsites.ca → Manage → Advanced DNS.
2. Edit the `A` record `@`: value `216.198.79.1`, TTL 5 min, ✓ to save.
3. Edit the `CNAME` record `www`: value `760e6e681f7930de.vercel-dns-017.com`, TTL 5 min, ✓ to save.
4. Leave the `TXT` google-site-verification record and everything else as is.
5. Visitors return to Vercel within about 5 to 10 minutes (the Netlify records have a 5-minute TTL). Vercel
   still holds both domains and serves them (checked 2026-11-28). Its certificates stay valid until
   2027-01-13, so until then it serves HTTPS immediately; after that, Vercel re-issues within minutes of
   DNS pointing back. The form keeps working, because FormSubmit is activated for www.capitalsites.ca
   whichever host serves the page.
6. Leave the Netlify project in place; switching forward again is the same two edits in reverse.

Don't remove the domains from the Vercel project, or delete it, until this procedure is retired.
- **A bad deploy on Netlify:** Deploys → last good deploy → **Publish deploy** (instant, no credits).
- **Credits run out:** switch DNS back to Vercel as above, or wait for the monthly reset.

## 5. Differences from Vercel you might notice

- Apex → www and http → https answer 301 on Netlify (307/308 on Vercel); same destinations.
- Photos are resized by Netlify's Image CDN; same sizes, format chosen per browser.
- The 404 page is sent with `no-store`; no visible difference.
- Before the switch, the forms' confirmation page is www.capitalsites.ca/thanks on Vercel (the forms send
  people to the real domain). After the switch the same address is served by Netlify.
