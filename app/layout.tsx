import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { MotionProvider } from "./components/MotionProvider";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.roguesalad.co"
  ),
  title: {
    default: "Rogue Salad Productions",
    template: "%s | Rogue Salad Productions",
  },
  description:
    "Tactical creative studio: Web Design, Development, and Strategy.",
  openGraph: {
    title: "Rogue Salad Productions",
    description: "Tactical creative. Clean visuals. Zero noise.",
    url: "/",
    siteName: "Rogue Salad Productions",
    images: [
      {
        url: "/og-base.png",
        width: 1200,
        height: 630,
        alt: "Rogue Salad Productions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rogue Salad Productions",
    description: "Tactical creative. Clean visuals. Zero noise.",
    images: ["/og-base.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-white">
      <body
        className={`${orbitron.variable} ${inter.variable} font-sans antialiased min-h-[100dvh] flex flex-col`}>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="bb917952-d701-41dc-85cf-6fafd3067193"
        />
        <GoogleAnalytics gaId="G-R6S3LW3CJB" />
        <MotionProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleTagManager gtmId="GTM-MVPPRQ7M" />
    </html>
  );
}
