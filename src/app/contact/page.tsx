import { Suspense } from "react";
import ContactForm, { ContactFromParams } from "@/components/ContactForm";

export const metadata = {
  title: "Contact — CapitalSites",
  description: "Tell us what you need: a $149 Website Fix, a Website Plan rebuild or first site, or Premium. We reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="bg-snow px-4 md:px-6 py-16 md:py-24">
      <Suspense fallback={<ContactForm />}>
        <ContactFromParams />
      </Suspense>
    </section>
  );
}
