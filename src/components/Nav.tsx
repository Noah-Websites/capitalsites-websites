"use client";

import Link from "next/link";
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
    <header className="sticky top-0 z-50 bg-[rgba(22,22,23,0.72)] backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 text-[#e8e8ed]">
      <nav aria-label="Main" className="max-w-[1024px] mx-auto h-12 px-5 flex items-center justify-between">
        <Link href="/" className="text-[17px] font-semibold tracking-[-0.02em] text-white">
          Capital<span className="text-red-bright">Sites</span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-[12.5px]">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`transition-colors hover:text-white ${active ? "text-white" : "text-[#d2d2d7]/85"}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-3">
          <Link href="/audit" className="hidden sm:inline-flex items-center h-7 px-3 rounded-full bg-red text-white text-[12px] font-medium hover:bg-red-deep transition-colors">
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
        <div id="mobile-menu" className="md:hidden border-t border-white/10 bg-[#161617]">
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
