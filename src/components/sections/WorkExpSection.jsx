import WorkExperience from "./about/WorkExperience";
import useSystemSound from "@/hooks/useSystemSound";

const WorkExpSection = ({ ref }) => {
  const { playSound } = useSystemSound();
  return (
    <section ref={ref}>
      <div className="work-card" style={{ opacity: 0 }}>
        <WorkExperience playSound={playSound} />
      </div>
    </section>
  );
};

export default WorkExpSection;
