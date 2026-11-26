"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/audit", label: "Free Audit" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="nav-red on-dark sticky top-0 z-50 bg-red border-b border-white/15 text-white">
      <nav aria-label="Main" className="max-w-[1024px] mx-auto h-14 px-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-white" aria-label="CapitalSites home">
          <Image src="/logo-mark-white.png" alt="" width={256} height={295} priority className="h-8 w-auto" />
          <span className="font-[family-name:var(--font-display)] text-[19px] font-bold tracking-[-0.02em]">CapitalSites</span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-[14px] font-medium">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`transition-colors underline-offset-[6px] decoration-2 hover:underline ${active ? "text-white underline" : "text-white/90"}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-3">
          <Link href="/audit" className="hidden sm:inline-flex items-center h-8 px-4 rounded-full bg-white text-red text-[13px] font-semibold hover:bg-snow transition-colors">
            Get a free audit
          </Link>
          <button
            type="button"
            className="md:hidden -mr-2 p-2"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 18 18" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
              {open ? <path d="M3 3l12 12M15 3 3 15" /> : <path d="M2 6h14M2 12h14" />}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-white/10 bg-red-deep">
          <ul className="max-w-[1024px] mx-auto px-6 py-4 space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-2.5 text-[24px] font-semibold tracking-[-0.02em] text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
