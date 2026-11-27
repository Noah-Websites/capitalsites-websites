import Rise from "@/components/Rise";
import Steps from "@/components/Steps";
import { ChevLink, Pill } from "@/components/ui";
import { contactHref } from "@/data/offers";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About CapitalSites — a small Canadian web studio",
  description:
    "CapitalSites is a small Canadian web studio helping contractors and home-service businesses in Canada with websites, estimate requests, bookings and the tools in between. We're new; the demo is fictional.",
  path: "/about",
});

const principles = ["Written scope before any work starts", "Built in accounts you own", "No project managers in between"];

export default function AboutPage() {
  return (
    <>
      <section className="tile tile-white text-center px-6 pt-20 md:pt-28 pb-16">
        <h1 className="display text-[48px] sm:text-[64px] md:text-[88px]">About CapitalSites.</h1>
        <p className="subhead text-[19px] md:text-[24px] mt-5 text-ink-2 max-w-[680px] mx-auto">
          A small Canadian web studio for contractors and home-service businesses.
        </p>
      </section>

      {/* Who we are + how we work */}
      <section className="bg-white px-3 pb-3">
        <div className="grid md:grid-cols-2 gap-3">
          <Rise className="tile tile-snow card-tile px-8 pt-14 pb-14 md:px-12 flex flex-col">
            <h2 className="headline text-[36px] md:text-[48px]">Hi, I&apos;m Noah.</h2>
            <p className="text-[17px] md:text-[19px] text-ink-2 mt-5 leading-[1.5]">
              I&apos;m a Canadian developer. I started CapitalSites to help contractors and home-service businesses with
              the digital side of the work: the website, the enquiries it brings in, the estimates that follow and the
              tools in between.
            </p>
            <p className="text-[17px] md:text-[19px] text-ink-2 mt-4 leading-[1.5]">
              I build every project myself, working with businesses across Canada.
            </p>
          </Rise>
          <Rise className="tile tile-ink on-dark card-tile text-center px-8 pt-14 pb-14 flex flex-col">
            <h2 className="headline text-[36px] md:text-[48px]">One person builds it.</h2>
            <p className="subhead text-[19px] md:text-[24px] mt-3 text-white/90">No agency. No handoffs. Just Noah.</p>
            <ul className="mt-auto pt-12 grid gap-3 max-w-[380px] mx-auto w-full text-left">
              {principles.map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl bg-white/10 ring-1 ring-white/15 px-4 py-3.5 text-[16px] font-medium">
                  <svg viewBox="0 0 20 20" className="w-5 h-5 flex-none text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4.5 10.5 8.5 14.5 15.5 6" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </section>

      <section className="tile tile-snow py-24 md:py-32 px-6 mt-3">
        <div className="max-w-[1024px] mx-auto">
          <Rise className="text-center">
            <h2 className="headline text-[40px] md:text-[56px]">How we work.</h2>
            <p className="subhead text-[19px] md:text-[24px] mt-3 text-ink-2">Nothing starts until the scope is in writing.</p>
          </Rise>
          <Rise className="mt-12">
            <Steps />
          </Rise>
          <p className="mt-12 text-center text-[17px] md:text-[19px] text-ink leading-[1.5] font-medium max-w-[620px] mx-auto">
            We use modern tools, including AI, to build and test faster. You get a normal system you own.
          </p>
        </div>
      </section>

      <section className="tile tile-white py-24 md:py-32 px-6">
        <Rise className="max-w-[720px] mx-auto text-center">
          <h2 className="headline text-[40px] md:text-[56px]">Your accounts. Your data.</h2>
          <p className="text-[19px] md:text-[21px] text-ink-2 mt-6 leading-[1.5]">
            Digital Operations setups are built in accounts you own, such as your Google account or your existing job
            software. Your requests, estimates and customer details stay there, and you keep access to all of it.
          </p>
        </Rise>
      </section>

      <section className="tile tile-snow py-24 md:py-32 px-6">
        <Rise className="max-w-[720px] mx-auto text-center">
          <h2 className="headline text-[40px] md:text-[56px]">Where we are today.</h2>
          <p className="text-[19px] md:text-[21px] text-ink-2 mt-6 leading-[1.5]">
            We are a new studio. The demo is fictional; we&apos;ll show real client work once clients give permission. The
            concept websites are examples too, not paying clients.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <ChevLink href="/demo">Try the demo</ChevLink>
            <ChevLink href="/portfolio">See concept websites</ChevLink>
          </div>
        </Rise>
      </section>

      <section className="tile tile-ink on-dark py-24 md:py-32 px-6 text-center">
        <Rise>
          <h2 className="display text-[44px] md:text-[80px]">Start with a conversation.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Pill href={contactHref("not-sure")}>Get in touch</Pill>
            <Pill href="/pricing" variant="ghost">
              See pricing
            </Pill>
          </div>
        </Rise>
      </section>
    </>
  );
}
