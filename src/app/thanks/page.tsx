import { Pill, ChevLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Thanks — CapitalSites",
  description: "Your message has been sent. We reply within 24 hours.",
  path: "/thanks",
  noindex: true,
});

export default function ThanksPage() {
  return (
    <section className="bg-snow px-6 py-24 md:py-36 text-center">
      <div className="max-w-[640px] mx-auto">
        <h1 className="display text-[48px] md:text-[72px]">Thanks. It&apos;s sent.</h1>
        <p className="subhead text-[19px] md:text-[21px] text-ink-2 mt-5 leading-[1.45]">
          Your message is on its way to our inbox. We reply within 24 hours. If it&apos;s urgent, email{" "}
          <a href="mailto:capitalsitesottawa@gmail.com" className="text-ink underline underline-offset-3 hover:text-red break-all">
            capitalsitesottawa@gmail.com
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Pill href="/">Back to home</Pill>
          <Pill href="/pricing" variant="ghost">See pricing</Pill>
        </div>
        <div className="mt-8">
          <ChevLink href="/portfolio">Look at the concept work</ChevLink>
        </div>
      </div>
    </section>
  );
}
