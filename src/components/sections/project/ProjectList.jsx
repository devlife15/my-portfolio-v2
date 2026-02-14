import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For the smooth float
import ProjectCard from "../../ProjectCard"; // Import your existing card

const ProjectList = ({ projects }) => {
  // State to track which project is active (for the image)
  const [activeProject, setActiveProject] = useState(null);

  // Ref to track the mouse position for the floating image
  const mousePosition = useRef({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  // Update mouse position on move
  const handleMouseMove = (e) => {
    // We update state to trigger the re-render of the floating image position
    // (In a heavier app, we'd use useSpring, but this is fine for a portfolio)
    setCursor({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="w-full" onMouseMove={handleMouseMove}>
      <div className="flex flex-col gap-12 md:hidden">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
      <div className="hidden md:flex flex-col">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative border-b border-white/5 py-8 px-2 flex justify-between items-baseline transition-colors hover:bg-white/2 cursor-none"
            onMouseEnter={() => setActiveProject(project)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="flex items-baseline gap-6">
              <span className="font-geistmono text-xs text-[#444444]">
                0{index + 1}
              </span>
              <h3 className="font-editorial text-[22px] italic text-[#888888] group-hover:text-white transition-colors duration-300">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-12">
              <span className="font-geist text-sm text-[#555555] group-hover:text-[#777777] transition-colors">
                {project.description}
              </span>
              <span className="font-geistmono text-xs text-[#444444]">
                {project.year}
              </span>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cursor.x - 200, // Center the image (assuming width 400px)
              y: cursor.y - 150, // Center the image (assuming height 300px)
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 0.1,
            }}
            className="fixed top-0 left-0 pointer-events-none z-50 w-100 aspect-video rounded-sm overflow-hidden border border-white/10 bg-[#111] shadow-2xl"
          >
            <img
              src={activeProject.src}
              alt={activeProject.title}
              className="w-full h-full object-cover opacity-90"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full font-mono text-xs text-white tracking-widest uppercase">
                View
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectList;
