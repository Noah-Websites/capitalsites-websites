import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

const SITE_TITLE = "CapitalSites — Ottawa Web Design Studio";
const SITE_DESCRIPTION =
  "Ottawa web design studio. We rebuild slow, outdated, and mobile-broken websites for local small businesses. Free audit, transparent pricing.";

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased bg-dark text-white">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
