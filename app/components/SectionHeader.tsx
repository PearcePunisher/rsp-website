import { DrawLine, Reveal } from "@/app/components/Reveal";

// Eyebrow `label` is optional and rationed: max 1 per 3 sections on a page.
export default function SectionHeader({
  id,
  label,
  title,
  intro,
}: {
  id?: string;
  label?: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="mb-10">
      <div className="flex items-center gap-4 mb-3">
        {label && (
          <span className="text-cyan-300 text-xs tracking-[0.25em] font-medium">
            {label.toUpperCase()}
          </span>
        )}
        <DrawLine className="flex-1" />
      </div>
      <h2 id={id} className="font-display tracking-wide">
        {title}
      </h2>
      {intro && <p className="max-w-prose text-slate-400 mt-2 text-sm">{intro}</p>}
    </Reveal>
  );
}
