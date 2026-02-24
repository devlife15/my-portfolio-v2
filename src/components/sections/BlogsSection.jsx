"use client";
import WritingRow from "./blog/WritingRow";
import { FiArrowRight } from "react-icons/fi";
import { ARTICLES } from "@/data/articles";

const BlogsSection = ({ ref }) => {
  return (
    <section ref={ref} className="flex flex-col gap-8" style={{ opacity: 0 }}>
      <h2 className="font-editorial text-[22px] text-[#EEEEEE] italic mb-2">
        Writings
      </h2>
      <div className="flex flex-col">
        {/* Render 5-6 Items */}
        {ARTICLES.map((article) => {
          return (
            <WritingRow
              key={article.id}
              href={`/blogs/${article.slug}`}
              title={article.title}
              date={article.date}
            />
          );
        })}
      </div>

      <a
        href="/blogs"
        className="group inline-flex items-center gap-2 text-xs font-saansmono text-[#666666] hover:text-white transition-colors"
      >
        <span>read all posts</span>
        <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
      </a>
    </section>
  );
};

export default BlogsSection;
