/**
 * CapitalSites offers: the single source of truth.
 *
 * Every price, product name, payment term and availability label on the site, in page
 * metadata and in the contact form is rendered from this file. Never hard-code a price
 * anywhere else; `scripts/check-prices.mjs` fails the build check if one appears.
 * All amounts are in Canadian dollars.
 */

export type Availability = "available" | "pilot" | "coming-soon";
export type GroupId = "websites" | "operations" | "care";
export type OfferSlug =
  | "fix"
  | "plan"
  | "premium"
  | "estimate-requests"
  | "quote-follow-up"
  | "booking"
  | "integration"
  | "care";
export type ContactSlug = OfferSlug | "not-sure";

type Price =
  | { kind: "one-time"; amount: number }
  | { kind: "plan"; upfront: number; monthly: number; months: number; after: number }
  | { kind: "build-plus-monthly"; build: number; monthly: number }
  | { kind: "monthly"; monthly: number }
  | { kind: "from"; amount: number; discovery: number };

export type Offer = {
  slug: OfferSlug;
  name: string;
  group: GroupId;
  availability: Availability;
  /** One line, customer-side. */
  summary: string;
  /** Plain, specific description of what it does. */
  description: string;
  /** What you get. */
  includes: string[];
  /** What the monthly fee covers (website plans). */
  monthlyIncludes?: string[];
  price: Price;
  /** Payment structure, shown on Pricing. */
  payment: string;
  /** Label in the contact form's "What do you need?" list. */
  contactLabel: string;
  /** Button label wherever the offer is listed. */
  cta: string;
  /** Message placeholder on the contact form. */
  placeholder: string;
  /** Optional add-on price (Quote Follow-up with Estimate Request Setup). */
  addOn?: { amount: number; to: OfferSlug };
};

/** "$2,500" style, CAD. */
export const cad = (n: number) => `$${n.toLocaleString("en-CA")}`;

export const CURRENCY_NOTE = "All prices in CAD.";
export const TERMS_NOTE = "Full terms are confirmed in your written scope before any work starts.";
/** Use wherever a term is not settled yet. */
export const UNSETTLED_TERMS = "Terms confirmed in your written scope before any work starts.";

const DEFAULT_PLACEHOLDER = "Tell us about your business and what you need";
const ONE_TIME_SETUP_PAYMENT =
  "50% after the written scope is signed, 50% on successful completion. No payment is taken while this service isn't available.";

