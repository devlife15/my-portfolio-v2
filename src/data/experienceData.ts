interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  isCurrent: boolean;
  description: string[];
  tags: string[];
}

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "freelance",
    company: "Freelance Client",
    role: "Full Stack Developer",
    period: "Nov 2025 - Present",
    isCurrent: true,
    description: [
      "Architected dual-system solution (HRMS & SCM) using Next.js/Node.",
      "Designed scalable PostgreSQL schema for inventory tracking.",
      "Deployed AWS/Docker infrastructure for CI/CD pipelines.",
    ],
    tags: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "jpmc",
    company: "JPMorgan Chase & Co.",
    role: "Software Engineer I",
    period: "Future",
    isCurrent: false,
    description: [
      "Contributing to the core platform team optimization efforts.",
      "Targeting 40% improvement in API response times.",
    ],
    tags: ["React", "Go", "Kubernetes", "Spring"],
  },
];
