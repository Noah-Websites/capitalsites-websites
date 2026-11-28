import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import Analytics from "@/components/Analytics";
import { pageMeta, SITE_NAME, SITE_URL, SLOGAN, VALUE_PROPOSITION } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-poppins" });

const SITE_TITLE = "CapitalSites — Digital operations for Canadian contractors";
const SITE_DESCRIPTION = `${VALUE_PROPOSITION} A small Canadian web studio.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMeta({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" }),
};

/* Organization facts only: no address, no ratings, no prices. */
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-full.png`,
  email: "capitalsitesottawa@gmail.com",
  slogan: SLOGAN,
  description: SITE_DESCRIPTION,
  areaServed: { "@type": "Country", name: "Canada" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
        <LayoutShell>{children}</LayoutShell>
        <Analytics />
      </body>
    </html>
  );
}
