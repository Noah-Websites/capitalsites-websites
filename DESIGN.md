---
name: CapitalSites
description: A small Canadian web studio that sets up digital operations and websites for contractors and home-service businesses across Canada, presented the way Apple presents a product, with full-bleed tiles, big Poppins headlines and the working system on real screens.
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
  button-hero-link:
    backgroundColor: "rgb(255 255 255 / 0.1)"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-hero-link-hover:
    backgroundColor: "rgb(255 255 255 / 0.2)"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    height: "40px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    height: "40px"
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
  input-field-sm:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 14px"
    height: "44px"
  input-field-compact:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "6px 14px"
    height: "36px"
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
  badge-available:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  badge-pilot:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  badge-coming-soon:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  step-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.inset}"
    padding: "24px"
  step-card-final:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
  demo-banner:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    padding: "10px 20px"
  demo-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "32px"
  demo-panel:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.inset}"
    padding: "24px"
  demo-tab:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  demo-tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  demo-slot:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    height: "40px"
  demo-slot-taken:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
---

# Design System: CapitalSites

## Overview

**Creative North Star: "The Product Page"**

CapitalSites is a small Canadian web studio that sets up digital operations and websites for contractors and home-service businesses, and the site presents that work the way Apple presents a phone: the product, a working system, is shown big, running on real screens, and priced plainly. Every section is a full-bleed tile. The brand opens in red: a solid red nav bar sits over a red hero, then true black, white and Apple grey alternate as the ground, with near-black ink tiles as punctuation. Headlines are set in Poppins (800 for display, 700 for headlines), the geometric face that matches the owner's logo wordmark, large enough to carry a section alone. Inter carries body and UI text. The supporting copy is one short line and one chevron link.

The product imagery is the studio's own work, set inside CSS-drawn MacBook and iPhone frames (`public/shots/*.jpg`): the fictional Maple Home Services demo on the home hero and in the demo teaser, and the three concept sites in the "Websites, too." band and on Services and Portfolio. There is no stock photography, no icon-card grid and no testimonial carousel. Depth comes from the devices, not from card chrome. Motion is a single transform-only scroll-driven rise, written in CSS, which disappears when reduced motion is requested.

