import type { Metadata } from "next";
import QuoteBuilder from "@/app/quote/QuoteBuilder";

export const metadata: Metadata = {
  title: "Website Cost Estimate",
  description:
    "Answer a few questions about the website you want and get an instant estimate of project cost and monthly cost after launch.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <div className="container-max py-16 space-y-10">
      <header className="space-y-2 max-w-3xl">
        <h1 className="font-display tracking-wide">Get an estimate</h1>
        <p className="text-slate-400 text-sm">
          Tell me a bit about the website you want and see a starting estimate instantly. No
          sign-up required.
        </p>
      </header>
      <QuoteBuilder />
    </div>
  );
}
