"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import PageTransition from "@/components/PageTransition";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease },
};

const staggerContainer = {
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-80px" as const },
};

const staggerChild = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease },
};

/* ---- Hero ---- */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050507]">
      {/* Layered dark gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,26,26,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(27,42,74,0.08),transparent_60%)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-slow absolute top-[15%] left-[20%] w-1 h-1 rounded-full bg-white/10" />
        <div className="float-medium absolute top-[40%] right-[25%] w-1.5 h-1.5 rounded-full bg-red-brand/10" />
        <div className="float-fast absolute bottom-[30%] left-[60%] w-1 h-1 rounded-full bg-white/5" />
        <div className="float-slow absolute top-[60%] left-[10%] w-0.5 h-0.5 rounded-full bg-white/10" />
        <div className="float-medium absolute top-[25%] right-[10%] w-1 h-1 rounded-full bg-red-brand/5" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050507]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/30 text-xs font-medium tracking-[0.25em] uppercase">
            By CapitalSites
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight"
        >
          Silent
          <span className="text-red-brand">Stack</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease }}
          className="mt-6 text-xl md:text-2xl text-white/30 font-light max-w-2xl mx-auto leading-relaxed"
        >
          The Silent Partner Behind Your AI Projects
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease }}
          className="mt-4 text-white/15 text-sm tracking-wider"
        >
          Ghost development. Full discretion.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease }}
          className="mt-12"
        >
          <a
            href="#contact"
            className="inline-block bg-white/[0.05] border border-white/10 text-white/70 px-8 py-4 rounded-xl text-sm font-medium transition-all duration-500 hover:bg-red-brand hover:border-red-brand hover:text-white hover:shadow-2xl hover:shadow-red-brand/20"
          >
            Work With Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- What Is SilentStack ---- */
function WhatIs() {
  return (
    <section className="py-28 md:py-40 px-6 bg-[#050507] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,26,26,0.03),transparent_70%)]" />
      <motion.div className="max-w-3xl mx-auto text-center relative z-10" {...fadeUp}>
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/10 mx-auto mb-12" />
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-8">
          You sell AI. <span className="text-white/30">We build it.</span>
        </h2>
        <p className="text-white/35 text-lg md:text-xl leading-relaxed">
          SilentStack is a ghost AI technical partner for marketing agencies and freelancers who sell AI services but struggle to deliver. We build everything behind the scenes -- you keep the client and all the credit. No one ever knows we exist.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/15 tracking-wider uppercase">
          <span>Invisible</span>
          <span className="w-1 h-1 rounded-full bg-red-brand/30 self-center" />
          <span>Reliable</span>
          <span className="w-1 h-1 rounded-full bg-red-brand/30 self-center" />
          <span>Discreet</span>
        </div>
      </motion.div>
    </section>
  );
}

/* ---- Services ---- */
const services = [
  {
    title: "AI Automations",
    desc: "Workflow automations powered by AI that save your clients hours of manual work every week.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  {
    title: "Custom Integrations",
    desc: "API connections, third-party tools, CRMs, and data pipelines built to your client's exact specifications.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
  },
  {
    title: "Chatbot Development",
    desc: "Intelligent conversational AI bots trained on your client's data, deployed on their platform of choice.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>,
  },
  {
    title: "Workflow Systems",
    desc: "End-to-end business process automation using Make, Zapier, n8n, or custom-built solutions.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  },
  {
    title: "Full Stack AI Builds",
    desc: "Complete AI-powered applications from concept to deployment. Web apps, dashboards, internal tools.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>,
  },
];

function Services() {
  return (
    <section className="py-28 md:py-40 px-6 bg-[#050507]">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" {...fadeUp}>
          <span className="text-red-brand/60 font-semibold text-xs tracking-[0.3em] uppercase">Services</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-4">What We Build in the Shadows</h2>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" {...staggerContainer}>
          {services.map((s) => (
            <motion.div
              key={s.title}
              {...staggerChild}
              className="group bg-white/[0.02] border border-white/[0.04] rounded-2xl p-7 transition-all duration-500 hover:bg-white/[0.04] hover:border-red-brand/20 hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-lg bg-red-brand/[0.07] text-red-brand/60 flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-red-brand/20 group-hover:text-red-brand">
                {s.icon}
              </div>
              <h3 className="text-base font-bold text-white/80 mb-2 font-heading">{s.title}</h3>
              <p className="text-sm text-white/25 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---- How It Works ---- */
const steps = [
  { num: "01", title: "You Land the Client", desc: "Close the deal like you always do. Sell the AI solution, set expectations, and collect the deposit." },
  { num: "02", title: "You Brief SilentStack", desc: "Send us the project requirements. We will scope, plan, and confirm the timeline and cost within 24 hours." },
  { num: "03", title: "We Build Silently", desc: "Our team builds the entire solution behind the scenes. You get progress updates. Your client never knows we exist." },
  { num: "04", title: "You Deliver and Take the Credit", desc: "We hand off the finished product to you. You deliver it to your client under your brand. All the credit is yours." },
];

function HowItWorks() {
  return (
    <section className="py-28 md:py-40 px-6 bg-[#050507] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(27,42,74,0.05),transparent_70%)]" />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div className="text-center mb-20" {...fadeUp}>
          <span className="text-red-brand/60 font-semibold text-xs tracking-[0.3em] uppercase">Process</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-4">How It Works</h2>
        </motion.div>

        <motion.div className="space-y-0" {...staggerContainer}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              {...staggerChild}
              className="relative flex gap-8 md:gap-12 group"
            >
              {/* Vertical line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[1.35rem] md:left-[1.6rem] top-14 bottom-0 w-px bg-gradient-to-b from-white/[0.06] to-transparent" />
              )}

              <div className="flex-shrink-0 w-11 h-11 md:w-13 md:h-13 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center transition-all duration-500 group-hover:border-red-brand/30 group-hover:bg-red-brand/[0.05]">
                <span className="text-xs font-bold text-white/20 font-heading group-hover:text-red-brand/60 transition-colors duration-500">{step.num}</span>
              </div>

              <div className="pb-14 md:pb-16">
                <h3 className="text-lg font-bold text-white/80 mb-2 font-heading">{step.title}</h3>
                <p className="text-sm text-white/25 leading-relaxed max-w-lg">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Pricing ---- */
function Pricing() {
  return (
    <section className="py-28 md:py-40 px-6 bg-[#050507] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,26,26,0.04),transparent_60%)]" />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="text-red-brand/60 font-semibold text-xs tracking-[0.3em] uppercase">Pricing</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-4">Simple. Flexible. No Lock-in.</h2>
        </motion.div>

        <motion.div {...fadeUp} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="text-white/20 text-sm uppercase tracking-wider mb-3">Monthly Retainer</div>
            <div className="font-heading text-6xl md:text-7xl font-bold text-white">
              $300
              <span className="text-xl font-normal text-white/20 ml-2">CAD</span>
            </div>
            <div className="text-white/25 text-sm mt-3">Plus per-project fees based on scope and complexity</div>
          </div>

          <div className="w-full h-px bg-white/[0.05] my-8" />

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "No long-term contracts",
              "Cancel anytime",
              "White-label delivery",
              "24-hour response time",
              "Full NDA protection",
              "Unlimited consultations",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <div className="w-1 h-1 rounded-full bg-red-brand/40 flex-shrink-0" />
                <span className="text-white/30">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#contact"
              className="inline-block bg-red-brand/10 border border-red-brand/20 text-red-brand px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-500 hover:bg-red-brand hover:text-white hover:border-red-brand hover:shadow-2xl hover:shadow-red-brand/15"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Contact ---- */
const inputClasses =
  "w-full px-5 py-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/15 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-red-brand/20 focus:border-red-brand/30";

function Contact() {
  return (
    <section id="contact" className="py-28 md:py-40 px-6 bg-[#050507] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,26,26,0.03),transparent_60%)]" />
      <div className="max-w-xl mx-auto relative z-10">
        <motion.div className="text-center mb-12" {...fadeUp}>
          <span className="text-red-brand/60 font-semibold text-xs tracking-[0.3em] uppercase">Contact</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-4">Let&apos;s Talk</h2>
          <p className="mt-4 text-white/20 text-sm">Everything stays confidential. Always.</p>
        </motion.div>

        <motion.div {...fadeUp}>
          <form
            action="https://formsubmit.co/capitalsitesottawa@gmail.com"
            method="POST"
            className="space-y-5"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="SilentStack Inquiry" />
            <input type="hidden" name="_template" value="table" />

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="ss-name" className="block text-xs font-medium text-white/30 mb-2 tracking-wider uppercase">Name</label>
                <input type="text" id="ss-name" name="name" required placeholder="Your name" className={inputClasses} />
              </div>
              <div>
                <label htmlFor="ss-agency" className="block text-xs font-medium text-white/30 mb-2 tracking-wider uppercase">Agency Name</label>
                <input type="text" id="ss-agency" name="agency_name" required placeholder="Your agency" className={inputClasses} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="ss-type" className="block text-xs font-medium text-white/30 mb-2 tracking-wider uppercase">Project Type</label>
                <select id="ss-type" name="project_type" className={`${inputClasses} appearance-none`} defaultValue="">
                  <option value="" disabled>Select type</option>
                  <option value="ai-automation">AI Automation</option>
                  <option value="custom-integration">Custom Integration</option>
                  <option value="chatbot">Chatbot Development</option>
                  <option value="workflow">Workflow System</option>
                  <option value="full-stack">Full Stack AI Build</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="ss-email" className="block text-xs font-medium text-white/30 mb-2 tracking-wider uppercase">Email</label>
                <input type="email" id="ss-email" name="email" required placeholder="you@agency.com" className={inputClasses} />
              </div>
            </div>

            <div>
              <label htmlFor="ss-message" className="block text-xs font-medium text-white/30 mb-2 tracking-wider uppercase">Message</label>
              <textarea
                id="ss-message"
                name="message"
                rows={5}
                required
                placeholder="Tell us about the project"
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white/[0.04] border border-white/[0.08] text-white/60 py-4 rounded-xl font-semibold text-sm transition-all duration-500 hover:bg-red-brand hover:border-red-brand hover:text-white hover:shadow-xl hover:shadow-red-brand/15"
            >
              Send Message
            </button>

            <p className="text-center text-white/10 text-xs">
              Protected by NDA. Your information is never shared.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Page ---- */
export default function SilentStackPage() {
  return (
    <PageTransition>
      <Hero />
      <WhatIs />
      <Services />
      <HowItWorks />
      <Pricing />
      <Contact />
    </PageTransition>
  );
}
