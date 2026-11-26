import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/thanks" },
    sitemap: "https://www.capitalsites.ca/sitemap.xml",
    host: "https://www.capitalsites.ca",
  };
}
