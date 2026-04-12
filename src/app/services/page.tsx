"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease },
};

const services = [
  {
    title: "Custom Website Design",
    desc: "Every website we build is designed from scratch to match your brand, your audience, and your goals. No templates, no shortcuts.",
    details: "We start with your brand identity and business objectives, then craft a custom design that speaks directly to your target audience. Every element is intentional.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  },
  {
    title: "Mobile Optimization",
    desc: "Your website will look flawless on every device. Phones, tablets, laptops, desktops -- every screen size covered.",
    details: "With 60%+ of traffic coming from mobile, we build mobile-first. Responsive layouts, touch-friendly navigation, and fast loading on cellular connections.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>,
  },
  {
    title: "SEO Setup",
    desc: "We set up the foundation so search engines can find you. Meta tags, structured data, performance optimization, and more.",
    details: "Technical SEO, semantic HTML, image optimization, sitemap generation, and Google Search Console setup included with every build.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
  },
  {
    title: "Fast 7-Day Delivery",
    desc: "No waiting months for your website. We design, build, and launch your site in as little as 7 business days.",
    details: "Our streamlined process means you get a professional website fast. Day 1-2: design concepts. Day 3-5: development. Day 6-7: revisions and launch.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  },
  {
    title: "Ongoing Support",
    desc: "We do not disappear after launch. Updates, edits, and technical support whenever you need it.",
    details: "Content updates, security patches, performance monitoring, and priority email support. Your website stays running smoothly long after launch day.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  {
    title: "E-Commerce",
    desc: "Sell products online with a fully integrated store. Payments, inventory, and order management built in.",
    details: "Stripe or PayPal integration, product catalogs, shopping cart, checkout flow, inventory management, and order notifications all set up and ready to go.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>,
  },
];

export default function ServicesPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span {...fadeUp} className="text-red-brand font-semibold text-sm tracking-widest uppercase">
            What We Offer
          </motion.span>
          <motion.h1 {...fadeUp} className="font-heading text-5xl md:text-7xl font-bold text-white mt-4 leading-tight">
            Our Services
          </motion.h1>
          <motion.p {...fadeUp} className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
            Everything your business needs to succeed online, handled by professionals who care about results.
          </motion.p>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-28 md:pb-40 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
              className="card-hover group bg-dark-card border border-dark-border rounded-2xl p-8 relative overflow-hidden"
            >
              {/* Hover overlay with more details */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-brand/90 to-navy-dark/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl flex flex-col justify-end p-8">
                <p className="text-white/90 text-sm leading-relaxed">{s.details}</p>
                <Link href="/contact" className="mt-4 inline-block text-white font-semibold text-sm underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors">
                  Get a Quote
                </Link>
              </div>

              <div className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">
                <div className="w-14 h-14 bg-red-brand/10 text-red-brand rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-red-brand group-hover:text-white group-hover:scale-110">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-heading">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                <div className="mt-6 text-red-brand text-sm font-medium">Hover for details</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28 md:pb-40 px-6">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-white/30 mb-10 text-lg">Tell us about your project and we will get back to you within 24 hours.</p>
          <Link href="/contact" className="inline-block bg-red-brand text-white px-10 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-red-brand-dark hover:shadow-2xl hover:shadow-red-brand/25 hover:-translate-y-0.5">
            Start Your Project
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  );
}
