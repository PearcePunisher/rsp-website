import "server-only";
import type { Feature, MonthlyLine, QuoteInput, QuoteResult } from "@/lib/quote/types";

// Pricing constants (as of 2026-09-25). Edit here only — never import this
// module from client components. The "server-only" import above makes the
// build fail if that ever happens.
const HOURLY_RATE = 150;
const DESIGN_HOURS = 5; // covers 3 concept rounds; overage billed hourly (contract term)
const WP_BASE_HOURS = 3;
const WP_HOURS_PER_PAGE = 3;
const CUSTOM_BASE_HOURS = 5;
const CUSTOM_HOURS_PER_PAGE = 3;
const FEATURE_HOURS: Record<Feature, number> = {
  form: 2,
  blog: 5,
  store: 15,
  members: 8,
  languages: 6,
};
const PROJECT_MINIMUM = 500;
const KINSTA_PLAN_COST = 35;
const KINSTA_MARKUP_PCT = 40;
const CUSTOM_HOSTING_FEE = 30;
const ANALYTICS_FEE = 25;
const SEO_FEE = 100;
const MAINTENANCE_HOURLY_RATE = HOURLY_RATE;
// Contract term only, not shown in the quote UI:
// rush fee for fixing client-caused breakage = 1.5x HOURLY_RATE.

export function computeQuote(input: QuoteInput): QuoteResult {
  const { platform, needsDesign, pageCount, features, analytics, seo, maintenanceHours } = input;

  const buildHours =
    (platform === "wordpress"
      ? WP_BASE_HOURS + WP_HOURS_PER_PAGE * pageCount
      : CUSTOM_BASE_HOURS + CUSTOM_HOURS_PER_PAGE * pageCount) +
    features.reduce((sum, f) => sum + FEATURE_HOURS[f], 0);

  const buildCost = buildHours * HOURLY_RATE;
  const designFee = needsDesign ? DESIGN_HOURS * HOURLY_RATE : 0;
  const projectTotal = Math.max(PROJECT_MINIMUM, designFee + buildCost);

  const hostingCost =
    platform === "wordpress"
      ? KINSTA_PLAN_COST * (1 + KINSTA_MARKUP_PCT / 100)
      : CUSTOM_HOSTING_FEE;

  const monthly: MonthlyLine[] = [
    { key: "hosting", label: "Hosting", amount: Math.round(hostingCost) },
  ];
  if (maintenanceHours > 0) {
    monthly.push({
      key: "maintenance",
      label: `Maintenance (${maintenanceHours} hrs)`,
      amount: Math.round(maintenanceHours * MAINTENANCE_HOURLY_RATE),
    });
  }
  if (analytics) {
    monthly.push({ key: "analytics", label: "Traffic & visitor analytics", amount: ANALYTICS_FEE });
  }
  if (seo) {
    monthly.push({ key: "seo", label: "Ongoing SEO updates", amount: SEO_FEE });
  }

  return {
    designFee: Math.round(designFee),
    buildCost: Math.round(buildCost),
    projectTotal: Math.round(projectTotal),
    projectMinimum: PROJECT_MINIMUM,
    monthly,
    monthlyTotal: monthly.reduce((sum, line) => sum + line.amount, 0),
  };
}
