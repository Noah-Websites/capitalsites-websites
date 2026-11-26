import Link from "next/link";
import Rise from "@/components/Rise";
import { Pill, ChevLink, MacBook, IPhone } from "@/components/ui";

const projects = [
  {
    slug: "fade-and-co",
    name: "Fade & Co.",
    location: "Kensington, Calgary",
    plan: "Website Plan · $0 upfront, $99/mo",
    desc: "Concept redesign of a modern barbershop. Clean 5-page site with mobile optimization, booking-style contact form, and SEO foundation.",
    tile: "tile-black on-dark",
  },
  {
    slug: "ember-kitchen",
    name: "Ember Kitchen",
    location: "North End, Halifax",
    plan: "Website Plan · $0 upfront, $99/mo",
    desc: "Concept redesign for a wood-fired restaurant. 7 pages with menu, reservations form, team bios, gallery, and Google Business Profile setup.",
    tile: "tile-snow",
  },
  {
    slug: "maison-noir",
    name: "Maison Noir",
    location: "Centretown, Ottawa",
    plan: "Premium · $2,500 + $129/mo",
    desc: "Concept e-commerce build for a fashion boutique. Up to 15 pages with shop, collections, lookbook, and Stripe-ready checkout.",
    tile: "tile-ink on-dark",
  },
];

export const metadata = {
  title: "Work — CapitalSites",
  description: "Three concept redesigns showing what CapitalSites builds at each plan.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-white text-center px-6 pt-20 md:pt-28 pb-14">
        <h1 className="display text-[48px] sm:text-[64px] md:text-[88px]">Concept redesigns.</h1>
        <p className="subhead text-[19px] md:text-[24px] mt-5 text-ink-2 max-w-[680px] mx-auto">
          Three example sites showing what we&apos;d build at each plan. These are concepts, not paying clients. Real
          client work will be added as projects launch.
        </p>
      </section>

      <div className="bg-white px-3 pb-3 space-y-3">
        {projects.map((p) => (
          <section key={p.slug} className={`tile ${p.tile} card-tile pt-16 md:pt-20 text-center`}>
            <Rise className="px-6">
              <h2 className="display text-[48px] md:text-[72px]">{p.name}</h2>
              <p className="text-[15px] font-semibold opacity-80 mt-2">{p.location} · Concept</p>
              <p className="subhead text-[17px] md:text-[21px] mt-3 max-w-[620px] mx-auto opacity-85">{p.desc}</p>
              <p className="text-[15px] font-semibold mt-4">{p.plan}</p>
              <div className="mt-6">
                <ChevLink href={`/portfolio/${p.slug}`}>View the demo site</ChevLink>
              </div>
            </Rise>
            <Rise className="mt-12 px-6 relative">
              <Link href={`/portfolio/${p.slug}`} className="block max-w-[860px] mx-auto translate-y-[8%]" aria-label={`Open the ${p.name} demo`}>
                <div className="hidden sm:block">
                  <MacBook src={`/shots/${p.slug}-desktop.jpg`} alt={`${p.name} concept website on a laptop`} />
                </div>
                <div className="sm:hidden w-[62%] mx-auto">
                  <IPhone src={`/shots/${p.slug}-mobile.jpg`} alt={`${p.name} concept website on a phone`} />
                </div>
              </Link>
            </Rise>
          </section>
        ))}
      </div>

      <section className="bg-white text-center px-6 py-24 md:py-32">
        <h2 className="headline text-[40px] md:text-[56px]">Want this for your business?</h2>
        <p className="subhead text-[19px] md:text-[21px] text-ink-2 mt-3 max-w-[620px] mx-auto">
          Get a free audit of your current site, then we&apos;ll quote a rebuild based on what needs fixing.
        </p>
        <div className="mt-8">
          <Pill href="/audit">Get a free audit</Pill>
        </div>
      </section>
    </>
  );
}
