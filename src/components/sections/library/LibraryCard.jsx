import Image from "next/image";

const LibraryCard = ({ title, author, status, cover, link }) => {
  const isReading = status.toLowerCase() === "reading";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between w-full py-4 px-4 -mx-4 border-b border-transparent hover:border-black/5 dark:hover:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
    >
      <div className="flex items-center gap-4 md:gap-6">
        {/* 1. Micro Animated Cover */}
        <div className="relative w-10 h-14 md:w-12 md:h-16 shrink-0 overflow-hidden rounded bg-[#121212] border border-black/10 dark:border-white/10">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out"
          />
        </div>

        {/* 2. Text Data */}
        <div className="flex flex-col gap-1">
          <h3 className="font-editorial italic text-sm md:text-lg font-medium text-[#121212] dark:text-[#EEEEEE] transition-colors duration-300">
            {title}
          </h3>
          <span className="font-mono text-[10px] md:text-xs text-[#666666] tracking-wide">
            {author}
          </span>
        </div>
      </div>

      {/* 3. Status LED */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden md:inline-block font-jetmono text-[10px] tracking-[0.2em] uppercase text-[#757575]">
          {status}
        </span>
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isReading
              ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
              : "bg-black/20 dark:bg-white/20"
          }`}
        />
      </div>
    </a>
  );
};

export default LibraryCard;
