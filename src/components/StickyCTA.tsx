"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const demoRoutes = ["/portfolio/fade-and-co", "/portfolio/ember-kitchen", "/portfolio/maison-noir"];

export default function StickyCTA() {
  const pathname = usePathname();
  const isDemo = demoRoutes.some((r) => pathname.startsWith(r));
  if (isDemo) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] text-white text-xs sm:text-sm font-medium"
      style={{ backgroundColor: "#8B0000" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
        <span className="tracking-wide">
          <span className="hidden sm:inline">Free website audit — </span>
          <span className="sm:hidden">Free audit — </span>
          see what&apos;s broken in 60 seconds
        </span>
        <Link
          href="/audit"
          className="bg-white/15 hover:bg-white/25 transition-colors px-3 sm:px-4 py-1 rounded-md font-semibold tracking-wide whitespace-nowrap"
        >
          Run audit →
        </Link>
      </div>
    </div>
  );
}
