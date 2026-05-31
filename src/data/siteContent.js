import { createArtwork } from "./helpers.js";

export const siteContentDefaults = {
  navigation: {
    brandName: "Harshal Pimpare",
    brandTag: "Futuristic portfolio",
  },
  softwareHero: {
    badge: "Full Stack Developer & Creative Technologist",
    modeLabel: "SOFTWARE MODE",
    name: "Harshal Pimpare",
    phrases: [
      "I build clean interfaces that feel fast, premium, and intentional.",
      "I enjoy turning ideas into products people can actually use.",
      "I like balancing code, motion, and visuals in one smooth experience.",
    ],
    stats: [
      { value: "10+", label: "Projects built" },
      { value: "4", label: "Core stacks" },
      { value: "100%", label: "Design focused" },
    ],
    liveStackTitle: "Code. Motion. Clarity.",
    liveStackStatus: "ACTIVE",
    stackItems: [
      { label: "Frontend", value: "React + Tailwind" },
      { label: "Motion", value: "Framer Motion" },
      { label: "Backend", value: "Node + Firebase" },
      { label: "UI Thinking", value: "Design systems" },
    ],
    summary:
      "Premium dark interfaces, reusable systems, and smooth transitions are the core of this build.",
  },
  creativeHero: {
    badge: "Creative Editor & Designer",
    modeLabel: "CREATIVE MODE",
    title: "Visual Stories",
    accentTitle: "That Move People",
    phrases: [
      "I edit stories into motion that feels premium and memorable.",
      "I design visuals that are bold, clean, and built for attention.",
      "I love mixing rhythm, typography, and motion into one visual style.",
    ],
    stats: [
      { value: "60fps", label: "Motion feel" },
      { value: "6", label: "Creative tools" },
      { value: "1 vibe", label: "Premium aesthetic" },
    ],
    creativeStackTitle: "Edit. Design. Deliver.",
    creativeStackStatus: "ACTIVE",
    stackItems: [
      { label: "Reels", value: "Fast hook edits" },
      { label: "Motion", value: "Animated stories" },
      { label: "Design", value: "Brand visuals" },
      { label: "Delivery", value: "Platform ready" },
    ],
    summary:
      "Built for clients who want work that feels cinematic, modern, and scroll-stopping.",
  },
  sectionHeadings: {
    skills: {
      eyebrow: "Software Section",
      title: "Skills",
      description:
        "Modern fundamentals presented as compact cards that are easy to scan, reuse, and expand later.",
    },
    projects: {
      eyebrow: "Software Section",
      title: "Projects",
      description:
        "Dynamic showcase cards with preview art, tech badges, and quick links to live demos and code.",
    },
    education: {
      eyebrow: "Software Section",
      title: "Education Timeline",
      description:
        "A vertical timeline keeps the layout compact and easy to follow on every screen size.",
    },
    resume: {
      eyebrow: "Software Section",
      title: "Resume",
      description: "A minimal glass card keeps the download action visible without adding clutter.",
    },
    contact: {
      eyebrow: "Software Section",
      title: "Contact",
      description:
        "A simple contact area with direct links and a loading submit state for a polished feel.",
    },
    videos: {
      eyebrow: "Creative Section",
      title: "Video Editing Showcase",
      description:
        "Reel-style cards with motion overlays and hover play feedback to keep the gallery feeling alive.",
    },
    designs: {
      eyebrow: "Creative Section",
      title: "Design Showcase",
      description:
        "A responsive masonry gallery that feels fast to scan and easy to expand later with real client work.",
    },
    creativeSkills: {
      eyebrow: "Creative Section",
      title: "Creative Skills",
      description: "Stylish cards that keep the tooling list readable while still feeling premium.",
    },
    collaboration: {
      eyebrow: "Collaboration CTA",
      title: "Need Editing or Design Work?",
      description:
        "This section is built to feel like a polished end cap, with a strong headline and one clear action.",
    },
  },
  softwareSkills: [
    { label: "HTML", icon: "code", note: "Semantic structure" },
    { label: "CSS", icon: "animation", note: "Modern layouts" },
    { label: "JavaScript", icon: "javascript", note: "Interactive logic" },
    { label: "React", icon: "components", note: "Component systems" },
    { label: "Tailwind CSS", icon: "design_services", note: "Utility styling" },
    { label: "Firebase", icon: "database", note: "Auth & backend" },
    { label: "Node.js", icon: "dns", note: "Server-side tools" },
    { label: "GitHub", icon: "fork_right", note: "Version control" },
    { label: "AI Tools", icon: "smart_toy", note: "Creative acceleration" },
    { label: "UI/UX", icon: "interactive_space", note: "Product thinking" },
  ],
  creativeSkills: [
    { label: "Premiere Pro", icon: "movie", note: "Video editing" },
    { label: "After Effects", icon: "stars", note: "Motion graphics" },
    { label: "Photoshop", icon: "image", note: "Visual composition" },
    { label: "Figma", icon: "design_services", note: "UI systems" },
    { label: "CapCut", icon: "cut", note: "Fast social edits" },
    { label: "Canva", icon: "palette", note: "Marketing visuals" },
  ],
  projects: [
    {
      title: "TMV ERP System",
      description:
        "Role-based college ERP with admin, staff, and student workflows for attendance, results, fees, and notifications.",
      tech: ["Django", "SQLite", "HTML", "CSS", "JavaScript"],
      live: "https://example.com",
      github: "https://github.com/HarshalPimpare23/Collage-ERP-System",
      artwork: {
        title: "ERP SYSTEM",
        subtitle: "College administration platform",
        start: "#8b5cf6",
        end: "#22d3ee",
        glow: "#a855f7",
      },
    },
    {
      title: "Task Tracking System",
      description:
        "A focused productivity concept built for tracking everyday tasks, habits, and progress from mobile-first layouts.",
      tech: ["React", "Tailwind CSS", "API", "UI Design"],
      live: "https://example.com",
      github: "https://github.com/HarshalPimpare23",
      artwork: {
        title: "TASK TRACKER",
        subtitle: "Productivity dashboard concept",
        start: "#0ea5e9",
        end: "#8b5cf6",
        glow: "#22d3ee",
      },
    },
    {
      title: "Portfolio UI System",
      description:
        "A premium visual system for portfolio pages, built around reusable sections, gradients, and glassmorphism panels.",
      tech: ["React", "Framer Motion", "Tailwind", "Responsive"],
      live: "https://example.com",
      github: "https://github.com/HarshalPimpare23",
      artwork: {
        title: "PORTFOLIO UI",
        subtitle: "Motion-first design system",
        start: "#f472b6",
        end: "#22d3ee",
        glow: "#ffffff",
      },
    },
    {
      title: "Creative Dashboard",
      description:
        "A concept dashboard that blends analytics, onboarding, and visual storytelling into one clean experience.",
      tech: ["UI/UX", "Figma", "Motion", "Design Systems"],
      live: "https://example.com",
      github: "https://github.com/HarshalPimpare23",
      artwork: {
        title: "CREATIVE DASH",
        subtitle: "Visual analytics interface",
        start: "#14b8a6",
        end: "#7c3aed",
        glow: "#22d3ee",
      },
    },
  ],
  designs: [
    {
      title: "Poster Series",
      category: "Posters",
      artwork: {
        title: "POSTER",
        subtitle: "Event identity poster",
        start: "#f59e0b",
        end: "#ec4899",
        glow: "#ffffff",
      },
    },
    {
      title: "Thumbnail Pack",
      category: "Thumbnails",
      artwork: {
        title: "THUMBNAIL",
        subtitle: "Click-worthy layout",
        start: "#8b5cf6",
        end: "#0ea5e9",
        glow: "#22d3ee",
      },
    },
    {
      title: "App UI Concept",
      category: "UI Designs",
      artwork: {
        title: "UI CONCEPT",
        subtitle: "Product interface design",
        start: "#14b8a6",
        end: "#6366f1",
        glow: "#ffffff",
      },
    },
    {
      title: "Social Ad",
      category: "Social Media",
      artwork: {
        title: "SOCIAL AD",
        subtitle: "Scroll-stopping layout",
        start: "#ec4899",
        end: "#8b5cf6",
        glow: "#ffffff",
      },
    },
    {
      title: "Brand Banner",
      category: "Banners",
      artwork: {
        title: "BANNER",
        subtitle: "Hero marketing strip",
        start: "#0ea5e9",
        end: "#22c55e",
        glow: "#ffffff",
      },
    },
    {
      title: "Promo Card",
      category: "Graphics",
      artwork: {
        title: "PROMO CARD",
        subtitle: "Premium product visual",
        start: "#a855f7",
        end: "#22d3ee",
        glow: "#f5f3ff",
      },
    },
  ],
  videos: [
    {
      title: "Neon Reel Campaign",
      category: "Reels",
      duration: "0:22",
      artwork: {
        title: "NEON REEL",
        subtitle: "Short-form campaign edit",
        start: "#f43f5e",
        end: "#8b5cf6",
        glow: "#ffffff",
      },
    },
    {
      title: "Launch Motion Pack",
      category: "Motion Graphics",
      duration: "0:38",
      artwork: {
        title: "MOTION PACK",
        subtitle: "Animated title sequence",
        start: "#22d3ee",
        end: "#0ea5e9",
        glow: "#67e8f9",
      },
    },
    {
      title: "YouTube Story Edit",
      category: "YouTube Edits",
      duration: "1:04",
      artwork: {
        title: "YOUTUBE CUT",
        subtitle: "Story-driven edit",
        start: "#8b5cf6",
        end: "#ec4899",
        glow: "#f0abfc",
      },
    },
    {
      title: "Cinematic Travel",
      category: "Cinematic Videos",
      duration: "1:22",
      artwork: {
        title: "CINEMATIC",
        subtitle: "Moody travel reel",
        start: "#14b8a6",
        end: "#a855f7",
        glow: "#ffffff",
      },
    },
  ],
  education: [
    {
      school: "Modern College of Arts, Science and Commerce",
      degree: "MCA - Computer Applications",
      year: "2023 - 2025",
      description:
        "Focused on full-stack development, UI/UX thinking, and practical product building with modern web tools.",
    },
    {
      school: "B. N. Bandodkar College",
      degree: "BSc - Information Technology",
      year: "2020 - 2023",
      description:
        "Built a foundation in programming, database concepts, and software engineering workflows.",
    },
    {
      school: "Higher Secondary School",
      degree: "Science Stream",
      year: "2018 - 2020",
      description:
        "Developed problem-solving discipline and a strong interest in digital systems and design.",
    },
  ],
  contactLinks: [
    {
      label: "Email",
      value: "harshalpimpare99@gmail.com",
      href: "mailto:harshalpimpare99@gmail.com",
      icon: "mail",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/harshalpimpare",
      href: "https://linkedin.com/in/harshalpimpare",
      icon: "link",
    },
    {
      label: "GitHub",
      value: "github.com/HarshalPimpare23",
      href: "https://github.com/HarshalPimpare23",
      icon: "code",
    },
  ],
  collaboration: {
    eyebrow: "Collaboration CTA",
    title: "Need Editing or Design Work?",
    description:
      "This section is built to feel like a polished end cap, with a strong headline and one clear action.",
    buttonLabel: "Let's Work Together",
  },
  resume: {
    eyebrow: "Software Section",
    title: "Resume",
    description: "A minimal glass card keeps the download action visible without adding clutter.",
    cardEyebrow: "Download-ready",
    cardTitle: "Professional resume download card",
    cardDescription:
      "Replace the generated placeholder file with your final PDF whenever you are ready. The UI and download flow are already in place.",
    buttonLabel: "Download Resume",
  },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeObject(base, override) {
  return {
    ...clone(base),
    ...(override && typeof override === "object" && !Array.isArray(override) ? override : {}),
  };
}

function mergeArray(base, override) {
  return Array.isArray(override) ? override : clone(base);
}

export function normalizeSiteContent(input = {}) {
  const content = clone(siteContentDefaults);

  content.navigation = mergeObject(siteContentDefaults.navigation, input.navigation);

  content.softwareHero = {
    ...mergeObject(siteContentDefaults.softwareHero, input.softwareHero),
    phrases: mergeArray(siteContentDefaults.softwareHero.phrases, input.softwareHero?.phrases),
    stats: mergeArray(siteContentDefaults.softwareHero.stats, input.softwareHero?.stats),
    stackItems: mergeArray(siteContentDefaults.softwareHero.stackItems, input.softwareHero?.stackItems),
  };

  content.creativeHero = {
    ...mergeObject(siteContentDefaults.creativeHero, input.creativeHero),
    phrases: mergeArray(siteContentDefaults.creativeHero.phrases, input.creativeHero?.phrases),
    stats: mergeArray(siteContentDefaults.creativeHero.stats, input.creativeHero?.stats),
    stackItems: mergeArray(siteContentDefaults.creativeHero.stackItems, input.creativeHero?.stackItems),
  };

  content.sectionHeadings = {
    skills: mergeObject(siteContentDefaults.sectionHeadings.skills, input.sectionHeadings?.skills),
    projects: mergeObject(siteContentDefaults.sectionHeadings.projects, input.sectionHeadings?.projects),
    education: mergeObject(siteContentDefaults.sectionHeadings.education, input.sectionHeadings?.education),
    resume: mergeObject(siteContentDefaults.sectionHeadings.resume, input.sectionHeadings?.resume),
    contact: mergeObject(siteContentDefaults.sectionHeadings.contact, input.sectionHeadings?.contact),
    videos: mergeObject(siteContentDefaults.sectionHeadings.videos, input.sectionHeadings?.videos),
    designs: mergeObject(siteContentDefaults.sectionHeadings.designs, input.sectionHeadings?.designs),
    creativeSkills: mergeObject(
      siteContentDefaults.sectionHeadings.creativeSkills,
      input.sectionHeadings?.creativeSkills
    ),
    collaboration: mergeObject(
      siteContentDefaults.sectionHeadings.collaboration,
      input.sectionHeadings?.collaboration
    ),
  };

  content.softwareSkills = mergeArray(siteContentDefaults.softwareSkills, input.softwareSkills);
  content.creativeSkills = mergeArray(siteContentDefaults.creativeSkills, input.creativeSkills);
  content.projects = mergeArray(siteContentDefaults.projects, input.projects);
  content.designs = mergeArray(siteContentDefaults.designs, input.designs);
  content.videos = mergeArray(siteContentDefaults.videos, input.videos);
  content.education = mergeArray(siteContentDefaults.education, input.education);
  content.contactLinks = mergeArray(siteContentDefaults.contactLinks, input.contactLinks);
  content.collaboration = mergeObject(siteContentDefaults.collaboration, input.collaboration);
  content.resume = mergeObject(siteContentDefaults.resume, input.resume);

  return content;
}

export function artworkToImage(artwork) {
  return createArtwork(artwork);
}
