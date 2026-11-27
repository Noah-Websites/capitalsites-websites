import type { ReactNode } from "react";
import { Check, ChevLink, Pill } from "@/components/ui";
import {
  availabilityInfo,
  contactHref,
  firstYearNote,
  groups,
  offersIn,
  priceFigure,
  priceNote,
  type Availability,
  type GroupId,
  type Offer,
} from "@/data/offers";

const badgeStyle: Record<Availability, string> = {
  available: "bg-ink text-white",
  pilot: "bg-red text-white",
  "coming-soon": "bg-white text-ink-2 ring-1 ring-line",
};

/** Availability tag, from offers.ts: "Available", "Founding customer pilot" or "Not available yet". */
export function AvailabilityBadge({ availability, className = "" }: { availability: Availability; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold whitespace-nowrap ${badgeStyle[availability]} ${className}`}
    >
      {availability === "available" && (
        <svg viewBox="0 0 12 12" className="w-3 h-3 flex-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2.5 6.5 5 9l4.5-5.5" />
        </svg>
      )}
      {availabilityInfo[availability].badge}
    </span>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-3">
      {items.map((f) => (
        <li key={f} className="flex gap-3 text-[16px] leading-[1.4]">
          <Check />
          {f}
        </li>
      ))}
    </ul>
  );
}

/** A full offer card: name, availability, what it does, what's included, price and the right call to action. */
export function OfferCard({
  offer: o,
  ground = "snow",
  className = "",
  children,
}: {
  offer: Offer;
  ground?: "snow" | "white";
  className?: string;
  children?: ReactNode;
}) {
  const interest = o.availability !== "available";
  return (
    <div className={`card-tile min-w-0 ${ground === "snow" ? "bg-snow" : "bg-white"} p-7 sm:p-10 flex flex-col ${className}`}>
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="headline text-[32px] md:text-[36px]">{o.name}</h3>
        <AvailabilityBadge availability={o.availability} />
      </div>
      <p className="text-[17px] text-ink-2 mt-3 leading-[1.5]">{o.description}</p>
      <h4 className="text-[15px] font-semibold mt-7">{o.monthlyIncludes ? "The build" : "What you get"}</h4>
      <List items={o.includes} />
      {o.monthlyIncludes && (
        <>
          <h4 className="text-[15px] font-semibold mt-7">Every month</h4>
          <List items={o.monthlyIncludes} />
        </>
      )}
      {children}
      <div className="mt-auto pt-10">
        <p className="display tabular text-[60px] sm:text-[72px] leading-none">{priceFigure(o)}</p>
        <p className="text-[15px] text-ink-2 mt-2 leading-[1.45]">
          {priceNote(o)}
          {o.slug === "plan" && ` (${firstYearNote()})`}
        </p>
        {interest && <p className="text-[15px] text-ink font-medium mt-2 leading-[1.45]">{availabilityInfo[o.availability].note}</p>}
        <div className="mt-7">
          <Pill href={contactHref(o.slug)} variant={o.availability === "coming-soon" ? "ghost" : "red"}>
            {o.cta}
          </Pill>
        </div>
      </div>
    </div>
  );
}

/** One price table per group (Pricing page). A table from md up, stacked rows below. */
export function PriceTable({ group }: { group: GroupId }) {
  const list = offersIn(group);
  const name = groups.find((g) => g.id === group)?.name ?? group;
  const price = (o: Offer) => (
    <>
      <span className="block text-[21px] font-semibold tracking-[-0.015em] tabular text-ink">{priceFigure(o)}</span>
      <span className="block text-[14px] text-ink-2 mt-1 leading-[1.45]">
        {priceNote(o)}
        {o.slug === "plan" && ` (${firstYearNote()})`}
      </span>
    </>
  );
  return (
    <>
      {/* Fixed layout and one shared set of column widths, so the three tables line up. */}
      <table className="hidden md:table table-fixed w-full text-left border-collapse">
        <caption className="sr-only">{name} prices</caption>
        <colgroup>
          <col className="w-[32%]" />
          <col className="w-[28%]" />
          <col className="w-[18%]" />
          <col className="w-[22%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-line text-[13px] text-ink-2">
            <th scope="col" className="py-3 pr-6 font-semibold">Service</th>
            <th scope="col" className="py-3 pr-6 font-semibold">Price</th>
            <th scope="col" className="py-3 pr-4 font-semibold">Availability</th>
            <th scope="col" className="py-3 font-semibold">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((o) => (
            <tr key={o.slug} className="border-b border-line last:border-b-0 align-top">
              <th scope="row" className="py-6 pr-6 font-normal">
                <span className="block text-[19px] font-semibold tracking-[-0.015em] text-ink">{o.name}</span>
                <span className="block text-[15px] text-ink-2 mt-1 leading-[1.45]">{o.summary}</span>
              </th>
              <td className="py-6 pr-6">{price(o)}</td>
              <td className="py-6 pr-4">
                <AvailabilityBadge availability={o.availability} />
              </td>
              <td className="py-6 text-right">
                <ChevLink href={contactHref(o.slug)}>{o.cta}</ChevLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="md:hidden divide-y divide-line">
        {list.map((o) => (
          <li key={o.slug} className="py-6 first:pt-2 last:pb-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-ink">{o.name}</h3>
              <AvailabilityBadge availability={o.availability} />
            </div>
            <p className="text-[15px] text-ink-2 mt-1 leading-[1.45]">{o.summary}</p>
            <div className="mt-3">{price(o)}</div>
            <div className="mt-3">
              <ChevLink href={contactHref(o.slug)}>{o.cta}</ChevLink>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
