import type { ReactNode } from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Fade & Co. concept — CapitalSites",
  description: "A concept barbershop website in Calgary, built to show what the CapitalSites Website Plan includes. Not a real business.",
  path: "/portfolio/fade-and-co",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