This world replaces the earlier receipt world, which the owner rejected as plain. The three concept demos under `src/app/portfolio/{fade-and-co,ember-kitchen,maison-noir}` are separate worlds with their own styling and are out of scope here. The legacy `--color-red-brand` (#8B1A1A) token exists only for their banners and is not part of this system. The `/demo` console is not a separate world: it is built from this system's tiles, panels, pills and fields, and adds only a set of status colours scoped to that page (see Colors).

The owner's logo is the brand mark: a full-colour symbol with a "CapitalSites" wordmark (`public/logo-full.png`), a colour symbol alone (`public/logo-mark.png`) and a solid white symbol for red or dark grounds (`public/logo-mark-white.png`). All have transparent backgrounds. **Peace Tower note:** the symbol includes a tower that resembles Parliament's Peace Tower, while the owner's earlier brief said no government-style imagery in the logo or header. The owner supplied this logo, asked for it to be used and approved keeping the tower on 2026-11-26, so it ships as is. It is an exception for the brand mark, not a precedent for new imagery.

**Key Characteristics:**
- A red opening: solid red nav bar over a red radial hero, both with white type.
- Full-bleed alternating tiles below: black, snow and white, with an ink tile for punctuation.
- One accent only: deep maple red. No secondary hue; the demo's status colours stay inside `/demo`.
- Poppins display (800, -0.025em) and headline (700, -0.02em) type with balanced wrapping; Inter for everything else.
- Pill buttons (980px radius) and ink chevron text links ("Learn more ›") that turn red on hover.
- Real screenshots inside CSS MacBook and iPhone frames: the Maple demo for operations, the concept sites for websites.
- Centred composition on a 1024px container. Tiles in a mosaic sit 12px apart on white.

## Colors

The palette is Apple neutrals (black, white, snow, ink greys) plus a single deep maple red. Red marks the nav bar and home hero grounds, primary buttons, links on hover and key highlights, and nothing else.

### Primary
- **Maple Red** (`red`): the nav bar ground, the home hero ground (top of its radial), filled CTAs and the ghost pill's ring and text, the text of white pills on red grounds, chevron and inline links on hover (light grounds), checkmarks, the Founding customer pilot badge, the final Steps card, the "7" figure on Services, the pricing h1's second line, and text selection. Contrast: 5.88:1 on white and 5.88:1 for white on it, 5.40:1 on snow, 3.57:1 on black.
- **Pressed Red** (`red-deep`): hover state for filled red pills, the bottom edge of the home hero radial, and the mobile menu panel. White on it is 7.82:1.

### Neutral
- **Ink** (`ink`): body and headline text on light grounds, the ink tile, the default colour of chevron links, focus outlines on light grounds, the focused field border and ring, and the select chevron. It also fills the Available badge, the selected demo tab and the sticky "Fictional demonstration" banner on `/demo` (white on ink is 16.83:1), and it is the accent colour of checkboxes and radios.
- **Graphite** (`ink-2`): secondary copy, footer text, placeholders, field hover borders, table headers, the Not available yet badge and taken time slots. 5.07:1 on white and 4.66:1 on snow, so it is the lightest grey allowed for text on light grounds.
- **Hairline** (`line`): field borders, footer dividers, table and list rules, and the 1px rings on the Not available yet badge, the Steps cards, the demo card and its rows, unselected demo tabs, time slots and the quiet button.
- **Snow** (`snow`): the grey tile, the footer, form-page, pricing and demo grounds, the demo's panels and clock, and the cards of the home "Two ways to start." pair.
- **White** (`white`): white tiles, the mosaic gutter colour, text on red grounds and ink tiles, the nav CTA fill, the logo symbol on red, and focus outlines on dark grounds and the red nav. On snow it is the card colour: form, price-group and demo cards, the demo's rows, and the Steps cards.
- **Night** (`night`): the black tile. It is pure #000, not a near-black.
- **Night Bar** (`night-2`): still defined, but no main-site surface uses it since the nav moved to red. Do not reach for it for new surfaces without a reason.
- **Night Text** (`night-text`) and **Night Muted** (`night-muted`): primary and secondary text on black tiles.

Device frames (MacBook lid and base, iPhone body and bezel) use their own local metal and glass greys inside the frame classes. They are material colours, not palette tokens, and are not to be reused elsewhere.

### Demo Status (scoped to `/demo`)
The Maple demo marks health, alerts and request status with three tinted pairs and three dots. They live in `globals.css` as `.status-*` classes, not as palette tokens, and each one always sits beside a word.
- **Status Green** (#1E7B3C on #E6F4EA, 4.68:1): won requests, delivered alerts, confirmed visits, accepted quotes, successful results.
- **Status Amber** (#8A5A00 on #FBF0DC, 5.25:1): new requests, waiting alerts, sent quotes, anything that needs attention.
- **Status Red** (#B3261E on #FBE9E7, 5.58:1): failures, overdue replies, emergencies, lost requests, declined or expired quotes, blocked actions. It is a different red from Maple Red and never stands in for it.
- **Health dots** (#1E7B3C, #C27C0E, #B3261E): 14px dots, each followed by its sentence ("Green: everything is working"). The amber dot is 3.12:1 on snow, one more reason it never appears without its words.

### Named Rules
**The One Accent Rule.** Red is the only accent. As a full ground it is allowed in two places only, the first things a visitor sees: the nav bar and the home hero (owner request: the first screen should pop). Below that first screen the standard rule applies. Otherwise it goes on primary buttons, links on hover and key highlights (checkmarks, the pilot badge, the final Steps card). Every other surface is a neutral. Red text is for large type or for white grounds (and snow, 5.40:1). Gradients are not used for text. The home hero's radial is the one red gradient, and every stop in it is red or darker.

**The Red On Black Is Large Only Rule.** Red on black is 3.57:1, which passes only for large text. It appears once, on the pricing h1's second line ("Agreed in writing first."), at display size (40px and up, Poppins 800). Body-size links and copy on dark grounds stay white. Text on red grounds (the hero, the nav, the final Steps card, the pilot badge) is white or white at 90% (4.95:1), never lower.

**The Status Stays In The Demo Rule.** Green, amber and the status red exist only inside `/demo`, always paired with a word, and never as an accent, a decoration or a ground anywhere else. Maple Red never marks a problem, there or anywhere.

## Typography

**Display Font:** Poppins (600/700/800 via `next/font`, token `--font-display`, falling back to Inter)
**Body Font:** Inter (via `next/font`, token `--font-sans`, with -apple-system, Helvetica Neue, Arial fallback)
**Label Font:** Inter

**Character:** Poppins sets `.display`, `.headline` and the nav wordmark; it was chosen because it matches the owner's logo wordmark. Its round geometry against Inter's neutral UI text gives the brand a friendlier voice than a single grotesque. Hierarchy comes from size and weight jumps (800/700 against 400/500). `.display` adds 0.06em word-spacing because Poppins at -0.025em crowds its word gaps. Inter keeps `cv11` and `ss01` on globally, and prices use `tabular-nums`.

### Hierarchy
The frontmatter records each role's top step. Every role is responsive, and these are the steps the pages actually use, mobile → sm → md (lg where noted). New work should pick from this ramp rather than invent sizes.

- **Display** (Poppins 800, line-height 1.02, -0.025em, word-spacing 0.06em, `.display`):
  - Home hero h1 ("Better systems. / Better business."): 56 / 80 / 112px at mobile / sm / lg, line-height 0.95, set on two lines with a hard break, with no label line above it.
  - Page heroes (services, portfolio, about): 48 / 64 / 88px. The pricing h1 has drifted to 40 / 60 / 80px; that is not a step to reuse.
  - Form-page and section heroes (audit, contact, demo, privacy, portfolio sections): 48 / 72px.
  - Closers ("Start with a conversation." on Home and About): 44 / 80px.
  - Price figures (offer cards and the home "Two ways to start." pair): 60 / 72px at line-height 1, tabular, always ink. The Website Fix figure on Services runs 60 / 72 / 88px.
- **Headline** (Poppins 700, 1.08, -0.02em, `.headline`):
  - Section default: 40 / 56px.
  - Home emphasis: 40 / 64px.
  - Tile headlines: 36 / 48px.
  - Offer-card names and the demo card title: 32 / 36px.
  - Price-group titles on Pricing: 32 / 36 / 44px.
  - Price columns and Steps numerals: 32px with tabular numbers.
- **Subhead** (500, 1.3, -0.012em, `.subhead`): the one-line follow-up under a headline. 19 / 24px by default, including the value proposition under the home hero (white, up to 760px wide); 19 / 21px on light content sections; 17 / 21px inside gallery cards. Use night-muted on black, white or white/90 on red and ink, and ink-2 on light.
- **Title** (600, -0.015em to -0.02em): Privacy section titles (21 / 24px), FAQ summaries (19 / 21px), card, price-table and demo-panel titles (19px), and the names in Steps, price columns and payment terms (17px).
- **Body** (400, 1.45–1.55): 17 / 21px for lead paragraphs, 17 / 19px in tiles, 16px in lists, 15px for offer details, price notes and Steps copy. Dense UI (price tables, the demo) runs at 14–15px with 12–13px meta. Keep measure to 420–640px containers.
- **Label** (600, 14px): field labels. Smaller sizes: 14px meta and the demo banner, 13px tags, badges, table headers, fine print and the nav CTA (600), 12px footer text and demo status tags. Nav links are 14px/500.

### Named Rules
**The Stay On The Ramp Rule.** Headline sizes come in pairs from the list above (40/56, 36/48, 32/36, 48/64/88, 56/80/112). Do not add one-off steps.

**The Poppins For Display Only Rule.** Poppins is for `.display`, `.headline` and the wordmark. Body, subheads, labels, buttons and nav links stay in Inter.

**The Title Not Eyebrow Rule.** Small lines above headlines are sentence-case titles in Inter 600 at 21px or larger. The site has no uppercase, letter-spaced kickers.

## Layout

The page is a vertical stack of full-bleed tiles. Content inside them is centred on a 1024px container (`max-w-[1024px]`) with a 24px side gutter (20px in the nav and footer). The nav is 56px tall. Section tiles use 96px vertical padding, rising to 128px at md. Hero tiles start tighter (64 → 96px top on home, 80 → 112px on pricing) because the device frame fills the bottom and is cropped by the tile edge (`translate-y` 6–18%). From sm (640px) up, the home hero shows the MacBook frame. Below 640px it swaps to the iPhone frame (64% wide, max 260px) with the demo's mobile screenshot. On `/demo` the ink banner sticks under the nav, the hero is short (40 → 64px top) so the console starts in the first viewport, and the console's container widens to 1180px on a snow ground.

Two-up and bento mosaics sit on a white ground with a 12px gap and 12px outer padding, so each tile reads as a rounded card with white between. The home "Two ways to start." pair is two snow card tiles on one shared six-row subgrid from md, so name, badge, summary, list, price and actions line up across both. About pairs a snow tile with an ink tile. Services uses a 2-column md grid: the Website Fix card spans both columns, then offer cards and feature tiles sit side by side, and the operations offers repeat the grid as white cards on snow. Pricing stacks one white group card per service group, 20px apart, on a snow ground. Form pages (audit, contact) use a two-column lg grid: copy on the left, a fixed 480–560px form card on the right. The portfolio stacks one card tile per concept site, alternating black, snow and ink.

The phone gallery (the home demo teaser) is a horizontal scroll-snap row (`.snap-row`, columns min(72vw, 300px), 24px gap). From lg up it becomes a centred 3 × 300px grid.

Steps sit four across from md (two-up from sm, stacked below) and stretch to a shared bottom, with top offsets of 96, 64, 32 and 0px so each card rises exactly 32px above the last. "Websites, too." sets its three prices as hairline-topped columns from sm, 32px apart. Price tables use fixed layout and one shared set of column widths (32 / 28 / 18 / 22%), so every group's table lines up; below md they become stacked rows.

Breakpoints are Tailwind defaults: sm 640, md 768, lg 1024. Nav links collapse to a full-width overlay menu below md, and the Contact pill shows from sm. The demo's tab row scrolls sideways on phones without a visible scrollbar.

## Elevation & Depth

Surfaces are flat. Depth belongs to the product: the device frames cast large, soft drop shadows. The home hero carries its depth in the ground itself, a red radial that deepens to red-deep at the bottom edge; the pricing hero (black) keeps a blurred red glow underneath. Form cards and the floating SERP panel on services use one soft, low-offset ambient shadow. Offer and price cards, Steps and the demo card stay flat, set apart by colour or a 1px hairline ring. Nothing is translucent: the nav is solid red, separated only by a white/15 bottom hairline, and the `/demo` banner under it is solid ink.

### Shadow Vocabulary
- **Device lift** (`0 30px 80px -20px rgba(0,0,0,0.6)` on the MacBook lid, `0 18px 40px -12px rgba(0,0,0,0.55)` on its base, `0 30px 60px -20px rgba(0,0,0,0.45)` on the iPhone): gives the product frames weight.
- **Form card** (`0 24px 60px -30px rgba(0,0,0,0.25)`): the white form card on snow.
- **Floating panel** (`0 20px 50px -20px rgba(0,0,0,0.6)`): a white mock panel sitting on a dark tile.
- **Hero radial** (`.tile-hero`: a red radial from the top over a second radial running from red-deep at the bottom edge out to red): the home hero only. Every stop is red or darker, so white text stays at 5.88:1 or better.
- **Hero glow** (`.tile-glow`: a red-only radial, red mixed to 40% into transparent, blur 40px, under the tile's bottom edge): black hero tiles only (now the pricing hero). It is not used on the red home hero.

### Named Rules
**The Product Casts The Shadow Rule.** Shadows go on devices and on cards that float over a contrasting ground. Tiles, offer and price cards, Steps and the demo card stay flat. Separation comes from colour change, the 12px white gap or a 1px hairline ring.

## Shapes

Shapes are rounded the way Apple hardware is rounded. Buttons, tags, badges, demo tabs and time slots are full pills (980px). Mosaic tiles and form, offer, price-group and demo cards use 28px. Insets use 16px: checklist rows on ink tiles carry a 1px white/15 ring, and on light grounds the Steps cards, the demo's panels and clock, and small notes are white with a 1px hairline ring or plain snow. Fields use 12px, and so do the demo's rows, tables, stat tiles and result messages. The MacBook lid has 18px top corners, and the iPhone uses proportional 14% / 6.5% radii with a Dynamic Island pill. Full-bleed section tiles have square edges. Only tiles inside a mosaic get the 28px corner. The logo symbol is the one non-geometric silhouette, used only as supplied.

## Components

### Buttons
Pill-shaped, quietly tactile, with Apple's proportions.
- **Shape:** full pill (980px), minimum 44px tall, 11px × 22px padding, 17px/500 type at -0.01em.
- **Primary (red):** red fill and white text. Hover deepens to red-deep. Active scales to 0.97.
- **Ghost:** red text with a 1.5px inset red ring. Hover fills red with white text. On dark grounds (`.on-dark`: the hero, the nav, black and ink tiles) the ring and text become white, and hover goes white with ink text.
- **White:** white fill with ink text; on red grounds (the hero and the nav) its text turns red. Hover moves to snow.
- **Focus:** a 3px ink outline with 3px offset, switching to white inside `.on-dark`.
- **Pairing:** the home hero pairs a white pill (red text, "See how it works") with a white ghost pill ("See pricing"), side by side, with a 12px gap. Ink closers pair filled red with a white ghost. Light grounds pair filled red with red ghost.
- **Hero link pill:** below the hero pair, one sentence linking to the Website Fix: white/10 fill, a 1px white/40 ring, 10 × 20px padding, 16 / 17px/600 white text and a small chevron, hovering to white/20. White on it is 5.26:1 at rest and 4.53:1 on hover, so the fill never gets lighter. On phones it wraps to two balanced lines.
- **Small** (`.pill-sm`): 40px tall, 8 × 16px padding, 15px text, in the red, ghost and quiet variants. Dense UI only (the demo); marketing sections keep the 44px pill.
- **Quiet** (`.demo-quiet`): ink text with a 1.5px hairline ring that turns ink on hover, for low-stakes actions (Reset, Mark declined).
- **Offer actions:** offer cards use a filled red pill for available and pilot offers and a ghost pill for offers that are not available yet.

### Chevron Links
The workhorse secondary action: 17px/500 text followed by a small stroked chevron SVG at 0.6em. Ink by default on light grounds. On hover the text turns red, underlines (3px offset), and the chevron moves 2px right. On dark grounds (`.on-dark`: black and ink tiles, the hero and the nav) the link is white at rest and on hover, keeping only the underline and chevron nudge. Focus is a 2px currentColor outline with 3px offset and a 4px radius. Several of them sit inline with 32px horizontal gaps. Price-table rows end in a right-aligned chevron link. Inline links in running text (forms, Privacy, Thanks) are ink with a 3px-offset underline and turn red on hover.

### Tiles / Containers
- **Full-bleed tiles:** black, snow, white and ink, all solid fills, plus the hero tile (`.tile-hero`), the one red radial. `.tile` sets `overflow: hidden` and `isolation: isolate` so devices crop at the tile edge. Black, hero and ink tiles carry `.on-dark` so pills and links invert.
- **Card tiles:** the same fills with a 28px radius, 40px padding (56px at md), and, where a device or figure needs room, 300–520px minimum heights. Content is pinned top and bottom with `mt-auto`.
- **Offer cards** (`OfferCard`): a card tile, snow on white sections and white on snow, with 28px padding (40px from sm). The name (headline 32 / 36px) sits with its availability badge, then a 17px ink-2 description, 15px/600 titles ("What you get", "The build", "Every month") over 16px lists with red stroked checkmarks, and at the bottom the price figure, a 15px ink-2 note, a 15px/500 ink availability note when the offer is not available, and one pill.
- **"Two ways to start." pair** (home): two snow card tiles built like offer cards on one shared subgrid, each ending in a red pill beside a chevron link, over a 14px ink-2 note.
- **Price-group cards** (Pricing): white 28px cards on snow, 24–40px padding, a 32 / 36 / 44px headline and a 17px ink-2 intro above the group's price table.

### Availability Badges
One tag for every offer, rendered from `src/data/offers.ts`: a pill with 4 × 12px padding and 13px/600 text that never wraps.
- **Available:** ink fill and white text, with a small stroked check.
- **Founding customer pilot:** red fill and white text.
- **Not available yet:** white fill, ink-2 text and a 1px hairline ring.

Badges sit beside an offer's name (offer cards, price tables, the contact form's service note). They are labels, never buttons.

### Price Tables
One table per service group on Pricing. A 13px/600 ink-2 header row over a hairline, then hairline-separated rows: the service name (19px/600) over a 15px ink-2 summary; the price (21px/600, tabular) over a 14px ink-2 note; the badge; a right-aligned chevron link. Every group's table shares one fixed set of column widths (see Layout). Below md each row becomes a stacked block with hairline dividers.

### Steps
Four numbered cards for the process, on Home ("How it works.") and About ("How we work."). Each is a 16px white card with a 1px hairline ring on a snow tile, 20px padding (24px from md): a 32px headline numeral (tabular), a 17px/600 title and 15px ink-2 copy. From md the tops rise in 32px steps toward the last card, which is red with white text and white/90 copy, the section's one red highlight. Only the last step is red.

### Inputs / Fields
- **Style:** white fill, 1px hairline border, 12px radius, minimum 52px tall, 14px × 16px padding, 17px text, graphite placeholder.
- **Hover:** the border darkens to graphite.
- **Focus:** the border turns ink, with a 4px neutral ink ring at 14% opacity. Focus is deliberately not red, so the accent is never read as an error state.
- **Select:** `.field-select` adds `appearance: none`, 44px right padding and an ink stroked chevron SVG, 14 × 8px, set 18px from the right.
- **Label:** 14px/600 ink, 6px above the field.
- **Container:** a white 28px form card with the form-card shadow on a snow ground, and a full-width red pill to submit.
- **Compact sizes:** `.field-sm` (44px, 10 × 14px padding, 16px text) for dense forms such as the demo, and `.field-compact` (36px, 6px vertical padding, 14px text) for selects inside table rows. A small select moves its chevron to 14px from the right with 40px right padding.
- **Checkboxes and radios:** native controls with an ink accent colour.
- **Service select (contact form):** a native select lies transparently over a visible field so long service names wrap on phones; its focus ring shows on the visible field. The picked service's price line and badge appear beneath it in a 12px snow note.

### Navigation
A sticky, solid red 56px bar (`.nav-red .on-dark`) with a 1px white/15 bottom hairline. The lockup is the white logo symbol (`logo-mark-white.png`, 32px tall) with "CapitalSites" beside it in Poppins 700 19px, -0.02em, white, 10px apart. Links (Home, Services, Pricing, Demo, About, 32px apart) are 14px/500 Inter in white/90 (4.95:1 on red); hover and current (`aria-current`) go full white with a 2px underline at a 6px offset. The CTA is Contact: a 32px white pill with 13px/600 red text, hovering to snow, shown from sm. Keyboard focus on the bar is a 2px white outline at a 3px offset. Below md, a hamburger opens a red-deep panel with a white/10 top hairline and 24px/600 white links, Contact included.

### Footer
Snow ground, 12px ink-2 text. A fine-print line comes first (the currency note, then "Full terms are confirmed in your written scope before any work starts."), then a four-column grid from sm (1.2fr 1fr 1fr 1fr): the full-colour logo (`logo-full.png`, 96px tall) with the slogan "Better systems. Better business." under it in 13px/600 ink, then three link columns (Services, Studio, Get in touch) with ink 600 headings. Hairline dividers separate the rows; links turn ink and underline on hover. Below sm the logo spans both columns. The last row holds the copyright line and the email address.

### Logo
The owner's logo, used as supplied, never redrawn or recoloured beyond the provided files. Full colour (`logo-full.png`, mark plus wordmark, with the "Ottawa" line removed) on light grounds; the white symbol (`logo-mark-white.png`) on red or dark grounds, paired with the Poppins wordmark set as text. The favicon and app icons are the full-colour symbol (transparent, or on white for the Apple touch icon). The Peace Tower resemblance is an owner-approved exception (see Overview).

### FAQ Rows
Native `details` rows separated by hairlines. The summary is 19 / 21px/600 with an ink-2 plus icon that rotates 45° when open. Focus is a 2px ink outline. The same hairline rows carry the payment terms on Pricing and the sections of Privacy.

### Device Frames (signature)
`MacBook` and `IPhone` are CSS-drawn frames for real screenshots: the fictional Maple Home Services demo on the home hero and in the demo teaser, and the concept sites in "Websites, too." and on Services and Portfolio. The MacBook is a dark lid with an inset bezel ring on a 16:10 screen, and its aluminium base has a notch. The iPhone uses a 390:844 aspect ratio, a double inset bezel and a Dynamic Island. Their metal and glass greys are local to the frame classes. Screens use `object-cover object-top`. In hero and tile compositions the device sits at the bottom and is cropped by the tile. The home hero picks the device by viewport: MacBook from sm up, iPhone below. The Maple demo's phone screenshots carry a plain 47pt nav-red strip, an empty status bar, above the page, so the Dynamic Island never covers content.

### Demo Console (signature, `/demo`)
The Maple Home Services (fictional) demo, built from the site's parts rather than a dashboard look.
- **Banner:** a sticky ink strip under the red nav: an 18px stroked info icon, then "Fictional demonstration." in 14px/600 white and one plain sentence.
- **Card:** a white 28px card with a 1px hairline ring on snow, 12px padding on phones rising to 32px at md. A 32 / 36px headline title that carries "(fictional)", a 15px ink-2 line, and a 16px snow clock box with small ghost pills (+1 hour, +1 day, +3 days) and a quiet Reset.
- **Tabs:** numbered pills, 40px tall, 15px/500 with a 13px tabular numeral. Unselected tabs are white with a hairline ring that turns ink on hover; the selected tab is filled ink with white text. Arrow keys move between them; focus is a 3px ink outline.
- **Panels:** 16px snow panels (20px padding, 24px at md) with a 19px/600 title and a 14px ink-2 intro. Inside them: 12px white rows with hairline rings, hairline-divided lists, and from md a 14px tabular table that becomes one card per request below md.
- **Time slots:** small pills, white with a hairline ring that turns ink on hover. Taken slots drop the fill, go ink-2 and are struck through, but stay focusable so trying one explains the conflict.
- **Status:** tags (12px/600 pills, 2 × 10px padding) and result messages (12px radius, 15px text) use the demo status colours or, when neutral, white with a hairline ring. System health is a 14px dot followed by its sentence. Stat tiles are 12px white tiles with a 12px ink-2 label over a 19px/600 tabular value.

### Scroll Rise (motion)
`.rise` is CSS scroll-driven (`animation-timeline: view()`). It is transform-only: the element moves from `translateY(40px)` to rest over entry 0–40%, with no opacity change and no scale. It only runs when `animation-timeline` is supported and the user has no reduced-motion preference, so content is always visible otherwise. Interaction transitions are 200ms on `cubic-bezier(0.22, 1, 0.36, 1)`.

## Do's and Don'ts

### Do:
- **Do** open with the red nav and red hero, then build sections as full-bleed tiles alternating black and snow or white, with an ink tile as punctuation.
- **Do** take every display and headline size from the ramp (e.g. 56/80/112, 48/64/88, 40/56, 36/48) in Poppins via `.display` (800) or `.headline` (700).
- **Do** use the white logo symbol on red or dark grounds and the full-colour logo on light grounds.
- **Do** show the product as real screenshots in the MacBook or iPhone frames, cropped by the tile edge: the Maple demo for operations, the concept sites for websites. New phone screenshots of this site get the 47pt nav-red strip on top so the Dynamic Island covers nothing.
- **Do** end a section with one pill pair or one to two chevron links. Chevrons are ink on light (red on hover) and white on black and ink tiles.
- **Do** keep keyboard focus visible: a 3px ink outline on pills and demo tabs (white on dark), a 2px currentColor outline on chevron links, a 2px white outline on the red nav, and an ink border and ring on fields.
- **Do** keep text on red grounds (the hero, the nav, the final Steps card) at white or white/90 (4.95:1) and text on light grounds no lighter than ink-2.
- **Do** keep the `.rise` reveal CSS-only, transform-only (no opacity fade), and gated by `prefers-reduced-motion`.
- **Do** show an offer's availability with its badge beside the name (offer cards, price tables, the contact form), and give offers that are not available yet a ghost pill, not a filled one.
- **Do** keep the compact controls (`.pill-sm`, `.field-sm`, `.field-compact`, `.demo-quiet`) to dense UI such as the demo; marketing sections keep the 44px pill and the 52px field.
- **Do** pair every demo status colour with a word ("Confirmed", "Overdue", "Green: everything is working"), and keep the sticky ink "Fictional demonstration" banner on `/demo`.

### Don't:
- **Don't** add a second accent hue, and don't put gradients on text. The home hero radial is the only red gradient, and it never uses a stop lighter than red.
- **Don't** use red as a full ground beyond the nav bar and the home hero. Sections below the first screen are black, ink, snow or white, with red only on buttons, link hover and key highlights.
- **Don't** set body, buttons or nav links in Poppins. It is the display face only.
- **Don't** set body-size red text on black (3.57:1). Red on black is for large display text only.
- **Don't** use red for field focus or other neutral states. Maple Red must never read as an error; inside the demo, problems use the separate status red, always with a word.
- **Don't** use the demo status colours, or any green or amber, outside `/demo`, and never as a ground, a decoration or a brand accent.
- **Don't** use the Canadian flag, a maple leaf, a "Canada" wordmark or government-style imagery, and don't imply any government affiliation. (Exception approved by the owner on 2026-11-26: the logo's tower resembles the Peace Tower and stays as part of the brand mark.)
- **Don't** add stock photography, icon-card grids or testimonial carousels. The devices and the type carry the page.
- **Don't** put uppercase letter-spaced eyebrows above headlines. Use a sentence-case 21px+ title line or nothing.
- **Don't** put shadows on tiles, offer or price cards, Steps or the demo card. Shadows belong to devices and to floating cards.
- **Don't** use `red-brand` (#8B1A1A) or any concept-demo styling on the main site. Those belong to the portfolio demo worlds.
- **Don't** revert to the receipt / thermal-paper world (cream paper, monospace, Oswald). The owner rejected it.
