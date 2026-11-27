---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/services/page.tsx","src/app/pricing/page.tsx","src/app/about/page.tsx","src/app/privacy/page.tsx","src/app/contact/page.tsx","src/app/audit/page.tsx","src/app/portfolio/page.tsx","src/app/layout.tsx","src/components/Nav.tsx","src/components/Footer.tsx"]
---

# Surface brief: site

Scope: the CapitalSites marketing site — home, services, pricing, about, privacy, contact, audit, portfolio index, thanks, nav, footer, layout. The three concept demos under /portfolio/* keep their own worlds; /demo has its own brief.

Visitor mode: Persuade.

Audience: owners of contractor and home-service businesses in Canada (trades, cleaning, landscaping, HVAC, plumbing, electrical) who lose time to scattered enquiries, quotes that go quiet and double-typed customer details. Job: decide whether CapitalSites can set up something practical, at a known price, that they own. Action: contact with the right service preselected (Website Fix now; Estimate Request Setup pilot: register interest). Proof: the fictional Maple Home Services demo, plain prices from src/data/offers.ts, a written scope before any work. Constraints: no clients yet, no testimonials or result numbers, AI mentioned once on About only, every price from offers.ts.

## Direction contract

THESIS: Apple-style product presentation where the product is now a working system for contractors: shown running (the fictional Maple demo on real screens), priced plainly from one source. Refuses the AI-agency look (gradient blobs, glowing cards, robots, neon) and the small-agency template.

OWN-WORLD: Unchanged: solid red nav over a red radial hero with white Poppins 800 display; full-bleed black, snow, white and ink tiles; 28px card tiles in 12px white mosaics; Inter UI; pill buttons; ink chevron links that turn red on hover; CSS MacBook and iPhone frames holding real screenshots; one maple-red accent.

STORY: Visitor reads "Better systems. Better business." and the value proposition, sees the demo's request list on a laptop, picks one of two ways to start, learns the four steps, opens the demo, then contacts with the service preselected.

FIRST VIEWPORT: Red hero, centred: h1 "Better systems. / Better business." at 56/80/112px, value-proposition subhead, white pill "See how it works" with ghost "See pricing", a one-line Website Fix link, then the MacBook (sm+) or iPhone (below sm) with the demo screenshot, cropped by the tile edge.

FORM: seed: none (pinned) — "The owner loves the current Apple-inspired look." "Keep the logo, palette, typography, white space, minimal navigation, existing visuals, components and mobile behaviour. Do NOT redesign".

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
