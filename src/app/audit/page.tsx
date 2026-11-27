import Link from "next/link";
import { Check } from "@/components/ui";
import { contactHref } from "@/data/offers";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Free Website Audit — CapitalSites",
  description:
    "A free manual audit of your current website for contractors and home-service businesses in Canada: speed, mobile, SEO basics, trust signals and conversion issues.",
  path: "/audit",
});

const covers = ["Load speed and performance", "Mobile experience", "SEO basics", "Trust signals", "Conversion issues"];

export default function AuditPage() {
  return (
    <section className="bg-snow px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-[1024px] mx-auto grid lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start">
        <div className="pt-2">
          <h1 className="display text-[48px] md:text-[72px]">Free manual website audit.</h1>
          <p className="subhead text-[19px] md:text-[21px] text-ink-2 mt-5 max-w-[480px]">
            Send us your URL and we&apos;ll email you a detailed audit within 24 hours.
          </p>
          <h2 className="text-[17px] font-semibold mt-10">What the audit covers</h2>
          <ul className="mt-4 space-y-3">
            {covers.map((c) => (
              <li key={c} className="flex gap-3 text-[17px]">
                <Check />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <form
          action="https://formsubmit.co/capitalsitesottawa@gmail.com"
          method="POST"
          className="card-tile bg-white p-7 md:p-10 space-y-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New Website Audit Request - CapitalSites" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="https://www.capitalsites.ca/thanks" />
          {/* FormSubmit honeypot: people never see or fill it; bots that do are dropped. */}
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div>
            <label htmlFor="name" className="field-label">Name</label>
            <input type="text" id="name" name="name" required placeholder="Your name" className="field" autoComplete="name" />
          </div>
          <div>
            <label htmlFor="email" className="field-label">Email</label>
            <input type="email" id="email" name="email" required placeholder="you@example.com" className="field" autoComplete="email" />
          </div>
          <div>
            <label htmlFor="website" className="field-label">Website URL</label>
            <input type="url" id="website" name="website_url" required placeholder="https://yourbusiness.com" className="field" autoComplete="url" />
          </div>
          <button type="submit" className="pill pill-red w-full">
            Request free audit
          </button>
          <p className="text-center text-[13px] text-ink-2">
            Delivered within 24 hours. No obligation.
          </p>
          <p className="text-center text-[13px] text-ink-2">
            <Link href={contactHref("plan")} className="text-ink underline underline-offset-3 hover:text-red">
              No website yet? Tell us about your business instead
            </Link>
          </p>
          <p className="text-center text-[13px] text-ink-2 leading-[1.5]">
            Your enquiry is sent through FormSubmit, a third-party form service, to our inbox. We only use it to reply to
            you.{" "}
            <Link href="/privacy" className="text-ink underline underline-offset-3 hover:text-red">
              Privacy
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
