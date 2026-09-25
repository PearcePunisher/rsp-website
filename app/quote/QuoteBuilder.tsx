"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MAX_PAGES,
  MAINTENANCE_HOURS,
  type Feature,
  type MaintenanceHours,
  type Platform,
  type QuoteInput,
  type QuoteResult,
} from "@/lib/quote/types";
import { cn } from "@/lib/cn";
import {
  ESTIMATE_HANDOFF_PARAM,
  budgetBucket,
  saveEstimateHandoff,
} from "@/lib/quote/handoff";

const PLATFORM_OPTIONS: { value: Platform; title: string; copy: string }[] = [
  {
    value: "wordpress",
    title: "WordPress website",
    copy:
      "You get hands-on control: add pages, rearrange sections, and edit content yourself anytime. More flexibility can mean slightly slower load times and a bit more upkeep, which ongoing maintenance covers.",
  },
  {
    value: "custom",
    title: "Custom-built website",
    copy:
      "Built specifically for speed and reliability, with a simple editor for text and images. Structural or layout changes go through me as your developer.",
  },
];

const DESIGN_OPTIONS: { value: boolean; title: string; copy: string }[] = [
  {
    value: true,
    title: "I need design work",
    copy: "I'll create design concepts for your site, with 3 rounds of revisions included, before the build begins.",
  },
  {
    value: false,
    title: "I'm working with a designer",
    copy: "Already have designs, or a designer lined up? I'll build directly from their files.",
  },
];

const FEATURE_OPTIONS: { value: Feature; label: string }[] = [
  { value: "form", label: "Contact / booking form" },
  { value: "blog", label: "Blog" },
  { value: "store", label: "Online store" },
  { value: "members", label: "Member / gated content" },
  { value: "languages", label: "Multiple languages" },
];

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const inputClass =
  "bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400";

function clampPages(raw: string): number {
  const n = Math.floor(Number(raw));
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, MAX_PAGES);
}

function OptionCard({
  name,
  title,
  copy,
  selected,
  onSelect,
}: {
  name: string;
  title: string;
  copy: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={cn(
        "panel brackets block cursor-pointer rounded-md p-5 transition-colors",
        selected ? "border-cyan-400 bg-cyan-500/5" : "hover:border-cyan-500/40"
      )}>
      <input type="radio" name={name} checked={selected} onChange={onSelect} className="sr-only peer" />
      <span className="flex items-center gap-3 mb-2 peer-focus-visible:underline">
        <span
          aria-hidden
          className={cn(
            "h-4 w-4 shrink-0 rounded-full border",
            selected ? "border-cyan-300 bg-cyan-400" : "border-cyan-500/50"
          )}
        />
        <span className="font-display text-base tracking-wide">{title}</span>
      </span>
      <span className="block text-sm text-slate-400">{copy}</span>
    </label>
  );
}

function buildMessage(input: QuoteInput, quote: QuoteResult): string {
  const platformTitle = PLATFORM_OPTIONS.find((o) => o.value === input.platform)!.title;
  const designTitle = DESIGN_OPTIONS.find((o) => o.value === input.needsDesign)!.title;
  const featureLabels = FEATURE_OPTIONS.filter((o) => input.features.includes(o.value)).map(
    (o) => o.label
  );
  const monthlyLines = quote.monthly.map((l) => `  - ${l.label}: ${usd.format(l.amount)}/mo`);

  return [
    "Hi! I used the website estimator. Here's what I'm looking for:",
    "",
    `Website type: ${platformTitle}`,
    `Design: ${designTitle}`,
    `Pages: ${input.pageCount}`,
    `Features: ${featureLabels.length ? featureLabels.join(", ") : "None"}`,
    "",
    `Estimated project total: ${usd.format(quote.projectTotal)}`,
    ...(input.needsDesign ? [`  - Design concepts: ${usd.format(quote.designFee)}`] : []),
    `  - Build: ${usd.format(quote.buildCost)}`,
    `Estimated monthly after launch: ${usd.format(quote.monthlyTotal)}/mo`,
    ...monthlyLines,
    "",
    "A bit more about my project:",
    "",
  ].join("\n");
}

