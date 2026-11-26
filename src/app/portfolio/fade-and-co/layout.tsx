import type { ReactNode } from "react";

export const metadata = {
  title: "Fade & Co. concept — CapitalSites",
  description: "A concept barbershop website in Calgary, built to show what the CapitalSites Website Plan includes. Not a real business.",
  alternates: { canonical: "/portfolio/fade-and-co" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
