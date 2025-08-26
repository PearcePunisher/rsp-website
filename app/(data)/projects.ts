export type Project = {
  slug: string;
  title: string;
  role: string[];
  year: number;
  category: "Web Development" | "Design" | "Consulting" | "Full-Stack";
  tags: string[];
  summary: string;
  coverImage: string; // public path placeholder
  siteUrl?: string; // Link to website
  images?: string[];
  caseStudy?: {
    problem: string;
    approach: string;
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    slug: "vantage-homes",
    title: "Vantage Homes Colorado Website",
    siteUrl: "https://www.vantagehomescolorado.com",
    role: ["Development", "Design"],
    year: 2024,
    category: "Web Development",
    tags: ["WordPress", "Oxygen Builder"],
    summary: "Develop a responsive website for Vantage Homes Colorado, a semi-custom home builder.",
    coverImage: "/vhco/vhco-cover.webp",
    images: ["/placeholders/ghost-signal-1.jpg", "/placeholders/ghost-signal-2.jpg"],
    caseStudy: {
      problem: "Client needed an evocative opener to establish tactical suspense without cliche.",
      approach: "Designed a layered signal interference motif and subtle cyan scanlines referencing hardware diagnostics.",
      outcome: "Sequence increased early viewer retention by 34% in A/B test.",
    },
  },

];
