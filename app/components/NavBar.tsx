"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ScrambleText from "@/app/components/ScrambleText";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-black/60 border-b border-cyan-500/20">
      <nav className="container-max h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-widest">
          <span className="text-cyan-300 font-semibold">ROGUE</span> SALAD
        </Link>
        <ul className="flex items-center gap-8 text-sm tracking-wide uppercase">
          {links.map(l => {
            const active = pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative px-1 py-1 hover:text-cyan-300 transition-colors ${active ? "text-cyan-300" : "text-slate-300"}`}
                  aria-current={active ? "page" : undefined}
                >
                  <ScrambleText text={l.label} enabled />
                  {active && (
                    <motion.span layoutId="nav-underline" className="absolute left-0 -bottom-0.5 h-px w-full bg-cyan-400 shadow-[0_0_6px_-1px_#22D3EE]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
