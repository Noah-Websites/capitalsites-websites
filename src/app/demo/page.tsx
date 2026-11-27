import Rise from "@/components/Rise";
import DemoLoader from "@/components/demo/DemoLoader";
import { Pill } from "@/components/ui";
import { contactHref, getOffer } from "@/data/offers";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Demo: Maple Home Services (fictional)",
  description:
    "See how estimate requests, owner alerts, booking, quote follow-up and system health work for a contractor or home-service business. Maple Home Services is fictional; nothing you type is sent anywhere.",
  path: "/demo",
});

const simulated = [
  "Email alerts: they land in an outbox on this page.",
  "The clock: move it forward to see what happens over days.",
  "The second app in the sync view.",
];
const real = [
  "Your own Google account or job software holds the list.",
  "Real email alerts go to you.",
  "Everything is tested with you before handover.",
];

export default function DemoPage() {
  const estimates = getOffer("estimate-requests");
  return (
    <>
      <div className="sticky top-14 z-40 bg-ink text-white" role="note" aria-label="Fictional demonstration">
        <p className="max-w-[1024px] mx-auto px-5 py-2.5 text-[14px] leading-[1.45] flex gap-2.5 items-start">
          <svg viewBox="0 0 20 20" className="w-[18px] h-[18px] flex-none mt-[1px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <circle cx="10" cy="10" r="8" />
            <path d="M10 9v5M10 6.2v.1" />
          </svg>
          <span>
            <strong className="font-semibold">Fictional demonstration.</strong> Maple Home Services is a made-up business.
            Nothing here is sent anywhere.
          </span>
        </p>
      </div>

      <section className="tile tile-white text-center px-6 pt-16 md:pt-24 pb-12">
        <h1 className="display text-[48px] sm:text-[64px] md:text-[88px]">See how it works.</h1>
        <p className="subhead text-[19px] md:text-[24px] mt-5 text-ink-2 max-w-[720px] mx-auto">
          One estimate request for Maple Home Services (fictional), followed from the website form to the owner&apos;s list,
          a booked visit, a tracked quote and a reminder. Move the simulated clock to see what happens over days.
        </p>
      </section>

      <section className="bg-white px-3 pb-3">
        <div className="max-w-[1024px] mx-auto grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-snow p-6 md:p-8">
            <h2 className="text-[21px] font-semibold tracking-[-0.015em]">Simulated here</h2>
            <ul className="mt-3 space-y-2 text-[16px] leading-[1.45] text-ink-2 list-disc pl-5">
              {simulated.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-snow p-6 md:p-8">
            <h2 className="text-[21px] font-semibold tracking-[-0.015em]">In a real setup</h2>
            <ul className="mt-3 space-y-2 text-[16px] leading-[1.45] text-ink-2 list-disc pl-5">
              {real.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="max-w-[1024px] mx-auto px-3 mt-4 text-[14px] text-ink-2 leading-[1.5]">
          This demo doesn&apos;t connect to any third-party app, and it doesn&apos;t mean a particular app is supported. We
          confirm your tools before quoting.
        </p>
      </section>

      <section className="bg-snow px-2 sm:px-4 md:px-6 py-8 md:py-16 mt-3" aria-label="Interactive demo: Maple Home Services (fictional)">
        {/* Fictional amounts live inside this region; the price check skips it. */}
        <div className="max-w-[1180px] mx-auto" data-fictional="demo">
          <DemoLoader />
        </div>
      </section>

      <section className="tile tile-ink on-dark text-center px-6 py-24 md:py-32">
        <Rise>
          <h2 className="headline text-[40px] md:text-[56px]">Want this for your business?</h2>
          <p className="subhead text-[19px] md:text-[21px] text-white/90 mt-3 max-w-[640px] mx-auto">
            {estimates.name} is our founding customer pilot. Register interest; no payment is taken and no delivery date
            is promised yet.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Pill href={contactHref(estimates.slug)}>{estimates.cta}</Pill>
            <Pill href="/pricing" variant="ghost">
              See pricing
            </Pill>
          </div>
        </Rise>
      </section>
    </>
  );
}
