import { FiPlay, FiHeadphones } from "react-icons/fi";

const PodcastCard = ({ title, show, episode, image, link, playSound }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-3 w-full cursor-pointer"
      onMouseEnter={() => playSound("hover")}
      onClick={() => playSound("click")}
    >
      {/* 1. IMAGE CONTAINER */}
      {/* 👇 Added dual-theme background and borders */}
      <div className="relative w-full aspect-square bg-black/5 dark:bg-[#111] border border-black/10 dark:border-white/5 rounded-sm overflow-hidden transition-colors duration-300">
        {/* 👇 Tweaked base opacity so it doesn't wash out on white backgrounds */}
        <img
          src={image}
          alt={show}
          className="w-full h-full object-cover grayscale opacity-70 dark:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
        />

        {/* 2. HOVER OVERLAY */}
        {/* 👇 Light mode: bright frosted glass. Dark mode: cinematic dimming */}
        <div className="absolute inset-0 flex items-center justify-center bg-white/20 dark:bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300">
          {/* 👇 Play Button: Inverts to a dark pill in light mode, white pill in dark mode */}
          <div className="w-10 h-10 rounded-full bg-[#111111] text-[#EEEEEE] dark:bg-white dark:text-black flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <FiPlay className="fill-current ml-1" />
          </div>
        </div>

        {/* 3. HEADPHONE ICON */}
        {/* 👇 Snaps to pure black on hover in light mode, pure white in dark mode */}
        <div className="absolute top-2 right-2 text-black/30 dark:text-white/50 group-hover:text-[#111111] dark:group-hover:text-white transition-colors duration-300">
          <FiHeadphones size={12} />
        </div>
      </div>

      {/* 4. INFO */}
      <div className="flex flex-col gap-1">
        {/* 👇 Show Name: Muted tone, darkens on hover */}
        <span className="font-plex text-[10px] text-[#888888] dark:text-[#555555] uppercase tracking-wider transition-colors duration-300 group-hover:text-[#111111] dark:group-hover:text-[#888888]">
          {show}
        </span>

        {/* 👇 Title: Deep charcoal in light mode, snaps to black on hover */}
        <h3 className="font-editorial italic text-[16px] leading-tight text-[#444444] dark:text-[#CCCCCC] group-hover:text-[#111111] dark:group-hover:text-white transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* 👇 Episode Number: Subtle watermark tone */}
        {episode && (
          <span className="font-plex text-[12px] text-[#999999] dark:text-[#444444] transition-colors duration-300">
            Ep. {episode}
          </span>
        )}
      </div>
    </a>
  );
};

export default PodcastCard;
