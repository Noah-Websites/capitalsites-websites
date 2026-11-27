import type { ReactNode } from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Maison Noir concept — CapitalSites",
  description: "A concept online boutique in Ottawa, built to show what the CapitalSites Premium Website includes. Demo store: checkout is disabled.",
  path: "/portfolio/maison-noir",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
