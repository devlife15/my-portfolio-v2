import { useState, useEffect } from "react";

const Tagline = () => {
  const taglines = [
    "Full-Stack Developer",
    "Extremely Curious",
    "OCD with Perfectionism",
    "Detail Oriented",
    "Video Editor",
    "UI/UX",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <div className="h-7 overflow-hidden relative">
      <div
        className="transition-transform duration-500 ease-in-out text-xl text-gray-400 font-medium"
        style={{
          transform: `translateY(-${currentIndex * 28}px)`,
        }}
      >
        {taglines.map((tagline, index) => (
          <p key={index} className="h-7 font-sans text-[14px] text-[#666666]">
            {tagline}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Tagline;
