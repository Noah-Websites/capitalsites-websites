import Rise from "@/components/Rise";
import FixTerms from "@/components/FixTerms";
import { AvailabilityBadge, OfferCard } from "@/components/offers";
import { Pill, ChevLink, IPhone } from "@/components/ui";
import { contactHref, getOffer, groups, offersIn, priceFigure, priceNote, TERMS_NOTE } from "@/data/offers";
import { pageMeta } from "@/lib/seo";

const fix = getOffer("fix");
const group = (id: "websites" | "operations" | "care") => groups.find((g) => g.id === id)!;

export const metadata = pageMeta({
  title: "Services for contractors and home-service businesses — CapitalSites",
  description: `Websites (Website Fix from ${priceFigure(fix)}, Website Plan, Premium Website), digital operations (estimate requests, quote follow-up, online booking, software integration) and Digital Care for contractors and home-service businesses in Canada.`,
  path: "/services",
});

export default function ServicesPage() {
  const websites = group("websites");
  const operations = group("operations");
  const care = group("care");
  return (
    <>
      <section className="tile tile-black on-dark text-center px-6 pt-20 md:pt-28 pb-20">
        <h1 className="display text-[48px] sm:text-[64px] md:text-[88px] text-white">What we set up.</h1>
        <p className="subhead text-[19px] md:text-[24px] mt-5 text-night-muted max-w-[680px] mx-auto">
          Websites, digital operations and ongoing care for contractors and home-service businesses in Canada.
        </p>
        <nav aria-label="Service groups" className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {groups.map((g) => (
            <ChevLink key={g.id} href={`#${g.id}`}>
              {g.name}
            </ChevLink>
          ))}
        </nav>
      </section>

      {/* Websites */}
      <section id="websites" aria-labelledby="websites-title" className="bg-white px-3 pt-24 md:pt-32 pb-3 scroll-mt-14">
        <Rise className="text-center px-6">
          <h2 id="websites-title" className="headline text-[40px] md:text-[56px]">{websites.title}</h2>
          <p className="subhead text-[19px] md:text-[24px] mt-3 text-ink-2 max-w-[680px] mx-auto">{websites.intro}</p>
          <div className="mt-6">
            <ChevLink href="/portfolio">See concept websites</ChevLink>
          </div>
        </Rise>

        <div className="mt-12 grid gap-3 md:grid-cols-2">
          <Rise className="md:col-span-2">
            <div id="website-fix" className="tile-snow card-tile p-7 sm:p-10 md:p-14 grid gap-10 lg:grid-cols-[1fr_1.4fr] scroll-mt-20">
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="headline text-[36px] md:text-[48px]">{fix.name}</h3>
                  <AvailabilityBadge availability={fix.availability} />
                </div>
                <p className="text-[17px] md:text-[19px] text-ink-2 mt-3 max-w-[440px] leading-[1.45]">{fix.description}</p>
                <p className="display tabular text-[60px] sm:text-[72px] md:text-[88px] leading-none mt-8">{priceFigure(fix)}</p>
                <p className="text-[15px] text-ink-2 mt-2">CAD, {priceNote(fix)}.</p>
                <div className="mt-8">
                  <Pill href={contactHref("fix")}>{fix.cta}</Pill>
                </div>
              </div>
              <div className="lg:pt-3">
                <FixTerms />
              </div>
            </div>
          </Rise>
          {offersIn("websites")
            .filter((o) => o.slug !== "fix")
            .map((o) => (
              <Rise key={o.slug} className="flex">
                <OfferCard offer={o} className="w-full" />
              </Rise>
            ))}

          <Rise className="tile tile-black on-dark card-tile px-8 pt-10 md:px-14 md:pt-14 min-h-[520px] flex flex-col">
            <h3 className="headline text-[36px] md:text-[48px] text-white">Mobile first.</h3>
            <p className="text-[17px] md:text-[19px] text-night-muted mt-3 max-w-[420px] leading-[1.45]">
              Responsive layouts, touch-friendly navigation, and fast loading on cellular connections.
            </p>
            <div className="mt-auto pt-10 w-[56%] max-w-[240px] mx-auto translate-y-[18%]">
              <IPhone src="/shots/fade-and-co-mobile.jpg" alt="Fade & Co concept website on a phone" />
            </div>
          </Rise>
          <Rise className="tile tile-ink on-dark card-tile p-8 md:p-14 min-h-[520px] flex flex-col">
            <h3 className="headline text-[36px] md:text-[48px]">Found on Google.</h3>
            <p className="text-[17px] md:text-[19px] text-white/90 mt-3 max-w-[440px] leading-[1.45]">
              Technical SEO, semantic HTML, image optimization, sitemap generation, and Google Search Console setup included
              with every website build.
            </p>
            <div className="mt-auto pt-10 rounded-2xl bg-white text-ink p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] max-w-[440px]">
              <p className="text-[12px] text-ink-2">Sample search result</p>
              <p className="text-[13px] text-ink-2 mt-2">yourbusiness.ca</p>
              <p className="text-[19px] text-ink font-medium leading-tight mt-0.5 underline underline-offset-2">
                Your Business — Services, Areas &amp; Estimates
              </p>
              <p className="text-[14px] text-ink-2 mt-1 leading-snug">Services, service areas, hours and an estimate request form.</p>
            </div>
          </Rise>
          <Rise className="tile tile-snow card-tile p-8 md:p-14 min-h-[300px] flex flex-col justify-between">
            <h3 className="headline text-[36px] md:text-[48px]">Fast.</h3>
            <div className="tabular mt-8">
              <p className="display text-[96px] leading-none text-red">7</p>
              <p className="text-[19px] font-semibold mt-1">days to launch a rebuild</p>
              <p className="text-[14px] text-ink-2 mt-3">New sites 10–14 days. Premium 14–21.</p>
            </div>
          </Rise>
          <Rise className="tile tile-snow card-tile p-8 md:p-14 min-h-[300px]">
            <h3 className="headline text-[36px] md:text-[48px]">We stay after launch.</h3>
            <p className="text-[17px] md:text-[19px] text-ink-2 mt-3 max-w-[440px] leading-[1.45]">
              Hosting, security updates, uptime monitoring, routine content updates and email support are part of the
              Website Plan.
            </p>
          </Rise>
        </div>
      </section>

      {/* Digital operations */}
      <section id="operations" aria-labelledby="operations-title" className="bg-snow px-3 pt-24 md:pt-32 pb-3 scroll-mt-14">
        <Rise className="text-center px-6">
          <h2 id="operations-title" className="headline text-[40px] md:text-[56px]">{operations.title}</h2>
          <p className="subhead text-[19px] md:text-[24px] mt-3 text-ink-2 max-w-[720px] mx-auto">{operations.intro}</p>
          <div className="mt-6">
            <ChevLink href="/demo">Try the demo</ChevLink>
          </div>
        </Rise>
        <div className="mt-12 grid gap-3 md:grid-cols-2">
          {offersIn("operations").map((o) => (
            <Rise key={o.slug} className="flex">
              <OfferCard offer={o} ground="white" className="w-full" />
            </Rise>
          ))}
        </div>
        <p className="pt-12 pb-12 px-6 text-center text-[14px] leading-[1.6] text-ink-2 max-w-[720px] mx-auto">
          We confirm your tools are supported before quoting. {TERMS_NOTE}
        </p>
      </section>

      {/* Digital Care */}
      <section id="care" aria-labelledby="care-title" className="bg-white px-3 pt-24 md:pt-32 pb-3 scroll-mt-14">
        <Rise className="text-center px-6">
          <h2 id="care-title" className="headline text-[40px] md:text-[56px]">{care.title}</h2>
          <p className="subhead text-[19px] md:text-[24px] mt-3 text-ink-2 max-w-[720px] mx-auto">{care.intro}</p>
        </Rise>
        <div className="mt-12 max-w-[760px] mx-auto">
          {offersIn("care").map((o) => (
            <Rise key={o.slug} className="flex">
              <OfferCard offer={o} className="w-full" />
            </Rise>
          ))}
        </div>
      </section>

      <section className="tile tile-ink on-dark text-center px-6 py-24 md:py-32 mt-3">
        <Rise>
          <h2 className="headline text-[40px] md:text-[56px]">Not sure where to start?</h2>
          <p className="subhead text-[19px] md:text-[21px] text-white/90 mt-3 max-w-[620px] mx-auto">
            Tell us what&apos;s going on and we&apos;ll suggest where to start. Or begin with a free audit of your current
            website.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Pill href={contactHref("not-sure")}>Get in touch</Pill>
            <Pill href="/audit" variant="ghost">
              Free website audit
            </Pill>
          </div>
        </Rise>
      </section>
    </>
  );
}
