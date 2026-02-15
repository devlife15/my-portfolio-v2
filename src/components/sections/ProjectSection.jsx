"use client";

import ProjectCard from "./project/ProjectCard";
import useSystemSound from "../../hooks/useSystemSound";

const ProjectSection = ({ ref }) => {
  const { playSound } = useSystemSound();
  return (
    <section ref={ref} className="flex flex-col gap-8">
      <h2 className="font-editorial text-[22px] text-[#EEEEEE] italic mb-2">
        Featured Projects
      </h2>

      <div className="flex flex-col gap-5">
        <div className="project-card" style={{ opacity: 0 }}>
          <ProjectCard
            title={"Help Deskly"}
            description={"An AI SAAS Customer Agent"}
            year={"2026"}
            src={"/projects/1.jpg"}
            playSound={playSound}
          />
        </div>
        <div className="project-card" style={{ opacity: 0 }}>
          <ProjectCard
            title={"Placeholder Project"}
            description={"Description Placeholder"}
            year={"2025"}
            src={"/projects/2.jpg"}
            playSound={playSound}
          />
        </div>
        <div className="project-card" style={{ opacity: 0 }}>
          <ProjectCard
            title={"Placeholder Project"}
            description={"Description placeholder"}
            year={"2025"}
            src={"/projects/3.jpg"}
            playSound={playSound}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
