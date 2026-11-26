---
name: CapitalSites
description: A small Canadian web studio for independent small businesses across Canada, presented the way Apple presents a product, with full-bleed tiles, big Poppins headlines and real sites on real screens.
colors:
  red: "#C8102E"
  red-deep: "#A50D26"
  ink: "#1D1D1F"
  ink-2: "#6E6E73"
  line: "#D2D2D7"
  snow: "#F5F5F7"
  white: "#FFFFFF"
  night: "#000000"
  night-2: "#161617"
  night-text: "#F5F5F7"
  night-muted: "#A1A1A6"
typography:
  display:
    fontFamily: "Poppins, Inter, sans-serif"
    fontSize: "112px"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Poppins, Inter, sans-serif"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
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
  button-ghost-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
  button-ghost-on-dark-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "11px 22px"
  button-white-hover:
    backgroundColor: "{colors.snow}"
  button-white-on-red:
    backgroundColor: "{colors.white}"
    textColor: "{colors.red}"
    rounded: "{rounded.pill}"
    padding: "11px 22px"
  chevron-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  chevron-link-hover:
    textColor: "{colors.red}"
  chevron-link-on-dark:
    textColor: "{colors.white}"
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
  tile-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  tile-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  tile-hero:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
  card-tile:
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  nav-bar:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    height: "56px"
  nav-cta:
    backgroundColor: "{colors.white}"
    textColor: "{colors.red}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "32px"
  nav-cta-hover:
    backgroundColor: "{colors.snow}"
  nav-mobile-panel:
    backgroundColor: "{colors.red-deep}"
    textColor: "{colors.white}"
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

CapitalSites is a small Canadian web studio that sells a website plan, and the site presents that plan the way Apple presents a phone: the product is shown big, on real screens, and priced plainly. Every section is a full-bleed tile. The brand opens in red: a solid red nav bar sits over a red hero, then true black, white and Apple grey alternate as the ground, with solid red and near-black ink tiles as punctuation. Headlines are set in Poppins (800 for display, 700 for headlines), the geometric face that matches the owner's logo wordmark, large enough to carry a section alone. Inter carries body and UI text. The supporting copy is one short line and one chevron link.

The product imagery is the studio's own work: screenshots of the three concept sites (`public/shots/*.jpg`) set inside CSS-drawn MacBook and iPhone frames. There is no stock photography, no icon-card grid and no testimonial carousel. Depth comes from the devices, not from card chrome. Motion is a single transform-only scroll-driven rise, written in CSS, which disappears when reduced motion is requested.

