"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import { fadeAndCo, u } from "@/lib/demoImages";

/* =========================================================
   FADE & CO. — Starter Package Demo ($500 CAD)
   A clean, simple 5-page barbershop website.
   Sections: Hero, Services, Gallery, About, Contact
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
      This is a concept redesign by CapitalSites — Refresh Tier $1,200 + $79/mo
      <Link href="/portfolio" className="underline ml-2 text-white/80 hover:text-white">
        Back to Portfolio
      </Link>
    </div>
  );
}

/* ---- Nav ---- */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-8 left-0 right-0 z-50 bg-[#111] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-white">
            FADE <span className="text-amber-500">&</span> CO.
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="bg-amber-500 text-black px-5 py-2 rounded-md font-semibold hover:bg-amber-400 transition-colors">
              Book Now
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
            className="fixed inset-0 z-40 bg-[#111]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-24"
          >
            {["services", "gallery", "about", "contact"].map((id, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-3xl font-bold text-white/70 hover:text-white capitalize"
              >
                {id === "contact" ? "Book Now" : id}
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
    <section className="relative min-h-[85vh] flex items-center bg-[#111] pt-24 overflow-hidden">
      {/* Background photo */}
      <Image
        src={u(fadeAndCo.hero, 1920, 1200)}
        alt="Fade & Co barbershop interior"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/85 to-[#111]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.05),transparent_60%)]" />
      <div className="relative max-w-5xl mx-auto px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <span className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Premium Barbershop</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Look Sharp.<br />Feel Sharp.
          </h1>
          <p className="mt-6 text-white/70 text-lg max-w-md">
            Westboro&apos;s finest barbershop experience. Classic cuts, modern style, and attention to detail.
          </p>
          <div className="mt-10 flex gap-4">
            <a href="#contact" className="bg-amber-500 text-black px-8 py-3.5 rounded-md font-semibold hover:bg-amber-400 transition-colors">
              Book an Appointment
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Services ---- */
const services = [
  { name: "Classic Cut", price: "$35", desc: "Traditional haircut with hot towel finish" },
  { name: "Fade", price: "$40", desc: "Skin fade, mid fade, or taper fade" },
  { name: "Beard Trim", price: "$20", desc: "Shape and line up with straight razor" },
  { name: "Cut + Beard", price: "$50", desc: "Full haircut and beard grooming combo" },
  { name: "Kids Cut", price: "$25", desc: "Ages 12 and under, any style" },
  { name: "Hot Towel Shave", price: "$30", desc: "Classic straight razor shave experience" },
];

function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-[#0a0a0a] scroll-mt-28">
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">What We Offer</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="bg-[#151515] border border-white/5 rounded-xl p-6 hover:border-amber-500/20 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-semibold">{s.name}</h3>
                <span className="text-amber-500 font-bold">{s.price}</span>
              </div>
              <p className="text-white/60 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Gallery ---- */
function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 bg-[#111] scroll-mt-28">
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase">Gallery</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Our Work</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {fadeAndCo.gallery.map((id, n) => (
            <motion.div
              key={id}
              {...fadeUp}
              className="relative aspect-square overflow-hidden rounded-xl border border-white/5 group"
            >
              <Image
                src={u(id, 600, 600)}
                alt={`Fade & Co gallery image ${n + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- About ---- */
function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#0a0a0a] scroll-mt-28">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div {...fadeUp}>
          <span className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase">About Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-8">The Fade & Co. Story</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Founded in the heart of Westboro, Ottawa, Fade & Co. has been delivering precision cuts and timeless style since 2019.
            Our team of skilled barbers brings years of experience and a passion for the craft. Whether you want a classic
            look or something fresh, we have got you covered. Walk-ins welcome, appointments preferred.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-amber-500">5+</div>
              <div className="text-white/55 text-sm mt-1">Years Open</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-500">4</div>
              <div className="text-white/55 text-sm mt-1">Barbers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-500">5K+</div>
              <div className="text-white/55 text-sm mt-1">Happy Clients</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Contact ---- */
function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#111] scroll-mt-28">
      <div className="max-w-xl mx-auto">
        <motion.div className="text-center mb-12" {...fadeUp}>
          <span className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase">Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Book Your Appointment</h2>
          <p className="mt-4 text-white/55">Walk-ins welcome. For guaranteed seating, book below.</p>
        </motion.div>
        <motion.form {...fadeUp} className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Your name" className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-white/5 rounded-lg text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-amber-500/30" />
            <input type="tel" placeholder="Phone number" className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-white/5 rounded-lg text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-amber-500/30" />
          </div>
          <input type="email" placeholder="Email address" className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-white/5 rounded-lg text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-amber-500/30" />
          <select className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-white/5 rounded-lg text-sm text-white/60 appearance-none focus:outline-none focus:border-amber-500/30">
            <option>Select a service</option>
            <option>Classic Cut — $35</option>
            <option>Fade — $40</option>
            <option>Beard Trim — $20</option>
            <option>Cut + Beard — $50</option>
            <option>Kids Cut — $25</option>
            <option>Hot Towel Shave — $30</option>
          </select>
          <textarea rows={3} placeholder="Any notes or preferred time" className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-white/5 rounded-lg text-sm text-white placeholder:text-white/45 resize-none focus:outline-none focus:border-amber-500/30" />
          <button type="submit" className="w-full bg-amber-500 text-black py-3.5 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
            Book Appointment
          </button>
        </motion.form>
      </div>
    </section>
  );
}

/* ---- Footer ---- */
function Footer() {
  return (
    <footer className="py-10 px-6 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/55">
        <span className="font-bold text-white/40">FADE <span className="text-amber-500/60">&</span> CO.</span>
        <span>312 Richmond Rd, Westboro, Ottawa, ON</span>
        <span>&copy; {new Date().getFullYear()} Fade & Co.</span>
      </div>
    </footer>
  );
}

/* ---- Page ---- */
export default function FadeAndCoDemo() {
  return (
    <div className="bg-[#111]">
      <SmoothScroll />
      <DemoBanner />
      <Nav />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
