import type { ReactNode } from "react";

export const metadata = {
  title: "Maison Noir concept — CapitalSites",
  description: "A concept online boutique in Ottawa, built to show what the CapitalSites Premium plan includes. Demo store: checkout is disabled.",
  alternates: { canonical: "/portfolio/maison-noir" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
