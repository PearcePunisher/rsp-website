import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator | No Ads, No Sign-up, Instant",
  description: "Generate QR codes instantly for free. No data stored, no accounts required, and absolutely no ads. Create secure QR codes for URLs, text, and contact info.",
  openGraph: {
    title: "Free QR Code Generator | Rogue Salad Productions",
    description: "Generate QR codes instantly for free. No data stored, no accounts required, and absolutely no ads.",
  },
};

export default function QRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
