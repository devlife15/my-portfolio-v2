import { useState } from "react";
import { FiArrowUpRight, FiBriefcase, FiCalendar } from "react-icons/fi";

const WORK_DATA = [
  {
    id: 1,
    company: "Freelance Client",
    role: "Full Stack Developer",
    period: "Nov 2025 - Present",
    description: [
      "Architecting a dual-system solution (HRMS & SCM) for a water plant business using Next.js and Node.js.",
      "Designing a scalable PostgreSQL database schema to handle inventory tracking and employee payroll.",
      "Deploying infrastructure on AWS with Docker for containerization and CI/CD pipelines.",
    ],
    tags: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    link: "#",
    isCurrent: true,
  },
  {
    id: 2,
    company: "JPMorgan Chase & Co., Bengaluru",
    role: "Software Engineer I",
    period: "Future",
    description: [
      "Contributing to the core platform team...",
      "Optimized API response times by 40%...",
    ],
    tags: ["React", "Go", "Kubernetes", "Spring"],
    link: "#",
    isCurrent: false,
  },
];

const WorkExperience = ({ playSound }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="flex flex-col gap-10">
      <h2 className="font-editorial text-[24px] text-[#EEEEEE] italic">
        Experience
      </h2>

      <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
        {WORK_DATA.map((job) => {
          // --- THE FIX ---
          // It is active if:
          // 1. Mouse is explicitly over THIS item (hoveredId === job.id)
          // 2. OR Mouse is NOT over anything (hoveredId === null) AND this is the current job
          const isActive =
            hoveredId === job.id || (hoveredId === null && job.isCurrent);

          return (
            <div
              key={job.id}
              className="group relative pl-8 md:pl-12"
              onMouseEnter={() => {
                setHoveredId(job.id);
                playSound("hover");
              }}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* --- TIMELINE DOT --- */}
              <div
                className={`absolute -left-1.25 top-2 w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-green-500 animate-pulse border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] scale-125"
                    : "bg-[#111] border-white/20"
                }`}
              ></div>

              {/* --- CONTENT CARD --- */}
              <div
                className={`relative p-6 rounded-lg border transition-all duration-500 cursor-default ${
                  hoveredId === job.id
                    ? "bg-white/2 border-white/10 translate-x-2"
                    : "bg-transparent border-transparent"
                }`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3
                      className={`text-lg font-editorial font-bold transition-colors duration-300 italic ${
                        isActive ? "text-green-400" : "text-white"
                      }`}
                    >
                      {job.role}
                    </h3>
                    <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                      <span className="font-bold font-sans text-gray-300">
                        {job.company}
                      </span>
                      {job.link !== "#" && (
                        <a
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                        >
                          <FiArrowUpRight />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 w-fit">
                    <FiCalendar size={12} />
                    {job.period}
                  </div>
                </div>

                {/* Description List */}
                <ul className="space-y-2 mb-6">
                  {job.description.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[#888] leading-relaxed"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-500/50 shrink-0"></span>
                      <span className="group-hover:text-gray-400 transition-colors duration-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[10px] font-mono text-green-400/80 bg-green-500/5 border border-green-500/10 rounded hover:bg-green-500/10 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkExperience;