This world replaces the earlier receipt world, which the owner rejected as plain. The three concept demos under `src/app/portfolio/{fade-and-co,ember-kitchen,maison-noir}` are separate worlds with their own styling and are out of scope here. The legacy `--color-red-brand` (#8B1A1A) token exists only for their banners and is not part of this system.

The owner's logo is the brand mark: a full-colour symbol with a "CapitalSites" wordmark (`public/logo-full.png`), a colour symbol alone (`public/logo-mark.png`) and a solid white symbol for red or dark grounds (`public/logo-mark-white.png`). All have transparent backgrounds. **Open brand question (owner to decide):** the symbol includes a tower that resembles Parliament's Peace Tower, while the owner's earlier brief said no government-style imagery in the logo or header. The owner supplied this logo and asked for it to be used, so it ships as is; this system does not resolve the conflict.

**Key Characteristics:**
- A red opening: solid red nav bar over a red radial hero, both with white type.
- Full-bleed alternating tiles below: black, snow, white, then a solid red or ink tile for punctuation.
- One accent only: deep maple red. No secondary hue.
- Poppins display (800, -0.025em) and headline (700, -0.02em) type with balanced wrapping; Inter for everything else.
- Pill buttons (980px radius) and ink chevron text links ("Learn more ›") that turn red on hover.
- Real concept-site screenshots inside CSS MacBook and iPhone frames.
- Centred composition on a 1024px container. Tiles in a mosaic sit 12px apart on white.

## Colors

The palette is Apple neutrals (black, white, snow, ink greys) plus a single deep maple red. Red marks the nav bar and home hero grounds, primary buttons, links on hover and key highlights, and nothing else.

### Primary
- **Maple Red** (`red`): the nav bar ground, the home hero ground (top of its radial), filled CTAs, the text of white pills on red grounds, chevron links on hover (light grounds), checkmarks, the featured-plan ring and tag, the "$0" figures, the pricing h1's second line, the contact page's inline email link, text selection, and the solid red tile. Contrast: 5.88:1 on white and 5.88:1 for white on it, 5.40:1 on snow, 3.57:1 on black.
- **Pressed Red** (`red-deep`): hover state for filled red pills, the bottom edge of the home hero radial, and the mobile menu panel. White on it is 7.82:1.

### Neutral
- **Ink** (`ink`): body and headline text on light grounds, the ink tile, the default colour of chevron links, focus outlines on light grounds, the focused field border and ring, and the select chevron.
- **Graphite** (`ink-2`): secondary copy, footer text, placeholders, field hover borders and the unfeatured plan tag. 5.07:1 on white and 4.66:1 on snow, so it is the lightest grey allowed for text on light grounds.
- **Hairline** (`line`): field borders and footer dividers.
- **Snow** (`snow`): the grey tile, the footer, form-page and pricing grounds, and the unfeatured plan tag.
- **White** (`white`): white tiles, the mosaic gutter colour, text on red grounds and ink tiles, the nav CTA fill, the logo symbol on red, and focus outlines on dark grounds.
- **Night** (`night`): the black tile. It is pure #000, not a near-black.
- **Night Bar** (`night-2`): still defined, but no main-site surface uses it since the nav moved to red. Do not reach for it for new surfaces without a reason.
- **Night Text** (`night-text`) and **Night Muted** (`night-muted`): primary and secondary text on black tiles.

Device frames (MacBook lid and base, iPhone body and bezel) use their own local metal and glass greys inside the frame classes. They are material colours, not palette tokens, and are not to be reused elsewhere.

### Named Rules
**The One Accent Rule.** Red is the only accent. As a full ground it is allowed in two places only, the first things a visitor sees: the nav bar and the home hero (owner request: the first screen should pop). Below that first screen the standard rule applies. Otherwise it goes on primary buttons, links on hover and key highlights (the $0 figures, the featured plan, checkmarks). Every other surface is a neutral. Red text is for large type or for white grounds (and snow, 5.40:1). Gradients are not used for text. The red tile is solid; the home hero's radial is the one red gradient, and every stop in it is red or darker.

**The Red On Black Is Large Only Rule.** Red on black is 3.57:1, which passes only for large text. It appears once, on the pricing h1's second line at 48–88px. Body-size links and copy on dark grounds stay white. Text on red grounds (tiles, hero, nav) is white or white at 90% (4.95:1), never lower.

## Typography

**Display Font:** Poppins (600/700/800 via `next/font`, token `--font-display`, falling back to Inter)
**Body Font:** Inter (via `next/font`, token `--font-sans`, with -apple-system, Helvetica Neue, Arial fallback)
**Label Font:** Inter

**Character:** Poppins sets `.display`, `.headline` and the nav wordmark; it was chosen because it matches the owner's logo wordmark. Its round geometry against Inter's neutral UI text gives the brand a friendlier voice than a single grotesque. Hierarchy comes from size and weight jumps (800/700 against 400/500). `.display` adds 0.06em word-spacing because Poppins at -0.025em crowds its word gaps. Inter keeps `cv11` and `ss01` on globally, and prices use `tabular-nums`.

### Hierarchy
The frontmatter records each role's top step. Every role is responsive, and these are the steps the pages actually use, mobile → sm → md. New work should pick from this ramp rather than invent sizes.

- **Display** (Poppins 800, line-height 1.02, -0.025em, word-spacing 0.06em, `.display`):
  - Home hero h1 ("Your website. Rebuilt."): 56 / 80 / 112px at line-height 0.95, set on two lines with a hard break, with no label line above it.
  - Page heroes (pricing, services, portfolio): 48 / 64 / 88px.
  - Form-page and section heroes (audit, contact, portfolio section): 48 / 72px.
  - Home closer: 44 / 80px.
  - The home "$0" figure: 120 / 160 / 220px at line-height 0.9, in solid red (`.zero-fig`).
  - Plan price figures: 72 / 88px at line-height 1, tabular. The featured $0 is red, and the others are ink.
- **Headline** (Poppins 700, 1.08, -0.02em, `.headline`):
  - Section default: 40 / 56px.
  - Home emphasis: 40 / 64px.
  - Tile headlines: 36 / 48px.
  - Statement lines: 32 / 48px.
  - Pricing secondary: 36 / 44px.
  - Price figures: 32px with tabular numbers.
- **Subhead** (500, 1.3, -0.012em, `.subhead`): the one-line follow-up under a headline. 19 / 24px by default, 21 / 30px under the hero, 19 / 21px on light content sections, 17 / 21px inside gallery cards. Use night-muted on black, white or white/90 on red and ink, and ink-2 on light.
- **Title** (600, -0.015em to -0.02em): the "Due today" line above the $0 (21 / 24px), FAQ summaries (19 / 21px) and card titles (19px).
- **Body** (400, 1.45–1.55): 17 / 21px for lead paragraphs, 17 / 19px in tiles, 16px in lists, 15px for plan details. Keep measure to 420–640px containers.
- **Label** (600, 14px): field labels. Smaller sizes: 14px meta, 13px tags, fine print and the nav CTA (600), 12px footer text. Nav links are 14px/500.

### Named Rules
**The Stay On The Ramp Rule.** Headline sizes come in pairs from the list above (40/56, 36/48, 32/48, 48/64/88, 56/80/112). Do not add one-off steps.

**The Poppins For Display Only Rule.** Poppins is for `.display`, `.headline` and the wordmark. Body, subheads, labels, buttons and nav links stay in Inter.

**The Title Not Eyebrow Rule.** Small lines above headlines are sentence-case titles in Inter 600 at 21px or larger. The site has no uppercase, letter-spaced kickers.

## Layout

The page is a vertical stack of full-bleed tiles. Content inside them is centred on a 1024px container (`max-w-[1024px]`) with a 24px side gutter (20px in the nav and footer). The nav is 56px tall. Section tiles use 96px vertical padding, rising to 128px at md. Hero tiles start tighter (64 → 96px top on home, 80 → 112px on pricing) because the device frame fills the bottom and is cropped by the tile edge (`translate-y` 6–18%). From sm (640px) up, the home hero shows the MacBook frame. Below 640px it swaps to the iPhone frame (64% wide, max 260px) with the mobile screenshot.

Two-up and bento mosaics sit on a white ground with a 12px gap and 12px outer padding, so each tile reads as a rounded card with white between. The home mosaic pairs a snow tile (with a red highlight on its last day bar) with an ink tile. Services uses a 6-column md grid with spans of 4+2, 3+3 and 3+3. Pricing uses a 2-column grid with a 20px gap on a snow ground. Form pages (audit, contact) use a two-column lg grid: copy on the left, a fixed 480–560px form card on the right. The portfolio stacks one card tile per concept site, alternating black, red and snow.

The concept gallery is a horizontal scroll-snap row (`.snap-row`, columns min(72vw, 300px), 24px gap). From lg up it becomes a centred 3 × 300px grid.

Breakpoints are Tailwind defaults: sm 640, md 768, lg 1024. Nav links collapse to a full-width overlay menu below md.

## Elevation & Depth

Surfaces are flat. Depth belongs to the product: the device frames cast large, soft drop shadows. The home hero carries its depth in the ground itself, a red radial that deepens to red-deep at the bottom edge; the pricing hero (black) keeps a blurred red glow underneath. Form cards and the floating SERP panel on services use one soft, low-offset ambient shadow. Nothing is translucent: the nav is solid red, separated only by a white/15 bottom hairline.

### Shadow Vocabulary
- **Device lift** (`0 30px 80px -20px rgba(0,0,0,0.6)` on the MacBook lid, `0 18px 40px -12px rgba(0,0,0,0.55)` on its base, `0 30px 60px -20px rgba(0,0,0,0.45)` on the iPhone): gives the product frames weight.
- **Form card** (`0 24px 60px -30px rgba(0,0,0,0.25)`): the white form card on snow.
- **Floating panel** (`0 20px 50px -20px rgba(0,0,0,0.6)`): a white mock panel sitting on a dark tile.
- **Hero radial** (`.tile-hero`: a red radial from the top over a second radial running from red-deep at the bottom edge out to red): the home hero only. Every stop is red or darker, so white text stays at 5.88:1 or better.
- **Hero glow** (`.tile-glow`: a red-only radial, red mixed to 40% into transparent, blur 40px, under the tile's bottom edge): black hero tiles only (now the pricing hero). It is not used on the red home hero.

### Named Rules
**The Product Casts The Shadow Rule.** Shadows go on devices and on cards that float over a contrasting ground. Tiles and plan cards stay flat. Separation comes from colour change and the 12px white gap.

## Shapes

Shapes are rounded the way Apple hardware is rounded. Buttons and tags are full pills (980px). Mosaic tiles and form or plan cards use 28px. Inset chips on colour tiles (the day-steps on red and checklist rows on ink) use 16px with a 1px white ring at 15–25% opacity. Fields use 12px. The MacBook lid has 18px top corners, and the iPhone uses proportional 14% / 6.5% radii with a Dynamic Island pill. Full-bleed section tiles have square edges. Only tiles inside a mosaic get the 28px corner. The logo symbol is the one non-geometric silhouette, used only as supplied.

## Components

### Buttons
Pill-shaped, quietly tactile, with Apple's proportions.
- **Shape:** full pill (980px), minimum 44px tall, 11px × 22px padding, 17px/500 type at -0.01em.
- **Primary (red):** red fill and white text. Hover deepens to red-deep. Active scales to 0.97.
- **Ghost:** red text with a 1.5px inset red ring. Hover fills red with white text. On dark grounds (`.on-dark`, which includes red and ink tiles) the ring and text become white, and hover goes white with ink text.
- **White:** white fill with ink text; on red grounds (the hero and the nav) its text turns red. Hover moves to snow.
- **Focus:** a 3px ink outline with 3px offset, switching to white inside `.on-dark`.
- **Pairing:** the home hero pairs a white pill (red text) with a white ghost pill, side by side, with a 12px gap. The red closer pairs white with ghost. Light grounds pair filled red with red ghost.

### Chevron Links
The workhorse secondary action: 17px/500 text followed by a small stroked chevron SVG at 0.6em. Ink by default on light grounds. On hover the text turns red, underlines (3px offset), and the chevron moves 2px right. On dark grounds (`.on-dark`: black, red and ink tiles) the link is white at rest and on hover, keeping only the underline and chevron nudge. Focus is a 2px currentColor outline with 3px offset and a 4px radius. Several of them sit inline with 32px horizontal gaps.

### Tiles / Containers
- **Full-bleed tiles:** black, snow, white, ink and red, all solid fills, plus the hero tile (`.tile-hero`), the one red radial. `.tile` sets `overflow: hidden` and `isolation: isolate` so devices crop at the tile edge. Red, hero and ink tiles carry `.on-dark` so pills and links invert.
- **Card tiles:** the same fills with a 28px radius, 40px padding (56px at md), and 360–540px minimum heights. Content is pinned top and bottom with `mt-auto`.
- **Plan cards:** white, 28px radius, 32–40px padding. The featured plan gets a 2px red ring and a red pill tag. Other plans get a snow tag in ink-2. Plan features use red stroked checkmarks.

### Inputs / Fields
- **Style:** white fill, 1px hairline border, 12px radius, minimum 52px tall, 14px × 16px padding, 17px text, graphite placeholder.
- **Hover:** the border darkens to graphite.
- **Focus:** the border turns ink, with a 4px neutral ink ring at 14% opacity. Focus is deliberately not red, so the accent is never read as an error state.
- **Select:** `.field-select` adds `appearance: none`, 44px right padding and an ink stroked chevron SVG, 14 × 8px, set 18px from the right.
- **Label:** 14px/600 ink, 6px above the field.
- **Container:** a white 28px form card with the form-card shadow on a snow ground, and a full-width red pill to submit.

### Navigation
A sticky, solid red 56px bar (`.nav-red .on-dark`) with a 1px white/15 bottom hairline. The lockup is the white logo symbol (`logo-mark-white.png`, 32px tall) with "CapitalSites" beside it in Poppins 700 19px, -0.02em, white, 10px apart. Links are 14px/500 Inter in white/90 (4.95:1 on red); hover and current (`aria-current`) go full white with a 2px underline at a 6px offset. The CTA ("Get a free audit") is a 32px white pill with 13px/600 red text, hovering to snow. Below md, a hamburger opens a red-deep panel with a white/10 top hairline and 24px/600 white links.

### Footer
Snow ground, 12px ink-2 text, a fine-print line, then a four-column grid from sm (1.2fr 1fr 1fr 1fr): the full-colour logo (`logo-full.png`, 96px tall) in the first column, then three link columns with ink 600 headings. Hairline dividers separate the rows; links turn ink and underline on hover. Below sm the logo spans both columns.

### Logo
The owner's logo, used as supplied, never redrawn or recoloured beyond the provided files. Full colour (`logo-full.png`, mark plus wordmark, with the "Ottawa" line removed) on light grounds; the white symbol (`logo-mark-white.png`) on red or dark grounds, paired with the Poppins wordmark set as text. The Peace Tower resemblance is an open owner question (see Overview).

### FAQ Rows
Native `details` rows separated by hairlines. The summary is 19 / 21px/600 with an ink-2 plus icon that rotates 45° when open. Focus is a 2px ink outline.

### Device Frames (signature)
`MacBook` and `IPhone` are CSS-drawn frames for real screenshots of the concept sites. The MacBook is a dark lid with an inset bezel ring on a 16:10 screen, and its aluminium base has a notch. The iPhone uses a 390:844 aspect ratio, a double inset bezel and a Dynamic Island. Their metal and glass greys are local to the frame classes. Screens use `object-cover object-top`. In hero and tile compositions the device sits at the bottom and is cropped by the tile. The home hero picks the device by viewport: MacBook from sm up, iPhone below.

### Scroll Rise (motion)
`.rise` is CSS scroll-driven (`animation-timeline: view()`). It is transform-only: the element moves from `translateY(40px)` to rest over entry 0–40%, with no opacity change and no scale. It only runs when `animation-timeline` is supported and the user has no reduced-motion preference, so content is always visible otherwise. Interaction transitions are 200ms on `cubic-bezier(0.22, 1, 0.36, 1)`.

## Do's and Don'ts

### Do:
- **Do** open with the red nav and red hero, then build sections as full-bleed tiles alternating black and snow or white, with a solid red or ink tile as punctuation.
- **Do** take every display and headline size from the ramp (e.g. 56/80/112, 48/64/88, 40/56, 36/48) in Poppins via `.display` (800) or `.headline` (700).
- **Do** use the white logo symbol on red or dark grounds and the full-colour logo on light grounds.
- **Do** show the product as real concept-site screenshots in the MacBook or iPhone frames, cropped by the tile edge.
- **Do** end a section with one pill pair or one to two chevron links. Chevrons are ink on light (red on hover) and white on dark, red and ink tiles.
- **Do** keep keyboard focus visible: a 3px ink outline on pills (white on dark), a 2px currentColor outline on chevron links, and an ink border and ring on fields.
- **Do** keep text on red grounds (tiles, hero, nav) at white or white/90 (4.95:1) and text on light grounds no lighter than ink-2.
- **Do** keep the `.rise` reveal CSS-only, transform-only (no opacity fade), and gated by `prefers-reduced-motion`.

### Don't:
- **Don't** add a second accent hue, and don't put gradients on text or on the red tile. The home hero radial is the only red gradient, and it never uses a stop lighter than red.
- **Don't** use red as a full ground beyond the nav bar and the home hero. Sections below the first screen are black, ink, snow or white, with red only on buttons, link hover and key highlights.
- **Don't** set body, buttons or nav links in Poppins. It is the display face only.
- **Don't** set body-size red text on black (3.57:1). Red on black is for large display text only.
- **Don't** use red for field focus or other neutral states. Red must never read as an error.
- **Don't** use the Canadian flag, a maple leaf, a "Canada" wordmark or government-style imagery, and don't imply any government affiliation. (Exception approved by the owner on 2026-11-26: the logo's tower resembles the Peace Tower and stays as part of the brand mark.)
- **Don't** add stock photography, icon-card grids or testimonial carousels. The devices and the type carry the page.
- **Don't** put uppercase letter-spaced eyebrows above headlines. Use a sentence-case 21px+ title line or nothing.
- **Don't** put shadows on tiles or plan cards. Shadows belong to devices and to floating cards.
- **Don't** use `red-brand` (#8B1A1A) or any concept-demo styling on the main site. Those belong to the portfolio demo worlds.
- **Don't** revert to the receipt / thermal-paper world (cream paper, monospace, Oswald). The owner rejected it.
