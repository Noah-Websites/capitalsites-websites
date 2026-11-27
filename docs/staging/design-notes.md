# CapitalSites design notes (existing system, recorded before the ops-positioning changes)

Recorded on 2026-11-27 from `main` at commit `67f1f46`, before any change on `ops-positioning-2026-11`.
Sources: `src/app/globals.css`, `src/components/*`, every route in `src/app`, `DESIGN.md`, `PRODUCT.md`.
Rule for this job: reuse everything below exactly. Change messaging, structure and conversion paths only.

## 1. Palette (defined once, in `@theme` in `src/app/globals.css`)

| Token | Hex | Used for | Contrast |
|---|---|---|---|
| `red` | #C8102E | The only accent. Nav bar and home hero grounds, filled pills, link hover, checkmarks, featured-plan ring and tag, `$0` figures, text selection | 5.88:1 with white both ways; 5.40:1 on snow; 3.57:1 on black (large text only) |
| `red-deep` | #A50D26 | Red pill hover, bottom of the hero radial, mobile menu panel | white on it 7.82:1 |
| `ink` | #1D1D1F | Text on light grounds, ink tile, chevron links, focus outlines, focused field border | |
| `ink-2` | #6E6E73 | Secondary text, placeholders, footer text | 5.07:1 on white, 4.66:1 on snow (lightest allowed text grey) |
| `line` | #D2D2D7 | Field borders, hairlines, dividers | |
| `snow` | #F5F5F7 | Grey tiles, footer, form-page and pricing grounds | |
| `white` | #FFFFFF | White tiles, text on red/ink, nav CTA fill | |
| `night` | #000000 | Black tiles | |
| `night-text` / `night-muted` | #F5F5F7 / #A1A1A6 | Primary / secondary text on black | |
| `red-brand` | #8B1A1A | Legacy: concept-demo banners only. Never on the main site | |

Rules: one accent only. Red as a full ground only on the nav bar and the home hero. Text on red is white or white/90 (4.95:1), never lower. Red text on black only at display size. Red is never used for field focus or neutral states, so it never reads as an error.

## 2. Type

- Faces via `next/font`: **Poppins** 600/700/800 (`--font-display`, display and headlines and the nav wordmark only), **Inter** (`--font-sans`, everything else, with `cv11` and `ss01` on).
- `.display`: Poppins 800, -0.025em, word-spacing 0.06em, line-height 1.02, balanced wrap.
- `.headline`: Poppins 700, -0.02em, line-height 1.08, balanced wrap.
- `.subhead`: Inter 500, -0.012em, line-height 1.3.
- `.tabular`: tabular numbers for prices.
- Size ramp (mobile / sm / md), pairs only:
  - Home hero display 56 / 80 / 112 (line-height 0.95).
  - Page hero display 48 / 64 / 88. Form-page hero 48 / 72. Home closer 44 / 80.
  - Section headline 40 / 56. Tile headline 36 / 48. Statement 32 / 48. Pricing card name 32 / 36 / 44.
  - Plan price figure 60 / 72 / 88 (display, tabular). `$0` figure 120 / 160 / 220.
  - Subhead 19 / 24 (hero 21 / 30). Body 17 / 19–21. Lists 16. Plan details 15. Labels 14/600. Tags 13/600. Footer 12.
- Sentence-case titles only. No uppercase letter-spaced eyebrows.

## 3. Spacing, radius, layout

- Container `max-w-[1024px]`, side gutter 24px (`px-6`); nav and footer 20px (`px-5`).
- Section tiles: `py-24 md:py-32` (96 / 128px). Hero tiles start tighter and let a device crop at the bottom.
- Mosaics: white ground, `p-3` outer and `gap-3` (12px) between rounded tiles.
- Radius: pill 980px, card/tile 28px (`.card-tile`), inset chips 16px (`rounded-2xl`), fields 12px, device lid 18px.
- Breakpoints: Tailwind defaults (sm 640, md 768, lg 1024). Nav links collapse to a menu below md. Home hero swaps MacBook (sm and up) for iPhone (below sm).
- `body { overflow-x: clip }` (not `hidden`) so the CSS scroll timeline keeps working.

## 4. Components (reuse these; `src/components/ui.tsx` unless noted)

