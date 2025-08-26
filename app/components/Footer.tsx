import Link from "next/link";

export default function Footer(){
  return (
    <footer className="mt-16 border-t border-cyan-500/20 bg-black/60 backdrop-blur-sm text-xs text-slate-400">
      <div className="container-max py-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
          </span>
          <span>STATUS: LINK ESTABLISHED</span>
        </div>
        <div className="flex gap-6">
          <Link href="mailto:contact@roguesalad.example" className="hover:text-cyan-300">Email</Link>
          <Link href="https://instagram.com" className="hover:text-cyan-300">Instagram</Link>
          <Link href="/privacy" className="hover:text-cyan-300">Privacy</Link>
          <Link href="https://billing.stripe.com/p/login/4gMaEZdxb67egaN13A87K00" target="_blank" className="hover:text-cyan-300">Billing</Link>
        </div>
        <p className="md:text-right">© {new Date().getFullYear()} Rogue Salad Productions</p>
      </div>
    </footer>
  );
}
