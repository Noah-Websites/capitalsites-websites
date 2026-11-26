import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export function Chevron() {
  return (
    <svg viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1.5 1.5 6.5 7l-5 5.5" />
    </svg>
  );
}

export function ChevLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return external ? (
    <a href={href} className="chev" target="_blank" rel="noopener noreferrer">
      {children}
      <Chevron />
    </a>
  ) : (
    <Link href={href} className="chev">
      {children}
      <Chevron />
    </Link>
  );
}

export function Pill({
  href,
  children,
  variant = "red",
}: {
  href: string;
  children: ReactNode;
  variant?: "red" | "ghost" | "white";
}) {
  const cls = `pill pill-${variant}`;
  return href.startsWith("http") ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function MacBook({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="macbook">
      <div className="macbook-lid">
        <div className="macbook-screen">
          <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 1024px) 92vw, 960px" className="object-cover object-top" />
        </div>
      </div>
      <div className="macbook-base" aria-hidden />
    </div>
  );
}

export function IPhone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="iphone">
      <div className="iphone-screen">
        <span className="iphone-island" aria-hidden />
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 70vw, 300px" className="object-cover object-top" />
      </div>
    </div>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5 flex-none text-red" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4.5 10.5 8.5 14.5 15.5 6" />
    </svg>
  );
}
