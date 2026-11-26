---
name: CapitalSites
description: An Ontario web studio presented the way Apple presents a product, with full-bleed tiles, big Inter headlines and real sites on real screens.
colors:
  red: "#E3262F"
  red-deep: "#B5121B"
  red-bright: "#FF5A5F"
  ember: "#FF6A3D"
  navy: "#0A1A3F"
  navy-2: "#13306B"
  sky: "#5AA9FF"
  ink: "#1D1D1F"
  ink-2: "#6E6E73"
  ink-3: "#86868B"
  line: "#D2D2D7"
  snow: "#F5F5F7"
  white: "#FFFFFF"
  night: "#000000"
  night-2: "#161617"
  night-text: "#F5F5F7"
  night-muted: "#A1A1A6"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif"
    fontSize: "96px"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.028em"
  subhead:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.012em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.45
    fontFeature: "\"cv11\" 1, \"ss01\" 1"
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  field: "12px"
  inset: "16px"
  device: "18px"
  card: "28px"
  pill: "980px"
spacing:
  mosaic-gap: "12px"
  gutter: "24px"
  card-pad: "40px"
  card-pad-lg: "56px"
  tile-y: "96px"
  tile-y-lg: "128px"
  container: "1024px"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "11px 22px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.red-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.red}"
    rounded: "{rounded.pill}"
    padding: "11px 22px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "11px 22px"
  button-white-hover:
    backgroundColor: "{colors.snow}"
  chevron-link:
    textColor: "{colors.red}"
    typography: "{typography.body}"
  chevron-link-on-dark:
    textColor: "{colors.red-bright}"
  input-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "14px 16px"
    height: "52px"
  input-select:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "14px 44px 14px 16px"
    height: "52px"
  tile-black:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-text}"
  tile-snow:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.ink}"
  card-tile:
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  nav-bar:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.night-text}"
    height: "48px"
  plan-tag:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  plan-tag-featured:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
---

# Design System: CapitalSites

## Overview

**Creative North Star: "The Product Page"**

CapitalSites sells a website plan, and the site presents that plan the way Apple presents a phone: the product is shown big, on real screens, and priced plainly. Every section is a full-bleed tile. True black and Apple grey alternate as the ground, and saturated colour tiles in CapitalSites red and deep navy break that rhythm. Headlines are set in Inter at 700 with tight tracking, large enough to carry a section alone. The supporting copy is one short line and one chevron link.

The product imagery is the studio's own work: screenshots of the three concept sites (`public/shots/*.jpg`) set inside CSS-drawn MacBook and iPhone frames. There is no stock photography, no icon-card grid and no testimonial carousel. Depth comes from the devices and a soft red-navy glow under the hero, not from card chrome. Motion is a single transform-only scroll-driven rise, written in CSS, which disappears when reduced motion is requested.

