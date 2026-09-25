export const metadata = { title: "Contact" };

import Link from "next/link";
import ContactForm from "@/app/contact/ContactForm";

export default function ContactPage(){
  return (
    <div className="container-max py-16 space-y-10 max-w-3xl">
      <header className="space-y-2">
        <h1 className="font-display tracking-wide">Contact</h1>
        <p className="text-slate-400 text-sm">Discuss scope, timeline, or request a briefing deck.</p>
        <p className="text-slate-400 text-sm">
          Want a ballpark first? <Link href="/quote" className="text-cyan-300 underline">Get an instant estimate</Link>.
        </p>
      </header>
      <ContactForm />
      <div className="pt-6 border-t border-cyan-500/20 text-sm">
        <p>Prefer direct comms? <a href="mailto:riley@roguesalad.co" className="text-cyan-300 underline">riley@roguesalad.co</a></p>
      </div>
    </div>
  );
}
