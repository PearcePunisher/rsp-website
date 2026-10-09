"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

const MARKS = [25, 50, 75, 100];

// Fires scroll_depth once per mark per page view.
export default function ScrollDepth() {
  const pathname = usePathname();

  useEffect(() => {
    const fired = new Set<number>();
    let ticking = false;

    function check() {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable < 200) return; // too short to be meaningful
      const pct = ((window.scrollY || doc.scrollTop) / scrollable) * 100;
      for (const mark of MARKS) {
        if (pct >= mark - 1 && !fired.has(mark)) {
          fired.add(mark);
          track("scroll_depth", { depth: mark, path: pathname });
        }
      }
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
