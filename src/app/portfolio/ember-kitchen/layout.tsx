import type { ReactNode } from "react";

export const metadata = {
  title: "Ember Kitchen concept — CapitalSites",
  description: "A concept restaurant website in Halifax, built to show what the CapitalSites Website Plan includes. Not a real business.",
  alternates: { canonical: "/portfolio/ember-kitchen" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
