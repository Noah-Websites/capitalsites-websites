"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevLink } from "@/components/ui";
import { AvailabilityBadge } from "@/components/offers";
import {
  availabilityInfo,
  contactOptions,
  getContactOption,
  placeholderFor,
  priceLine,
  resolveContactSlug,
  type ContactSlug,
} from "@/data/offers";

export const FORM_ACTION = "https://formsubmit.co/capitalsitesottawa@gmail.com";
export const THANKS_URL = "https://www.capitalsites.ca/thanks";

/* Reads ?service= and hands it to the form. Must sit inside <Suspense>. */
export function ContactFromParams() {
  const params = useSearchParams();
  const resolved = resolveContactSlug(params.get("service"));
  return <ContactForm key={resolved ? `${resolved.slug}:${resolved.alias ?? ""}` : "none"} initial={resolved?.slug} alias={resolved?.alias} />;
}

export default function ContactForm({ initial, alias }: { initial?: ContactSlug; alias?: string }) {
  const [value, setValue] = useState<ContactSlug | "">(initial ?? "");
  const [fromAlias, setFromAlias] = useState(alias);
  const picked = getContactOption(value);
  const offer = picked?.offer;
  const interestOnly = offer && offer.availability !== "available";

  return (
    <div className="max-w-[1024px] mx-auto grid lg:grid-cols-[1fr_560px] gap-10 lg:gap-16 items-start">
      <div className="pt-2">
        <h1 className="display text-[48px] md:text-[72px]">Let&apos;s talk.</h1>
        <p className="subhead text-[19px] md:text-[21px] text-ink-2 mt-5 max-w-[440px]">
          Tell us what you need and we will get back to you within 24 hours. No website yet? That&apos;s fine, just leave
          the website field blank.
        </p>
        <p
          aria-live="polite"
          className={`mt-6 max-w-[440px] rounded-2xl bg-white ring-1 ring-line px-4 py-3 text-[14px] leading-[1.45] text-ink-2 ${picked ? "" : "hidden"}`}
          data-testid="picked-summary"
        >
          {picked && (
            <>
              You picked: <span className="font-semibold text-ink">{offer ? offer.name : picked.label}</span>
              {offer ? ` (${priceLine(offer)})` : ""}
              {interestOnly ? ". Registering interest only; no payment is taken." : ""}
            </>
          )}
        </p>
        <div className="mt-10 space-y-4">
          <div>
            <ChevLink href="https://calendly.com/capitalsitesottawa/website-consult">Book a consult call</ChevLink>
          </div>
          <p className="text-[17px] text-ink-2">
            Prefer email?{" "}
            <a href="mailto:capitalsitesottawa@gmail.com" className="text-ink underline underline-offset-3 hover:text-red">
              capitalsitesottawa@gmail.com
            </a>
          </p>
        </div>
      </div>

      <form
        action={FORM_ACTION}
        method="POST"
        className="card-tile bg-white p-7 md:p-10 space-y-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New Project Inquiry - CapitalSites" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value={THANKS_URL} />
        {/* FormSubmit honeypot: people never see or fill it; bots that do are dropped. */}
        <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        {/* The picked service's slug, so enquiries can be counted per product. */}
        <input type="hidden" name="service" value={value} data-testid="service-slug" />

        <div>
          <label htmlFor="package" className="field-label">What do you need?</label>
          {/* Native select laid over a visible label so long options wrap on phones. */}
          <div className="relative">
            <div
              aria-hidden
              className={`field field-select flex items-center py-3 leading-[1.35] ${picked ? "text-ink" : "text-ink-2"}`}
            >
              {picked ? picked.label : "Choose one"}
            </div>
            <select
              id="package"
              name="package"
              required
              value={picked ? picked.label : ""}
              onChange={(e) => {
                const opt = contactOptions.find((o) => o.label === e.target.value);
                setValue(opt ? opt.slug : "");
                setFromAlias(undefined);
              }}
              aria-describedby="service-info"
              className="service-select absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
              <option value="" disabled>
                Choose one
              </option>
              {contactOptions.map((o) => (
                <option key={o.slug} value={o.label}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div id="service-info" aria-live="polite" className={`mt-3 rounded-xl bg-snow px-4 py-3 ${picked ? "" : "hidden"}`}>
            {offer && (
              <>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <p className="text-[15px] font-semibold text-ink" data-testid="service-price">
                    {offer.name}: {priceLine(offer)}
                  </p>
                  <AvailabilityBadge availability={offer.availability} />
                </div>
                <p className="text-[14px] text-ink-2 mt-1.5 leading-[1.45]" data-testid="service-description">
                  {offer.summary}
                  {interestOnly ? ` ${availabilityInfo[offer.availability].note}` : ""}
                </p>
              </>
            )}
            {picked && !offer && (
              <>
                <p className="text-[15px] font-semibold text-ink" data-testid="service-price">
                  We&apos;ll recommend the right option
                </p>
                <p className="text-[14px] text-ink-2 mt-1 leading-[1.45]" data-testid="service-description">
                  Tell us what&apos;s going on and we&apos;ll suggest where to start.
                </p>
              </>
            )}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="field-label">Name</label>
            <input type="text" id="name" name="name" required placeholder="Your name" className="field" autoComplete="name" />
          </div>
          <div>
            <label htmlFor="business" className="field-label">Business name</label>
            <input type="text" id="business" name="business_name" required placeholder="Your business" className="field" autoComplete="organization" />
          </div>
          <div>
            <label htmlFor="email" className="field-label">Email</label>
            <input type="email" id="email" name="email" required placeholder="you@example.com" className="field" autoComplete="email" />
          </div>
          <div>
            <label htmlFor="website" className="field-label">Current website (optional)</label>
            <input type="text" id="website" name="current_website" placeholder="yourbusiness.ca" className="field" aria-describedby="website-help" />
            <p id="website-help" className="text-[13px] text-ink-2 mt-1.5">No website yet? Leave this blank.</p>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="field-label">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder={placeholderFor(value, fromAlias)}
            className="field resize-none leading-[1.5]"
          />
        </div>
        <button type="submit" className="pill pill-red w-full">
          Send message
        </button>
        <p className="text-center text-[13px] text-ink-2 leading-[1.5]">
          Your enquiry is sent through FormSubmit, a third-party form service, to our inbox. We only use it to reply to you.{" "}
          <Link href="/privacy" className="text-ink underline underline-offset-3 hover:text-red">
            Privacy
          </Link>
        </p>
      </form>
    </div>
  );
}
