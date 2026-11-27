import Link from "next/link";
import Image from "next/image";
import { CURRENCY_NOTE, TERMS_NOTE } from "@/data/offers";
import { SLOGAN } from "@/lib/seo";

const cols = [
  {
    title: "Services",
    links: [
      { href: "/services#websites", label: "Websites" },
      { href: "/services#operations", label: "Digital operations" },
      { href: "/services#care", label: "Digital Care" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/demo", label: "Demo" },
      { href: "/portfolio", label: "Concept websites" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/audit", label: "Free website audit" },
      { href: "mailto:capitalsitesottawa@gmail.com", label: "Email" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-snow text-ink-2 text-[12px] leading-[1.6]">
      <div className="max-w-[1024px] mx-auto px-5 pt-6 pb-10">
        <p className="pb-4 border-b border-line">
          {CURRENCY_NOTE} {TERMS_NOTE}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-[1.2fr_1fr_1fr_1fr] gap-6 py-6 border-b border-line">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-block" aria-label="CapitalSites home">
              <Image src="/logo-full.png" alt="CapitalSites" width={424} height={411} className="h-24 w-auto" />
            </Link>
            <p className="mt-3 text-[13px] font-semibold text-ink">{SLOGAN}</p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="font-semibold text-ink mb-2">{c.title}</h2>
              <ul className="space-y-1.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:underline hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} CapitalSites. A small Canadian web studio.</p>
          <p>capitalsitesottawa@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
