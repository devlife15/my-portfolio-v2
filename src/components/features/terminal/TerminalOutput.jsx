"use client";

const TerminalOutput = ({ commandHistory }) => {
  return commandHistory.map((item, index) => {
    // 1. THE COMMAND ECHO (What the user just typed)
    if (item.type === "command-echo") {
      return (
        <div
          key={index}
          className="mb-2 mt-6 flex items-center gap-3 opacity-50 font-jetmono text-[11px] md:text-xs tracking-widest text-[#121212] dark:text-[#EEEEEE] uppercase"
        >
          <span>{item.text}</span>
        </div>
      );
    }

    // 2. THE IMAGE VIEWER
    if (item.type === "meme-image") {
      return (
        <div
          key={index}
          className="my-6 flex justify-start animate-in fade-in zoom-in duration-300"
        >
          <img
            src={item.imageUrl}
            alt="Terminal Output Asset"
            className="max-w-[80%] md:max-w-[300px] border border-black/10 dark:border-white/10 grayscale hover:grayscale-0 contrast-125 transition-all duration-300 cursor-pointer"
            onClick={() => window.open(item.imageUrl, "_blank")}
          />
        </div>
      );
    }

    // 3. BLOG LINKS (Standard Monospace, Underlined)
    if (item.type === "blog-clickable") {
      return (
        <div
          key={index}
          className="mb-2 whitespace-pre-wrap break-words font-jetmono text-xs md:text-sm"
        >
          <a
            href={item.url}
            className="text-[#121212] dark:text-[#EEEEEE] underline underline-offset-4 decoration-black/20 dark:decoration-white/20 hover:decoration-black dark:hover:decoration-white transition-colors cursor-pointer"
          >
            {item.text}
          </a>
        </div>
      );
    }

    // ==========================================
    // 4. SYSTEM METADATA vs. STANDARD PAYLOAD
    // ==========================================

    // IF IT IS SYSTEM DATA: Keep it uppercase, tiny, and tracked out.
    const systemTypes = [
      "system-title",
      "system-copyright",
      "system-header",
      "error",
      "system-error",
      "command",
      "comment",
    ];

    if (systemTypes.includes(item.type)) {
      let textStyle =
        "font-jetmono text-[#666] dark:text-[#888] text-[11px] md:text-[12px] uppercase tracking-widest";

      if (item.type === "command")
        textStyle =
          "font-jetmono text-[#121212] dark:text-[#EEEEEE] font-bold text-[11px] md:text-[12px] uppercase tracking-widest";
      else if (item.type === "error" || item.type === "system-error")
        textStyle =
          "font-jetmono text-red-500 font-bold uppercase tracking-widest text-[11px] md:text-[12px]";
      else if (item.type === "system-header")
        textStyle =
          "font-jetmono text-[#121212] dark:text-[#EEEEEE] font-bold mt-6 mb-3 uppercase tracking-[0.2em] border-b border-black/10 dark:border-white/10 pb-2 w-max text-[11px] md:text-[12px]";
      else if (item.type === "system-title")
        textStyle =
          "font-jetmono text-[#121212] dark:text-[#EEEEEE] font-bold tracking-[0.2em] uppercase text-[11px] md:text-[12px] mb-2 mt-4";
      else if (item.type === "system-copyright")
        textStyle =
          "font-jetmono text-[#666] text-[10px] tracking-[0.2em] uppercase mb-8";
      else if (item.type === "comment")
        textStyle =
          "font-jetmono text-[#666] dark:text-[#888] italic text-[11px] md:text-[12px]";

      return (
        <div
          key={index}
          className={`mb-1.5 whitespace-pre-wrap break-words ${textStyle}`}
        >
          {item.text}
        </div>
      );
    }

    // IF IT IS THE PAYLOAD (Standard Output):
    // Pure monospace, standard sentence case, normal letter spacing, very readable.
    return (
      <div
        key={index}
        className="mb-2 max-w-3xl whitespace-pre-wrap break-words font-jetmono text-xs md:text-sm leading-[1.6] text-[#121212] dark:text-[#EEEEEE]"
      >
        {item.text}
      </div>
    );
  });
};

export default TerminalOutput;
