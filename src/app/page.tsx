"use client";

import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import PageTransition from "@/components/PageTransition";

/* ---- Animation helpers ---- */
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

/* ---- Typewriter ---- */
function Typewriter({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      <span className={`typewriter-cursor ${done ? "opacity-0" : ""}`}>&nbsp;</span>
    </span>
  );
}

/* ---- Counter ---- */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ---- Hero ---- */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-slow absolute -top-20 -right-20 w-80 h-80 rounded-full border border-red-brand/10" />
        <div className="float-medium absolute top-1/4 left-[8%] w-4 h-4 rounded-full bg-red-brand/15" />
        <div className="float-fast absolute top-[60%] right-[12%] w-14 h-14 rotate-45 border border-navy-light/15" />
        <div className="float-medium absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-red-brand/5 blur-3xl" />
        <div className="float-slow absolute top-[20%] right-[28%] w-28 h-28 rounded-full border border-white/5" />
        <div className="float-fast absolute bottom-[30%] left-[18%] w-6 h-6 rounded-full bg-navy-light/10" />
        <div className="float-medium absolute bottom-[18%] right-[35%] w-20 h-20 border-l border-b border-white/5 rotate-12" />
        <div className="float-slow absolute top-[45%] left-[55%] w-3 h-3 rounded-full bg-red-brand/10" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm font-medium tracking-widest uppercase">
            Web Design Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight min-h-[2.2em]"
        >
          <Typewriter text="We Build Websites That Win Customers" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="mt-8 text-lg md:text-xl text-white/40 max-w-2xl mx-auto"
        >
          Premium websites for small businesses. Designed to convert. Delivered in days.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact" className="bg-red-brand text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-red-brand-dark hover:shadow-2xl hover:shadow-red-brand/20 hover:-translate-y-0.5">
            Start Your Project
          </Link>
          <Link href="/portfolio" className="border border-white/15 text-white/70 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-white/5 hover:text-white hover:border-white/30">
            View Our Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Why CapitalSites ---- */
const reasons = [
  {
    title: "Built to Convert",
    desc: "Every design decision is focused on turning your visitors into paying customers.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>,
  },
  {
    title: "7-Day Delivery",
    desc: "We work fast without cutting corners. Your site goes live in a week or less.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  },
  {
    title: "Mobile First",
    desc: "Over 60% of web traffic is mobile. Every site we build is optimized for all devices.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>,
  },
  {
    title: "Global Clients",
    desc: "We work with businesses across 15+ countries. Distance is never a barrier.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
  },
];

function WhySection() {
  return (
    <section className="py-28 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" {...fadeUp}>
          <span className="text-red-brand font-semibold text-sm tracking-widest uppercase">Why Us</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-4">Why CapitalSites</h2>
          <p className="mt-5 text-white/30 max-w-xl mx-auto text-lg">We do things differently.</p>
        </motion.div>
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" {...staggerContainer}>
          {reasons.map((r) => (
            <motion.div key={r.title} {...staggerChild} className="card-hover bg-dark-card border border-dark-border p-8 rounded-2xl group">
              <div className="w-14 h-14 bg-red-brand/10 text-red-brand rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-red-brand group-hover:text-white group-hover:scale-110">
                {r.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 font-heading">{r.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Marquee ---- */
function Marquee() {
  const items = ["Fast Delivery", "Professional Design", "Mobile First", "Built to Convert", "Global Clients"];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className="py-8 border-y border-dark-border overflow-hidden bg-dark-card">
      <div className="marquee-track flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="mx-8 text-lg md:text-xl font-heading font-semibold text-white/15 flex items-center gap-8">
            {item}
            <span className="w-2 h-2 rounded-full bg-red-brand/30" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---- Stats ---- */
const stats = [
  { value: 50, suffix: "+", label: "Websites Built" },
  { value: 15, suffix: "+", label: "Countries" },
  { value: 7, suffix: "", label: "Day Delivery" },
  { value: 100, suffix: "%", label: "Satisfaction" },
];

function Stats() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" {...staggerContainer}>
          {stats.map((stat) => (
            <motion.div key={stat.label} {...staggerChild} className="text-center">
              <div className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/25 text-sm font-medium tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---- CTA Banner ---- */
function CTABanner() {
  return (
    <section className="relative py-32 md:py-44 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-dark to-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,26,26,0.15),transparent_70%)]" />
      <motion.div className="relative z-10 max-w-4xl mx-auto text-center" {...fadeUp}>
        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Your competitors already have a website.
          <br />
          <span className="text-red-brand">Do you?</span>
        </h2>
        <p className="mt-6 text-white/30 text-lg max-w-xl mx-auto">
          Every day without a professional website is a day your customers go to someone else.
        </p>
        <div className="mt-10">
          <Link href="/contact" className="inline-block bg-red-brand text-white px-10 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-red-brand-dark hover:shadow-2xl hover:shadow-red-brand/25 hover:-translate-y-0.5">
            Let&apos;s Build Your Website
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ---- Page ---- */
export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <WhySection />
      <Marquee />
      <Stats />
      <CTABanner />
    </PageTransition>
  );
}
