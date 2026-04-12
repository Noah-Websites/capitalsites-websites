import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "CapitalSites | Premium Web Design for Small Businesses",
  description:
    "CapitalSites builds premium, high-converting websites for small businesses worldwide. Starting at $500 CAD, delivered in 7 days.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased bg-dark text-white">

        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
