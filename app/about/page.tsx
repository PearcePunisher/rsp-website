export const metadata = { title: "About" };

export default function AboutPage(){
  return (
    <div className="container-max py-16 space-y-10">
      <header className="max-w-3xl space-y-4">
        <h1 className="font-display tracking-wide">About</h1>
        <p className="text-slate-400 text-sm">Rogue Salad Productions focuses on tactical minimalism: eliminating ornamental noise while preserving emotional clarity.</p>
      </header>
      <blockquote className="panel rounded-md p-6 text-slate-300 text-sm leading-relaxed italic border-cyan-500/30 relative">
        <p>&quot;Every frame must earn its bandwidth. We cut away friction until only signal remains.&quot;</p>
      </blockquote>
      <section>
        <h2 className="text-cyan-300 font-display text-sm tracking-widest mb-3">SKILLS</h2>
        <ul className="grid sm:grid-cols-3 gap-3 text-xs tracking-wide">
          {['Direction','Editing','Color','Motion Design','FUI','Compositing','Brand Systems','Cinematography'].map(skill => <li key={skill} className="panel p-2 rounded-sm text-center">{skill}</li>)}
        </ul>
      </section>
      <div>
        <a href="/resume.pdf" className="btn" download>Download Resume</a>
      </div>
    </div>
  );
}
