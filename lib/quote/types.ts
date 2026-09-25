// Shared shapes for the quote builder. No pricing values live here — this file
// is imported by client code. Constants live in lib/quote/pricing.ts (server-only).

export const PLATFORMS = ["wordpress", "custom"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const FEATURES = ["form", "blog", "store", "members", "languages"] as const;
export type Feature = (typeof FEATURES)[number];

export const MAINTENANCE_HOURS = [0, 2, 5, 10] as const;
export type MaintenanceHours = (typeof MAINTENANCE_HOURS)[number];

export const MAX_PAGES = 200;

export type QuoteInput = {
  platform: Platform;
  needsDesign: boolean;
  pageCount: number;
  features: Feature[];
  analytics: boolean;
  seo: boolean;
  maintenanceHours: MaintenanceHours;
};

export type MonthlyLine = {
  key: "hosting" | "maintenance" | "analytics" | "seo";
  label: string;
  amount: number;
};

export type QuoteResult = {
  designFee: number;
  buildCost: number;
  projectTotal: number;
  projectMinimum: number;
  monthly: MonthlyLine[];
  monthlyTotal: number;
};

export function parseQuoteInput(raw: unknown): QuoteInput | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  if (!PLATFORMS.includes(r.platform as Platform)) return null;

  const pageCount = Number(r.pageCount);
  if (!Number.isInteger(pageCount) || pageCount < 1 || pageCount > MAX_PAGES) return null;

  if (!Array.isArray(r.features)) return null;
  const features = [...new Set(r.features)].filter((f): f is Feature =>
    FEATURES.includes(f as Feature)
  );
  if (features.length !== new Set(r.features).size) return null;

  const maintenanceHours = Number(r.maintenanceHours);
  if (!MAINTENANCE_HOURS.includes(maintenanceHours as MaintenanceHours)) return null;

  return {
    platform: r.platform as Platform,
    needsDesign: r.needsDesign !== false,
    pageCount,
    features,
    analytics: r.analytics === true,
    seo: r.seo === true,
    maintenanceHours: maintenanceHours as MaintenanceHours,
  };
}
