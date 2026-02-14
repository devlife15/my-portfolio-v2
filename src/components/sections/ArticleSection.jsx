import React from "react";
import BookmarkCard from "./library/BookmarkCard";

const ArticleSection = ({ ref }) => {
  return (
    <section className={`flex flex-col gap-8`} ref={ref} style={{ opacity: 0 }}>
      <h2 className="font-editorial text-[18px] text-[#EEEEEE] italic mb-2">
        Bookmarks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BookmarkCard
          title="The end of localhost"
          source="DX Tips"
          link="https://dx.tips/the-end-of-localhost"
        />

        <BookmarkCard
          title="Just JavaScript: The Mental Models"
          source="Dan Abramov"
          link="https://..."
        />

        <BookmarkCard
          title="Design Engineering as a process"
          source="Vercel"
          link="https://..."
        />

        <BookmarkCard
          title="Why I'm betting on Rust"
          source="Discord"
          link="https://..."
        />
      </div>
    </section>
  );
};

export default ArticleSection;
