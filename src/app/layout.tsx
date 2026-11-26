import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-poppins" });

const SITE_TITLE = "CapitalSites — Canadian Web Design Studio";
const SITE_DESCRIPTION =
  "A small Canadian web studio building websites for independent small businesses across Canada. Website Fix $149 one-time, or the Website Plan at $0 upfront, then $99/month ($1,188 in the first year).";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.capitalsites.ca"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_CA",
    type: "website",
    siteName: "CapitalSites",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "CapitalSites",
  url: "https://www.capitalsites.ca",
  email: "capitalsitesottawa@gmail.com",
  description: SITE_DESCRIPTION,
  areaServed: { "@type": "Country", name: "Canada" },
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
