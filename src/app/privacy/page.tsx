import type { ReactNode } from "react";
import Link from "next/link";
import { contactOptions } from "@/data/offers";
import { pageMeta } from "@/lib/seo";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata = pageMeta({
  title: "Privacy — CapitalSites",
  description:
    "What happens to the information you send through the CapitalSites website: what the forms collect, where it goes and what we use it for.",
  path: "/privacy",
});

const enquiryTypes = contactOptions.map((o) => o.label);

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-8 border-b border-line">
      <h2 className="text-[21px] md:text-[24px] font-semibold tracking-[-0.015em]">{title}</h2>
      <div className="mt-3 space-y-3 text-[17px] leading-[1.6] text-ink-2">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <section className="tile tile-white px-6 pt-20 md:pt-28 pb-6">
        <div className="max-w-[720px] mx-auto">
          <h1 className="display text-[48px] md:text-[72px]">Privacy.</h1>
          <p className="subhead text-[19px] md:text-[21px] text-ink-2 mt-5 leading-[1.45]">
            What happens to the information you send through this website. It describes how the site works today.
          </p>
          <p className="text-[14px] text-ink-2 mt-4">Last updated 27 November 2026.</p>
        </div>
      </section>
      <section className="bg-white px-6 pb-24 md:pb-32">
        <div className="max-w-[720px] mx-auto border-t border-line">
          <Block title="What the forms collect">
            <p>
              Only what you type in. The contact form asks for your name, business name, email, current website
              (optional), a message and the service you&apos;re asking about. The audit form asks for your name, email and
              website address.
            </p>
            <p>The service you pick on the contact form can be any of these:</p>
            <ul className="list-disc pl-6 space-y-1">
              {enquiryTypes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Block>
          <Block title="Where it goes">
            <p>
              Both forms are sent through FormSubmit (formsubmit.co), a third-party form service, to our email inbox, a
              Gmail address. FormSubmit&apos;s own privacy policy covers its part.
            </p>
          </Block>
          <Block title="What we use it for">
            <p>
              To reply to your enquiry. If you registered interest in a service that isn&apos;t available yet, or asked
              us to tell you when one is ready, we use your email to contact you about that service. There is no mailing
              list on this site.
            </p>
          </Block>
          <Block title="Analytics and cookies">
            <p>
              We use Google Analytics 4, a Google service, to count visits and see which pages and buttons get used. It
              runs only if you choose <strong className="font-semibold text-ink">Allow</strong>. Until then nothing is
              loaded from Google and no analytics cookies are set. You can change your choice at any time with{" "}
              <CookieSettingsButton className="text-ink underline underline-offset-3 hover:text-red">
                Cookie settings
              </CookieSettingsButton>
              , also at the bottom of every page.
            </p>
            <p>
              If you allow it, Google Analytics records the pages you view, the site that sent you here, your browser,
              device, screen size and language, an approximate location (such as your city) that Google works out from your
              IP address, and events such as a main button or an email link being clicked, the demo being used or a form
              being sent. It never receives your name, email address, phone number or anything you type into the forms or
              the demo.
            </p>
            <p>
              It sets two cookies, <code>_ga</code> and <code>_ga_C5722KERH0</code>, which hold a random ID so repeat
              visits can be counted. They expire after 13 months. According to Google, Google Analytics 4 doesn&apos;t log
              or store IP addresses. Google processes this information and may store it outside Canada, including in the
              United States. Detailed records are deleted after 14 months at most; reports keep only totals.
            </p>
            <p>
              Google&apos;s advertising features are turned off: no Google signals, no ad personalization and no
              remarketing. We don&apos;t sell this information or use it for advertising.
            </p>
            <p>
              The site remembers your choice in your browser&apos;s local storage. When you send a form, it also keeps a
              short note in that browser tab saying which form was sent, so a sent form is counted once. The note holds
              nothing you typed.
            </p>
          </Block>
          <Block title="The demo">
            <p>
              The <Link href="/demo" className="text-ink underline underline-offset-3 hover:text-red">Maple Home Services demo</Link>{" "}
              runs entirely in your browser. Nothing you type there is sent anywhere or saved. Reloading the page clears it.
              If you&apos;ve allowed analytics, Google Analytics records only that the demo was started or finished.
            </p>
          </Block>
          <Block title="Booking a call">
            <p>
              If you book a call, Calendly (calendly.com), a third-party scheduling service, handles the booking under its
              own privacy policy.
            </p>
          </Block>
          <Block title="Questions and your choices">
            <p>
              The owner of CapitalSites is responsible for how personal information is handled here. To ask what we hold
              about you, to have it corrected or deleted, or to withdraw your consent, email{" "}
              <a href="mailto:capitalsitesottawa@gmail.com" className="text-ink underline underline-offset-3 hover:text-red">
                capitalsitesottawa@gmail.com
              </a>
              . To turn analytics off, use Cookie settings at the bottom of any page.
            </p>
          </Block>
        </div>
      </section>
    </>
  );
}
