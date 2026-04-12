"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";

/* =========================================================
   MAISON NOIR — Premium Package Demo ($1,500 CAD)
   A luxury e-commerce clothing brand website.
   Sections: Hero, Featured Collection, Shop Categories,
   Lookbook, Brand Story, Sustainability, Newsletter,
   Reviews, FAQ, Footer
   ========================================================= */

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease },
};

/* ---- Banner ---- */
function DemoBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-red-brand text-white text-center text-xs py-2 font-medium tracking-wide">
      This is a demo website built by CapitalSites — Premium Package $1,500 CAD
      <Link href="/portfolio" className="underline ml-2 text-white/80 hover:text-white">
        Back to Portfolio
      </Link>
    </div>
  );
}

/* ---- Announcement Bar ---- */
function AnnouncementBar() {
  return (
    <div className="fixed top-8 left-0 right-0 z-[55] bg-[#1a1a1a] text-center text-xs py-2 text-white/40 tracking-widest uppercase">
      Free shipping on orders over $150 &nbsp;·&nbsp; New arrivals every Friday
    </div>
  );
}

/* ---- Nav ---- */
const mnNavLinks = [
  { id: "shop", label: "Shop" },
  { id: "collections", label: "Collections" },
  { id: "lookbook", label: "Lookbook" },
  { id: "story", label: "Our Story" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-[4.5rem] left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-[0.15em] text-white uppercase">
            Maison <span className="font-light">Noir</span>
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            {mnNavLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="hover:text-white transition-colors tracking-wide">{l.label}</a>
            ))}
            <a href="#shop" className="hover:text-white transition-colors tracking-wide">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 inline">
                <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="ml-1">Cart (0)</span>
            </a>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5" aria-label="Menu">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-32"
          >
            {mnNavLinks.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-3xl font-bold text-white/70 hover:text-white uppercase tracking-wide"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---- Hero ---- */
function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center bg-[#0a0a0a] pt-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,80,200,0.04),transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-6 w-full text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <span className="text-purple-400/60 text-sm font-medium tracking-[0.3em] uppercase mb-6 block">
            Spring / Summer 2025
          </span>
          <h1 className="text-5xl md:text-8xl font-bold text-white leading-[1.05] tracking-tight">
            Redefining<br />Minimalism.
          </h1>
          <p className="mt-6 text-white/30 text-lg max-w-md mx-auto">
            Timeless essentials crafted from premium fabrics. Designed in Montreal, made to last.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a href="#shop" className="bg-white text-black px-10 py-3.5 rounded-none font-semibold hover:bg-white/90 transition-colors tracking-wide text-sm uppercase">
              Shop Now
            </a>
            <a href="#collections" className="border border-white/15 text-white/60 px-10 py-3.5 rounded-none font-semibold hover:bg-white/5 hover:text-white transition-colors tracking-wide text-sm uppercase">
              Collections
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Featured Products ---- */
const products = [
  { name: "The Essential Tee", price: "$65", tag: "Best Seller", color: "Charcoal" },
  { name: "Relaxed Linen Trouser", price: "$145", tag: "New", color: "Ivory" },
  { name: "Oversized Blazer", price: "$285", tag: null, color: "Black" },
  { name: "Cashmere Crew Knit", price: "$195", tag: "New", color: "Fog Grey" },
  { name: "Wide Leg Denim", price: "$165", tag: null, color: "Raw Indigo" },
  { name: "Silk Button-Up", price: "$210", tag: "Limited", color: "Midnight" },
  { name: "Cotton Canvas Jacket", price: "$245", tag: null, color: "Stone" },
  { name: "Merino Wool Scarf", price: "$85", tag: "New", color: "Noir" },
];

function Shop() {
  return (
    <section id="shop" className="py-24 px-6 bg-[#0a0a0a] scroll-mt-36">
      <div className="max-w-6xl mx-auto">
        <motion.div className="flex items-end justify-between mb-12" {...fadeUp}>
          <div>
            <span className="text-purple-400/60 text-sm font-medium tracking-[0.2em] uppercase">Shop</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Featured Pieces</h2>
          </div>
          <a href="#shop" className="text-sm text-white/30 hover:text-white/60 transition-colors tracking-wide hidden md:block">
            View All →
          </a>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] bg-gradient-to-b from-[#141414] to-[#0d0d0d] border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-purple-500/20 transition-colors">
                {p.tag && (
                  <span className="absolute top-3 left-3 bg-white text-black text-[10px] px-2.5 py-1 font-semibold uppercase tracking-wider">
                    {p.tag}
                  </span>
                )}
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-purple-500/5 flex items-center justify-center mx-auto mb-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-6 h-6 text-purple-400/30">
                      <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <span className="text-white/10 text-xs">Product Image</span>
                </div>
                {/* Quick add overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-white text-black py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors">
                    Quick Add
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">{p.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-white/40 text-sm">{p.price}</span>
                  <span className="text-white/20 text-xs">{p.color}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Collections ---- */
const collections = [
  { name: "Essentials", desc: "Everyday basics elevated", count: "24 pieces" },
  { name: "Outerwear", desc: "Layering done right", count: "12 pieces" },
  { name: "Tailoring", desc: "Sharp, modern silhouettes", count: "16 pieces" },
];

function Collections() {
  return (
    <section id="collections" className="py-24 px-6 bg-[#080808] scroll-mt-36">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="text-purple-400/60 text-sm font-medium tracking-[0.2em] uppercase">Collections</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Shop by Collection</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4">
          {collections.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] bg-gradient-to-b from-[#121215] to-[#0a0a0c] border border-white/5 rounded-sm flex items-end p-8 relative overflow-hidden group-hover:border-purple-500/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="relative z-10">
                  <span className="text-white/20 text-xs uppercase tracking-wider">{c.count}</span>
                  <h3 className="text-white text-2xl font-bold mt-1">{c.name}</h3>
                  <p className="text-white/30 text-sm mt-1">{c.desc}</p>
                  <span className="text-purple-400/60 text-sm mt-3 block group-hover:text-purple-400 transition-colors">
                    Explore →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Lookbook ---- */
function Lookbook() {
  return (
    <section id="lookbook" className="py-24 px-6 bg-[#0a0a0a] scroll-mt-36">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="text-purple-400/60 text-sm font-medium tracking-[0.2em] uppercase">Lookbook</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">SS25 Campaign</h2>
          <p className="text-white/25 mt-3">Shot on location in Old Montreal</p>
        </motion.div>
        <div className="grid grid-cols-6 gap-3">
          {/* Large left */}
          <motion.div {...fadeUp} className="col-span-6 md:col-span-4 aspect-[16/9] bg-gradient-to-br from-[#12101a] to-[#0a0a0c] border border-white/5 rounded-sm flex items-center justify-center">
            <span className="text-white/10 text-sm">Campaign Image 1</span>
          </motion.div>
          {/* Two stacked right */}
          <motion.div {...fadeUp} className="col-span-3 md:col-span-2 aspect-square bg-gradient-to-br from-[#141018] to-[#0a0a0c] border border-white/5 rounded-sm flex items-center justify-center">
            <span className="text-white/10 text-sm">Image 2</span>
          </motion.div>
          <motion.div {...fadeUp} className="col-span-3 md:col-span-2 aspect-square bg-gradient-to-br from-[#100e16] to-[#0a0a0c] border border-white/5 rounded-sm flex items-center justify-center">
            <span className="text-white/10 text-sm">Image 3</span>
          </motion.div>
          {/* Two equal bottom */}
          <motion.div {...fadeUp} className="col-span-3 md:col-span-2 aspect-square bg-gradient-to-br from-[#0f0d15] to-[#0a0a0c] border border-white/5 rounded-sm flex items-center justify-center">
            <span className="text-white/10 text-sm">Image 4</span>
          </motion.div>
          <motion.div {...fadeUp} className="col-span-6 md:col-span-4 aspect-[16/9] bg-gradient-to-br from-[#110f18] to-[#0a0a0c] border border-white/5 rounded-sm flex items-center justify-center">
            <span className="text-white/10 text-sm">Campaign Image 5</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---- Brand Story ---- */
function Story() {
  return (
    <section id="story" className="py-28 px-6 bg-[#080808] scroll-mt-36">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div {...fadeUp}>
          <span className="text-purple-400/60 text-sm font-medium tracking-[0.3em] uppercase mb-6 block">Our Story</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
            Born in Montreal.<br />Worn Everywhere.
          </h2>
          <p className="text-white/30 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Maison Noir was founded in 2021 with a simple mission: create wardrobe staples that transcend trends.
            We believe in fewer, better things — pieces designed with intention, crafted from premium materials,
            and built to become the foundation of your personal style.
          </p>
          <p className="text-white/30 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Every garment is designed in our Montreal atelier, produced in ethical factories, and delivered
            in 100% recyclable packaging. Quality over quantity, always.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-white/20 text-sm mt-1">Premium Fabrics</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">Ethical</div>
              <div className="text-white/20 text-sm mt-1">Production</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">4K+</div>
              <div className="text-white/20 text-sm mt-1">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">Free</div>
              <div className="text-white/20 text-sm mt-1">Returns</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Sustainability ---- */
function Sustainability() {
  const pillars = [
    { title: "Ethical Production", desc: "All garments made in certified factories with fair wages and safe conditions." },
    { title: "Premium Materials", desc: "Organic cotton, recycled cashmere, TENCEL, and deadstock fabrics wherever possible." },
    { title: "Minimal Waste", desc: "Made-to-order options, recyclable packaging, and a garment take-back program." },
    { title: "Carbon Neutral", desc: "We offset 100% of our shipping emissions through verified reforestation projects." },
  ];
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="text-purple-400/60 text-sm font-medium tracking-[0.2em] uppercase">Sustainability</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Fashion With Purpose</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="bg-[#0e0e10] border border-white/5 rounded-sm p-6 hover:border-purple-500/15 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/5 flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-purple-400/40">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">{p.title}</h3>
              <p className="text-white/25 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Newsletter ---- */
function Newsletter() {
  return (
    <section className="py-24 px-6 bg-[#080808]">
      <motion.div {...fadeUp} className="max-w-xl mx-auto text-center">
        <span className="text-purple-400/60 text-sm font-medium tracking-[0.2em] uppercase">Newsletter</span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-3">Stay in the Loop</h2>
        <p className="text-white/25 text-sm mb-8">Early access to new drops, exclusive offers, and style inspiration. No spam, unsubscribe anytime.</p>
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3.5 bg-[#111] border border-white/5 rounded-none text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/30"
          />
          <button type="submit" className="bg-white text-black px-8 py-3.5 rounded-none text-sm font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  );
}

/* ---- Reviews ---- */
const reviews = [
  { name: "Camille D.", text: "The quality is unreal for the price. My Essential Tee has been washed 30+ times and still looks brand new. This is my go-to brand now.", location: "Montreal, QC" },
  { name: "Jordan P.", text: "Finally found a brand that does minimalism right. No logos, no gimmicks — just beautifully made clothes that fit perfectly. The Oversized Blazer is chef's kiss.", location: "Toronto, ON" },
  { name: "Mei L.", text: "I was hesitant to buy online but the fit guide was spot on. The linen trousers are my new summer staple. Love the sustainable packaging too.", location: "Vancouver, BC" },
  { name: "Alexandre F.", text: "Maison Noir has replaced half my wardrobe. The fabrics feel luxurious and the designs are timeless. Worth every penny.", location: "Ottawa, ON" },
];

function Reviews() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="text-purple-400/60 text-sm font-medium tracking-[0.2em] uppercase">Reviews</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">What People Are Saying</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="bg-[#0e0e10] border border-white/5 rounded-sm p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} className="w-3.5 h-3.5 text-purple-400/60" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/30 text-sm leading-relaxed mb-4">{r.text}</p>
              <div>
                <p className="text-white/60 text-sm font-semibold">{r.name}</p>
                <p className="text-white/15 text-xs">{r.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- FAQ ---- */
const faqs = [
  { q: "What is your return policy?", a: "We offer free returns within 30 days of delivery. Items must be unworn with tags attached. Exchanges are processed within 3–5 business days." },
  { q: "How do I find my size?", a: "Check our detailed size guide on each product page. We include measurements in both cm and inches, plus model reference sizing. When in doubt, size up — our relaxed fits are designed to be comfortable." },
  { q: "Do you ship internationally?", a: "Yes! We ship across Canada and the US with free shipping over $150. International shipping to select countries is available at checkout." },
  { q: "Are your products sustainable?", a: "We use organic cotton, recycled fabrics, and deadstock materials. All packaging is 100% recyclable, and we offset carbon emissions on every shipment." },
];

function FAQ() {
  return (
    <section className="py-24 px-6 bg-[#080808]">
      <div className="max-w-2xl mx-auto">
        <motion.div className="text-center mb-12" {...fadeUp}>
          <span className="text-purple-400/60 text-sm font-medium tracking-[0.2em] uppercase">FAQ</span>
          <h2 className="text-3xl font-bold text-white mt-2">Common Questions</h2>
        </motion.div>
        <motion.div {...fadeUp} className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group bg-[#0e0e10] border border-white/5 rounded-sm">
              <summary className="px-6 py-4 cursor-pointer text-white/70 font-medium text-sm list-none flex items-center justify-between hover:text-white transition-colors">
                {faq.q}
                <svg className="w-4 h-4 text-white/20 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-white/25 text-sm leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Footer ---- */
function Footer() {
  return (
    <footer className="py-14 px-6 bg-[#060606] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-4 gap-8 mb-12">
          <div>
            <span className="text-lg font-bold tracking-[0.15em] text-white uppercase">
              Maison <span className="font-light">Noir</span>
            </span>
            <p className="text-white/20 text-sm mt-3 leading-relaxed">
              Timeless wardrobe essentials designed in Montreal. Fewer things, better made.
            </p>
          </div>
          <div>
            <h4 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Shop</h4>
            <div className="space-y-2 text-sm text-white/20">
              <a href="#shop" className="block hover:text-white/40 transition-colors">All Products</a>
              <a href="#collections" className="block hover:text-white/40 transition-colors">Collections</a>
              <span className="block cursor-pointer hover:text-white/40 transition-colors">Gift Cards</span>
              <span className="block cursor-pointer hover:text-white/40 transition-colors">Sale</span>
            </div>
          </div>
          <div>
            <h4 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Company</h4>
            <div className="space-y-2 text-sm text-white/20">
              <a href="#story" className="block hover:text-white/40 transition-colors">Our Story</a>
              <span className="block cursor-pointer hover:text-white/40 transition-colors">Sustainability</span>
              <span className="block cursor-pointer hover:text-white/40 transition-colors">Careers</span>
              <span className="block cursor-pointer hover:text-white/40 transition-colors">Press</span>
            </div>
          </div>
          <div>
            <h4 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Support</h4>
            <div className="space-y-2 text-sm text-white/20">
              <span className="block cursor-pointer hover:text-white/40 transition-colors">Size Guide</span>
              <span className="block cursor-pointer hover:text-white/40 transition-colors">Shipping & Returns</span>
              <span className="block cursor-pointer hover:text-white/40 transition-colors">Contact Us</span>
              <span className="block cursor-pointer hover:text-white/40 transition-colors">FAQ</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/12 gap-3">
          <span>&copy; 2025 Maison Noir Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="hover:text-white/25 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white/25 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white/25 cursor-pointer transition-colors">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---- Page ---- */
export default function MaisonNoirDemo() {
  return (
    <div className="bg-[#0a0a0a]">
      <SmoothScroll />
      <DemoBanner />
      <AnnouncementBar />
      <Nav />
      <Hero />
      <Shop />
      <Collections />
      <Lookbook />
      <Story />
      <Sustainability />
      <Reviews />
      <Newsletter />
      <FAQ />
      <Footer />
    </div>
  );
}
