import type { CSSProperties, ReactNode } from "react";

// Entrance motion (MOTION_INTENSITY 5), CSS only; see "Motion" in globals.css.
// - "view" (default): scroll-driven fade-up via animation-timeline: view().
//   No JS, so content already in view paints at full opacity on first paint
//   and never waits on hydration (protects LCP). Browsers without
//   scroll-driven animations, and reduced-motion users, get static content.
// - "load": hero entrance keyframe that plays once on first paint.

export function Reveal({
  children,
  className,
  delay = 0,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: "view" | "load";
}) {
  const cls = [trigger === "load" ? "rise" : "reveal", className].filter(Boolean).join(" ");
  const style = trigger === "load" ? ({ "--rise-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}

// Grid/list whose items reveal with a small per-column offset.
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  return <Tag className={["reveal-group", className].filter(Boolean).join(" ")}>{children}</Tag>;
}

export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  return <Tag className={["reveal", className].filter(Boolean).join(" ")}>{children}</Tag>;
}

// Codec divider that draws left-to-right as it scrolls into view.
export function DrawLine({ className }: { className?: string }) {
  return <span aria-hidden className={["codec-line draw block", className].filter(Boolean).join(" ")} />;
}
