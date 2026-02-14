import React from "react";
import ProjectCard from "./project/ProjectCard";

const ProjectSection = ({ ref }) => {
  return (
    <section ref={ref} className="flex flex-col gap-8">
      <h2 className="font-editorial text-[22px] text-[#EEEEEE] italic mb-2">
        Featured Projects
      </h2>

      <div className="flex flex-col gap-5">
        {/* PROJECT 1 */}
        <div className="project-card" style={{ opacity: 0 }}>
          <ProjectCard
            title={"Help Deskly"}
            description={"A command-line interface portfolio built with React."}
            year={"2026"}
            src={"/projects/1.jpg"}
          />
        </div>

        {/* PROJECT 2 */}
        <div className="project-card" style={{ opacity: 0 }}>
          <ProjectCard
            title={"Supply Chain V1"}
            description={
              "Inventory management system for high-volume water plants."
            }
            year={"2025"}
            src={"/projects/2.jpeg"}
          />
        </div>

        {/* PROJECT 3 */}
        <div className="project-card" style={{ opacity: 0 }}>
          <ProjectCard
            title={"Portfolio OS"}
            description={"A web-based operating system experience."}
            year={"2025"}
            src={"/projects/3.jpeg"}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
