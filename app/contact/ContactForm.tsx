"use client";
import { useState, useEffect, useRef } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [attribution, setAttribution] = useState<{ utm_source?: string; utm_medium?: string; utm_campaign?: string; referrer?: string; landing_path?: string; raw_query?: string }>({});
  const captured = useRef(false);
  useEffect(() => {
    if (captured.current) return; // only run once on mount
    captured.current = true;
    try {
      const url = new URL(window.location.href);
      const params = url.searchParams;
      const utm_source = params.get('utm_source') || undefined;
      const utm_medium = params.get('utm_medium') || undefined;
      const utm_campaign = params.get('utm_campaign') || undefined;
      const raw_query = url.search || undefined;
      const landing_path = url.pathname;
      const referrer = document.referrer || undefined;
      setAttribution({ utm_source, utm_medium, utm_campaign, raw_query, landing_path, referrer });
    } catch {}
  }, []);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(undefined);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
  type Payload = Record<string, FormDataEntryValue | string | undefined>;
  const payload: Payload = { ...Object.fromEntries(formData.entries()), ...attribution };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
      setSent(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }
  if (sent)
    return (
      <div className="panel p-6 rounded-md text-sm text-cyan-300" role="status">
        Message transmitted. We&apos;ll respond shortly.
      </div>
    );
  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}
      aria-describedby="privacy-note"
      noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-xs tracking-wider text-cyan-300">
            NAME<span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-xs tracking-wider text-cyan-300">
            EMAIL<span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="text-xs tracking-wider text-cyan-300">
            PHONE
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="company"
            className="text-xs tracking-wider text-cyan-300">
            COMPANY
          </label>
          <input
            id="company"
            name="company"
            className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="budget"
          className="text-xs tracking-wider text-cyan-300">
          BUDGET
        </label>
        <select
          id="budget"
          name="budget"
          className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <option value="<2k">Under 2k</option>
          <option value="<2-5k">2-5k</option>
          <option value="<5-10k">5-10k</option>
          <option value="10-25k">10–25k</option>
          <option value="25-50k">25–50k</option>
          <option value=">50k">50k+</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-xs tracking-wider text-cyan-300">
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="btn disabled:opacity-50 cursor-pointer"
        disabled={loading}>
        {loading ? "Transmitting…" : "Transmit"}
      </button>
      <p id="privacy-note" className="text-[11px] text-slate-500">
        We store your submission solely for direct correspondence.
      </p>
    </form>
  );
}
