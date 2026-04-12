"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";

/* =========================================================
   EMBER KITCHEN — Professional Package Demo ($900 CAD)
   A rich, multi-section restaurant website.
   Sections: Hero, About, Menu, Gallery, Chef/Team,
   Testimonials, Reservations, Hours/Location, Footer
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
      This is a demo website built by CapitalSites — Professional Package $900 CAD
      <Link href="/portfolio" className="underline ml-2 text-white/80 hover:text-white">
        Back to Portfolio
      </Link>
    </div>
  );
}

/* ---- Nav ---- */
const navLinks = [
  { id: "about", label: "About" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "team", label: "Our Team" },
  { id: "testimonials", label: "Reviews" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-8 left-0 right-0 z-50 bg-[#0c0806]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-white">
            EMBER <span className="text-orange-500">KITCHEN</span>
          </span>
          <div className="hidden md:flex items-center gap-7 text-sm text-white/50">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="hover:text-white transition-colors">{l.label}</a>
            ))}
            <a href="#reservations" className="bg-orange-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-orange-400 transition-colors">
              Reserve a Table
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
            className="fixed inset-0 z-40 bg-[#0c0806]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-24"
          >
            {[...navLinks, { id: "reservations", label: "Reserve a Table" }].map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-3xl font-bold text-white/70 hover:text-white"
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
    <section className="relative min-h-[90vh] flex items-center bg-[#0c0806] pt-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(220,38,38,0.04),transparent_50%)]" />
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <span className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Farm to Table · Vancouver
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Where Fire<br />Meets Flavour.
          </h1>
          <p className="mt-6 text-white/40 text-lg max-w-lg">
            A modern dining experience rooted in wood-fired cooking, seasonal ingredients, and bold flavours from around the world.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#reservations" className="bg-orange-500 text-white px-8 py-3.5 rounded-md font-semibold hover:bg-orange-400 transition-colors">
              Reserve a Table
            </a>
            <a href="#menu" className="border border-white/10 text-white/60 px-8 py-3.5 rounded-md font-semibold hover:bg-white/5 hover:text-white transition-colors">
              View Menu
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- About ---- */
function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#0a0704] scroll-mt-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp}>
          <span className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase">Our Story</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">Cooking With Heart Since 2020</h2>
          <p className="text-white/40 leading-relaxed mb-4">
            Ember Kitchen was born from a simple belief: great food starts with great ingredients and an open flame.
            Our wood-fired kitchen sits at the heart of everything we do, from charred appetizers to slow-roasted mains.
          </p>
          <p className="text-white/40 leading-relaxed mb-6">
            Nestled in the vibrant Gastown district, we source locally whenever possible, partner with BC farms,
            and change our menu with the seasons. Every plate tells a story of craft, care, and a little bit of smoke.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-2xl font-bold text-orange-500">4.8★</div>
              <div className="text-white/30 text-sm mt-1">Google Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">2K+</div>
              <div className="text-white/30 text-sm mt-1">Monthly Guests</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">Local</div>
              <div className="text-white/30 text-sm mt-1">BC Sourced</div>
            </div>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="aspect-[4/5] bg-gradient-to-br from-[#1a1008] to-[#0d0806] rounded-2xl border border-white/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-orange-500/50">
                <path d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
              </svg>
            </div>
            <span className="text-white/15 text-sm">Restaurant Photo</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Menu ---- */
const menuCategories = [
  {
    name: "Starters",
    items: [
      { name: "Charred Broccolini", price: "$14", desc: "Lemon tahini, chili flake, toasted almonds" },
      { name: "Tuna Tartare", price: "$19", desc: "Avocado, sesame, crispy wonton, yuzu" },
      { name: "Burrata", price: "$17", desc: "Heirloom tomato, basil oil, grilled sourdough" },
      { name: "Ember Bread", price: "$10", desc: "House-baked focaccia, smoked butter, sea salt" },
    ],
  },
  {
    name: "Mains",
    items: [
      { name: "Wood-Fired Salmon", price: "$34", desc: "Cedar plank, miso glaze, seasonal greens" },
      { name: "36oz Tomahawk", price: "$78", desc: "Dry-aged, bone-in, roasted garlic butter" },
      { name: "Mushroom Risotto", price: "$26", desc: "Wild mushroom, truffle, aged parmesan" },
      { name: "Half Roasted Chicken", price: "$29", desc: "Herb-brined, lemon jus, root vegetables" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Burnt Basque Cheesecake", price: "$14", desc: "Berry compote, vanilla cream" },
      { name: "Sticky Toffee Pudding", price: "$13", desc: "Dates, butterscotch, salted caramel ice cream" },
      { name: "Dark Chocolate Torte", price: "$15", desc: "Espresso ganache, gold leaf, hazelnut" },
    ],
  },
  {
    name: "Drinks",
    items: [
      { name: "Ember Old Fashioned", price: "$18", desc: "Smoked bourbon, demerara, angostura" },
      { name: "Seasonal Sangria", price: "$14", desc: "Red wine, stone fruit, cinnamon, citrus" },
      { name: "BC Wine Selection", price: "$16+", desc: "Rotating local pours by the glass" },
      { name: "House Espresso", price: "$5", desc: "Double shot, locally roasted beans" },
    ],
  },
];

function Menu() {
  return (
    <section id="menu" className="py-24 px-6 bg-[#0c0806] scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase">Our Menu</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Seasonal Favourites</h2>
          <p className="text-white/30 mt-3 max-w-md mx-auto">Menu changes seasonally. Prices subject to change. Ask your server about daily specials and allergen info.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          {menuCategories.map((cat) => (
            <motion.div key={cat.name} {...fadeUp}>
              <h3 className="text-xl font-bold text-orange-500 mb-6 tracking-wide uppercase text-sm">{cat.name}</h3>
              <div className="space-y-5">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex justify-between gap-4 group">
                    <div>
                      <h4 className="text-white font-medium group-hover:text-orange-400 transition-colors">{item.name}</h4>
                      <p className="text-white/25 text-sm mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-orange-500/80 font-semibold whitespace-nowrap">{item.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Gallery ---- */
function Gallery() {
  const captions = ["Interior", "Wood-Fired Oven", "Plating", "Bar Area", "Patio", "Private Dining"];
  return (
    <section id="gallery" className="py-24 px-6 bg-[#0a0704] scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase">Gallery</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">The Ember Experience</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {captions.map((caption, n) => (
            <motion.div
              key={n}
              {...fadeUp}
              className="aspect-[4/3] bg-gradient-to-br from-[#1a0f08] to-[#0d0806] rounded-xl border border-white/5 flex items-center justify-center group hover:border-orange-500/20 transition-colors"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-orange-500/50">
                    <path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                </div>
                <span className="text-white/15 text-xs">{caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Team ---- */
const team = [
  { name: "Chef Marco Alvarez", role: "Head Chef & Owner", bio: "15 years of experience across Michelin-starred kitchens in Barcelona and New York before opening Ember Kitchen." },
  { name: "Priya Sharma", role: "Sous Chef", bio: "Specializes in wood-fired techniques and seasonal menu development. Graduate of Pacific Institute of Culinary Arts." },
  { name: "Liam Chen", role: "Mixologist", bio: "Award-winning bartender crafting cocktails that complement every dish. Formerly at Hawksworth Restaurant." },
  { name: "Sofia Rossi", role: "Pastry Chef", bio: "Trained in Lyon, France. Brings European pastry tradition to Ember's dessert menu with a Pacific Northwest twist." },
];

function Team() {
  return (
    <section id="team" className="py-24 px-6 bg-[#0c0806] scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">The People Behind the Flames</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="bg-[#111] border border-white/5 rounded-xl overflow-hidden group hover:border-orange-500/20 transition-colors"
            >
              <div className="aspect-square bg-gradient-to-br from-[#1a0f08] to-[#0d0806] flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <span className="text-orange-500/50 font-bold text-xl">{member.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-orange-500/60 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-white/25 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Testimonials ---- */
const testimonials = [
  { name: "Jessica T.", text: "Best dining experience in Vancouver, hands down. The wood-fired salmon was incredible, and the atmosphere is unmatched. We come back every month.", rating: 5 },
  { name: "David & Maria K.", text: "We hosted our anniversary dinner here and it was perfect. The staff went above and beyond, and the tasting menu was a culinary journey. Highly recommend the private dining room.", rating: 5 },
  { name: "Alex R.", text: "As a food blogger, I have been to a lot of restaurants in this city. Ember Kitchen consistently delivers — creative dishes, quality ingredients, and that smoky flavour from the wood fire. The Old Fashioned is a must.", rating: 5 },
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-[#0a0704] scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase">Reviews</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">What Our Guests Say</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="bg-[#111] border border-white/5 rounded-xl p-6 relative"
            >
              <div className="text-orange-500/20 text-5xl font-serif absolute top-3 left-5">&ldquo;</div>
              <div className="flex gap-0.5 mb-4 mt-2">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <svg key={s} className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/35 text-sm leading-relaxed mb-4">{t.text}</p>
              <p className="text-white/60 text-sm font-semibold">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Reservations ---- */
function Reservations() {
  return (
    <section id="reservations" className="py-24 px-6 bg-[#0c0806] scroll-mt-28">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        <motion.div {...fadeUp}>
          <span className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase">Reservations</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">Book Your Table</h2>
          <p className="text-white/35 leading-relaxed mb-8">
            Reserve ahead to guarantee your spot. Walk-ins are welcome but subject to availability,
            especially on weekends. For parties of 8 or more, please call us directly.
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-orange-500">
                  <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Hours</p>
                <p className="text-white/30">Tue–Thu: 5pm–10pm</p>
                <p className="text-white/30">Fri–Sat: 5pm–11pm</p>
                <p className="text-white/30">Sun: 5pm–9pm · Mon: Closed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-orange-500">
                  <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Location</p>
                <p className="text-white/30">28 Water Street, Gastown</p>
                <p className="text-white/30">Vancouver, BC V6B 1A4</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-orange-500">
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Phone</p>
                <p className="text-white/30">(604) 555-0189</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form {...fadeUp} className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Full name" className="w-full px-4 py-3.5 bg-[#151210] border border-white/5 rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/30" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3.5 bg-[#151210] border border-white/5 rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/30" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="tel" placeholder="Phone number" className="w-full px-4 py-3.5 bg-[#151210] border border-white/5 rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/30" />
            <select className="w-full px-4 py-3.5 bg-[#151210] border border-white/5 rounded-lg text-sm text-white/40 appearance-none focus:outline-none focus:border-orange-500/30">
              <option>Party size</option>
              <option>1–2 guests</option>
              <option>3–4 guests</option>
              <option>5–6 guests</option>
              <option>7–8 guests</option>
              <option>8+ (call us)</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="date" className="w-full px-4 py-3.5 bg-[#151210] border border-white/5 rounded-lg text-sm text-white/40 focus:outline-none focus:border-orange-500/30" />
            <select className="w-full px-4 py-3.5 bg-[#151210] border border-white/5 rounded-lg text-sm text-white/40 appearance-none focus:outline-none focus:border-orange-500/30">
              <option>Preferred time</option>
              <option>5:00 PM</option>
              <option>5:30 PM</option>
              <option>6:00 PM</option>
              <option>6:30 PM</option>
              <option>7:00 PM</option>
              <option>7:30 PM</option>
              <option>8:00 PM</option>
              <option>8:30 PM</option>
              <option>9:00 PM</option>
            </select>
          </div>
          <textarea rows={3} placeholder="Special requests (allergies, celebrations, seating preferences)" className="w-full px-4 py-3.5 bg-[#151210] border border-white/5 rounded-lg text-sm text-white placeholder:text-white/20 resize-none focus:outline-none focus:border-orange-500/30" />
          <button type="submit" className="w-full bg-orange-500 text-white py-3.5 rounded-lg font-semibold hover:bg-orange-400 transition-colors">
            Request Reservation
          </button>
          <p className="text-white/15 text-xs text-center">You will receive a confirmation email within 2 hours.</p>
        </motion.form>
      </div>
    </section>
  );
}

/* ---- Footer ---- */
function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#080604] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <span className="text-lg font-bold text-white">EMBER <span className="text-orange-500">KITCHEN</span></span>
            <p className="text-white/25 text-sm mt-2 leading-relaxed">Wood-fired dining in the heart of Gastown, Vancouver. Seasonal. Local. Bold.</p>
          </div>
          <div>
            <h4 className="text-white/50 text-sm font-semibold uppercase tracking-wide mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm text-white/25">
              <a href="#menu" className="block hover:text-white/50 transition-colors">Menu</a>
              <a href="#reservations" className="block hover:text-white/50 transition-colors">Reservations</a>
              <a href="#gallery" className="block hover:text-white/50 transition-colors">Gallery</a>
              <a href="#team" className="block hover:text-white/50 transition-colors">Our Team</a>
            </div>
          </div>
          <div>
            <h4 className="text-white/50 text-sm font-semibold uppercase tracking-wide mb-3">Connect</h4>
            <div className="space-y-2 text-sm text-white/25">
              <p>info@emberkitchen.ca</p>
              <p>(604) 555-0189</p>
              <p>@emberkitchen</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/15 gap-3">
          <span>&copy; 2025 Ember Kitchen. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="hover:text-white/30 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white/30 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---- Page ---- */
export default function EmberKitchenDemo() {
  return (
    <div className="bg-[#0c0806]">
      <SmoothScroll />
      <DemoBanner />
      <Nav />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Team />
      <Testimonials />
      <Reservations />
      <Footer />
    </div>
  );
}
