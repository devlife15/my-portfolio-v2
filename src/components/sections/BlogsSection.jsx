import React from "react";
import WritingRow from "./blog/WritingRow";
import { FiArrowRight } from "react-icons/fi";

const BlogsSection = ({ ref }) => {
  return (
    <section ref={ref} className="flex flex-col gap-8" style={{ opacity: 0 }}>
      <h2 className="font-editorial text-[22px] text-[#EEEEEE] italic mb-2">
        Writings
      </h2>
      <div className="flex flex-col">
        {/* Render 5-6 Items */}
        <WritingRow
          title="How I built a terminal portfolio with React"
          date="Oct 2025"
          link="#"
        />
        <WritingRow
          title="Understanding React Server Components"
          date="Sep 2025"
          link="#"
        />
        <WritingRow
          title="The art of micro-interactions"
          date="Aug 2025"
          link="#"
        />
        <WritingRow
          title="Why I switched from VS Code to Neovim"
          date="Jul 2025"
          link="#"
        />
        <WritingRow
          title="Designing for dark mode first"
          date="Jun 2025"
          link="#"
        />
      </div>

      <a
        href="/blog"
        className="group inline-flex items-center gap-2 text-xs font-mono text-[#666666] hover:text-white transition-colors"
      >
        <span>read all posts</span>
        <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
      </a>
    </section>
  );
};

export default BlogsSection;
