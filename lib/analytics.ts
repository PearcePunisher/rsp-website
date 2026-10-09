// Umami event helpers. The tracker script is loaded in app/layout.tsx.
//
// Two ways to record an event:
//   1. Declarative (links/buttons, works in server components):
//        <Link {...ev("cta_click", { location: "hero", label: "estimate" })} />
//   2. Imperative (stateful logic in client components):
//        track("quote_started", { platform: "custom" });
//
// Event names: snake_case, <= 50 chars. Property values: string | number | boolean.

export type EventData = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number | boolean>) => void;
    };
  }
}

function clean(data?: EventData): Record<string, string | number | boolean> | undefined {
  if (!data) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(data)) if (v !== undefined) out[k] = v;
  return out;
}

/** Fire an event. Safe on the server, before the script loads, and when blocked. */
export function track(event: string, data?: EventData) {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(event, clean(data));
  } catch {}
}

/** Spread onto an element to fire `event` on click via Umami's data attributes. */
export function ev(event: string, data?: EventData): Record<string, string | number | boolean> {
  const props: Record<string, string | number | boolean> = { "data-umami-event": event };
  for (const [k, v] of Object.entries(clean(data) ?? {})) props[`data-umami-event-${k}`] = v;
  return props;
}
