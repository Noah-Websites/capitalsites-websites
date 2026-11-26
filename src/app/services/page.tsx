import Rise from "@/components/Rise";
import { Pill, ChevLink, IPhone } from "@/components/ui";

export const metadata = {
  title: "Services — CapitalSites",
  description: "Design, mobile, SEO, support and e-commerce for independent small businesses across Canada.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="tile tile-black on-dark text-center px-6 pt-20 md:pt-28 pb-20">
        <h1 className="display text-[48px] sm:text-[64px] md:text-[88px] text-white">Everything your site needs.</h1>
        <p className="subhead text-[19px] md:text-[24px] mt-5 text-night-muted max-w-[640px] mx-auto">
          Everything an independent Canadian business needs to look credible and get found online.
        </p>
      </section>

      <section className="bg-white p-3">
        <div className="grid gap-3 md:grid-cols-6">
          <Rise className="tile tile-snow card-tile md:col-span-4 p-10 md:p-14 min-h-[420px] flex flex-col justify-between">
            <div>
              <h2 className="headline text-[36px] md:text-[48px]">Custom design.</h2>
              <p className="text-[17px] md:text-[19px] text-ink-2 mt-3 max-w-[460px] leading-[1.45]">
                Every website is designed from scratch to match your brand, your audience, and your goals. No templates,
                no shortcuts.
              </p>
            </div>
            <ChevLink href="/portfolio">See concept work</ChevLink>
          </Rise>
          <Rise className="tile tile-red on-dark card-tile md:col-span-2 p-10 min-h-[420px] flex flex-col justify-between">
            <h2 className="headline text-[36px] md:text-[40px]">Fast.</h2>
            <div className="tabular">
              <p className="display text-[96px] leading-none">7</p>
              <p className="text-[19px] font-semibold mt-1">days to launch a rebuild</p>
              <p className="text-[14px] text-white/90 mt-3">New sites 10–14 days. Premium 14–21.</p>
            </div>
          </Rise>
          <Rise className="tile tile-black on-dark card-tile md:col-span-3 px-10 pt-10 md:px-14 md:pt-14 min-h-[520px] flex flex-col">
            <h2 className="headline text-[36px] md:text-[48px] text-white">Mobile first.</h2>
            <p className="text-[17px] md:text-[19px] text-night-muted mt-3 max-w-[420px] leading-[1.45]">
              Responsive layouts, touch-friendly navigation, and fast loading on cellular connections.
            </p>
            <div className="mt-auto pt-10 w-[56%] max-w-[240px] mx-auto translate-y-[18%]">
              <IPhone src="/shots/fade-and-co-mobile.jpg" alt="Fade & Co concept website on a phone" />
            </div>
          </Rise>
          <Rise className="tile tile-ink on-dark card-tile md:col-span-3 p-10 md:p-14 min-h-[520px] flex flex-col">
            <h2 className="headline text-[36px] md:text-[48px]">Found on Google.</h2>
            <p className="text-[17px] md:text-[19px] text-white/90 mt-3 max-w-[440px] leading-[1.45]">
              Technical SEO, semantic HTML, image optimization, sitemap generation, and Google Search Console setup
              included with every build.
            </p>
            <div className="mt-auto pt-10 rounded-2xl bg-white text-ink p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] max-w-[440px]">
              <p className="text-[12px] text-ink-2">Sample search result</p>
              <p className="text-[13px] text-ink-2 mt-2">yourbusiness.ca</p>
              <p className="text-[19px] text-ink font-medium leading-tight mt-0.5 underline underline-offset-2">Your Business — Hours, Menu &amp; Booking</p>
              <p className="text-[14px] text-ink-2 mt-1 leading-snug">Hours, menu, booking and directions. Updated monthly.</p>
            </div>
          </Rise>
          <Rise className="tile tile-snow card-tile md:col-span-3 p-10 md:p-14 min-h-[360px]">
            <h2 className="headline text-[36px] md:text-[48px]">We stay after launch.</h2>
            <p className="text-[17px] md:text-[19px] text-ink-2 mt-3 max-w-[440px] leading-[1.45]">
              Content updates, security patches, performance monitoring, and email support. Your website stays running
              smoothly long after launch day.
            </p>
          </Rise>
          <Rise className="tile tile-snow card-tile md:col-span-3 p-10 md:p-14 min-h-[360px] flex flex-col">
            <h2 className="headline text-[36px] md:text-[48px]">Sell online.</h2>
            <p className="text-[17px] md:text-[19px] text-ink-2 mt-3 max-w-[440px] leading-[1.45]">
              Stripe, Shopify, or WooCommerce, with product catalogs, cart, checkout, inventory and order notifications
              set up and ready to go. Part of the Premium plan.
            </p>
            <div className="mt-auto pt-6">
              <ChevLink href="/pricing">Premium pricing</ChevLink>
            </div>
          </Rise>
        </div>
      </section>

      <section className="bg-white text-center px-6 py-24 md:py-32">
        <h2 className="headline text-[40px] md:text-[56px]">Start with a free audit.</h2>
        <p className="subhead text-[19px] md:text-[21px] text-ink-2 mt-3">We&apos;ll show you exactly what to fix.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Pill href="/audit">Get a free audit</Pill>
          <Pill href="/pricing" variant="ghost">
            See pricing
          </Pill>
        </div>
      </section>
    </>
  );
}
