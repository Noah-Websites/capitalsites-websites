"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const demoRoutes = ["/portfolio/fade-and-co", "/portfolio/ember-kitchen", "/portfolio/maison-noir"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (demoRoutes.some((route) => pathname.startsWith(route))) return <main>{children}</main>;
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
