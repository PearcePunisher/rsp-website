"use client";
import { useEffect, useState } from "react";

interface Props { text: string; enabled?: boolean; className?: string; }

const CHARS = "ABCDEFGHIKLMNOPQRSTUVWXYZ1234567890<>/[]{}".split("");

export default function ScrambleText({ text, enabled = false, className }: Props) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!enabled) { setDisplay(text); return; }
    let frame = 0;
    const orig = text;
    const id = setInterval(() => {
      frame++;
      setDisplay(orig.split("").map((ch, i) => (i < frame ? ch : CHARS[Math.floor(Math.random()*CHARS.length)])).join(""));
      if (frame >= orig.length) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [text, enabled]);
  return <span className={className} aria-label={text}>{display}</span>;
}
