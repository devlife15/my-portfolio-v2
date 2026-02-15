"use client";

import TechStack from "./about/TechStack";

const TechStackSection = ({ ref }) => {
  return (
    <section ref={ref} style={{ opacity: 0 }}>
      <h2 className="font-editorial text-[22px] text-[#EEEEEE] italic mb-6">
        Tech Stack
      </h2>
      <div className="opacity-60 hover:opacity-100 transition-opacity duration-500">
        <TechStack />
      </div>
    </section>
  );
};

export default TechStackSection;
