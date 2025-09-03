export type Project = {
  slug: string;
  title: string;
  role: string[];
  year: number;
  category: "Web Development" | "Design" | "Consulting" | "Full-Stack";
  tags: string[];
  summary: string;
  coverImage: string;
  siteUrl?: string;
  images?: string[];
  caseStudy?: {
    problem: string;
    approach: string;
    outcome: string;
  };
  plugins?: {
    name: string;
    url: string; // Full (affiliate) URL
    description?: string; // Optional note
  }[];
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
    summary:
      "Develop a responsive website for Vantage Homes Colorado, a semi-custom home builder.",
    coverImage: "/vhco/vhco-cover.webp",
    images: [
      "/placeholders/ghost-signal-1.jpg",
      "/placeholders/ghost-signal-2.jpg",
    ],
    caseStudy: {
      problem: `Vantage Homes’ legacy website was built with an older Beaver Builder workflow and had become slow, fragile, and expensive to maintain. Heavy page markup, duplicated layout code, and unoptimized media were harming page performance and mobile experience. Inconsistent SEO markup and missing structured data reduced organic visibility, and the cumbersome editing workflow required developer support for routine updates—limiting the marketing team's ability to publish new listings and driving fewer qualified enquiries for new developments.`,
      approach: `I performed a platform migration and rebuild focused on speed, SEO, and editorial control. The site was rebuilt on WordPress using the Oxygen visual builder to produce lean, semantic HTML and server-friendly templates. Core steps included:
- Audit and migration planning to preserve SEO equity and set up 301 redirects for existing URLs.
- Rebuild of theme templates in Oxygen with componentized, accessible markup and mobile-first styling to reduce DOM size and CSS bloat.
- Image optimization and responsive srcsets, modern lazy-loading, and careful sizing to cut bytes on mobile.
- Server and cache tuning, inlining critical CSS, and aggressive asset minification to reduce render-blocking resources.
- Addition of structured data (Organization, Breadcrumbs, and property-related schema where applicable) and on-page SEO optimization targeting local home-builder intent and high-value keywords.`,
      outcome: `The rebuild delivered a high-performing, SEO-friendly home builder website that is easier to maintain and faster for users. Highlights:
- Faster page loads and improved Core Web Vitals (LCP, INP, CLS) on both mobile and desktop.
- Cleaner semantic markup and schema improved indexability and enabled richer search snippets.
- Reduced maintenance time and lower resource usage due to lean templates and caching strategies.
- Empowered content editors with a simplified Oxygen workflow, shortening the time to publish new developments.
- Better user experience supporting higher engagement and stronger lead capture.`,
    },
    plugins: [
      {
        name: "Oxygen Builder",
        url: "https://oxygenbuilder.com",
        description: "The most dev-friendly visual website builder",
      },
      {
        name: "Gravity Forms",
        url: "https://gravityforms.com",
        description: "Incredibly robust form builder",
      },
      {
        name: "Gravity Wiz",
        url: "https://gravitywiz.com",
        description:
          "The ultimate enhancement toolkit for Gravity Forms. Bar none.",
      },
      {
        name: "Advanced Custom Fields Pro",
        url: "https://www.advancedcustomfields.com/pro/",
        description:
          "Allowing for population of dynamic data and custom fields",
      },
      {
        name: "Kinsta",
        url: "https://kinsta.com",
        description:
          "Premium managed WordPress hosting with a focus on performance and my only choice for hosting.",
      },
    ],
  },
  {
    slug: "promeniq",
    title: "Promeniq Men's Health Website",
    siteUrl: "https://www.promeniq.com",
    role: ["Development", "Design"],
    year: 2024,
    category: "Web Development",
    tags: ["WordPress", "Oxygen Builder", "Advanced Custom Fields"],
    summary:
      "Develop a responsive and performant website for Promeniq, a national men's sexual health provider.",
    coverImage: "/promeniq/promeniq.webp",
    images: [
      "/placeholders/ghost-signal-1.jpg",
      "/placeholders/ghost-signal-2.jpg",
    ],
    caseStudy: {
      problem: `Promeniq is a national men's sexual health provider looking to improve its online presence and user experience. As a newly formed company, they needed a website that effectively represented the brand's voice and values. In addition, it needed to be user-friendly and informative, helping potential clients understand their services and make appointments with their local affiliate practice easily.`,
      approach: `The client needed to be able to quickly scale portions of the website when new affiliate practices joined. To achieve this, I implemented a modular design system using WordPress and the Oxygen Builder. This approach allowed for easy duplication and customization of templates for each new affiliate, ensuring a consistent brand experience while minimizing development time. This website was also to act as a template for the new affiliate practices, so I needed to make sure it was easily adaptable and maintainable.`,
      outcome: `The final website delivered a modern, responsive design that effectively communicated Promeniq's brand values and services. Key outcomes included:
- A user-friendly interface that simplified navigation and appointment scheduling for potential clients.
- A modular template system that allowed for quick scaling and customization as new affiliate practices joined.
- Improved SEO performance, increasing organic visibility and attracting more qualified leads.`,
    },
    plugins: [
      {
        name: "Oxygen Builder",
        url: "https://oxygenbuilder.com",
        description: "The most dev-friendly visual website builder",
      },
      {
        name: "Gravity Forms",
        url: "https://gravityforms.com",
        description: "Incredibly robust form builder",
      },
      {
        name: "Gravity Wiz",
        url: "https://gravitywiz.com",
        description:
          "The ultimate enhancement toolkit for Gravity Forms. Bar none.",
      },
      {
        name: "Advanced Custom Fields Pro",
        url: "https://www.advancedcustomfields.com/pro/",
        description:
          "Allowing for population of dynamic data and custom fields",
      },
      {
        name: "Kinsta",
        url: "https://kinsta.com",
        description:
          "Premium managed WordPress hosting with a focus on performance and my only choice for hosting.",
      },
    ],
  },
  {
    slug: "fyxon",
    title: "Fyxon Construction and Restoration Website",
    siteUrl: "https://www.fyxon.com",
    role: ["Development", "Design"],
    year: 2024,
    category: "Web Development",
    tags: ["WordPress", "Oxygen Builder", "Advanced Custom Fields"],
    summary:
      "Develop a responsive and performant website for Fyxon, a Colorado Springs construction and restoration company.",
    coverImage: "/fyxon/fyxon.webp",
    images: [
      "/placeholders/ghost-signal-1.jpg",
      "/placeholders/ghost-signal-2.jpg",
    ],
    caseStudy: {
      problem: `Fyxon is a construction and restoration company looking to improve its online presence and user experience. As a newly formed company, they needed a website that effectively represented the services provided. Because they provide disaster recovery and 24/7 services, a potential customer needed to be able to contact them quickly in a time of crisis.`,
      approach: `To address these needs, I focused on creating a streamlined user experience that prioritized easy access to critical information and contact options. This included implementing a clear navigation structure, prominent call-to-action buttons, and a responsive design that worked well on all devices. Additionally, I utilized WordPress with the Oxygen Builder to create a flexible and maintainable site structure that could be easily updated as the company grew.`,
      outcome: `The final website delivered a modern, responsive design that effectively communicated Fyxon's brand values and services. Key outcomes included:
- A user-friendly interface that simplified navigation and removed friction from the contact process.
- A modular template system that allowed for quick scaling and customization as new services were added.
- Improved SEO performance, increasing organic visibility.`,
    },
    plugins: [
      {
        name: "Oxygen Builder",
        url: "https://oxygenbuilder.com",
        description: "The most dev-friendly visual website builder",
      },
      {
        name: "Gravity Forms",
        url: "https://gravityforms.com",
        description: "Incredibly robust form builder",
      },
      {
        name: "Gravity Wiz",
        url: "https://gravitywiz.com",
        description:
          "The ultimate enhancement toolkit for Gravity Forms. Bar none.",
      },
      {
        name: "Advanced Custom Fields Pro",
        url: "https://www.advancedcustomfields.com/pro/",
        description:
          "Allowing for population of dynamic data and custom fields",
      },
      {
        name: "Kinsta",
        url: "https://kinsta.com",
        description:
          "Premium managed WordPress hosting with a focus on performance and my only choice for hosting.",
      },
    ],
  },
];
