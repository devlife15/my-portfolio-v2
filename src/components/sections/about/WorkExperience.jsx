"use client";

import { useState } from "react";
import {
  FiFolder,
  FiFileText,
  FiChevronRight,
  FiChevronDown,
  FiGitCommit,
} from "react-icons/fi";

const WORK_DATA = [
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

const WorkExperience = ({ playSound }) => {
  // Allow multiple folders to be open? Or just one? Let's do just one for focus.
  const [openNode, setOpenNode] = useState("freelance");

  const toggleNode = (id) => {
    playSound("toggle");
    setOpenNode(openNode === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* COMMAND PROMPT HEADER */}
      {/* <div className="font-mono text-sm mb-8 pb-4 border-b border-white/10">
        <span className="text-green-500">➜</span>{" "}
        <span className="text-blue-400">~</span>{" "}
        <span className="text-gray-400">tree</span>{" "}
        <span className="text-white">./experience</span>
      </div> */}

      {/* THE TREE STRUCTURE */}
      <div className="font-mono text-sm md:text-base pl-2">
        {/* Root Directory */}
        <div className="flex items-center gap-2 text-blue-400 mb-4">
          <FiFolder className="fill-blue-500/20" />
          <span>.</span>
        </div>

        {/* Dynamic Folders */}
        <div className="flex flex-col gap-1">
          {WORK_DATA.map((job, index) => {
            const isOpen = openNode === job.id;
            const isLast = index === WORK_DATA.length - 1;

            return (
              <div key={job.id} className="relative">
                {/* TREE LINES (Vertical Guide) */}
                {!isLast && (
                  <div className="absolute left-2.75 top-8 bottom-0 w-px bg-white/10"></div>
                )}

                {/* FOLDER ROW (The Clickable Job Title) */}
                <button
                  onClick={() => toggleNode(job.id)}
                  onMouseEnter={() => playSound("hover")}
                  className="group flex items-center gap-3 w-full hover:bg-white/5 py-1 pr-4 rounded transition-colors text-left"
                >
                  {/* Tree Branch Icon */}
                  <span className="text-gray-600 ml-0.5">
                    {isLast ? "└──" : "├──"}
                  </span>

                  {/* Icon */}
                  <div
                    className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                  >
                    {isOpen ? (
                      <FiChevronDown className="text-green-500" />
                    ) : (
                      <FiChevronRight className="text-gray-500" />
                    )}
                  </div>

                  {/* Job Content */}
                  <div>
                    <span
                      className={`font-bold font-saans ${isOpen ? "text-green-400" : "text-gray-300 group-hover:text-white"}`}
                    >
                      {job.company}
                    </span>
                    <span className="text-gray-600 text-xs font-saansmono ml-3">
                      // {job.role}
                    </span>
                  </div>
                </button>

                {/* EXPANDED CONTENT (The "Files" inside) */}
                <div
                  className={`
                    grid transition-all duration-300 ease-in-out
                    ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                  `}
                >
                  <div className="overflow-hidden">
                    {/* Indent content to align with tree */}
                    <div
                      className={`ml-8 ${isLast ? "border-l-0" : "border-l border-white/10"} pl-6 py-4 space-y-4`}
                    >
                      {/* Metadata File */}
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                        <FiFileText size={12} />
                        <span className="font-saansmono">metadata.json</span>
                        <span className="text-gray-700 font-saansmono">
                          -- {job.period}
                        </span>
                      </div>

                      {/* Description "Code" */}
                      <div className="space-y-2">
                        {job.description.map((desc, i) => (
                          <div
                            key={i}
                            className="flex font-saans gap-3 text-gray-400 text-sm leading-relaxed hover:text-gray-200 transition-colors"
                          >
                            <span className="text-green-500/50 mt-1">
                              <FiGitCommit size={14} />
                            </span>
                            {desc}
                          </div>
                        ))}
                      </div>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-saansmono px-2 py-0.5 bg-white/5 border border-white/10 text-gray-400 rounded"
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

        {/* Footer Summary */}
        <div className="mt-6 text-gray-600 text-xs pl-1 font-saansmono">
          <span className="text-green-500">2 directories</span>,{" "}
          {WORK_DATA.reduce((acc, job) => acc + job.description.length, 0)}{" "}
          files
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
