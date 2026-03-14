"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const GithubStats = ({ username }) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const customTheme = {
    light: ["#F5F5F5", "#D4D4D4", "#A3A3A3", "#525252", "#111111"],
    dark: ["#161616", "#333333", "#666666", "#999999", "#EEEEEE"],
  };

  if (!mounted) {
    return (
      <div className="w-full h-[150px] animate-pulse bg-black/5 dark:bg-white/5 rounded-sm" />
    );
  }

  return (
    <div className="w-full flex flex-col items-start justify-center pt-2">
      <div className="w-full flex justify-start overflow-hidden [&_rect]:rx-0 [&_rect]:ry-0">
        <div className="min-w-max">
          <GitHubCalendar
            username={username}
            year={new Date().getFullYear()}
            colorScheme={isDark ? "dark" : "light"}
            theme={customTheme}
            blockSize={12}
            blockMargin={3}
            fontSize={12}
            hideColorLegend={true}
            hideTotalCount={false}
            style={{
              color: isDark ? "#888888" : "#666666",
              fontFamily: "var(--font-plex)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GithubStats;
