import type { MetadataRoute } from "next";

const BASE = "https://www.capitalsites.ca";

const pages: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/pricing", priority: 0.9 },
  { path: "/services", priority: 0.8 },
  { path: "/demo", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/audit", priority: 0.7 },
  { path: "/portfolio", priority: 0.6 },
  { path: "/portfolio/fade-and-co", priority: 0.4 },
  { path: "/portfolio/ember-kitchen", priority: 0.4 },
  { path: "/portfolio/maison-noir", priority: 0.4 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `${BASE}${p.path}`, changeFrequency: "monthly", priority: p.priority }));
}