- **Pill** (`Pill`, `.pill`): 44px min height, 11×22 padding, 17px/500. Variants: `red` (filled), `ghost` (1.5px inset ring), `white`. Inside `.on-dark` the ghost turns white; on the red hero and nav the white pill's text is red. Focus: 3px ink outline, 3px offset (white inside `.on-dark`). Active scales to 0.97.
- **ChevLink** (`.chev`): 17px/500 ink text + chevron SVG; hover turns red and underlines, chevron nudges 2px. White on dark grounds. Focus: 2px currentColor outline, 4px radius.
- **Tiles** (`.tile` + `.tile-black | .tile-snow | .tile-white | .tile-ink | .tile-hero`): full-bleed solid grounds; `.tile` clips devices. `.on-dark` flips pills and links. `.tile-glow` adds the red blur under black heroes (pricing).
- **Card tile** (`.card-tile`): 28px radius, 32–56px padding, content pinned with `mt-auto`.
- **Plan card**: white card on snow, featured one gets `ring-2 ring-red` and a red tag; others a snow tag in ink-2. Feature lists use `Check` (red stroked checkmark).
- **Tags**: `rounded-full px-3 py-1 text-[13px] font-semibold`, `bg-snow text-ink-2` (neutral) or `bg-red text-white` (featured).
- **Inset chips** (on red/ink tiles): `rounded-2xl bg-white/10 ring-1 ring-white/15`; on light tiles the day bars are `bg-white ring-1 ring-line`, with the key one `bg-red text-white`.
- **Device frames** (`MacBook`, `IPhone`): CSS-drawn, real screenshots inside (`object-cover object-top`), cropped by the tile edge via `translate-y`.
- **Fields** (`.field`, `.field-select`, `.field-label`): white, 1px `line` border, 12px radius, 52px min height, 17px text. Focus: ink border + 4px ink ring at 14%. Select: ink chevron SVG at right 18px.
- **Service select overlay** (`src/components/ContactForm.tsx`): a native `<select name="package">` laid transparently over a visible `.field` so long labels wrap on phones; focus ring drawn on the visible field via `.relative:has(> .service-select:focus-visible) > .field`.
- **Form card**: white `.card-tile` with `shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]` on a snow ground; full-width red submit pill.
- **FAQ rows**: native `<details>` with hairlines, 19/21px/600 summary, ink-2 plus icon rotating 45°.
- **FixTerms** (`src/components/FixTerms.tsx`): a `<dl>` of the Website Fix terms in two columns from sm.
- **Rise** (`src/components/Rise.tsx`): wraps content in `.rise`, a CSS scroll-driven, transform-only rise (40px), off under reduced motion.
- **Nav** (`src/components/Nav.tsx`): sticky, solid red, 56px, white logo symbol + Poppins wordmark, 14px/500 links in white/90 (current and hover: white + 2px underline at 6px offset), 32px white CTA pill with red text, red-deep mobile panel with 24px/600 links.
- **Footer** (`src/components/Footer.tsx`): snow, 12px ink-2, fine-print line, 4-column grid from sm with the full-colour logo first, hairline dividers.
- **LayoutShell**: hides Nav and Footer on the three concept demos (`/portfolio/*`), which keep their own worlds.

## 5. Page patterns in use

- **Home**: red radial hero (display h1, subhead, white + ghost pills, device cropped at the bottom) → snow statement tile → white mosaics of snow/ink card tiles → black gallery tile with a phone scroll-snap row → white text tile → ink closing tile with a pill pair.
- **Page hero**: black tile (pricing, services) or white (portfolio), centred display h1 + subhead.
- **Pricing**: black hero with glow → snow ground with white plan cards in a 2-column grid → centred fine print → white FAQ section (`#faq`).
- **Form pages** (audit, contact): snow ground, two columns from lg (copy left, 480–560px form card right).

## 6. Motion and accessibility

- Only motion: `.rise` (CSS, transform-only) and 200ms `cubic-bezier(0.22, 1, 0.36, 1)` interaction transitions. Reduced motion turns both off.
- Focus is always visible (pills, chevrons, fields, FAQ summaries). Text never lighter than `ink-2` on light or white/90 on red.

## 7. Constraints carried into this job

- No gradient blobs, glowing cards, robot imagery, dark neon or stock photography. No icon-card grids, testimonials or logos.
- New pieces this job needs (availability badges, price tables, tabbed demo, status indicators) are built from the parts above: tags for badges, hairline tables in Inter, snow/white card tiles, pills for actions, fields for inputs. The demo's health states need status colours with text labels (healthy / needs attention / down); they are scoped to the demo and never used as brand accents.
