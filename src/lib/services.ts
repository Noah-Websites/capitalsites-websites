export type ServiceId = "fix" | "rebuild" | "new-site" | "premium" | "not-sure";

export type Service = {
  id: ServiceId;
  /** Dropdown label */
  label: string;
  /** Plan or offer name */
  plan: string;
  /** Price line shown on the contact page */
  price: string;
  /** Short description shown under the dropdown */
  description: string;
  /** Message box placeholder */
  placeholder: string;
};

const DEFAULT_PLACEHOLDER = "Tell us about your project, goals, and timeline";

/* Single source for the contact page's service options and their wording. */
export const services: Service[] = [
  {
    id: "fix",
    label: "Fix one problem on my website",
    plan: "Website Fix",
    price: "$149 CAD one-time",
    description:
      "One customer-facing problem, agreed by email with the price before we start. Paid within 7 days after it's fixed; no charge if we can't fix it.",
    placeholder: "What's the one thing that's broken? (e.g. the Book Now button goes nowhere)",
  },
  {
    id: "rebuild",
    label: "Rebuild my current website",
    plan: "Website Plan",
    price: "$0 upfront, then $99/mo (12-month minimum, $1,188 in year one)",
    description: "We rebuild your current site in 7 days. After 12 months it drops to $79/month, or cancel with 30 days notice.",
    placeholder: DEFAULT_PLACEHOLDER,
  },
  {
    id: "new-site",
    label: "A first website (I don't have one yet)",
    plan: "Website Plan",
    price: "$0 upfront, then $99/mo (12-month minimum, $1,188 in year one)",
    description: "No website needed. We build your first site in 10–14 days. After 12 months it drops to $79/month.",
    placeholder: "Tell us about your business and what customers need to find",
  },
  {
    id: "premium",
    label: "Online store or larger site",
    plan: "Premium",
    price: "$2,500 + $129/mo",
    description: "E-commerce or up to 15 pages. Build fee paid 50% upfront and 50% on launch; monthly fee starts on launch day.",
    placeholder: DEFAULT_PLACEHOLDER,
  },
  {
    id: "not-sure",
    label: "Not sure yet",
    plan: "Not sure yet",
    price: "We'll recommend the right option",
    description: "Tell us what's going on and we'll suggest the option that fits.",
    placeholder: DEFAULT_PLACEHOLDER,
  },
];

export { DEFAULT_PLACEHOLDER };

export function getService(id: string | undefined | null): Service | undefined {
  return services.find((s) => s.id === id);
}

export function contactHref(id: ServiceId): string {
  return `/contact?service=${id}`;
}

/* Website Fix terms, shown wherever the Fix is described in detail. */
export const fixTerms: { term: string; text: string }[] = [
  {
    term: "Scope",
    text: "One customer-facing problem, agreed in writing by email, with the price, before work starts.",
  },
  { term: "Included", text: "The fix, testing on a phone and a computer, and before-and-after screenshots." },
  {
    term: "Payment",
    text: "$149 CAD by Interac e-Transfer, due within 7 calendar days after successful delivery. If we can't fix it, there's no charge.",
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
