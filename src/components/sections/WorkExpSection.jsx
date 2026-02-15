"use client";

import WorkExperience from "./about/WorkExperience";
import useSystemSound from "@/hooks/useSystemSound";

const WorkExpSection = ({ ref }) => {
  const { playSound } = useSystemSound();
  return (
    <section ref={ref} className="flex flex-col gap-8" style={{ opacity: 0 }}>
      <h2 className="font-editorial text-[22px] text-[#EEEEEE] italic mb-2">
        Work Experience
      </h2>
      <div>
        <WorkExperience playSound={playSound} />
      </div>
    </section>
  );
};

export default WorkExpSection;
