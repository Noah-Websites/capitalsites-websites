# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user (repositioned 2026-11-27 on the `ops-positioning-2026-11` staging branch): owners of contractor and home-service businesses anywhere in Canada (trades such as plumbing, HVAC and electrical, plus cleaning, landscaping and general contracting). They lose time to scattered enquiries, estimates that go quiet, double-booked visits and customer details typed twice. They are not technical; they judge by "does this work on my phone, do I own it, and what does it cost." Price sensitivity is high, and many still need a working website first.

## Product Purpose

CapitalSites sets up practical digital operations for these businesses: estimate request handling, quote follow-up, online booking, small software integrations and ongoing care for those systems, alongside the website offers (Website Fix, Website Plan, Premium Website). Slogan: "Better systems. Better business." Value proposition: "We help contractors and home-service businesses manage customer enquiries, organize estimates, schedule appointments and connect their digital systems." Every price, name, term and availability lives in `src/data/offers.ts`; today only the website offers are available, Estimate Request Setup is a founding customer pilot (register interest, no payment taken), and the rest are coming soon. The business is Noah Potter solo; capacity is deliberately low, and credibility outranks volume.

## Positioning

Practical outcomes, transparent prices and setups the customer owns: digital operations are built in the customer's own accounts (their Google account or existing job software), scoped and priced in writing before any work starts. AI is an internal advantage, never the product: mentioned once, plainly, on About. A second position stays: a small Canadian web studio (not offshore, not an agency farm), one person building, working remotely with businesses across Canada.

## Operating Context

- Lead flow: the contact form with `?service=<slug>` preselects (FormSubmit → capitalsitesottawa@gmail.com, with a hidden `service` slug for counting enquiries per product), the free website audit, or a Calendly consult (`https://calendly.com/capitalsitesottawa/website-consult`). `/contact?service=fix` is used in live outreach emails and the Instagram bio link and must keep working.
- Delivery: Noah designs, builds, and launches in 7 days (rebuild), 10–14 days (new site), 14–21 days (Premium e-commerce). All work solo; no subcontractors.
- Stack delivered to clients is typically Next.js / static or a comparable modern framework hosted on Vercel; this is implementation, not product-facing.
- No payment processing on the marketing site itself. All sales motion is: audit or consult → human conversation → agreement signed off-site.
- The three portfolio pages (Fade & Co., Ember Kitchen, Maison Noir) are concept redesigns, not real clients — labeled as such on each page.
- `/demo` is the Maple Home Services (fictional) operations demo: client-only, all state in memory, no network, labelled fictional everywhere. Its logic is `src/lib/ops-core.js`, kept byte-for-byte as supplied.

## Capabilities and Constraints

- Offers, prices, payment structure and availability: `src/data/offers.ts` is the only source. No price is hard-coded elsewhere; `scripts/check-prices.mjs` enforces it. Unsettled terms read "Terms confirmed in your written scope before any work starts."
- Forms submit via FormSubmit.co to `capitalsitesottawa@gmail.com`. Do not change action URLs, field names, or hidden fields.
- Calendly consult link: `https://calendly.com/capitalsitesottawa/website-consult`. Do not change.
- No third-party payment, checkout, or analytics scripts added without explicit request.
- Stack: Next.js 15 App Router, React 19, Tailwind CSS v4 (@theme), Framer Motion, next/image with Unsplash remotePatterns, Vercel auto-deploy on push to main.
- The free website audit is called "free." The website itself is never described as "free."

## Brand Commitments

- Name: CapitalSites. The "Capital" is a holdover from Ottawa-origin branding; kept as the brand's given name, never treated as a geographic claim.
- Positioning (owner, 2026-11-26): "a small Canadian web studio" working with independent small businesses across Canada. Never name a specific city or province as the studio's base; no street address anywhere. No flag, maple leaf, "Canada" wordmark or government-style imagery, and nothing implying government affiliation. Exception: the owner's logo includes a Peace Tower-style tower, which the owner approved keeping (2026-11-26).
- The "ottawa" in capitalsitesottawa@gmail.com and the Calendly URL is a live-inbox constraint, not positioning; do not change those addresses.
- Voice: direct, operator-to-operator, zero agency jargon. Plain and specific about what a setup does, customer-side. Never promise more customers, revenue, rankings or response-time improvements. Not "we craft digital experiences," not "AI-powered."
- Honesty rule: no invented clients, testimonials, reviews, stats, case studies, or results. Numbers on the site must be true (plan price, response time, upfront cost = $0, "1 person building").
- Noah Potter is the human face of the business; the site is not pretending to be a team.
- Standing visual preference (owner, 2026-11-25): the site should look and feel like Apple.com — modern, premium, big confident type, full-bleed tiles — with exciting, vivid colour (the owner liked the red/navy energy of the original dark site). A plain or muted look was explicitly rejected. Palette update (owner, 2026-11-26): one deep maple-red accent (#C8102E) on white, off-white and near-black, used for primary buttons, link hover and key highlights only, except the nav bar and home hero, which are solid red so the first screen pops; navy retired.

## Evidence on Hand

- Three concept redesigns live at `/portfolio/fade-and-co`, `/portfolio/ember-kitchen`, `/portfolio/maison-noir`. Each is clearly labeled as a concept demo, not a real client.
- The Maple Home Services operations demo at `/demo` (fictional; synthetic example.com data).
- Noah's bio and (optional) portrait at `/noah.jpg`.
- No real client testimonials, press mentions, revenue figures, conversion lifts, or case studies. Future work must not fabricate any.
- Geography: Canada-wide, remote. The three concept demos are set in fictional businesses in Calgary (Fade & Co.), Halifax (Ember Kitchen) and Ottawa (Maison Noir, kept in Ottawa at the owner's request); those locations describe the fictional clients, not the studio.
- No customers yet: no testimonials, case studies, client logos, review counts, awards or "trusted by" claims on CapitalSites' own pages.

## Product Principles

1. **Credibility before conversion.** The site's job is to make an unknown solo operator feel safe. Every page is read through "would I trust this with my business."
2. **Honest numbers only.** If we can't prove it, it isn't on the page. Every price comes from offers.ts.
3. **Show it working.** The fictional demo proves the system; nothing claims results we don't have.
4. **You own it.** Accounts and data stay with the customer; say so wherever a setup is described.
5. **Owner-operator reading level.** Clarity beats cleverness; the mobile scan beats the desktop grid.
6. **Solo studio, not fake agency.** Noah is one person. Scale implied by the design should match.

## Accessibility & Inclusion

WCAG AA color contrast on body and interactive text. Forms keyboard-operable with visible focus. All interactive elements reachable without pointer. Mobile-first: all primary CTAs must be reachable and legible at 375px without horizontal scroll.
