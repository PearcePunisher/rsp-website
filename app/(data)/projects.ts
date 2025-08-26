export type Project = {
  slug: string;
  title: string;
  role: string[];
  year: number;
  category: "Filmmaking" | "Editing" | "Motion" | "Branding";
  tags: string[];
  summary: string;
  coverImage: string; // public path placeholder
  videoUrl?: string; // Vimeo or MP4
  images?: string[];
  caseStudy?: {
    problem: string;
    approach: string;
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    slug: "ghost-signal",
    title: "Ghost Signal Title Sequence",
    role: ["Direction", "Editing"],
    year: 2024,
    category: "Filmmaking",
    tags: ["Title Design", "Cinematic", "3D"],
    summary: "Atmospheric opener blending macro texture passes and stealth UI motifs.",
    coverImage: "/placeholders/ghost-signal-cover.jpg",
    videoUrl: "https://example.com/video1.mp4",
    images: ["/placeholders/ghost-signal-1.jpg", "/placeholders/ghost-signal-2.jpg"],
    caseStudy: {
      problem: "Client needed an evocative opener to establish tactical suspense without cliche.",
      approach: "Designed a layered signal interference motif and subtle cyan scanlines referencing hardware diagnostics.",
      outcome: "Sequence increased early viewer retention by 34% in A/B test.",
    },
  },
  {
    slug: "silent-approach",
    title: "Silent Approach Teaser",
    role: ["Cinematography", "Color"],
    year: 2025,
    category: "Filmmaking",
    tags: ["Teaser", "Grading"],
    summary: "Minimalist teaser emphasizing negative space and encoded mission text.",
    coverImage: "/placeholders/silent-approach-cover.jpg",
    images: ["/placeholders/silent-approach-1.jpg"],
  },
  {
    slug: "codec-interface-explainer",
    title: "Codec Interface Explainer",
    role: ["Design", "Motion"],
    year: 2025,
    category: "Motion",
    tags: ["UI", "Explainer", "FUI"],
    summary: "Motion graphic breaking down a fictional secure comms protocol.",
    coverImage: "/placeholders/codec-explainer-cover.jpg",
    videoUrl: "https://example.com/video2.mp4",
  },
  {
    slug: "ops-brand-refresh",
    title: "OPS Brand Refresh",
    role: ["Design", "Art Direction"],
    year: 2024,
    category: "Branding",
    tags: ["Identity", "System"],
    summary: "Monospace influenced typographic system and restrained color palette.",
    coverImage: "/placeholders/ops-refresh-cover.jpg",
  },
  {
    slug: "cutting-room-toolkit",
    title: "Cutting Room Toolkit Promo",
    role: ["Editing", "Motion"],
    year: 2023,
    category: "Editing",
    tags: ["Promo", "Toolkit"],
    summary: "Fast-cut showcase highlighting accelerated workflow features.",
    coverImage: "/placeholders/cutting-room-cover.jpg",
  },
  {
    slug: "signal-handoff",
    title: "Signal Handoff Micro-ID",
    role: ["Design", "Animation"],
    year: 2025,
    category: "Motion",
    tags: ["Micro-ID", "Loop"],
    summary: "Looping ident with phased cyan pulses and encoded brackets.",
    coverImage: "/placeholders/signal-handoff-cover.jpg",
  },
  {
    slug: "stealth-packshots",
    title: "Stealth Packshots Series",
    role: ["Cinematography", "Editing"],
    year: 2023,
    category: "Filmmaking",
    tags: ["Product", "Macro"],
    summary: "Series of product packshots with dimensional beam sweeps.",
    coverImage: "/placeholders/stealth-packshots-cover.jpg",
  },
  {
    slug: "mission-debrief-template",
    title: "Mission Debrief Template",
    role: ["Design"],
    year: 2024,
    category: "Branding",
    tags: ["Template", "System"],
    summary: "Flexible slide framework styled like an encrypted briefing.",
    coverImage: "/placeholders/mission-debrief-cover.jpg",
  },
];
