import { ChevLink } from "@/components/ui";
import ServiceSelect from "@/components/ServiceSelect";
import { getService } from "@/lib/services";

export const metadata = {
  title: "Contact — CapitalSites",
  description: "Tell us about your business. We reply within 24 hours.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service: raw } = await searchParams;
  const picked = getService(Array.isArray(raw) ? raw[0] : raw);
  const messagePlaceholder =
    picked?.id === "fix"
      ? "What's the one thing that's broken? (e.g. the Book Now button goes nowhere)"
      : "Tell us about your project, goals, and timeline";

  return (
    <section className="bg-snow px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-[1024px] mx-auto grid lg:grid-cols-[1fr_560px] gap-10 lg:gap-16 items-start">
        <div className="pt-2">
          <h1 className="display text-[48px] md:text-[72px]">Let&apos;s talk.</h1>
          <p className="subhead text-[19px] md:text-[21px] text-ink-2 mt-5 max-w-[440px]">
            Tell us about your business and we will get back to you within 24 hours. No website yet? That&apos;s fine,
            just leave the website field blank.
          </p>
          {picked && (
            <p className="mt-6 max-w-[440px] rounded-2xl bg-white ring-1 ring-line px-4 py-3 text-[14px] leading-[1.45] text-ink-2">
              You picked: <span className="font-semibold text-ink">{picked.label}</span> ({picked.detail})
            </p>
          )}
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
          action="https://formsubmit.co/capitalsitesottawa@gmail.com"
          method="POST"
          className="card-tile bg-white p-7 md:p-10 space-y-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New Project Inquiry - CapitalSites" />
          <input type="hidden" name="_template" value="table" />

          <div>
            <label htmlFor="package" className="field-label">What do you need?</label>
            <ServiceSelect key={picked?.id ?? "none"} initial={picked?.id} />
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
              <input type="text" id="website" name="current_website" placeholder="yourbusiness.ca" className="field" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="field-label">Message</label>
            <textarea id="message" name="message" rows={5} required placeholder={messagePlaceholder} className="field resize-none leading-[1.5]" />
          </div>
          <button type="submit" className="pill pill-red w-full">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
