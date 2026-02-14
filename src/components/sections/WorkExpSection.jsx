import React from "react";
import WorkExperience from "./about/WorkExperience";

const WorkExpSection = ({ ref }) => {
  return (
    <section ref={ref}>
      <div className="work-card" style={{ opacity: 0 }}>
        <WorkExperience />
      </div>
    </section>
  );
};

export default WorkExpSection;