export const offers: Offer[] = [
  {
    slug: "fix",
    name: "Website Fix",
    group: "websites",
    availability: "available",
    summary: "One broken thing on your website, fixed.",
    description:
      "One broken thing on your website fixed, like a booking button, a contact form or a phone link. Tested on a phone and a computer, with before-and-after screenshots.",
    includes: ["One agreed problem fixed", "Tested on a phone and a computer", "Before-and-after screenshots"],
    price: { kind: "one-time", amount: 149 },
    payment:
      "Pay after it's fixed and working, within 7 calendar days, by Interac e-Transfer. No charge if we can't fix it. 30-day workmanship warranty. One agreed problem per Fix.",
    contactLabel: "Website Fix",
    cta: "Fix one problem",
    placeholder: "What's the one thing that's broken? (e.g. the Book Now button goes nowhere)",
  },
  {
    slug: "plan",
    name: "Website Plan",
    group: "websites",
    availability: "available",
    summary: "A new or rebuilt website with no upfront build fee.",
    description:
      "We design and build your website, or rebuild the one you have, then host and look after it. Rebuilds launch in 7 days, new sites in 10–14 days.",
    includes: [
      "Full design and build up to 7 pages",
      "Mobile-optimized and fast-loading",
      "SEO foundation (meta tags, structured data, sitemap)",
      "Contact or booking form connected to your email",
      "Google Business Profile setup (new sites)",
      "Rebuilds launch in 7 days · new sites in 10–14 days",
    ],
    monthlyIncludes: ["Hosting", "Domain renewal", "Security updates", "Monthly content changes", "Uptime monitoring", "Email support"],
    price: { kind: "plan", upfront: 0, monthly: 99, months: 12, after: 79 },
    payment: "", // derived below from the price, so the numbers live in one place
    contactLabel: "Website Plan",
    cta: "Start a Website Plan",
    placeholder: DEFAULT_PLACEHOLDER,
  },
  {
    slug: "premium",
    name: "Premium Website",
    group: "websites",
    availability: "available",
    summary: "An online store or a larger site.",
    description:
      "Everything in the Website Plan, plus e-commerce or up to 15 pages. Premium builds take 14–21 days depending on the size of the catalogue.",
    includes: [
      "Everything in the Website Plan",
      "Up to 15 pages",
      "E-commerce setup (Stripe, Shopify, or WooCommerce)",
      "Inventory management",
      "Priority support",
    ],
    monthlyIncludes: ["Everything in the Website Plan's monthly service", "Product updates", "Order troubleshooting"],
    price: { kind: "build-plus-monthly", build: 2500, monthly: 129 },
    payment: "",
    contactLabel: "Premium Website",
    cta: "Ask about Premium",
    placeholder: DEFAULT_PLACEHOLDER,
  },
  {
    slug: "estimate-requests",
    name: "Estimate Request Setup",
    group: "operations",
    availability: "pilot",
    summary: "Every estimate request in one organized list you own.",
    description:
      "A quote or estimate request form on your website that lands in one organized list you own (Google Sheets or your existing job software), an email alert to you for every new request, duplicate and spam filtering, and a reminder when a request hasn't been answered. Alerts aren't instant: new requests are checked about every 5 minutes, and email delivery times can vary. Works with tools you already have; no new subscription needed in most cases. We set it up, test it with you and hand it over.",
    includes: [
      "Estimate request form on your website",
      "One organized list you own: Google Sheets or your job software",
      "An email alert for every new request (checked every 5 minutes, not instant)",
      "Duplicate and spam filtering",
      "A reminder when a request hasn't been answered",
    ],
    price: { kind: "one-time", amount: 399 },
    payment: ONE_TIME_SETUP_PAYMENT,
    contactLabel: "Estimate Request Setup (founding pilot, register interest)",
    cta: "Register interest",
    placeholder: "What kind of work do you do, and how do estimate requests reach you today?",
  },
  {
    slug: "quote-follow-up",
    name: "Quote Follow-up",
    group: "operations",
    availability: "coming-soon",
    summary: "No quote goes quiet.",
    description:
      "A list of every quote you've sent and its status, with reminders to you on day 3 and day 7 so no quote goes quiet. Reminders go to you, not your customers.",
    includes: ["Every quote you've sent and its status", "Reminders to you on day 3 and day 7", "Reminders go to you, not your customers"],
    price: { kind: "one-time", amount: 299 },
    addOn: { amount: 199, to: "estimate-requests" },
    payment: ONE_TIME_SETUP_PAYMENT,
    contactLabel: "Quote Follow-up (tell me when ready)",
    cta: "Tell me when it's ready",
    placeholder: "How do you send quotes today, and how do you keep track of them?",
  },
  {
    slug: "booking",
    name: "Online Booking",
    group: "operations",
    availability: "coming-soon",
    summary: "Customers book a visit in a tool you already have.",
    description:
      "We set up booking in a tool you already have or choose (for example your job-management software's booking feature or Google Calendar), with your hours, travel buffer and notice period. We don't host our own booking system.",
    includes: ["Booking in a tool you already have or choose", "Your hours, travel buffer and notice period", "No booking system hosted by us"],
    price: { kind: "one-time", amount: 299 },
    payment: ONE_TIME_SETUP_PAYMENT,
    contactLabel: "Online Booking (tell me when ready)",
    cta: "Tell me when it's ready",
    placeholder: "Which calendar or job software do you use, and how do customers book today?",
  },
  {
    slug: "integration",
    name: "Software Integration",
    group: "operations",
    availability: "coming-soon",
    summary: "Stop typing the same customer twice.",
    description:
      "Connect two tools you already use so the same customer isn't typed twice. One trigger, one direction, tested, with an alert if it stops working. Narrow scope; we confirm your tools are supported before quoting.",
    includes: ["One trigger, one direction", "Tested before handover", "An alert to you if it stops working"],
    price: { kind: "from", amount: 799, discovery: 149 },
    payment: ONE_TIME_SETUP_PAYMENT,
    contactLabel: "Software Integration (tell me when ready)",
    cta: "Tell me when it's ready",
    placeholder: "Which two tools would you like connected, and what should move between them?",
  },
  {
    slug: "care",
    name: "Digital Care",
    group: "care",
    availability: "coming-soon",
    summary: "Ongoing care for the operations systems we set up.",
    description:
      "Care for the operations systems we set up: forms, request lists, reminders and integrations. Health checks, fixing broken connections and small settings changes, within limits set out in your written scope. Not unlimited, and not 24/7. Website hosting, maintenance and routine content updates are already part of the Website Plan, so Digital Care doesn't repeat them.",
    includes: [
      "Health checks on your forms, lists, reminders and integrations",
      "Fixing broken connections",
      "Small settings changes, within limits set out in your scope",
    ],
    price: { kind: "monthly", monthly: 99 },
    payment: "Billed monthly in advance from the agreed start. No payment is taken while this service isn't available.",
    contactLabel: "Digital Care (tell me when ready)",
    cta: "Tell me when it's ready",
    placeholder: "Which systems would you want looked after?",
  },
];