This world replaces the earlier receipt world, which the owner rejected as plain. The three concept demos under `src/app/portfolio/{fade-and-co,ember-kitchen,maison-noir}` are separate worlds with their own styling and are out of scope here. The legacy `--color-red-brand` (#8B1A1A) token exists only for their banners and is not part of this system.

**Key Characteristics:**
- Full-bleed alternating tiles: black, snow, white, then a red or navy colour tile for punctuation.
- Inter 700 display and headline type with negative tracking (-0.035em / -0.028em) and balanced wrapping.
- Pill buttons (980px radius) and red chevron text links ("Learn more ›").
- Real concept-site screenshots inside CSS MacBook and iPhone frames.
- One gradient signature: red into ember, used only on "$0" figures.
- Centred composition on a 1024px container. Tiles in a mosaic sit 12px apart on white.

## Colors

The palette is Apple neutrals (black, snow, ink greys) plus one loud brand red, one deep navy and a single blue reserved for focus.

### Primary
- **CapitalSites Red** (`red`): filled CTAs, chevron links on light grounds, checkmarks, the featured-plan ring, text selection, and the base of the red tile gradient.
- **Pressed Red** (`red-deep`): hover state for filled red pills and the dark end of the red tile gradient.
- **Signal Coral** (`red-bright`): red text on black, such as chevron links on dark tiles, the solid red second line of the pricing h1 ("No upfront cost to start.") and the "Sites" half of the wordmark.
- **Ember** (`ember`): the middle stop of the `$0` gradient (red → ember → #FFB23D). Not used anywhere else.

### Secondary
- **Deep Navy** (`navy`) and **Midnight Blue** (`navy-2`): the navy colour tile, a 170° linear gradient from navy-2 to navy with a sky-tinted radial highlight top-left. Navy also tints the hero glow.

### Tertiary
- **Focus Sky** (`sky`): only the 3px focus outline on pills and summary rows, plus the navy tile's highlight. Never used for text or fills.

### Neutral
- **Ink** (`ink`): body and headline text on light grounds.
- **Graphite** (`ink-2`): secondary copy, footer text and supporting paragraphs.
- **Pewter** (`ink-3`): placeholders, field hover borders, tertiary notes.
- **Hairline** (`line`): field borders and footer dividers.
- **Snow** (`snow`): the grey tile, the footer, form-page grounds and the unfeatured plan tag.
- **White** (`white`): white tiles and the mosaic gutter colour.
- **Night** (`night`): the black tile. It is pure #000, not a near-black.
- **Night Bar** (`night-2`): the nav bar (at 72% opacity, blurred) and the solid mobile menu.
- **Night Text** (`night-text`) and **Night Muted** (`night-muted`): primary and secondary text on black.

### Named Rules
**The Gradient Is For Zero Rule.** The red → ember → amber text gradient (`.zero-fig`) is used only on "$0" figures: the home "Due today" figure and the featured plan's price on pricing. Every other emphasis, including the pricing h1's second line, is solid colour (red-bright on dark, red on light). Gradient fills on tiles are allowed (red, navy, glow). Gradient text on anything that isn't a $0 figure is not.

**The Sky Is For Focus Rule.** `sky` marks keyboard focus. Do not use it as a decorative accent.

## Typography

**Display Font:** Inter (via `next/font`, with -apple-system, Helvetica Neue, Arial fallback)
**Body Font:** Inter
**Label Font:** Inter

**Character:** A single family doing all the work, as on apple.com. Hierarchy comes from size and weight jumps (700 against 400/500) and tight negative tracking at large sizes. There is no second face. `cv11` and `ss01` are on globally, and prices use `tabular-nums`.

### Hierarchy
The frontmatter records each role's top step. Every role is responsive, and these are the steps the pages actually use, mobile → sm → md. New work should pick from this ramp rather than invent sizes.

- **Display** (700, line-height 1.02, -0.035em, `.display`):
  - Home hero h1 ("Your website. Rebuilt."): 52 / 72 / 96px, with no label line above it.
  - Page heroes (pricing, services, portfolio): 48 / 64 / 88px.
  - Form-page and section heroes (audit, contact, portfolio section): 48 / 72px.
  - Home closer: 44 / 80px.
  - The home "$0" figure: 120 / 160 / 220px at line-height 0.9, with the zero-fig gradient.
  - Plan price figures: 72 / 88px at line-height 1, tabular. The featured $0 gets zero-fig, and the others are ink.
- **Headline** (700, 1.08, -0.028em, `.headline`):
  - Section default: 40 / 56px.
  - Home emphasis: 40 / 64px.
  - Tile headlines: 36 / 48px.
  - Statement lines: 32 / 48px.
  - Pricing secondary: 36 / 44px.
  - Price figures: 32px with tabular numbers.
- **Subhead** (500, 1.3, -0.012em, `.subhead`): the one-line follow-up under a headline. 19 / 24px by default, 21 / 28px under the hero, 19 / 21px on light content sections, 17 / 21px inside gallery cards. Use night-muted on black and ink-2 on light.
- **Title** (600, -0.015em to -0.02em): the "Due today" line above the $0 (21 / 24px), FAQ summaries (19 / 21px) and card titles (19px).
- **Body** (400, 1.45–1.55): 17 / 21px for lead paragraphs, 17 / 19px in tiles, 16px in lists, 15px for plan details. Keep measure to 420–640px containers.
- **Label** (600, 14px): field labels. Smaller sizes: 14px meta, 13px tags and fine print, 12px footer text and the nav CTA. Nav links are 12.5px.

### Named Rules
**The Stay On The Ramp Rule.** Headline sizes come in pairs from the list above (40/56, 36/48, 32/48, 48/64/88, 52/72/96). Do not add one-off steps.

**The Title Not Eyebrow Rule.** Small lines above headlines are sentence-case titles in Inter 600 at 21px or larger. The site has no uppercase, letter-spaced kickers.

## Layout

The page is a vertical stack of full-bleed tiles. Content inside them is centred on a 1024px container (`max-w-[1024px]`) with a 24px side gutter (20px in the nav and footer). Section tiles use 96px vertical padding, rising to 128px at md. Hero tiles start tighter (56 → 80px top) because the device frame fills the bottom and is cropped by the tile edge (`translate-y` 6–18%). From sm (640px) up, the home hero shows the MacBook frame. Below 640px it swaps to the iPhone frame (64% wide, max 260px) with the mobile screenshot.

Two-up and bento mosaics sit on a white ground with a 12px gap and 12px outer padding, so each tile reads as a rounded card with white between. Services uses a 7-column md grid with spans of 4+3 and 3+3. Pricing uses a 2-column grid with a 20px gap on a snow ground. Form pages (audit, contact) use a two-column lg grid: copy on the left, a fixed 480–560px form card on the right.

The concept gallery is a horizontal scroll-snap row (`.snap-row`, columns min(72vw, 300px), 24px gap). From lg up it becomes a centred 3 × 300px grid.

Breakpoints are Tailwind defaults: sm 640, md 768, lg 1024. Nav links collapse to a full-width overlay menu below md.

## Elevation & Depth

Surfaces are flat. Depth belongs to the product: the device frames cast large, soft drop shadows, and the hero gets a blurred radial glow underneath. Form cards and the floating SERP panel on services use one soft, low-offset ambient shadow. The nav is the only translucent layer (`rgba(22,22,23,0.72)` with a 24px backdrop blur, 150% saturation and a white/10 bottom hairline).

### Shadow Vocabulary
- **Device lift** (`0 30px 80px -20px rgba(0,0,0,0.6)` on the MacBook lid, `0 18px 40px -12px rgba(0,0,0,0.55)` on its base, `0 30px 60px -20px rgba(0,0,0,0.45)` on the iPhone): gives the product frames weight.
- **Form card** (`0 24px 60px -30px rgba(0,0,0,0.25)`): the white form card on snow.
- **Floating panel** (`0 20px 50px -20px rgba(0,0,0,0.6)`): a white mock panel sitting on a dark tile.
- **Hero glow** (`.tile-glow`: radial red 45% → navy 25%, blur 40px, under the tile's bottom edge): black hero tiles only.

### Named Rules
**The Product Casts The Shadow Rule.** Shadows go on devices and on cards that float over a contrasting ground. Tiles and plan cards stay flat. Separation comes from colour change and the 12px white gap.

## Shapes

Shapes are rounded the way Apple hardware is rounded. Buttons and tags are full pills (980px). Mosaic tiles and form or plan cards use 28px. Inset chips on colour tiles (the day-steps and checklist rows) use 16px with a 1px white ring at 15–25% opacity. Fields use 12px. The MacBook lid has 18px top corners, and the iPhone uses proportional 14% / 6.5% radii with a Dynamic Island pill. Full-bleed section tiles have square edges. Only tiles inside a mosaic get the 28px corner.

## Components

### Buttons
Pill-shaped, quietly tactile, with Apple's proportions.
- **Shape:** full pill (980px), minimum 44px tall, 11px × 22px padding, 17px/500 type at -0.01em.
- **Primary (red):** red fill and white text. Hover deepens to red-deep. Active scales to 0.97.
- **Ghost:** red text with a 1.5px inset red ring. Hover fills red with white text. On dark grounds (`.on-dark`) the ring and text become white at 85%, and hover goes white-on-black.
- **White:** white fill with ink text, used on colour tiles. Hover moves to snow.
- **Focus:** a 3px sky outline with 3px offset.
- **Pairing:** the hero pairs filled red with ghost, side by side, with a 12px gap.

### Chevron Links
The workhorse secondary action: 17px/500 text followed by a small stroked chevron SVG at 0.6em. On hover the text underlines (3px offset) and the chevron moves 2px right. Red on light, red-bright on dark, white on colour tiles. Several of them sit inline with 32px horizontal gaps.

### Tiles / Containers
- **Full-bleed tiles:** black, snow, white, red (160° red gradient with an ember radial highlight top-right) and navy (170° navy gradient with a sky radial highlight top-left). `.tile` sets `overflow: hidden` and `isolation: isolate` so devices crop at the tile edge.
- **Card tiles:** the same fills with a 28px radius, 40px padding (56px at md), and 360–540px minimum heights. Content is pinned top and bottom with `mt-auto`.
- **Plan cards:** white, 28px radius, 32–40px padding. The featured plan gets a 2px red ring and a red pill tag. Other plans get a snow tag in ink-2.

### Inputs / Fields
- **Style:** white fill, 1px hairline border, 12px radius, minimum 52px tall, 14px × 16px padding, 17px text, pewter placeholder.
- **Hover:** the border darkens to pewter.
- **Focus:** the border turns red, with a 4px red halo at 18% opacity.
- **Select:** `.field-select` adds `appearance: none`, 44px right padding and a red (#E3262F) stroked chevron SVG, 14 × 8px, set 18px from the right.
- **Label:** 14px/600 ink, 6px above the field.
- **Container:** a white 28px form card with the form-card shadow on a snow ground, and a full-width red pill to submit.

### Navigation
A sticky 48px bar at `rgba(22,22,23,0.72)` with heavy backdrop blur and a 1px white/10 bottom hairline. The wordmark is 17px/600 white "Capital" plus red-bright "Sites". Links are 12.5px at #d2d2d7/85% and turn white on hover or when current (`aria-current`). A small 28px red pill CTA ("Get a free audit", 12px) sits at the right. Below md, a hamburger opens a night-2 panel with 24px/600 links. The footer is snow, 12px ink-2, with a fine-print line, three link columns and hairline dividers.

### Device Frames (signature)
`MacBook` and `IPhone` are CSS-drawn frames for real screenshots of the concept sites. The MacBook is a dark lid with an inset bezel ring on a 16:10 screen, and its aluminium base has a notch. The iPhone uses a 390:844 aspect ratio, a double inset bezel and a Dynamic Island. Screens use `object-cover object-top`. In hero and tile compositions the device sits at the bottom and is cropped by the tile. The home hero picks the device by viewport: MacBook from sm up, iPhone below.

### Scroll Rise (motion)
`.rise` is CSS scroll-driven (`animation-timeline: view()`). It is transform-only: the element moves from `translateY(40px)` to rest over entry 0–40%, with no opacity change and no scale. It only runs when `animation-timeline` is supported and the user has no reduced-motion preference, so content is always visible otherwise. Interaction transitions are 200ms on `cubic-bezier(0.22, 1, 0.36, 1)`.

## Do's and Don'ts

### Do:
- **Do** build sections as full-bleed tiles alternating black and snow or white, with a red or navy tile as punctuation.
- **Do** take every display and headline size from the ramp (e.g. 52/72/96, 48/64/88, 40/56, 36/48) at Inter 700 with the `.display` or `.headline` tracking.
- **Do** show the product as real concept-site screenshots in the MacBook or iPhone frames, cropped by the tile edge.
- **Do** end a section with one pill pair or one to two chevron links. Use red on light, red-bright on dark, white on colour.
- **Do** keep keyboard focus visible with the 3px sky outline.
- **Do** keep the `.rise` reveal CSS-only, transform-only (no opacity fade), and gated by `prefers-reduced-motion`.

### Don't:
- **Don't** use the red → ember gradient text anywhere but a "$0" figure.
- **Don't** add stock photography, icon-card grids or testimonial carousels. The devices and the type carry the page.
- **Don't** put uppercase letter-spaced eyebrows above headlines. Use a sentence-case 21px+ title line or nothing.
- **Don't** put shadows on tiles or plan cards. Shadows belong to devices and to floating cards.
- **Don't** use `red-brand` (#8B1A1A) or any concept-demo styling on the main site. Those belong to the portfolio demo worlds.
- **Don't** revert to the receipt / thermal-paper world (cream paper, monospace, Oswald). The owner rejected it.
