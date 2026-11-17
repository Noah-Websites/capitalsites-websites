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

type Tier = {
  name: string;
  priceLabel: string;
  priceSubLabel?: string;
  monthly: string;
  monthlySubLabel?: string;
  desc: string;
  features: string[];
  monthlyIncludes: string[];
  recommended?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Website Plan",
    priceLabel: "$0",
    priceSubLabel: "upfront",
    monthly: "$99/mo",
    monthlySubLabel: "12-month minimum, then $79/mo",
    desc: "For businesses that need their current site rebuilt, or a website for the first time.",
    features: [
      "Full design and build up to 7 pages",
      "Mobile-optimized and fast-loading",
      "SEO foundation (meta tags, structured data, sitemap)",
      "Contact or booking form connected to your email",
      "Google Business Profile setup (new sites)",
      "Rebuilds launch in 7 days · new sites in 10–14 days",
    ],
    monthlyIncludes: [
      "Hosting",
      "Domain renewal",
      "Security updates",
      "Monthly content changes",
      "Uptime monitoring",
      "Email support",
    ],
    recommended: true,
  },
  {
    name: "Premium",
    priceLabel: "$2,500",
    priceSubLabel: "CAD",
    monthly: "$129/mo",
    desc: "For e-commerce stores or larger sites.",
    features: [
      "Everything in the Website Plan",
      "Up to 15 pages",
      "E-commerce setup (Stripe, Shopify, or WooCommerce)",
      "Inventory management",
      "Priority support",
    ],
    monthlyIncludes: [
      "Everything in $99/mo plan",
      "Product updates",
      "Order troubleshooting",
    ],
  },
];

const faqs = [
  {
    q: "How does payment work?",
    a: "For the Website Plan there's nothing to pay upfront. Your $99/month starts the day your site launches and runs for a 12-month minimum. After that it drops to $79/month, or you can cancel with 30 days notice. Premium builds are paid 50% upfront and 50% on launch, plus $129/month.",
  },
  {
    q: "Why is there a 12-month minimum?",
    a: "Instead of charging a big build fee upfront, we spread it over your first year. That's what lets us start at $0 upfront.",
  },
  {
    q: "Can I cancel?",
    a: "After your first 12 months, yes, with 30 days notice, and we'll help you move your site wherever you want. If you need to cancel during the first 12 months, you pay the remaining months of the minimum, or the site comes down.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. Once your first 12 months are paid, the design, content and code are yours. The monthly fee after that covers hosting and ongoing service, not licensing.",
  },
  {
    q: "What's actually included in the monthly fee?",
    a: "Hosting, domain renewal, security updates, uptime monitoring, monthly content changes (text, images, prices, hours), and email support. Premium tier also includes product updates and order troubleshooting. We handle the boring stuff so you can focus on running your business.",
  },
  {
    q: "Do I need to provide content and photos?",
    a: "We can work with whatever you have. If you have copy and photos ready, great. If not, we can help write content and source professional stock photography during the build.",
  },
  {
    q: "How long does the build take?",
    a: "Rebuilds launch in 7 days. New sites take 10–14 days because of the brand discovery session. Premium e-commerce builds take 14–21 days depending on catalog size.",
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
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-80 pb-6" : "max-h-0"}`}>
        <p className="text-white/70 text-sm leading-relaxed">{a}</p>
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
          <motion.h1 {...fadeUp} className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
            Simple pricing. No upfront cost to start.
          </motion.h1>
          <motion.p {...fadeUp} className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Transparent monthly pricing from a small Ontario web studio serving London, Toronto, and Ottawa.
          </motion.p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-12 md:pb-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
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
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-heading text-lg font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-white/65 text-sm mb-6 min-h-[2.5rem]">{tier.desc}</p>
                  <div className="font-heading text-5xl font-bold text-white">
                    {tier.priceLabel}
                    {tier.priceSubLabel && (
                      <span className="text-lg font-normal text-white/55 ml-1">{tier.priceSubLabel}</span>
                    )}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-brand/10 border border-red-brand/20 text-red-brand text-sm font-semibold">
                    + {tier.monthly}
                  </div>
                  {tier.monthlySubLabel && (
                    <p className="text-white/55 text-xs mt-2">{tier.monthlySubLabel}</p>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-white/65 text-xs font-semibold tracking-wider uppercase mb-3">What you get</p>
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-red-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-red-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white/70">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8 pt-6 border-t border-dark-border flex-1">
                  <p className="text-white/65 text-xs font-semibold tracking-wider uppercase mb-3">
                    {tier.monthly} includes
                  </p>
                  <ul className="space-y-2">
                    {tier.monthlyIncludes.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-sm">
                        <span className="text-red-brand/60 mt-0.5">·</span>
                        <span className="text-white/70">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

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

        {/* Fine print */}
        <motion.p
          {...fadeUp}
          className="max-w-3xl mx-auto text-center text-white/60 text-sm mt-10 leading-relaxed"
        >
          All prices in CAD. Website Plan: no upfront payment; $99/month starts on launch day with a 12-month minimum, then $79/month or cancel with 30 days notice. Premium: build fee paid 50% upfront and 50% on launch; monthly fee starts on launch day.
        </motion.p>
      </section>

      {/* FAQ */}
      <section className="pb-28 md:pb-40 px-6 pt-12">
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
