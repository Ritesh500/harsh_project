import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://mekhas.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mekhas — Pure, aromatic spice powders",
    template: "%s · Mekhas",
  },
  description:
    "Mekhas brings you pure, aromatic spice powders — thoughtfully sourced and freshly ground to bring bold flavour to every dish. Explore the collection.",
  keywords: [
    "spices",
    "spice powder",
    "ground spices",
    "masala",
    "turmeric powder",
    "Mekhas",
  ],
  openGraph: {
    title: "Mekhas — Pure, aromatic spice powders",
    description:
      "Pure, freshly ground spice powders for bold, honest flavour. Explore the collection and join the list.",
    url: SITE_URL,
    siteName: "Mekhas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mekhas — Pure, aromatic spice powders",
    description:
      "Pure, freshly ground spice powders for bold, honest flavour. Explore the collection.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