export default function QuoteBuilder() {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [needsDesign, setNeedsDesign] = useState(true);
  const [pageInput, setPageInput] = useState("5");
  const [features, setFeatures] = useState<Feature[]>([]);
  const [analytics, setAnalytics] = useState(false);
  const [seo, setSeo] = useState(false);
  const [maintenanceHours, setMaintenanceHours] = useState<MaintenanceHours>(0);

  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const pageCount = clampPages(pageInput);
  const input: QuoteInput | null = platform
    ? { platform, needsDesign, pageCount, features, analytics, seo, maintenanceHours }
    : null;

  useEffect(() => {
    if (!platform) return;
    const body: QuoteInput = { platform, needsDesign, pageCount, features, analytics, seo, maintenanceHours };
    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Could not calculate an estimate");
        setQuote(await res.json());
        setError(undefined);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Error");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 150);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [platform, needsDesign, pageCount, features, analytics, seo, maintenanceHours]);

  function toggleFeature(f: Feature) {
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  }

  const canHandoff = input && quote && !loading && !error;

  function handleCtaClick() {
    if (!canHandoff) return;
    saveEstimateHandoff({
      message: buildMessage(input, quote),
      budget: budgetBucket(quote.projectTotal),
    });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start">
      <div className="space-y-10 min-w-0">
        <fieldset>
          <legend className="text-xs tracking-wider text-cyan-300 mb-4">
            1. WHAT KIND OF WEBSITE?
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {PLATFORM_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                name="platform"
                title={opt.title}
                copy={opt.copy}
                selected={platform === opt.value}
                onSelect={() => setPlatform(opt.value)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs tracking-wider text-cyan-300 mb-4">
            2. DO YOU NEED DESIGN WORK?
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {DESIGN_OPTIONS.map((opt) => (
              <OptionCard
                key={String(opt.value)}
                name="design"
                title={opt.title}
                copy={opt.copy}
                selected={needsDesign === opt.value}
                onSelect={() => setNeedsDesign(opt.value)}
              />
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2 max-w-xs">
          <label htmlFor="pageCount" className="text-xs tracking-wider text-cyan-300">
            3. HOW MANY PAGES?
          </label>
          <input
            id="pageCount"
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_PAGES}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onBlur={() => setPageInput(String(pageCount))}
            className={inputClass}
          />
        </div>

        <fieldset>
          <legend className="text-xs tracking-wider text-cyan-300 mb-4">4. FEATURES</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {FEATURE_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={features.includes(opt.value)}
                  onChange={() => toggleFeature(opt.value)}
                  className="h-4 w-4 accent-cyan-400"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-xs tracking-wider text-cyan-300 mb-4">5. ONGOING SUPPORT</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 accent-cyan-400"
              />
              Traffic &amp; visitor analytics
            </label>
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={seo}
                onChange={(e) => setSeo(e.target.checked)}
                className="h-4 w-4 accent-cyan-400"
              />
              Ongoing SEO updates
            </label>
          </div>
          <div className="flex flex-col gap-2 max-w-xs">
            <label htmlFor="maintenance" className="text-sm">
              Dedicated maintenance hours per month
            </label>
            <select
              id="maintenance"
              value={maintenanceHours}
              onChange={(e) => setMaintenanceHours(Number(e.target.value) as MaintenanceHours)}
              className={inputClass}>
              {MAINTENANCE_HOURS.map((h) => (
                <option key={h} value={h}>
                  {h === 0 ? "None" : `${h} hours`}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      </div>

      <aside className="lg:sticky lg:top-24 space-y-6 min-w-0" aria-live="polite">
        <div className={cn("panel brackets rounded-md p-6 space-y-6 transition-opacity", loading && quote && "opacity-60")}>
          <h2 className="text-xl">Your estimate</h2>

          {!platform ? (
            <p className="text-sm text-slate-400">
              Pick a website type to see your estimate.
            </p>
          ) : error ? (
            <p className="text-sm text-red-400">{error}. Please try again.</p>
          ) : !quote ? (
            <p className="text-sm text-slate-400">Calculating…</p>
          ) : (
            <>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  {needsDesign ? (
                    <>
                      <dt className="text-slate-300">Design concepts (3 rounds included)</dt>
                      <dd className="tabular-nums">{usd.format(quote.designFee)}</dd>
                    </>
                  ) : (
                    <>
                      <dt className="text-slate-300">Design</dt>
                      <dd className="text-slate-400">By your designer</dd>
                    </>
                  )}
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-300">Estimated build</dt>
                  <dd className="tabular-nums">{usd.format(quote.buildCost)}</dd>
                </div>
                <div className="flex justify-between gap-4 items-baseline pt-3 border-t border-cyan-500/20">
                  <dt className="font-semibold">Estimated project total</dt>
                  <dd className="text-2xl font-bold text-cyan-300 tabular-nums">
                    {usd.format(quote.projectTotal)}
                  </dd>
                </div>
              </dl>
              <p className="text-xs text-slate-400">
                All projects start at {usd.format(quote.projectMinimum)}. This is a starting
                estimate, your final quote is confirmed after a free onboarding call.
              </p>

              <div className="space-y-3 pt-4 border-t border-cyan-500/20">
                <h3 className="text-xs tracking-wider text-cyan-300 font-body">
                  ESTIMATED MONTHLY PACKAGE AFTER LAUNCH
                </h3>
                <dl className="space-y-2 text-sm">
                  {quote.monthly.map((line) => (
                    <div key={line.key} className="flex justify-between gap-4">
                      <dt className="text-slate-300">{line.label}</dt>
                      <dd className="tabular-nums">{usd.format(line.amount)}/mo</dd>
                    </div>
                  ))}
                  <div className="flex justify-between gap-4 pt-2 border-t border-cyan-500/10 font-semibold">
                    <dt>Monthly total</dt>
                    <dd className="tabular-nums">{usd.format(quote.monthlyTotal)}/mo</dd>
                  </div>
                </dl>
              </div>
            </>
          )}
        </div>

        <div className="space-y-2">
          <Link
            href={canHandoff ? `/contact?from=${ESTIMATE_HANDOFF_PARAM}` : "/contact"}
            onClick={handleCtaClick}
            className="btn w-full justify-center">
            Book your free onboarding call
          </Link>
          {canHandoff && (
            <p className="text-xs text-slate-500 text-center">
              Your estimate will be added to the contact form.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
