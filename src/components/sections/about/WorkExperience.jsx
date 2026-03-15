"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi"; // Using a minimal Plus icon for the accordion

const WORK_DATA = [
  {
    id: "freelance",
    company: "Freelance Client",
    role: "Full Stack Developer",
    period: "2025 — Present",
    isCurrent: true,
    description: [
      "Architected dual-system solution (HRMS & SCM) using Next.js/Node.",
      "Designed scalable PostgreSQL schema for inventory tracking.",
      "Deployed AWS/Docker infrastructure for CI/CD pipelines.",
    ],
    tags: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "freelancer",
    company: "Freelance Client",
    role: "Full Stack Developer",
    period: "2025 — Present",
    isCurrent: true,
    description: [
      "Architected dual-system solution (HRMS & SCM) using Next.js/Node.",
      "Designed scalable PostgreSQL schema for inventory tracking.",
      "Deployed AWS/Docker infrastructure for CI/CD pipelines.",
    ],
    tags: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
  },
  // You can add JPMorgan here later!
];

const WorkExperience = ({ playSound }) => {
  const [openNode, setOpenNode] = useState(null); // Default to null so all are closed initially for maximum minimalism

  const toggleNode = (id) => {
    if (playSound) playSound("toggle");
    setOpenNode(openNode === id ? null : id);
  };

  return (
    <div className="max-w-[750px] mx-auto w-full flex flex-col px-4 md:px-0">
      {/* Super minimal section header matching your dark inspiration image */}

      {/* The Minimalist List */}
      <div className="flex flex-col">
        {WORK_DATA.map((job) => {
          const isOpen = openNode === job.id;

          return (
            <div
              key={job.id}
              className="border-b border-white/5 group/row cursor-pointer"
            >
              {/* THE COLLAPSED ROW (Exactly like the dark inspiration image) */}
              <button
                onClick={() => toggleNode(job.id)}
                onMouseEnter={() => playSound && playSound("hover")}
                className="w-full flex justify-between items-start py-5 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                {/* Left: Company & Role */}
                <div className="flex flex-col gap-0.5">
                  <h3
                    className={`font-editorial text-base md:text-[17px] font-medium transition-colors duration-300 italic ${
                      isOpen
                        ? "text-white"
                        : "text-[#d4d4d4] group-hover/row:text-white"
                    }`}
                  >
                    {job.company}
                  </h3>
                  <span className="font-saans text-[#777777] text-[13px] md:text-sm transition-colors duration-300 group-hover/row:text-[#999999]">
                    {job.role}
                  </span>
                </div>

                {/* Right: Date & Accordion Icon */}
                <div className="flex items-center gap-4 md:gap-5 mt-0.5">
                  <span className="font-saansmono text-[#666666] text-xs tracking-wide">
                    {job.period}
                  </span>
                  <FiPlus
                    className={`text-[#555555] transition-all duration-500 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
                      isOpen
                        ? "rotate-45 text-white"
                        : "group-hover/row:text-white"
                    }`}
                    size={18}
                  />
                </div>
              </button>

              {/* THE ACCORDION EXPANSION (Smooth sliding grid) */}
              <div
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-6 pb-8 pt-2 pl-0 md:pl-2">
                    {/* Bullet Points */}
                    <div className="space-y-3">
                      {job.description.map((desc, i) => (
                        <div
                          key={i}
                          className="flex gap-4 items-start group/item"
                        >
                          <span className="text-[#444] mt-1.5 text-[10px] uppercase font-saansmono tracking-wider">
                            {(i + 1).toString().padStart(2, "0")}
                          </span>
                          <p className="text-[#999999] leading-relaxed font-saans text-[15px] group-hover/item:text-[#bbbbbb] transition-colors">
                            {desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-saansmono tracking-wide px-3 py-1 bg-white/[0.03] border border-white/5 text-[#777] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkExperience;
