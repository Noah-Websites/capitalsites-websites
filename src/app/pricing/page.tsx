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
    name: "Refresh",
    price: "$1,200",
    monthly: "$79/mo",
    desc: "For businesses who already have a website that needs to be rebuilt.",
    features: [
      "Full redesign of up to 5 pages",
      "Mobile-optimized and fast-loading",
      "SEO foundation (meta tags, structured data, sitemap)",
      "Contact form connected to your email",
      "7-day delivery",
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
    name: "Build",
    price: "$1,500",
    monthly: "$79/mo",
    desc: "For businesses starting fresh with no current website.",
    features: [
      "Everything in Refresh",
      "Brand discovery session",
      "Logo refinement if needed",
      "Up to 7 pages",
      "Google Business Profile setup",
    ],
    monthlyIncludes: [
      "Hosting",
      "Domain renewal",
      "Security updates",
      "Monthly content changes",
      "Uptime monitoring",
      "Email support",
    ],
    recommended: false,
  },
  {
    name: "Premium",
    price: "$2,500",
    monthly: "$129/mo",
    desc: "For e-commerce stores or larger sites.",
    features: [
      "Everything in Build",
      "Up to 15 pages",
      "E-commerce setup (Stripe, Shopify, or WooCommerce)",
      "Inventory management",
      "Priority support",
    ],
    monthlyIncludes: [
      "Everything in $79/mo plan",
      "Product updates",
      "Order troubleshooting",
    ],
    recommended: false,
  },
];

const faqs = [
  {
    q: "How does payment work?",
    a: "The one-time build fee is paid 50% upfront and 50% on launch. The monthly fee starts on launch day and can be cancelled with 30 days notice.",
  },
  {
    q: "What's actually included in the monthly fee?",
    a: "Hosting, domain renewal, security updates, uptime monitoring, monthly content changes (text, images, prices, hours), and email support. Premium tier also includes product updates and order troubleshooting. We handle the boring stuff so you can focus on running your business.",
  },
  {
    q: "Can I cancel the monthly plan anytime?",
    a: "Yes. The monthly fee can be cancelled with 30 days notice. If you cancel, you keep ownership of your site files and we help you transfer hosting wherever you want.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. You own the design, content, and code. The monthly fee covers hosting and ongoing service, not licensing.",
  },
  {
    q: "Do I need to provide content and photos?",
    a: "We can work with whatever you have. If you have copy and photos ready, great. If not, we can help write content and source professional stock photography during the build.",
  },
  {
    q: "How long does the build take?",
    a: "Refresh tier launches in 7 days. Build tier typically takes 10-14 days due to the brand discovery session. Premium e-commerce builds take 14-21 days depending on product catalog size.",
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
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-60 pb-6" : "max-h-0"}`}>
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
            One build fee.<br />One monthly plan.
          </motion.h1>
          <motion.p {...fadeUp} className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
            Transparent pricing for Ottawa small businesses. Build it once, then we handle the rest every month.
          </motion.p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-12 md:pb-20 px-6">
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
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-heading text-lg font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-white/30 text-sm mb-6 min-h-[2.5rem]">{tier.desc}</p>
                  <div className="font-heading text-5xl font-bold text-white">
                    {tier.price}
                    <span className="text-lg font-normal text-white/30 ml-1">CAD</span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-brand/10 border border-red-brand/20 text-red-brand text-sm font-semibold">
                    + {tier.monthly}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-white/40 text-xs font-semibold tracking-wider uppercase mb-3">What you get</p>
                  <ul className="space-y-3">
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
                </div>

                <div className="mb-8 pt-6 border-t border-dark-border flex-1">
                  <p className="text-white/40 text-xs font-semibold tracking-wider uppercase mb-3">
                    {tier.monthly} includes
                  </p>
                  <ul className="space-y-2">
                    {tier.monthlyIncludes.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-sm">
                        <span className="text-red-brand/60 mt-0.5">·</span>
                        <span className="text-white/40">{m}</span>
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

        {/* Pricing note */}
        <motion.p
          {...fadeUp}
          className="max-w-3xl mx-auto text-center text-white/30 text-sm mt-10 leading-relaxed"
        >
          All prices in CAD. One-time build fee is paid 50% upfront, 50% on launch. Monthly fee starts on launch day and can be cancelled with 30 days notice.
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
