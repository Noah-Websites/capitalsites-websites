"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease },
};

const projects = [
  {
    name: "Fade & Co.",
    location: "Westboro, Ottawa",
    tier: "Refresh Tier",
    price: "$1,200 + $79/mo",
    desc: "Concept redesign of a modern barbershop. Clean 5-page site with mobile optimization, booking-style contact form, and SEO foundation. Built to demonstrate the Refresh package.",
    gradient: "from-[#1a1510] to-[#0a0a0b]",
    accent: "from-amber-800/20 to-amber-900/5",
    initial: "F",
    href: "/portfolio/fade-and-co",
  },
  {
    name: "Ember Kitchen",
    location: "The Glebe, Ottawa",
    tier: "Build Tier",
    price: "$1,500 + $79/mo",
    desc: "Concept redesign for a wood-fired restaurant. 7+ pages with menu, reservations form, team bios, gallery, and Google Business Profile setup. Demonstrates the Build package.",
    gradient: "from-[#1a0d0d] to-[#0a0a0b]",
    accent: "from-red-800/20 to-red-900/5",
    initial: "E",
    featured: true,
    href: "/portfolio/ember-kitchen",
  },
  {
    name: "Maison Noir",
    location: "Byward Market, Ottawa",
    tier: "Premium Tier",
    price: "$2,500 + $129/mo",
    desc: "Concept e-commerce build for a fashion boutique. Up to 15 pages with shop, collections, lookbook, and Stripe-ready checkout. Demonstrates the Premium package.",
    gradient: "from-[#0f0d1a] to-[#0a0a0b]",
    accent: "from-purple-800/20 to-purple-900/5",
    initial: "M",
    href: "/portfolio/maison-noir",
  },
];

export default function PortfolioPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span {...fadeUp} className="text-red-brand font-semibold text-sm tracking-widest uppercase">
            Our Work
          </motion.span>
          <motion.h1 {...fadeUp} className="font-heading text-5xl md:text-7xl font-bold text-white mt-4 leading-tight">
            Concept Redesigns
          </motion.h1>
          <motion.p {...fadeUp} className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
            Three example sites showing exactly what we&apos;d build at each tier.
          </motion.p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12 px-6">
        <motion.div
          {...fadeUp}
          className="max-w-3xl mx-auto bg-dark-card/60 border border-red-brand/20 rounded-2xl p-6 md:p-7"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-brand/15 text-red-brand flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              <span className="font-semibold text-white">These are concept redesigns</span> demonstrating what we&apos;d build for businesses in each tier. Real client case studies will be added as projects launch.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section className="pb-28 md:pb-40 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className={`group relative bg-gradient-to-b ${p.gradient} border rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-brand/10 ${
                p.featured ? "border-red-brand/20" : "border-dark-border"
              }`}
            >
              {/* Concept work label */}
              <div className="px-8 pt-8">
                <div className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">
                  Concept work — example redesign
                </div>
              </div>

              {/* Tier badge */}
              <div className="px-8">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                  p.featured
                    ? "bg-red-brand/15 text-red-brand border border-red-brand/20"
                    : "bg-white/[0.04] text-white/40 border border-white/[0.06]"
                }`}>
                  {p.tier} — {p.price}
                </div>
              </div>

              {/* Logo / initial */}
              <div className="px-8 pt-8 pb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.accent} border border-white/[0.06] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110`}>
                  <span className="font-heading font-bold text-2xl text-white/50 group-hover:text-white/70 transition-colors duration-500">
                    {p.initial}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white mb-1">{p.name}</h3>
                <p className="text-red-brand/60 text-sm font-medium">{p.location}</p>
              </div>

              {/* Description */}
              <div className="px-8 pb-6 flex-1">
                <p className="text-sm text-white/30 leading-relaxed">{p.desc}</p>
              </div>

              {/* Divider */}
              <div className="mx-8 h-px bg-white/[0.05]" />

              {/* CTA */}
              <div className="px-8 py-6">
                <Link
                  href={p.href}
                  className={`block w-full text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    p.featured
                      ? "bg-red-brand text-white hover:bg-red-brand-dark hover:shadow-lg hover:shadow-red-brand/20"
                      : "bg-white/[0.04] text-white/50 border border-white/[0.06] hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  View Demo Site
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28 md:pb-40 px-6">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Want this for your business?
          </h2>
          <p className="text-white/30 mb-10 text-lg">
            Get a free audit of your current site, then we&apos;ll quote a rebuild based on what needs fixing.
          </p>
          <Link
            href="/audit"
            className="inline-block bg-red-brand text-white px-10 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-red-brand-dark hover:shadow-2xl hover:shadow-red-brand/25 hover:-translate-y-0.5"
          >
            Get a free website audit
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  );
}
