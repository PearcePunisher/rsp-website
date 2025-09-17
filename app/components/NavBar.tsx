"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ScrambleText from "@/app/components/ScrambleText";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open,setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement|null>(null);

  // Close on route change
  useEffect(()=>{ setOpen(false); }, [pathname]);
  // Escape key handling
  useEffect(()=>{
    function onKey(e:KeyboardEvent){ if(e.key === 'Escape') setOpen(false); }
    if(open) window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [open]);
  // Focus first link when opening
  useEffect(()=>{ if(open && firstLinkRef.current) firstLinkRef.current.focus(); }, [open]);
  // Prevent background scroll when menu open
  useEffect(()=>{
    const root = document.documentElement;
    if(open){ root.classList.add('overflow-hidden'); }
    else { root.classList.remove('overflow-hidden'); }
    return () => root.classList.remove('overflow-hidden');
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#060b0f]/80 border-b border-cyan-500/20 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.6)]">
      <nav className="container-max h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center h-full" aria-label="Rogue Salad Productions Home">
          <span className="inline-flex items-center py-1 px-3 rounded-sm bg-[#22D3EE] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_8px_-2px_rgba(34,211,238,0.6)]">
            <Image
              src="/rsp-logo.png"
              alt="Rogue Salad Productions"
              width={240}
              height={52}
              priority
              className="h-8 w-auto object-contain mix-blend-multiply" />
          </span>
        </Link>
        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm tracking-wide uppercase">
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
        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-sm border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={()=> setOpen(o=>!o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
    </header>
    {/* Mobile full-screen menu (portal-like, sits outside header for reliable overlay) */}
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm md:hidden"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            onClick={()=> setOpen(false)}
          />
          <motion.nav
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="fixed inset-0 z-[110] md:hidden flex flex-col items-center justify-center gap-10 px-8 text-center"
            initial={{ opacity:0, scale:0.96 }}
            animate={{ opacity:1, scale:1 }}
            exit={{ opacity:0, scale:0.96 }}
            transition={{ duration:0.25 }}
          >
            <button
              type="button"
              onClick={()=> setOpen(false)}
              aria-label="Close navigation"
              className="absolute top-4 right-4 h-10 w-10 inline-flex items-center justify-center rounded-sm border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <X size={22} />
            </button>
            <ul className="flex flex-col gap-8 text-lg tracking-[0.2em] uppercase font-medium">
              {links.map((l,i)=>{
                const active = pathname.startsWith(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      ref={i===0?firstLinkRef:undefined}
                      href={l.href}
                      className={`relative px-2 py-1 inline-block transition-colors ${active?'text-cyan-300':'text-slate-200 hover:text-cyan-300'}`}
                      aria-current={active? 'page': undefined}
                    >
                      <ScrambleText text={l.label} enabled />
                      {active && <span className="absolute left-0 right-0 -bottom-1 h-px bg-cyan-400" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="text-[10px] tracking-widest text-slate-500 mt-10">© {new Date().getFullYear()} Rogue Salad</p>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
