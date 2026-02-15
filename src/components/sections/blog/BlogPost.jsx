import React, { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiShare2,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import useSystemSound from "../../../hooks/useSystemSound";

// --- DUMMY CONTENT (Replace with real props/CMS data later) ---
const ARTICLE_DATA = {
  title: "How I built a terminal portfolio with React",
  date: "October 12, 2025",
  readTime: "8 min read",
  tags: ["React", "Tailwind", "UX Design"],
  content: [
    {
      type: "p",
      text: "When I set out to build my portfolio, I didn't want just another grid of project cards. I wanted an environment. A space that felt alive, reactive, and perhaps a bit nostalgic for the days of green phosphor screens.",
    },
    {
      type: "h2",
      text: "The Concept: Glass & Grit",
    },
    {
      type: "p",
      text: "The main design challenge was balancing the 'high-tech' feel of a terminal with the 'editorial' elegance of a magazine. Too much terminal, and it looks like a hackathon project. Too much magazine, and it loses its engineering soul.",
    },
    {
      type: "quote",
      text: "Good design is consistent. Great design is a consistent story told through every pixel.",
    },
    {
      type: "p",
      text: "I decided to use a 'Glass HUD' aesthetic: dark, blurred backgrounds with sharp, monospaced details. This required extensive use of backdrop-filter in Tailwind.",
    },
    {
      type: "h2",
      text: "Handling The Global State",
    },
    {
      type: "p",
      text: "One of the trickiest parts was managing the 'System Sound' engine without re-rendering the entire app on every click. I solved this by creating a custom hook that manages a single Audio instance.",
    },
    {
      type: "code",
      language: "javascript",
      code: `const useSystemSound = () => {
  const playSound = useCallback((type) => {
    const audio = new Audio(\`/sounds/\${type}.ogg\`);
    audio.volume = 0.2;
    audio.play();
  }, []);
  
  return { playSound };
};`,
    },
    {
      type: "p",
      text: "This approach keeps the UI buttery smooth while delivering those satisfying mechanical clicks.",
    },
  ],
};

const BlogPost = ({ onBack }) => {
  const { playSound } = useSystemSound();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Handle Scroll Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    playSound("click");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-[#EEEEEE] font-saans selection:bg-green-500/30 selection:text-white pb-32">
      {/* 1. PROGRESS BAR (Sticky Top) */}
      <div className="fixed top-0 left-0 h-1 bg-green-500/20 w-full z-50">
        <div
          className="h-full bg-green-500 transition-all duration-100 ease-out shadow-[0_0_10px_#22c55e]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. NAVIGATION HEADER */}
      <div className="max-w-3xl mx-auto px-6 pt-12 mb-12">
        <button
          onClick={() => {
            playSound("click");
            onBack();
          }}
          className="group flex items-center gap-2 text-sm font-geistmono text-gray-500 hover:text-green-400 transition-colors"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>/ back_to_root</span>
        </button>
      </div>

      {/* 3. ARTICLE HERO */}
      <header className="max-w-3xl mx-auto px-6 mb-16 border-b border-white/10 pb-12">
        {/* Tags */}
        <div className="flex gap-3 mb-6">
          {ARTICLE_DATA.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-geistmono uppercase tracking-widest px-2 py-1 rounded border border-green-500/20 text-green-400 bg-green-500/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-editorial text-4xl md:text-6xl italic leading-tight mb-8">
          {ARTICLE_DATA.title}
        </h1>

        {/* Meta Data */}
        <div className="flex items-center gap-6 text-sm font-geist text-gray-500">
          <div className="flex items-center gap-2">
            <FiCalendar />
            <span>{ARTICLE_DATA.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock />
            <span>{ARTICLE_DATA.readTime}</span>
          </div>
        </div>
      </header>

      {/* 4. CONTENT BODY */}
      <article className="max-w-2xl mx-auto px-6">
        {ARTICLE_DATA.content.map((block, index) => {
          // PARAGRAPH
          if (block.type === "p") {
            return (
              <p
                key={index}
                className="font-geist text-[17px] leading-[1.8] text-[#b4b4b4] mb-8"
              >
                {block.text}
              </p>
            );
          }

          // HEADING H2
          if (block.type === "h2") {
            return (
              <h2
                key={index}
                className="font-editorial text-3xl italic text-[#eee] mt-16 mb-6"
              >
                {block.text}
              </h2>
            );
          }

          // BLOCKQUOTE
          if (block.type === "quote") {
            return (
              <blockquote
                key={index}
                className="border-l-2 border-green-500 pl-6 my-10 italic text-xl text-gray-300 font-editorial leading-relaxed"
              >
                "{block.text}"
              </blockquote>
            );
          }

          // CODE BLOCK
          if (block.type === "code") {
            return (
              <div
                key={index}
                className="relative group my-10 rounded-lg overflow-hidden border border-white/10 bg-[#0d0d0d]"
              >
                {/* Code Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                  <span className="text-xs font-mono text-gray-500">
                    {block.language}
                  </span>
                  <button
                    onClick={() => handleCopyCode(block.code)}
                    className="flex items-center gap-1 text-[10px] font-geistmono text-gray-400 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <FiCheck className="text-green-400" />
                    ) : (
                      <FiCopy />
                    )}
                    {copied ? "COPIED" : "COPY"}
                  </button>
                </div>
                {/* Code Body */}
                <pre className="p-4 overflow-x-auto text-sm font-geistmono leading-relaxed text-gray-300">
                  <code>{block.code}</code>
                </pre>
              </div>
            );
          }
          return null;
        })}
      </article>

      {/* 5. FOOTER / SHARE */}
      <footer className="max-w-2xl mx-auto px-6 mt-20 pt-10 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="font-editorial italic text-xl text-gray-400">
            Thanks for reading.
          </span>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-geistmono text-gray-300">
            <FiShare2 />
            <span>SHARE_POST</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
