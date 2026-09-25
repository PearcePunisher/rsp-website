"use client";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

// Nav animations use the lightweight `m` components, which need LazyMotion.
// reducedMotion="user" makes transforms instant under prefers-reduced-motion.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}
