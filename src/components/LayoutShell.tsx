"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const demoRoutes = ["/portfolio/fade-and-co", "/portfolio/ember-kitchen", "/portfolio/maison-noir"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDemo = demoRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      {!isDemo && <Nav />}
      <main>{children}</main>
      {!isDemo && <Footer />}
    </>
  );
}
