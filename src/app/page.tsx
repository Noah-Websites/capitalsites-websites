import Link from "next/link";
import Rise from "@/components/Rise";
import { ChevLink, Pill, MacBook, IPhone } from "@/components/ui";

const concepts = [
  { slug: "fade-and-co", name: "Fade & Co.", kind: "Barbershop · London", plan: "Website Plan" },
  { slug: "ember-kitchen", name: "Ember Kitchen", kind: "Restaurant · Toronto", plan: "Website Plan" },
  { slug: "maison-noir", name: "Maison Noir", kind: "Boutique · Ottawa", plan: "Premium" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="tile tile-hero on-dark pt-16 md:pt-24 text-center">
        <div className="px-6">
          <h1 className="display text-[56px] sm:text-[80px] md:text-[112px] leading-[0.95] text-white">
            Your website.
            <br />
            Rebuilt.
          </h1>
          <p className="subhead text-[21px] md:text-[30px] mt-6 text-white">
            <span className="font-bold">$0 upfront.</span> <span className="text-white/90">Then $99/month.</span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Pill href="/audit" variant="white">Get a free audit</Pill>
            <Pill href="/pricing" variant="ghost">
              See pricing
            </Pill>
          </div>
        </div>
        <Rise className="mt-14 md:mt-16 px-6">
          <div className="hidden sm:block max-w-[920px] mx-auto translate-y-[6%]">
            <MacBook src="/shots/ember-kitchen-desktop.jpg" alt="Ember Kitchen concept website on a laptop" priority />
          </div>
          <div className="sm:hidden w-[64%] max-w-[260px] mx-auto translate-y-[14%]">
            <IPhone src="/shots/ember-kitchen-mobile.jpg" alt="Ember Kitchen concept website on a phone" />
          </div>
        </Rise>
      </section>

      {/* $0 */}
      <section className="tile tile-snow py-24 md:py-32 text-center px-6">
        <Rise>
          <p className="text-[21px] md:text-[24px] font-semibold tracking-[-0.02em] text-ink">Due today</p>
          <p className="display zero-fig tabular text-[120px] sm:text-[160px] md:text-[220px] leading-[0.9] mt-2">$0</p>
          <p className="headline text-[32px] md:text-[48px] mt-4 max-w-[760px] mx-auto">
            Then $99 a month. Everything included.
          </p>
          <p className="text-[17px] md:text-[21px] text-ink-2 mt-5 max-w-[620px] mx-auto leading-[1.45]">
            Design, build, hosting, domain renewal, security updates, monthly content changes and email support. After
            12 months it drops to $79/month, or cancel with 30 days notice.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <ChevLink href="/pricing">Compare plans</ChevLink>
            <ChevLink href="/pricing#faq">How the 12 months work</ChevLink>
          </div>
        </Rise>
      </section>

      {/* Two-up promo tiles */}
      <section className="bg-white p-3">
        <div className="grid md:grid-cols-2 gap-3">
          <Rise className="tile tile-red on-dark card-tile text-center px-8 pt-14 pb-14 min-h-[540px] flex flex-col">
            <h2 className="headline text-[40px] md:text-[56px]">Live in 7 days.</h2>
            <p className="subhead text-[19px] md:text-[24px] mt-3 text-white/90">Rebuilds launch in a week.</p>
            <div
              className="mt-auto pt-12 flex justify-center items-end gap-3 tabular"
              role="img"
              aria-label="Day 1 to 2 design, day 3 to 5 build, day 6 to 7 revisions and launch"
            >
              {[
                { d: "1–2", t: "Design" },
                { d: "3–5", t: "Build" },
                { d: "6–7", t: "Launch" },
              ].map((s, i) => (
                <div
                  key={s.t}
                  className="w-[30%] max-w-[150px] rounded-2xl bg-white/12 px-3 py-4 text-left ring-1 ring-white/25"
                  style={{ height: `${120 + i * 50}px` }}
                >
                  <p className="text-[12px] text-white/90">Day</p>
                  <p className="text-[28px] font-bold tracking-[-0.03em] leading-none">{s.d}</p>
                  <p className="text-[14px] font-medium mt-2">{s.t}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14px] text-white/90">New sites take 10–14 days. Premium e-commerce 14–21.</p>
          </Rise>
          <Rise className="tile tile-ink on-dark card-tile text-center px-8 pt-14 pb-14 min-h-[540px] flex flex-col">
            <h2 className="headline text-[40px] md:text-[56px]">One person builds it.</h2>
            <p className="subhead text-[19px] md:text-[24px] mt-3 text-white/90">No agency. No handoffs. Just Noah.</p>
            <ul className="mt-auto pt-12 grid gap-3 max-w-[360px] mx-auto w-full text-left">
              {["No project managers in between", "No offshore handoff", "You own it after 12 months"].map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl bg-white/10 ring-1 ring-white/15 px-4 py-3.5 text-[16px] font-medium">
                  <svg viewBox="0 0 20 20" className="w-5 h-5 flex-none text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4.5 10.5 8.5 14.5 15.5 6" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ChevLink href="/contact">Talk to Noah</ChevLink>
            </div>
          </Rise>
        </div>
      </section>

      {/* Concept gallery */}
      <section className="tile tile-black on-dark pt-24 md:pt-32 pb-16">
        <Rise className="px-6 max-w-[1024px] mx-auto">
          <h2 className="headline text-[40px] md:text-[64px] text-white">Built for the phone in their pocket.</h2>
          <p className="subhead text-[19px] md:text-[24px] mt-3 text-night-muted max-w-[640px]">
            Three concept redesigns showing what each plan gets you. Concepts, not paying clients.
          </p>
        </Rise>
        <div className="snap-row mt-12 lg:justify-center lg:grid-cols-[repeat(3,300px)] lg:grid-flow-row lg:overflow-visible">
          {concepts.map((c) => (
            <Link key={c.slug} href={`/portfolio/${c.slug}`} className="group block">
              <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                <IPhone src={`/shots/${c.slug}-mobile.jpg`} alt={`${c.name} concept website on a phone`} />
              </div>
              <p className="mt-5 text-[19px] font-semibold text-white tracking-[-0.015em]">{c.name}</p>
              <p className="text-[14px] text-night-muted">
                {c.kind} · {c.plan}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <ChevLink href="/portfolio">See all concept work</ChevLink>
        </div>
      </section>

      {/* Noah */}
      <section className="tile tile-white py-24 md:py-32 px-6">
        <Rise className="max-w-[720px] mx-auto text-center">
          <h2 className="headline text-[40px] md:text-[56px]">Hi, I&apos;m Noah.</h2>
          <p className="text-[19px] md:text-[21px] text-ink-2 mt-6 leading-[1.5]">
            I&apos;m a Canadian developer who started CapitalSites because too many great independent businesses are
            losing customers to slow, broken websites. Every project I take on, I build personally. No agency overhead,
            no offshore handoffs, no project managers between you and the work.
          </p>
          <p className="mt-6 text-[14px] font-medium text-ink-2">Working with small businesses across Canada</p>
        </Rise>
      </section>

      {/* Closing */}
      <section className="tile tile-red on-dark py-24 md:py-32 px-6 text-center">
        <Rise>
          <h2 className="display text-[44px] md:text-[80px]">See what&apos;s broken.</h2>
          <p className="subhead text-[19px] md:text-[24px] mt-4 text-white/90 max-w-[620px] mx-auto">
            A free manual audit of your current site: speed, mobile, SEO, trust and conversion. In your inbox within 24
            hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Pill href="/audit" variant="white">
              Get a free audit
            </Pill>
            <Pill href="/contact" variant="ghost">
              Contact
            </Pill>
          </div>
        </Rise>
      </section>
    </>
  );
}
