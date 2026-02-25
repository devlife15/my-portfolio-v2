"use client";

import { FiInfo, FiZap, FiAlertTriangle, FiXOctagon } from "react-icons/fi";

const variantConfig = {
  info: {
    styles: "bg-blue-500/5 border-blue-500/20 border-l-blue-500 text-blue-50",
    icon: <FiInfo className="text-blue-400 shrink-0 mt-0.5" size={20} />,
    titleColor: "text-blue-400",
  },
  tip: {
    styles:
      "bg-green-500/5 border-green-500/20 border-l-green-500 text-green-50",
    icon: <FiZap className="text-green-400 shrink-0 mt-0.5" size={20} />,
    titleColor: "text-green-400",
  },
  warning: {
    styles:
      "bg-amber-500/5 border-amber-500/20 border-l-amber-500 text-amber-50",
    icon: (
      <FiAlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={20} />
    ),
    titleColor: "text-amber-400",
  },
  danger: {
    styles: "bg-red-500/5 border-red-500/20 border-l-red-500 text-red-50",
    icon: <FiXOctagon className="text-red-400 shrink-0 mt-0.5" size={20} />,
    titleColor: "text-red-400",
  },
};

export default function Callout({ type = "info", title, children }) {
  const config = variantConfig[type] || variantConfig.info;

  return (
    <div
      className={`my-8 flex gap-4 p-6 rounded-xl border border-l-4 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:shadow-lg ${config.styles}`}
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none" />

      {/* Icon */}
      {config.icon}

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center">
        {title && (
          <h4
            className={`m-0 mb-2 font-mono text-xs md:text-sm uppercase tracking-wider font-bold ${config.titleColor}`}
          >
            {title}
          </h4>
        )}

        {/* We use specific targeting here to prevent Tailwind Typography (prose) from messing up our internal spacing */}
        <div className="text-[15px] leading-relaxed opacity-90 [&>p]:m-0 [&>p:not(:last-child)]:mb-3 font-sans">
          {children}
        </div>
      </div>
    </div>
  );
}
