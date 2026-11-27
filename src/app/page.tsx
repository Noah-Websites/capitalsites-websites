import Link from "next/link";
import Rise from "@/components/Rise";
import Steps from "@/components/Steps";
import { AvailabilityBadge } from "@/components/offers";
import { Check, ChevLink, Pill, MacBook, IPhone } from "@/components/ui";
import {
  availabilityInfo,
  contactHref,
  CURRENCY_NOTE,
  firstYearNote,
  getOffer,
  priceFigure,
  priceNote,
  TERMS_NOTE,
  type Offer,
} from "@/data/offers";
import { pageMeta, VALUE_PROPOSITION } from "@/lib/seo";

const fix = getOffer("fix");
const estimates = getOffer("estimate-requests");
const websites = [fix, getOffer("plan"), getOffer("premium")];

export const metadata = pageMeta({
  title: "CapitalSites — Digital operations for Canadian contractors",
  description: `${VALUE_PROPOSITION} A small Canadian web studio for contractors and home-service businesses in Canada.`,
  path: "/",
});

const featured: { offer: Offer; secondary: { href: string; label: string }; note: string }[] = [
  {
    offer: fix,
    secondary: { href: "/services#website-fix", label: "How the Fix works" },
    note: "Examples: a booking button, a contact form or a phone link. No charge if we can't fix it.",
  },
  {
    offer: estimates,
    secondary: { href: "/demo", label: "See it in the demo" },
    note: availabilityInfo[estimates.availability].note,
  },
];

