import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

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
  title: {
    default: "Rogue Salad Productions",
    template: "%s | Rogue Salad Productions",
  },
  description:
    "Tactical creative studio: filmmaking, editing, motion graphics.",
  openGraph: {
    title: "Rogue Salad Productions",
    description: "Tactical creative. Clean visuals. Zero noise.",
    url: "https://www.roguesalad.example", // placeholder
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
    <html lang="en" className="bg-black text-white">
      <body
        className={`${orbitron.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
