"use client";
import { useState } from "react";

export default function ContactForm(){
  const [sent,setSent] = useState(false);
  if(sent) return <div className="panel p-6 rounded-md text-sm text-cyan-300" role="status">Message transmitted. We&apos;ll respond shortly.</div>;
  return (
    <form className="space-y-6" onSubmit={e => { e.preventDefault(); setSent(true); }} aria-describedby="privacy-note">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs tracking-wider text-cyan-300">NAME</label>
          <input id="name" name="name" required className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs tracking-wider text-cyan-300">EMAIL</label>
          <input id="email" name="email" type="email" required className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="company" className="text-xs tracking-wider text-cyan-300">COMPANY</label>
        <input id="company" name="company" className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="budget" className="text-xs tracking-wider text-cyan-300">BUDGET</label>
        <select id="budget" name="budget" className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <option value="<10k">Under 10k</option>
          <option value="10-25k">10–25k</option>
          <option value="25-50k">25–50k</option>
          <option value=">50k">50k+</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs tracking-wider text-cyan-300">MESSAGE</label>
        <textarea id="message" name="message" required rows={6} className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
      </div>
      <button type="submit" className="btn">Transmit</button>
      <p id="privacy-note" className="text-[11px] text-slate-500">We store your submission solely for direct correspondence.</p>
    </form>
  );
}
