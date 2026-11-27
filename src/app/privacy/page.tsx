import type { ReactNode } from "react";
import Link from "next/link";
import { contactOptions } from "@/data/offers";
import { pageMeta } from "@/lib/seo";

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
            <p>This site doesn&apos;t use analytics, advertising or tracking scripts, and doesn&apos;t set cookies of its own.</p>
          </Block>
          <Block title="The demo">
            <p>
              The <Link href="/demo" className="text-ink underline underline-offset-3 hover:text-red">Maple Home Services demo</Link>{" "}
              runs entirely in your browser. Nothing you type there is sent anywhere or saved. Reloading the page clears it.
            </p>
          </Block>
          <Block title="Booking a call">
            <p>
              If you book a call, Calendly (calendly.com), a third-party scheduling service, handles the booking under its
              own privacy policy.
            </p>
          </Block>
          <Block title="Questions">
            <p>
              Email{" "}
              <a href="mailto:capitalsitesottawa@gmail.com" className="text-ink underline underline-offset-3 hover:text-red">
                capitalsitesottawa@gmail.com
              </a>
              .
            </p>
          </Block>
        </div>
      </section>
    </>
  );
}
