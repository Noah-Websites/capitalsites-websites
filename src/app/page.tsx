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
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm font-medium tracking-widest uppercase">
            Ottawa Web Design Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
        >
          Your website is costing you customers.
          <br />
          <span className="text-red-brand">We fix that.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-lg md:text-xl text-white/40 max-w-2xl mx-auto"
        >
          Ottawa-based web studio. We rebuild slow, outdated, and mobile-broken websites for local small businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/audit" className="bg-red-brand text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-red-brand-dark hover:shadow-2xl hover:shadow-red-brand/20 hover:-translate-y-0.5">
            Get a free website audit
          </Link>
          <Link href="/pricing" className="border border-white/15 text-white/70 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-white/5 hover:text-white hover:border-white/30">
            See pricing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Why CapitalSites ---- */
const reasons = [
  {
    title: "Based in Ottawa",
    desc: "Not an offshore agency or faceless freelancer marketplace. Local, accountable, and easy to reach.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
  },
  {
    title: "Owner-operated",
    desc: "You talk directly to the person building your site. No account managers, no handoffs, no confusion.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
  },
  {
    title: "Specific, measurable improvements",
    desc: "Load speed, mobile responsiveness, SEO, conversion. Real metrics, not vague promises.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  },
  {
    title: "Ongoing support included",
    desc: "We don't disappear after launch. Hosting, updates, monitoring, and content changes all included monthly.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
];

function WhySection() {
  return (
    <section className="py-28 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" {...fadeUp}>
          <span className="text-red-brand font-semibold text-sm tracking-widest uppercase">Why Us</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-4">Why CapitalSites</h2>
          <p className="mt-5 text-white/30 max-w-xl mx-auto text-lg">A different way of doing web design in Ottawa.</p>
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
  const items = ["Faster Load Times", "Mobile-Responsive", "SEO Foundation", "Ongoing Support", "Ottawa-Based"];
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
  { value: 7, suffix: "", label: "Day Delivery" },
  { value: 100, suffix: "%", label: "Ottawa-Based" },
  { value: 1, suffix: "", label: "Person Building" },
  { value: 24, suffix: "h", label: "Response Time" },
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

/* ---- About / Noah ---- */
function AboutNoah() {
  return (
    <section className="py-28 md:py-40 px-6 bg-dark-card/30">
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center">
        <motion.div {...fadeUp} className="md:col-span-2">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-navy-dark to-dark border border-dark-border overflow-hidden flex items-center justify-center">
            {/* Placeholder photo. Replace /public/noah-placeholder.jpg when ready. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/noah-placeholder.jpg"
              alt="Noah, founder of CapitalSites"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="md:col-span-3">
          <span className="text-red-brand font-semibold text-sm tracking-widest uppercase">About</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
            Meet Noah
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-5">
            I&apos;m Noah, the founder of CapitalSites. I&apos;m an Ottawa-based developer who started CapitalSites because too many great local businesses are losing customers to slow, broken websites.
          </p>
          <p className="text-white/50 text-lg leading-relaxed mb-6">
            Every project I take on, I build personally. No agency overhead, no offshore handoffs, no project managers between you and the work.
          </p>
          <p className="text-white/30 text-sm font-medium tracking-wider uppercase">
            Based in Ottawa, Ontario.
          </p>
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
          See what&apos;s broken on your website.
          <br />
          <span className="text-red-brand">In 60 seconds.</span>
        </h2>
        <p className="mt-6 text-white/30 text-lg max-w-xl mx-auto">
          Get a free audit covering load speed, mobile responsiveness, SEO, and conversion. No obligation.
        </p>
        <div className="mt-10">
          <Link href="/audit" className="inline-block bg-red-brand text-white px-10 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-red-brand-dark hover:shadow-2xl hover:shadow-red-brand/25 hover:-translate-y-0.5">
            Get a free website audit
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
      <AboutNoah />
      <CTABanner />
    </PageTransition>
  );
}
