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
  "Real email alerts go to you. They aren't instant: new requests are checked every 5 minutes.",
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
            Nothing you type here is sent anywhere.
          </span>
        </p>
      </div>

      <section className="tile tile-white text-center px-6 pt-10 md:pt-16 pb-6 md:pb-8">
        <h1 className="display text-[48px] md:text-[72px]">See how it works.</h1>
        <p className="subhead text-[19px] md:text-[24px] mt-4 text-ink-2 max-w-[860px] mx-auto">
          Follow one estimate request from the form to the owner&apos;s reminder.
        </p>
      </section>

      <section className="bg-snow px-2 sm:px-4 md:px-6 pt-3 pb-6 md:py-10" aria-label="Interactive demo: Maple Home Services (fictional)">
        {/* Fictional amounts live inside this region; the price check skips it. */}
        <div className="max-w-[1180px] mx-auto" data-fictional="demo">
          <DemoLoader />
        </div>
      </section>

      {/* What's simulated vs real: right after the demo, so the demo itself starts on the first screen. */}
      <section className="bg-snow px-2 sm:px-4 md:px-6 pb-10 md:pb-16" aria-label="What's simulated and what's real">
        <div className="max-w-[1180px] mx-auto rounded-2xl bg-white ring-1 ring-line px-5 py-5 md:px-8 md:py-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
          <div>
            <h2 className="text-[17px] font-semibold tracking-[-0.015em]">Simulated here</h2>
            <ul className="mt-1.5 space-y-1 text-[15px] leading-[1.45] text-ink-2 list-disc pl-5">
              {simulated.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[17px] font-semibold tracking-[-0.015em]">In a real setup</h2>
            <ul className="mt-1.5 space-y-1 text-[15px] leading-[1.45] text-ink-2 list-disc pl-5">
              {real.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <p className="md:col-span-2 text-[13px] text-ink-2 leading-[1.5]">
            This demo doesn&apos;t connect to any third-party app, and it doesn&apos;t mean a particular app is supported.
            We confirm your tools before quoting.
          </p>
        </div>
      </section>

      <section className="tile tile-ink on-dark text-center px-6 py-24 md:py-32">
        <Rise>
          <h2 className="headline text-[40px] md:text-[56px]">Want this for your business?</h2>
          <p className="subhead text-[19px] md:text-[21px] text-white/90 mt-3 max-w-[640px] mx-auto">
            {estimates.name} is our founding customer pilot, open for expressions of interest only. We&apos;re not taking
            paying customers for it yet: no payment is taken and no delivery date is promised.
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
