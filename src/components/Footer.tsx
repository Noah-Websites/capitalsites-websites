import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Our Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="CapitalSites" width={32} height={22} className="w-8 h-auto" />
              <span className="text-lg font-bold tracking-tight">
                <span className="text-red-brand">Capital</span>
                <span className="text-white/70">Sites</span>
              </span>
            </div>
            <p className="text-white/30 text-sm max-w-xs">
              Professional websites for small businesses around the world. Built to convert, delivered in days.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/40 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="text-sm text-white/40">
            <a
              href="mailto:capitalsitesottawa@gmail.com"
              className="hover:text-red-brand transition-colors duration-300"
            >
              capitalsitesottawa@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20">
          <p>2025 CapitalSites. All rights reserved.</p>
          <p>Ottawa, Canada</p>
        </div>
      </div>
    </footer>
  );
}
