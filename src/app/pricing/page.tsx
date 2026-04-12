"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease },
};

const tiers = [
  {
    name: "Starter",
    price: "$500",
    desc: "Perfect for new businesses getting online for the first time.",
    features: [
      "Up to 5 pages",
      "Mobile responsive design",
      "Contact form",
      "SEO-ready structure",
      "Delivered in 7 days",
      "1 round of revisions",
    ],
    recommended: false,
  },
  {
    name: "Professional",
    price: "$900",
    desc: "For businesses ready to compete seriously online.",
    features: [
      "Up to 10 pages",
      "Mobile responsive design",
      "Contact form + booking integration",
      "Full SEO setup + Google Analytics",
      "Delivered in 10 days",
      "3 rounds of revisions",
      "Social media integration",
      "Speed optimization",
    ],
    recommended: true,
  },
  {
    name: "Premium",
    price: "$1,500",
    desc: "The complete package for businesses that want it all.",
    features: [
      "Unlimited pages",
      "Mobile responsive design",
      "E-commerce integration",
      "Full SEO + Google Ads setup",
      "Delivered in 14 days",
      "Unlimited revisions",
      "Priority support for 6 months",
      "Custom animations",
      "Blog / CMS setup",
      "Monthly performance report",
    ],
    recommended: false,
  },
];

const faqs = [
  {
    q: "How does the process work?",
    a: "We start with a brief call or questionnaire to understand your business. Then we create a design mockup for your approval. Once approved, we build the full site and launch it within the delivery timeframe.",
  },
  {
    q: "What if I need changes after the site is launched?",
    a: "All plans include at least one round of revisions before launch. After launch, we offer ongoing support packages, or you can request one-off updates at any time.",
  },
  {
    q: "Do I need to provide the content?",
    a: "We can work with whatever you have. If you have text and photos ready, great. If not, we can help write copy and source professional stock images.",
  },
  {
    q: "Will my website work on phones and tablets?",
    a: "Absolutely. Every website we build is fully responsive and tested across all major devices and browsers before launch.",
  },
  {
    q: "Do you offer hosting?",
    a: "We deploy your site on modern, fast hosting platforms like Vercel or Netlify. Hosting is typically free or very low cost for standard business websites.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes. If you start with a Starter plan and want to add more features later, we can upgrade your site at any time. You only pay the difference plus any new feature costs.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-dark-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-white font-medium pr-8">{q}</span>
        <span className={`text-red-brand text-2xl transition-transform duration-300 flex-shrink-0 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-40 pb-6" : "max-h-0"}`}>
        <p className="text-white/40 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span {...fadeUp} className="text-red-brand font-semibold text-sm tracking-widest uppercase">
            Pricing
          </motion.span>
          <motion.h1 {...fadeUp} className="font-heading text-5xl md:text-7xl font-bold text-white mt-4 leading-tight">
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p {...fadeUp} className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
            No hidden fees. No surprises. Choose the plan that fits your business.
          </motion.p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-28 md:pb-40 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className={tier.recommended ? "glow-border rounded-2xl" : ""}
            >
              <div className={`bg-dark-card border rounded-2xl p-8 md:p-10 relative h-full flex flex-col ${
                tier.recommended ? "border-transparent" : "border-dark-border"
              }`}>
                {tier.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-brand text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
                    Recommended
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-heading text-lg font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-white/30 text-sm mb-6">{tier.desc}</p>
                  <div className="font-heading text-5xl font-bold text-white">
                    {tier.price}
                    <span className="text-lg font-normal text-white/30 ml-1">CAD</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-red-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-red-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/50">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block w-full text-center py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    tier.recommended
                      ? "bg-red-brand text-white hover:bg-red-brand-dark hover:shadow-xl hover:shadow-red-brand/20"
                      : "bg-white/5 text-white border border-dark-border hover:bg-white/10"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-28 md:pb-40 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <span className="text-red-brand font-semibold text-sm tracking-widest uppercase">FAQ</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-4">Common Questions</h2>
          </motion.div>
          <motion.div {...fadeUp}>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
