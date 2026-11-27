import type { Metadata } from "next";

export const SITE_URL = "https://www.capitalsites.ca";
export const SITE_NAME = "CapitalSites";
export const SLOGAN = "Better systems. Better business.";
export const VALUE_PROPOSITION =
  "We help contractors and home-service businesses manage customer enquiries, organize estimates, schedule appointments and connect their digital systems.";

/** Per-page metadata: title, description, canonical URL, Open Graph and Twitter tags. */
export function pageMeta({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_CA",
      type: "website",
    },
    twitter: { card: "summary", title, description },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
