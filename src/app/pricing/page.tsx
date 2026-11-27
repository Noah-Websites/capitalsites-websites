import Rise from "@/components/Rise";
import { PriceTable } from "@/components/offers";
import { ChevLink } from "@/components/ui";
import {
  CURRENCY_NOTE,
  getOffer,
  groups,
  offersIn,
  PAYMENT_RULES,
  paymentOf,
  planNumbers,
  priceFigure,
  priceLine,
  TERMS_NOTE,
  UNSETTLED_TERMS,
} from "@/data/offers";
import { pageMeta } from "@/lib/seo";

const fix = getOffer("fix");
const plan = getOffer("plan");
const premium = getOffer("premium");
const n = planNumbers();
const unsettled = UNSETTLED_TERMS.charAt(0).toLowerCase() + UNSETTLED_TERMS.slice(1);
const setupNames = offersIn("operations").map((o) => o.name);
const comingSoon = [...offersIn("operations"), ...offersIn("care")].filter((o) => o.availability === "coming-soon");
const listNames = (names: string[]) => `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

export const metadata = pageMeta({
  title: "Pricing — CapitalSites",
  description: `${fix.name}: ${priceLine(fix)}. ${plan.name}: ${priceLine(plan)}. ${premium.name}: ${priceLine(premium)}. Digital operations for contractors and home-service businesses, with planned prices. ${CURRENCY_NOTE}`,
  path: "/pricing",
});

const payments = [
  { name: fix.name, text: paymentOf(fix) },
  { name: plan.name, text: paymentOf(plan) },
  { name: premium.name, text: paymentOf(premium) },
  { name: `One-time setups (${listNames(setupNames)})`, text: PAYMENT_RULES.oneTimeSetups },
  { name: "Monthly services", text: PAYMENT_RULES.monthly },
];

const faqs = [
  {
    q: `What does the ${plan.name} cost in the first year?`,
    a: `${n.firstYear} in total: ${n.months} monthly payments of ${n.monthly}, starting on launch day. That's the full first-year commitment. There is no build fee on top.`,
  },
  {
    q: `What is the ${priceFigure(fix)} ${fix.name}?`,
    a: `A one-time fix for one customer-facing problem, like a broken Book Now button, a contact form that doesn't arrive, a wrong phone number or a missing tap-to-call link. We agree the problem and the price in writing by email before work starts. You get the fix, testing on a phone and a computer, and before-and-after screenshots. You pay ${priceFigure(fix)} CAD by Interac e-Transfer within 7 calendar days after successful delivery; if we can't fix it, there's no charge. If the fix stops working within 30 days because of our work, we fix it again at no charge. That doesn't cover changes made by others, platform or hosting outages, or theme or plugin updates. Not included: redesigns, moving platforms or hosts, complex integrations (booking software, payments, e-commerce) and custom-coded apps. Anything else is quoted separately.`,
  },
  {
    q: `Why is there a ${n.months}-month minimum?`,
    a: `Instead of charging a big build fee upfront, we spread it over your first year. That's what lets us start at ${n.upfront} upfront.`,
  },
  {
    q: "Can I cancel?",
    a: `After your first ${n.months} months, yes, with 30 days notice, and we'll help you move your site wherever you want. Cancelling during the first ${n.months} months: ${unsettled}`,
  },
  {
    q: "Do I own the website?",
    a: `Yes, once your first ${n.months} months are paid. What that covers, such as the design, content, code and domain: ${unsettled}`,
  },
  {
    q: "What's included in the monthly fee?",
    a: `Hosting, domain renewal, security updates, uptime monitoring, monthly content changes (text, images, prices, hours), and email support. ${premium.name} also includes product updates and order troubleshooting.`,
  },
  {
    q: "What is a founding customer pilot?",
    a: `${getOffer("estimate-requests").name} is our first digital operations service. We're taking expressions of interest from contractors and home-service businesses who'd like to be among the first to use it. Registering interest doesn't commit you to anything: no payment is taken and no delivery date is promised yet.`,
  },
  {
    q: "What does \"Coming soon\" mean?",
    a: `${listNames(comingSoon.map((o) => o.name))} aren't available yet. The prices shown are the planned introductory prices. Ask us to tell you when one is ready; no payment is taken and no date is promised.`,
  },
  {
    q: "Do I own my accounts and data?",
    a: "Yes. Digital operations setups are built in accounts you own, such as your Google account or your existing job software, so your requests, estimates and customer details stay with you.",
  },
  {
    q: `How is ${getOffer("care").name} different from the ${plan.name}?`,
    a: `The ${plan.name} already includes hosting, maintenance and routine content updates for your website. ${getOffer("care").name} is for the operations systems we set up: forms, request lists, reminders and integrations. It covers health checks, fixing broken connections and small settings changes, within limits set out in your written scope. It isn't unlimited and it isn't 24/7.`,
  },
  {
    q: "Do I need to provide content and photos?",
    a: "We can work with whatever you have. If you have copy and photos ready, great. If not, we can help write content and source professional stock photography during the build.",
  },
  {
    q: "How long does a website build take?",
    a: "Rebuilds launch in 7 days. New sites take 10–14 days because of the brand discovery session. Premium e-commerce builds take 14–21 days depending on catalogue size.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="tile tile-black tile-glow on-dark text-center px-6 pt-20 md:pt-28 pb-20">
        <h1 className="display text-[40px] sm:text-[60px] md:text-[80px] text-white">
          Simple pricing.
          <br />
          <span className="text-red">Agreed in writing first.</span>
        </h1>
        <p className="subhead text-[19px] md:text-[24px] mt-5 text-night-muted max-w-[680px] mx-auto">
          Prices in Canadian dollars for contractors and home-service businesses. {TERMS_NOTE}
        </p>
      </section>

      <section className="bg-snow px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-[1024px] mx-auto space-y-5">
          {groups.map((g) => (
            <Rise key={g.id}>
              <section id={g.id} aria-labelledby={`price-${g.id}`} className="card-tile bg-white p-6 sm:p-8 md:p-10 scroll-mt-20">
                <h2 id={`price-${g.id}`} className="headline text-[32px] sm:text-[36px] md:text-[44px]">
                  {g.name}
                </h2>
                <p className="text-[17px] text-ink-2 mt-2 leading-[1.45] max-w-[640px]">{g.intro}</p>
                <div className="mt-6">
                  <PriceTable group={g.id} />
                </div>
              </section>
            </Rise>
          ))}
        </div>
        <p className="max-w-[760px] mx-auto mt-12 text-center text-[14px] leading-[1.6] text-ink-2">
          {CURRENCY_NOTE} {TERMS_NOTE}
        </p>
      </section>

      <section aria-labelledby="payment-title" className="bg-white px-6 py-20 md:py-28">
        <div className="max-w-[760px] mx-auto">
          <h2 id="payment-title" className="headline text-[40px] md:text-[56px]">How payment works.</h2>
          <dl className="mt-10 border-t border-line">
            {payments.map((p) => (
              <div key={p.name} className="grid gap-1 md:grid-cols-[220px_1fr] md:gap-8 py-6 border-b border-line">
                <dt className="text-[17px] font-semibold tracking-[-0.015em]">{p.name}</dt>
                <dd className="text-[17px] leading-[1.55] text-ink-2">{p.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[15px] text-ink font-medium">{TERMS_NOTE}</p>
        </div>
      </section>

      <section id="faq" className="bg-snow px-6 py-20 md:py-28 scroll-mt-12">
        <div className="max-w-[760px] mx-auto">
          <h2 className="headline text-[40px] md:text-[56px]">Questions? Answers.</h2>
          <div className="mt-10 border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[19px] md:text-[21px] font-semibold tracking-[-0.015em] focus-visible:outline-2 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg viewBox="0 0 20 20" className="w-5 h-5 flex-none text-ink-2 transition-transform duration-300 group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                    <path d="M10 3v14M3 10h14" />
                  </svg>
                </summary>
                <p className="pb-6 -mt-1 text-[17px] leading-[1.55] text-ink-2 max-w-[640px]">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10">
            <ChevLink href="/contact">Still have a question? Ask Noah</ChevLink>
          </div>
        </div>
      </section>
    </>
  );
}
