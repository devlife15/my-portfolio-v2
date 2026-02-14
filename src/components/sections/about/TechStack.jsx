import { TECH_DATA } from "../../../data/techData";
import "../../../../marqueeStyle.css";

const TechIcon = ({ icon, name }) => (
  <div className="group relative w-7 h-7 flex items-center justify-center">
    {/* For my Hover Tooltip */}
    <div
      className="absolute -top-10 left-1/2 -translate-x-1/2 
                    bg-gray-800 text-white text-[10px] font-bold font-mono px-2 py-1 rounded-md 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    whitespace-nowrap pointer-events-none z-50 shadow-lg"
    >
      {name}

      {/* Down triangle */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 
                      border-4 border-transparent border-t-gray-800"
      ></div>
    </div>
    <img
      src={icon}
      alt={name}
      className="w-full h-full object-contain invert brightness-0 transition-all duration-300 
                 group-hover:invert-0 group-hover:brightness-100"
    />
  </div>
);

const TechStack = () => {
  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed font-editorial italic">
          While I like experimenting with many tools, this stack represents
          where my strongest experience lies:
        </p>
      </div>

      {/* Icon Marquee */}

      <div className="relative flex overflow-hidden mask-gradient w-full">
        <div className="animate-marquee flex items-center py-14 whitespace-nowrap">
          {[...TECH_DATA.core, ...TECH_DATA.core, ...TECH_DATA.core].map(
            (item, idx) => (
              <div
                key={idx}
                className="text-4xl pr-15 transition-all duration-500 cursor-pointer"
              >
                <div className="scale-130">
                  <TechIcon icon={item.icon} name={item.name} />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
