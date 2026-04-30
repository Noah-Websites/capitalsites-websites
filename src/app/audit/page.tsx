"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease },
};

export default function AuditPage() {
  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center justify-center px-6 py-36 md:py-44 overflow-hidden">
        {/* Animated bg */}
        <div className="absolute inset-0 hero-gradient opacity-30" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="float-slow absolute -top-20 -right-20 w-80 h-80 rounded-full border border-red-brand/5" />
          <div className="float-medium absolute bottom-[20%] left-[10%] w-4 h-4 rounded-full bg-red-brand/10" />
          <div className="float-fast absolute top-[40%] right-[15%] w-12 h-12 rotate-45 border border-navy-light/10" />
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="text-red-brand font-semibold text-sm tracking-widest uppercase">Audit</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
              Free Website Audit
            </h1>
            <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">
              Enter your website URL and we&apos;ll send you a detailed report on what&apos;s slowing you down and costing you customers.
            </p>
          </motion.div>

          {/* Coming soon card */}
          <motion.div
            {...fadeUp}
            className="mt-12 bg-dark-card/60 backdrop-blur-sm border border-dark-border rounded-2xl p-10 md:p-12"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-brand/10 border border-red-brand/20 text-red-brand text-xs font-semibold tracking-widest uppercase mb-6">
              Coming Soon
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-5">
              Our audit tool is launching shortly.
            </h2>
            <p className="text-white/50 leading-relaxed mb-8 max-w-lg mx-auto">
              In the meantime, email us your website URL and we&apos;ll send you a manual audit within 24 hours.
            </p>
            <a
              href="mailto:capitalsitesottawa@gmail.com?subject=Manual%20Website%20Audit%20Request&body=Hi%20Noah%2C%0A%0AMy%20website%20URL%3A%20%0A%0AThanks%21"
              className="inline-block bg-red-brand text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-red-brand-dark hover:shadow-2xl hover:shadow-red-brand/25 hover:-translate-y-0.5"
            >
              capitalsitesottawa@gmail.com
            </a>
            <p className="text-white/20 text-xs mt-6">
              Manual audits delivered within 24 hours. No obligation.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="mt-10">
            <Link
              href="/pricing"
              className="text-white/40 text-sm hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60"
            >
              Or see pricing →
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
