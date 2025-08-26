import CodecLine from "@/app/components/CodecLine";

export default function SectionHeader({ label, title, intro }:{ label:string; title:string; intro?:string }){
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-3">
        <span className="text-cyan-300 text-[10px] tracking-[0.25em] font-medium">{label.toUpperCase()}</span>
        <CodecLine className="flex-1" />
      </div>
      <h2 className="font-display tracking-wide">{title}</h2>
      {intro && <p className="max-w-prose text-slate-400 mt-2 text-sm">{intro}</p>}
    </div>
  );
}