/* ---------- prices ---------- */

function priceOf<K extends Price["kind"]>(slug: OfferSlug, kind: K) {
  const p = getOffer(slug).price;
  if (p.kind !== kind) throw new Error(`Offer ${slug} has price kind ${p.kind}, expected ${kind}`);
  return p as Extract<Price, { kind: K }>;
}

/** Website Plan numbers, used in copy that explains the plan. */
export function planNumbers() {
  const p = priceOf("plan", "plan");
  return {
    upfront: cad(p.upfront),
    monthly: cad(p.monthly),
    months: p.months,
    after: cad(p.after),
    firstYear: cad(p.monthly * p.months),
  };
}

/** Premium Website numbers. */
export function premiumNumbers() {
  const p = priceOf("premium", "build-plus-monthly");
  return { build: cad(p.build), monthly: cad(p.monthly) };
}

/** The big figure for a price, e.g. "$149", "$0", "From $799", "$99". */
export function priceFigure(o: Offer): string {
  const p = o.price;
  switch (p.kind) {
    case "one-time":
      return cad(p.amount);
    case "plan":
      return cad(p.upfront);
    case "build-plus-monthly":
      return cad(p.build);
    case "monthly":
      return cad(p.monthly);
    case "from":
      return `From ${cad(p.amount)}`;
  }
}

/** The line under the figure. */
export function priceNote(o: Offer): string {
  const p = o.price;
  const planned = o.availability === "available" ? "" : " Planned introductory price.";
  switch (p.kind) {
    case "one-time": {
      if (o.slug === "fix") return "one-time, paid after it's fixed and working";
      const addOn = o.addOn ? ` Or ${cad(o.addOn.amount)} as an add-on to ${getOffer(o.addOn.to).name}.` : "";
      return `one-time setup.${addOn}${planned}`;
    }
    case "plan":
      return `upfront, then ${cad(p.monthly)}/month for ${p.months} months, then ${cad(p.after)}/month`;
    case "build-plus-monthly":
      return `build, plus ${cad(p.monthly)}/month from launch`;
    case "monthly":
      return `per month.${planned}`;
    case "from":
      return `setup. Complex integrations start with a ${cad(p.discovery)} discovery, credited toward the setup if you proceed.${planned}`;
  }
}

/** One-line price, e.g. for tables, the contact form and metadata. */
export function priceLine(o: Offer): string {
  const p = o.price;
  switch (p.kind) {
    case "one-time":
      return o.addOn
        ? `${cad(p.amount)}, or ${cad(o.addOn.amount)} as an add-on to ${getOffer(o.addOn.to).name}`
        : `${cad(p.amount)} one-time`;
    case "plan":
      return `${cad(p.upfront)} upfront, ${cad(p.monthly)}/month for ${p.months} months, then ${cad(p.after)}/month`;
    case "build-plus-monthly":
      return `${cad(p.build)} + ${cad(p.monthly)}/month`;
    case "monthly":
      return `${cad(p.monthly)}/month`;
    case "from":
      return `From ${cad(p.amount)}`;
  }
}

/** Website Plan first-year total, shown next to the plan's price. */
export function firstYearNote(): string {
  return `${planNumbers().firstYear} in the first year`;
}

/** Payment structure for each offer (Pricing page). */
export function paymentOf(o: Offer): string {
  if (o.slug === "plan") {
    const n = planNumbers();
    return `No upfront build fee. ${n.monthly}/month for ${n.months} months (${n.firstYear} in the first year), then ${n.after}/month. Billed monthly in advance from launch.`;
  }
  if (o.slug === "premium") {
    const n = premiumNumbers();
    return `50% of the build fee upfront, 50% at launch, plus ${n.monthly}/month from launch, billed monthly in advance.`;
  }
  return o.payment;
}

/** Payment structure rules shown on Pricing (no legal terms beyond these). */
export const PAYMENT_RULES = {
  oneTimeSetups:
    "50% after the written scope is signed, 50% on successful completion. These services take no payment until they're available.",
  monthly: "Billed monthly in advance from the agreed start or launch.",
};

/** Every dollar amount the site is allowed to show. Used by the price-consistency check. */
export function allPriceAmounts(): string[] {
  const out = new Set<string>();
  for (const o of offers) {
    const p = o.price;
    if (p.kind === "one-time") out.add(cad(p.amount));
    if (p.kind === "plan") [p.upfront, p.monthly, p.after, p.monthly * p.months].forEach((n) => out.add(cad(n)));
    if (p.kind === "build-plus-monthly") [p.build, p.monthly].forEach((n) => out.add(cad(n)));
    if (p.kind === "monthly") out.add(cad(p.monthly));
    if (p.kind === "from") [p.amount, p.discovery].forEach((n) => out.add(cad(n)));
    if (o.addOn) out.add(cad(o.addOn.amount));
  }
  return [...out];
}

