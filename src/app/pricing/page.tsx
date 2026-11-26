import Rise from "@/components/Rise";
import { Pill, ChevLink, Check } from "@/components/ui";
import { contactHref } from "@/lib/services";
import FixTerms from "@/components/FixTerms";

const faqs = [
  {
    q: "How does payment work?",
    a: "For the Website Plan there's nothing to pay upfront. Your $99/month starts the day your site launches and runs for a 12-month minimum ($1,188 in the first year). After that it drops to $79/month, or you can cancel with 30 days notice. Premium builds are paid 50% upfront and 50% on launch, plus $129/month.",
  },
  {
    q: "What does the Website Plan cost in the first year?",
    a: "$1,188 in total: 12 monthly payments of $99, starting on launch day. That's the full first-year commitment. There is no build fee on top.",
  },
  {
    q: "What is the $149 Website Fix?",
    a: "A one-time fix for one customer-facing problem, like a broken Book Now button, a contact form that doesn't arrive, a wrong phone number or a missing tap-to-call link. We agree the problem and the price in writing by email before work starts. You get the fix, testing on a phone and a computer, and before-and-after screenshots. You pay $149 CAD by Interac e-Transfer within 7 calendar days after successful delivery; if we can't fix it, there's no charge. If the fix stops working within 30 days because of our work, we fix it again at no charge. That doesn't cover changes made by others, platform or hosting outages, or theme or plugin updates. Not included: redesigns, moving platforms or hosts, complex integrations (booking software, payments, e-commerce) and custom-coded apps. Anything else is quoted separately.",
  },
  {
    q: "Why is there a 12-month minimum?",
    a: "Instead of charging a big build fee upfront, we spread it over your first year. That's what lets us start at $0 upfront.",
  },
  {
    q: "Can I cancel?",
    a: "After your first 12 months, yes, with 30 days notice, and we'll help you move your site wherever you want. If you need to cancel during the first 12 months, you pay the remaining months of the minimum, or the site comes down.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. Once your first 12 months are paid, the design, content and code are yours. The monthly fee after that covers hosting and ongoing service, not licensing.",
  },
  {
    q: "What's actually included in the monthly fee?",
    a: "Hosting, domain renewal, security updates, uptime monitoring, monthly content changes (text, images, prices, hours), and email support. Premium tier also includes product updates and order troubleshooting. We handle the boring stuff so you can focus on running your business.",
  },
  {
    q: "Do I need to provide content and photos?",
    a: "We can work with whatever you have. If you have copy and photos ready, great. If not, we can help write content and source professional stock photography during the build.",
  },
  {
    q: "How long does the build take?",
    a: "Rebuilds launch in 7 days. New sites take 10–14 days because of the brand discovery session. Premium e-commerce builds take 14–21 days depending on catalog size.",
  },
];

const plans = [
  {
    name: "Website Plan",
    tag: "Rebuild or first site",
    for: "For businesses that need their current site rebuilt, or a website for the first time.",
    big: "$0",
    bigNote: "upfront",
    monthly: "$99/mo",
    monthlyNote: "12-month minimum ($1,188 in year one), then $79/mo",
    cta: { href: contactHref("rebuild"), label: "Start with $0 upfront" },
    build: [
      "Full design and build up to 7 pages",
      "Mobile-optimized and fast-loading",
      "SEO foundation (meta tags, structured data, sitemap)",
      "Contact or booking form connected to your email",
      "Google Business Profile setup (new sites)",
      "Rebuilds launch in 7 days · new sites in 10–14 days",
    ],
    monthlyIncl: ["Hosting", "Domain renewal", "Security updates", "Monthly content changes", "Uptime monitoring", "Email support"],
    featured: true,
  },
  {
    name: "Premium",
    tag: "E-commerce",
    for: "For e-commerce stores or larger sites.",
    big: "$2,500",
    bigNote: "build fee, 50% upfront and 50% on launch",
    monthly: "$129/mo",
    monthlyNote: "starts on launch day",
    cta: { href: contactHref("premium"), label: "Ask about Premium" },
    build: [
      "Everything in the Website Plan",
      "Up to 15 pages",
      "E-commerce setup (Stripe, Shopify, or WooCommerce)",
      "Inventory management",
      "Priority support",
    ],
    monthlyIncl: ["Everything in $99/mo plan", "Product updates", "Order troubleshooting"],
    featured: false,
  },
];

