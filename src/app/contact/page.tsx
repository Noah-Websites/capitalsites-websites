"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease },
};

const inputClasses =
  "w-full px-5 py-4 bg-dark-card border border-dark-border rounded-xl text-sm text-white placeholder:text-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-brand/30 focus:border-red-brand";

export default function ContactPage() {
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
          <motion.div className="text-center mb-12" {...fadeUp}>
            <span className="text-red-brand font-semibold text-sm tracking-widest uppercase">
              Contact
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
              Start Your Project
            </h1>
            <p className="mt-5 text-white/40 text-lg">
              Tell us about your Ottawa business and we will get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <form
              action="https://formsubmit.co/capitalsitesottawa@gmail.com"
              method="POST"
              className="bg-dark-card/50 backdrop-blur-sm border border-dark-border rounded-2xl p-8 md:p-10 space-y-5"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New Project Inquiry - CapitalSites" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white/70 mb-2">Name</label>
                  <input type="text" id="name" name="name" required placeholder="Your name" className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="business" className="block text-sm font-semibold text-white/70 mb-2">Business Name</label>
                  <input type="text" id="business" name="business_name" required placeholder="Your business" className={inputClasses} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white/70 mb-2">Email</label>
                  <input type="email" id="email" name="email" required placeholder="you@example.com" className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-semibold text-white/70 mb-2">Current Website (optional)</label>
                  <input type="text" id="website" name="current_website" placeholder="yourbusiness.com" className={inputClasses} />
                </div>
              </div>

              <div>
                <label htmlFor="package" className="block text-sm font-semibold text-white/70 mb-2">Package Interest</label>
                <select id="package" name="package" className={`${inputClasses} appearance-none`} defaultValue="">
                  <option value="" disabled>Select a package</option>
                  <option value="refresh">Refresh — $1,200 + $79/mo</option>
                  <option value="build">Build — $1,500 + $79/mo</option>
                  <option value="premium">Premium — $2,500 + $129/mo</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white/70 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your project, goals, and timeline"
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-brand text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-red-brand-dark hover:shadow-xl hover:shadow-red-brand/20 hover:-translate-y-0.5"
              >
                Send Message
              </button>

              <p className="text-center text-white/20 text-xs mt-4">
                We typically respond within 24 hours. Your information is never shared.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
