import type { ReactNode } from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Ember Kitchen concept — CapitalSites",
  description: "A concept restaurant website in Halifax, built to show what the CapitalSites Website Plan includes. Not a real business.",
  path: "/portfolio/ember-kitchen",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
