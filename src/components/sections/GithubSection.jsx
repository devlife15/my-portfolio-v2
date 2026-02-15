"use client";

import GithubStats from "./project/GithubStats";

const GithubSection = ({ ref }) => {
  return (
    <section ref={ref} style={{ opacity: 0 }}>
      <h2 className="font-editorial text-[18px] text-[#EEEEEE] italic mb-2">
        Github Activity
      </h2>
      <div className="opacity-60 hover:opacity-100 transition-opacity duration-500 -ml-3">
        <GithubStats username="devlife15" />
      </div>
    </section>
  );
};

export default GithubSection;