const demoShots = [
  { src: "/shots/maple-demo-form-mobile.jpg", title: "The request comes in", caption: "Customer's view of the estimate request form" },
  { src: "/shots/maple-demo-schedule-mobile.jpg", title: "A visit gets booked", caption: "Double-booking is blocked" },
  { src: "/shots/maple-demo-quotes-mobile.jpg", title: "The quote is tracked", caption: "Reminders to the owner on day 3 and day 7" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="tile tile-hero on-dark pt-16 md:pt-24 text-center">
        <div className="px-6">
          <h1 className="display text-[56px] sm:text-[80px] lg:text-[112px] leading-[0.95] text-white">
            Better systems.
            <br />
            Better business.
          </h1>
          <p className="subhead text-[19px] md:text-[24px] mt-6 text-white max-w-[760px] mx-auto">{VALUE_PROPOSITION}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Pill href="/demo" variant="white">
              See how it works
            </Pill>
            <Pill href="/pricing" variant="ghost">
              See pricing
            </Pill>
          </div>
          <div className="mt-6">
            <Link
              href={contactHref("fix")}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/40 px-5 py-2.5 text-[16px] md:text-[17px] font-semibold text-white hover:bg-white/20 transition-colors focus-visible:outline-3 focus-visible:outline-white focus-visible:outline-offset-3"
            >
              <span className="text-balance">
                <span className="hidden sm:inline">Just one thing broken on your website? </span>
                <span className="sm:hidden">One thing broken? </span>
                Fix one problem —{" "}
                <span className="whitespace-nowrap">{priceFigure(fix)}&nbsp;CAD</span>
              </span>
              <svg viewBox="0 0 8 14" className="w-2 h-3.5 flex-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M1 1l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
        <Rise className="mt-14 md:mt-16 px-6">
          <div className="hidden sm:block max-w-[920px] mx-auto translate-y-[6%]">
            <MacBook
              src="/shots/maple-demo-desktop.jpg"
              alt="The fictional Maple Home Services demo on a laptop: a list of estimate requests"
              priority
            />
          </div>
          <div className="sm:hidden w-[64%] max-w-[260px] mx-auto translate-y-[14%]">
            <IPhone src="/shots/maple-demo-mobile.jpg" alt="The fictional Maple Home Services demo on a phone: a list of estimate requests" />
          </div>
        </Rise>
      </section>

      {/* Two featured offers */}
      <section className="bg-white px-3 pt-24 md:pt-32 pb-3">
        <Rise className="text-center px-6">
          <h2 className="headline text-[40px] md:text-[56px]">Two ways to start.</h2>
          <p className="subhead text-[19px] md:text-[24px] mt-3 text-ink-2">One is ready today. One is taking founding customers.</p>
        </Rise>
        {/* Both cards share one row grid (subgrid), so title, badge, text, list, price and actions line up. */}
        <div className="mt-12 grid gap-3 md:grid-cols-2 md:grid-rows-[repeat(6,auto)] md:gap-y-0">
          {featured.map(({ offer: o, secondary, note }) => (
            <Rise
              key={o.slug}
              className="tile tile-snow card-tile px-7 sm:px-10 pt-10 sm:pt-12 pb-10 flex flex-col md:row-span-6 md:grid md:grid-rows-subgrid"
            >
              <h3 className="headline text-[36px] md:text-[48px]">{o.name}</h3>
              <div className="mt-3">
                <AvailabilityBadge availability={o.availability} />
              </div>
              <p className="text-[17px] md:text-[19px] text-ink-2 mt-4 leading-[1.45]">{o.summary}</p>
              <ul className="mt-6 space-y-3">
                {o.includes.slice(0, 3).map((f) => (
                  <li key={f} className="flex gap-3 text-[16px] leading-[1.4]">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10 md:self-end">
                <p className="display tabular text-[60px] sm:text-[72px] leading-none text-ink">{priceFigure(o)}</p>
                <p className="text-[15px] text-ink-2 mt-2">{priceNote(o)}</p>
              </div>
              <div>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Pill href={contactHref(o.slug)}>{o.cta}</Pill>
                  <ChevLink href={secondary.href}>{secondary.label}</ChevLink>
                </div>
                <p className="text-[14px] text-ink-2 mt-4 leading-[1.45]">{note}</p>
              </div>
            </Rise>
          ))}
        </div>
        <p className="pt-16 pb-12 px-6 text-center text-[14px] leading-[1.6] text-ink-2 max-w-[720px] mx-auto">
          {CURRENCY_NOTE} {TERMS_NOTE}
        </p>
      </section>

      {/* How it works */}
      <section className="tile tile-snow py-24 md:py-32 px-6">
        <div className="max-w-[1024px] mx-auto">
          <Rise className="text-center">
            <h2 className="headline text-[40px] md:text-[56px]">How it works.</h2>
            <p className="subhead text-[19px] md:text-[24px] mt-3 text-ink-2">Nothing starts until the scope is in writing.</p>
          </Rise>
          <Rise className="mt-12">
            <Steps />
          </Rise>
        </div>
      </section>

      {/* Demo teaser */}
      <section className="tile tile-black on-dark pt-24 md:pt-32 pb-16">
        <Rise className="px-6 max-w-[1024px] mx-auto">
          <h2 className="headline text-[40px] md:text-[64px] text-white">Try the demo.</h2>
          <p className="subhead text-[19px] md:text-[24px] mt-3 text-night-muted max-w-[700px]">
            Maple Home Services is a fictional home-service business. Send it a test estimate request, book a visit and
            watch a quote reminder arrive. Nothing you type leaves your browser.
          </p>
        </Rise>
        <div className="snap-row mt-12 lg:justify-center lg:grid-cols-[repeat(3,300px)] lg:grid-flow-row lg:overflow-visible">
          {demoShots.map((s) => (
            <Link key={s.src} href="/demo" className="group block">
              <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                <IPhone src={s.src} alt={`Maple Home Services (fictional) demo: ${s.caption.toLowerCase()}`} />
              </div>
              <p className="mt-5 text-[19px] font-semibold text-white tracking-[-0.015em]">{s.title}</p>
              <p className="text-[14px] text-night-muted">{s.caption}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <ChevLink href="/demo">Open the demo</ChevLink>
        </div>
      </section>

      {/* Websites */}
      <section className="tile tile-snow pt-24 md:pt-32 text-center">
        <Rise className="px-6">
          <h2 className="headline text-[40px] md:text-[56px]">Websites, too.</h2>
          <p className="subhead text-[19px] md:text-[24px] mt-3 text-ink-2 max-w-[680px] mx-auto">
            A website that works on a phone and gets every enquiry to you.
          </p>
          <dl className="mt-10 grid sm:grid-cols-3 gap-x-8 gap-y-6 max-w-[920px] mx-auto text-left">
            {websites.map((o) => (
              <div key={o.slug} className="border-t border-line pt-5">
                <dt className="text-[17px] font-semibold tracking-[-0.015em] text-ink">{o.name}</dt>
                <dd className="headline tabular text-[32px] mt-2">{priceFigure(o)}</dd>
                <dd className="text-[15px] text-ink-2 mt-1 leading-[1.45]">
                  {priceNote(o)}
                  {o.slug === "plan" && ` (${firstYearNote()})`}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <ChevLink href="/services#websites">Website services</ChevLink>
            <ChevLink href="/portfolio">See concept websites</ChevLink>
          </div>
        </Rise>
        <Rise className="mt-14 px-6">
          <div className="hidden sm:block max-w-[860px] mx-auto translate-y-[8%]">
            <MacBook src="/shots/fade-and-co-desktop.jpg" alt="Fade & Co. concept website on a laptop" />
          </div>
          <div className="sm:hidden w-[62%] max-w-[260px] mx-auto translate-y-[12%]">
            <IPhone src="/shots/fade-and-co-mobile.jpg" alt="Fade & Co. concept website on a phone" />
          </div>
        </Rise>
      </section>

      {/* Closing */}
      <section className="tile tile-ink on-dark py-24 md:py-32 px-6 text-center">
        <Rise>
          <h2 className="display text-[44px] md:text-[80px]">Start with a conversation.</h2>
          <p className="subhead text-[19px] md:text-[24px] mt-4 text-white/90 max-w-[640px] mx-auto">
            Tell us how enquiries, estimates and bookings work in your business today, and what you&apos;d like to change.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Pill href="/contact">Get in touch</Pill>
            <Pill href="https://calendly.com/capitalsitesottawa/website-consult" variant="ghost">
              Book a call
            </Pill>
          </div>
        </Rise>
      </section>
    </>
  );
}
