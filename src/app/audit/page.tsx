"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease },
};

const inputClasses =
  "w-full px-5 py-4 bg-dark-card border border-dark-border rounded-xl text-sm text-white placeholder:text-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-brand/30 focus:border-red-brand";

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

        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <motion.div className="text-center mb-10" {...fadeUp}>
            <span className="text-red-brand font-semibold text-sm tracking-widest uppercase">Audit</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
              Free Manual Website Audit
            </h1>
            <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">
              Send us your URL and we&apos;ll email you a detailed audit within 24 hours.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <form
              action="https://formsubmit.co/capitalsitesottawa@gmail.com"
              method="POST"
              className="bg-dark-card/60 backdrop-blur-sm border border-dark-border rounded-2xl p-8 md:p-10 space-y-5"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New Website Audit Request - CapitalSites" />
              <input type="hidden" name="_template" value="table" />

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white/70 mb-2">Name</label>
                <input type="text" id="name" name="name" required placeholder="Your name" className={inputClasses} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white/70 mb-2">Email</label>
                <input type="email" id="email" name="email" required placeholder="you@example.com" className={inputClasses} />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-white/70 mb-2">Website URL</label>
                <input type="url" id="website" name="website_url" required placeholder="https://yourbusiness.com" className={inputClasses} />
              </div>

              <button
                type="submit"
                className="w-full bg-red-brand text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-red-brand-dark hover:shadow-xl hover:shadow-red-brand/20 hover:-translate-y-0.5"
              >
                Request Free Audit
              </button>

              <p className="text-center text-white/20 text-xs mt-4">
                Delivered within 24 hours. No obligation. Your information is never shared.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
