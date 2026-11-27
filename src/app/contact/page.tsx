import { Suspense } from "react";
import ContactForm, { ContactFromParams } from "@/components/ContactForm";
import { pageMeta } from "@/lib/seo";
import { getOffer, priceFigure } from "@/data/offers";

export const metadata = pageMeta({
  title: "Contact — CapitalSites",
  description: `Tell us what you need: a ${priceFigure(getOffer("fix"))} Website Fix, a website, or early access to estimate request setup and the other digital operations services for contractors and home-service businesses in Canada.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="bg-snow px-4 md:px-6 py-16 md:py-24">
      <Suspense fallback={<ContactForm />}>
        <ContactFromParams />
      </Suspense>
    </section>
  );
}
