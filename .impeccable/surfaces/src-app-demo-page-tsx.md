---
version: 1
slug: "src-app-demo-page-tsx"
primary_target: "src/app/demo/page.tsx"
related_targets: ["src/components/demo/MapleDemo.tsx"]
---

# Surface brief: demo

Scope: /demo — "See how it works", the Maple Home Services (fictional) interactive demo, the persistent fictional banner and the simulated-vs-real panel.

Visitor mode: Operate.

Audience: a contractor or home-service owner deciding whether Estimate Request Setup and the coming services would help. Task: operate the fictional system for two minutes: send a request, see it land in the list and the owner's alert, book a visit, track a quote, move the clock to see the day-3 reminder, break and recover the alert channel. Constraints: client-only, lazy-loaded, all state in memory, no network, no storage, nothing named or posted; "(fictional)" next to the name in headings; works at 390px and by keyboard; logic from src/lib/ops-core.js unchanged.

## Direction contract

THESIS: Prove, don't claim: a working fictional ops console a contractor can operate in two minutes, built inside the CapitalSites world rather than as a separate dashboard look.

OWN-WORLD: The site's world: snow ground, white 28px panels, Inter UI, hairline lists with tabular numbers, red primary pills and ghost secondary pills, neutral sentence-case tags; demo-only status colours (green, amber, red) always paired with words and icons.

STORY: Visitor sees the fictional banner, reads what is simulated and what is real, works through five tabs while moving the simulated clock, and leaves knowing what Estimate Request Setup does; then registers interest.

FIRST VIEWPORT: Sticky ink banner under the red nav; display h1 "See how it works." with a one-line subhead; the simulated-vs-real panel; the demo card opening on tab 1 with five sample requests already loaded and the simulated clock at the top.

FORM: seed: none (pinned) — "Rebuild the demo as a client-only React component in the site's existing design." "do not copy its visual style".

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