export const metadata = {
  title: "Pricing — CapitalSites",
  alternates: { canonical: "/pricing" },
  description:
    "Website Fix: $149 one-time. Website Plan: $0 upfront, $99/month (12-month minimum, $1,188 in year one). Premium: $2,500 + $129/month. All prices in CAD.",
};

export default function PricingPage() {
  return (
    <>
      <section className="tile tile-black tile-glow on-dark text-center px-6 pt-20 md:pt-28 pb-20">
        <h1 className="display text-[40px] sm:text-[60px] md:text-[80px] text-white">
          Simple pricing.
          <br />
          <span className="text-red">$0 upfront on the Website Plan.</span>
        </h1>
        <p className="subhead text-[19px] md:text-[24px] mt-5 text-night-muted max-w-[640px] mx-auto">
          Transparent pricing from a small Canadian web studio, for independent businesses across Canada.
        </p>
      </section>

      <section className="bg-snow px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-[1024px] mx-auto grid md:grid-cols-2 gap-5">
          {plans.map((p) => (
            <Rise key={p.name} className={`card-tile min-w-0 p-6 sm:p-8 md:p-10 flex flex-col ${p.featured ? "bg-white ring-2 ring-red" : "bg-white"}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="headline text-[32px] sm:text-[36px] md:text-[44px]">{p.name}</h2>
                <span className={`rounded-full px-3 py-1 text-[13px] font-semibold ${p.featured ? "bg-red text-white" : "bg-snow text-ink-2"}`}>{p.tag}</span>
              </div>
              <p className="text-[17px] text-ink-2 mt-2 leading-[1.45]">{p.for}</p>

              <div className="mt-8 pb-8 border-b border-line">
                <p className={`display tabular text-[60px] sm:text-[72px] md:text-[88px] leading-none ${p.featured ? "zero-fig" : "text-ink"}`}>{p.big}</p>
                <p className="text-[15px] text-ink-2 mt-2">{p.bigNote}</p>
                <p className="headline tabular text-[32px] mt-6">{p.monthly}</p>
                <p className="text-[15px] text-ink-2 mt-1">{p.monthlyNote}</p>
              </div>

              <h3 className="text-[15px] font-semibold mt-8">The build</h3>
              <ul className="mt-3 space-y-3">
                {p.build.map((f) => (
                  <li key={f} className="flex gap-3 text-[16px] leading-[1.4]">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <h3 className="text-[15px] font-semibold mt-8">Every month</h3>
              <ul className="mt-3 space-y-3">
                {p.monthlyIncl.map((f) => (
                  <li key={f} className="flex gap-3 text-[16px] leading-[1.4]">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <Pill href={p.cta.href} variant={p.featured ? "red" : "ghost"}>
                  {p.cta.label}
                </Pill>
              </div>
            </Rise>
          ))}
          <Rise className="card-tile min-w-0 bg-white p-6 sm:p-8 md:p-10 md:col-span-2 grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="headline text-[32px] sm:text-[36px] md:text-[44px]">Website Fix</h2>
                <span className="rounded-full px-3 py-1 text-[13px] font-semibold bg-snow text-ink-2">One problem, one price</span>
              </div>
              <p className="text-[17px] text-ink-2 mt-3 leading-[1.5] max-w-[600px]">
                Just one thing broken? We fix one problem on your current site, without a rebuild or a monthly plan.
              </p>
              <div className="mt-6 max-w-[640px]">
                <FixTerms />
              </div>
            </div>
            <div className="md:text-right">
              <p className="display tabular text-[60px] sm:text-[72px] md:text-[88px] leading-none text-ink">$149</p>
              <p className="text-[15px] text-ink-2 mt-2">one-time, paid within 7 days of delivery</p>
              <div className="mt-6">
                <Pill href={contactHref("fix")} variant="ghost">
                  Fix one problem
                </Pill>
              </div>
            </div>
          </Rise>
        </div>
        <p className="max-w-[760px] mx-auto mt-16 text-center text-[14px] leading-[1.6] text-ink-2">
          All prices in CAD. Website Plan: no upfront payment; $99/month starts on launch day with a 12-month minimum
          ($1,188 in the first year), then $79/month or cancel with 30 days notice. Premium: build fee paid 50% upfront
          and 50% on launch; monthly fee starts on launch day. Website Fix: $149 one-time for one agreed problem.
        </p>
      </section>

      <section id="faq" className="bg-white px-6 py-20 md:py-28 scroll-mt-12">
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
