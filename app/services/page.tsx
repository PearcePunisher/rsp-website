export const metadata = { title: "Services" };

const services = [
  { title: 'Filmmaking', deliverables: ['Concept & treatment','Production','Cinematography','Color'], timeline:'2–8 weeks typical'},
  { title: 'Editing', deliverables: ['Narrative assembly','Rhythm refinement','Sound polish','Versioning'], timeline:'1–4 weeks typical'},
  { title: 'Motion Graphics', deliverables: ['Design frames','Styleframes','Animation','Compositing'], timeline:'2–6 weeks typical'},
  { title: 'Branding', deliverables: ['Identity refinement','Motion system','Toolkit'], timeline:'3–10 weeks typical'},
];

export default function ServicesPage(){
  return (
    <div className="container-max py-16 space-y-16">
      <header className="space-y-2 max-w-3xl">
        <h1 className="font-display tracking-wide">Services</h1>
        <p className="text-slate-400 text-sm">Engagements calibrated for clarity, control, and measurable outcomes.</p>
      </header>
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {services.map(s => (
          <div key={s.title} className="panel rounded-md p-6 brackets">
            <h2 className="font-display text-cyan-300 tracking-wide mb-3">{s.title}</h2>
            <ul className="text-xs text-slate-300 space-y-1 mb-4">
              {s.deliverables.map(d => <li key={d}>{d}</li>)}
            </ul>
            <p className="text-[11px] tracking-wider text-cyan-300/70">{s.timeline}</p>
          </div>
        ))}
      </div>
      <section className="panel rounded-md p-10 text-center space-y-4">
        <h2 className="font-display tracking-wide text-lg">Have a mission in mind?</h2>
        <a href="/contact" className="btn">Let&apos;s talk</a>
      </section>
    </div>
  );
}