/* ---------- availability ---------- */

export const availabilityInfo: Record<Availability, { badge: string; status: string; note: string }> = {
  available: {
    badge: "Available",
    status: "Available",
    note: "",
  },
  pilot: {
    badge: "Founding customer pilot",
    status: "Founding customer pilot: register interest",
    note: "Expressions of interest only: we're not taking paying customers for this yet. No payment is taken and no delivery date is promised.",
  },
  "coming-soon": {
    badge: "Not available yet",
    status: "Coming soon",
    note: "Expressions of interest only: we're not taking paying customers for this yet. No payment is taken and no date is promised.",
  },
};

/* ---------- groups ---------- */

export const groups: { id: GroupId; name: string; title: string; intro: string }[] = [
  {
    id: "websites",
    name: "Websites",
    title: "Websites.",
    intro: "A website that works on a phone and gets every enquiry to you.",
  },
  {
    id: "operations",
    name: "Digital Operations",
    title: "Digital Operations.",
    intro:
      "Get enquiries, estimates, bookings and the tools in between working together, in accounts you own. Estimate Request Setup is a founding customer pilot open for expressions of interest; the rest are coming soon. We're not taking paying customers for any of them yet.",
  },
  {
    id: "care",
    name: "Digital Care",
    title: "Digital Care.",
    intro: "Ongoing care for the operations systems we set up, within limits agreed in writing. Coming soon.",
  },
];

export function offersIn(group: GroupId): Offer[] {
  return offers.filter((o) => o.group === group);
}

export function getOffer(slug: OfferSlug): Offer {
  const o = offers.find((x) => x.slug === slug);
  if (!o) throw new Error(`Unknown offer: ${slug}`);
  return o;
}

/* ---------- contact form ---------- */

export type ContactOption = {
  slug: ContactSlug;
  label: string;
  offer?: Offer;
};

export const NOT_SURE: ContactOption = { slug: "not-sure", label: "Not sure yet" };

/** The contact form's "What do you need?" options, in this order. */
export const contactOptions: ContactOption[] = [
  ...offers.map((o) => ({ slug: o.slug, label: o.contactLabel, offer: o })),
  NOT_SURE,
];

/**
 * Older ?service= values still in use (live outreach emails, the Instagram bio link and
 * earlier site links). They keep working and land on today's options.
 */
const SERVICE_ALIASES: Record<string, ContactSlug> = {
  rebuild: "plan",
  "new-site": "plan",
  "website-plan": "plan",
};

export function resolveContactSlug(raw: string | null | undefined): { slug: ContactSlug; alias?: string } | null {
  if (!raw) return null;
  const v = raw.trim().toLowerCase();
  if (contactOptions.some((o) => o.slug === v)) return { slug: v as ContactSlug };
  if (SERVICE_ALIASES[v]) return { slug: SERVICE_ALIASES[v], alias: v };
  return null;
}

export function getContactOption(slug: ContactSlug | "" | null | undefined): ContactOption | undefined {
  return contactOptions.find((o) => o.slug === slug);
}

export function contactHref(slug: ContactSlug): string {
  return `/contact?service=${slug}`;
}

/** Placeholder for the message box, by option (and by older alias where it said more). */
export function placeholderFor(slug: ContactSlug | "", alias?: string): string {
  if (slug === "plan" && alias === "new-site") return "Tell us about your business and what customers need to find";
  if (slug === "plan" && alias === "rebuild") return "What's your current website, and what isn't working?";
  return getContactOption(slug)?.offer?.placeholder ?? DEFAULT_PLACEHOLDER;
}

/* ---------- Website Fix terms (shown wherever the Fix is described in detail) ---------- */

export function fixTerms(): { term: string; text: string }[] {
  const amount = priceFigure(getOffer("fix"));
  return [
    {
      term: "Scope",
      text: "One customer-facing problem, agreed in writing by email, with the price, before work starts.",
    },
    { term: "Included", text: "The fix, testing on a phone and a computer, and before-and-after screenshots." },
    {
      term: "Payment",
      text: `${amount} CAD by Interac e-Transfer, due within 7 calendar days after successful delivery. If we can't fix it, there's no charge.`,
    },
    {
      term: "Warranty",
      text: "If the fix stops working within 30 days because of our work, we fix it again at no charge. It doesn't cover changes made by others, platform or hosting outages, or theme or plugin updates.",
    },
    {
      term: "Not included",
      text: "Redesigns, moving platforms or hosts, complex integrations (booking software, payments, e-commerce) and custom-coded apps. Anything else is quoted separately.",
    },
  ];
}
