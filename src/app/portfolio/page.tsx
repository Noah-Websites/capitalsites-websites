"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
    name: "Saveur Bistro",
    country: "Montreal, Canada",
    category: "Restaurants",
    color: "from-amber-900/80 to-dark",
    gradient: "from-[#2a1a0a] to-[#0f0a05]",
    desc: "A modern French bistro needed a website that captured their culinary artistry and made reservations effortless.",
  },
  {
    name: "Glow Studio",
    country: "London, UK",
    category: "Salons",
    color: "from-pink-900/80 to-dark",
    gradient: "from-[#2a0f1a] to-[#0f050a]",
    desc: "A premium hair and beauty salon wanted an online presence as polished as their services.",
  },
  {
    name: "BuildRight Construction",
    country: "Sydney, Australia",
    category: "Contractors",
    color: "from-slate-700/80 to-dark",
    gradient: "from-[#1a1e2a] to-[#0a0c12]",
    desc: "A family-owned construction company needed a site that showcased their portfolio of residential projects.",
  },
  {
    name: "Sakura Sushi",
    country: "Tokyo, Japan",
    category: "Restaurants",
    color: "from-red-900/80 to-dark",
    gradient: "from-[#2a0a0a] to-[#0f0505]",
    desc: "An authentic sushi restaurant wanted a minimalist website with online ordering capabilities.",
  },
  {
    name: "Luxe Nails & Spa",
    country: "Miami, USA",
    category: "Salons",
    color: "from-purple-900/80 to-dark",
    gradient: "from-[#1a0a2a] to-[#0a0512]",
    desc: "A luxury nail salon wanted a website that reflected their upscale branding and enabled online booking.",
  },
  {
    name: "Peak Plumbing Co.",
    country: "Dublin, Ireland",
    category: "Contractors",
    color: "from-blue-900/80 to-dark",
    gradient: "from-[#0a1a2a] to-[#050a12]",
    desc: "A growing plumbing company needed a professional site to generate leads and showcase certifications.",
  },
];

const filters = ["All", "Restaurants", "Salons", "Contractors"];

export default function PortfolioPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span {...fadeUp} className="text-red-brand font-semibold text-sm tracking-widest uppercase">
            Portfolio
          </motion.span>
          <motion.h1 {...fadeUp} className="font-heading text-5xl md:text-7xl font-bold text-white mt-4 leading-tight">
            Our Work
          </motion.h1>
          <motion.p {...fadeUp} className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
            Real results for real businesses. Every project is built to convert visitors into customers.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-12">
        <motion.div {...fadeUp} className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                active === f
                  ? "bg-red-brand text-white"
                  : "bg-dark-card border border-dark-border text-white/40 hover:text-white hover:border-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Project grid */}
      <section className="pb-28 md:pb-40 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
              className="flip-card aspect-[4/3] rounded-2xl"
            >
              <div className="flip-inner relative w-full h-full">
                {/* Front */}
                <div className={`flip-front absolute inset-0 bg-gradient-to-br ${p.gradient} rounded-2xl border border-dark-border flex flex-col items-center justify-center p-8`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <span className="font-heading font-bold text-2xl text-white/60">{p.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white text-center">{p.name}</h3>
                  <p className="text-white/30 text-sm mt-1">{p.category}</p>
                </div>
                {/* Back */}
                <div className={`flip-back absolute inset-0 bg-gradient-to-br ${p.gradient} rounded-2xl border border-red-brand/30 flex flex-col justify-center p-8`}>
                  <h3 className="font-heading text-lg font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-red-brand text-sm font-medium mb-4">{p.country}</p>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{p.desc}</p>
                  <Link href="/contact" className="inline-block bg-red-brand text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-brand-dark transition-colors text-center">
                    Start a Similar Project
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
