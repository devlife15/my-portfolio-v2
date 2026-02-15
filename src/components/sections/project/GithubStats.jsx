import { GitHubCalendar } from "react-github-calendar";

const GithubStats = ({ username }) => {
  const theme = {
    dark: [
      "#333333", // Level 0 (Empty)
      "#4D4D4D", // Level 1
      "#7F7F7F", // Level 2
      "#B3B3B3", // Level 3
      "#FFFFFF", // Level 4 (Pure White)
    ],
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-8">
      {/* 1. [mask-image]: Creates the fade effect on left & right edges.
         2. overflow-x-auto: Allows scrolling if the graph is too wide.
         3. no-scrollbar: Hides the scrollbar for a cleaner look.
      */}
      <div className="relative w-full overflow-x-auto [&::-webkit-scrollbar]:hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {/* min-w-[700px]: Forces the container to be wide enough so the graph 
           doesn't squish, triggering the scroll/fade behavior.
           mx-auto: Centers it initially.
        */}
        <div className="flex justify-center min-w-175 px-8">
          <GitHubCalendar
            username={username}
            year={new Date().getFullYear()} // Dynamically use current year
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            style={{
              color: "#9ca3af",
            }}
          />
        </div>
      </div>

      {/* Optional: Tiny scroll hint if you want, but the fade usually implies it */}
    </div>
  );
};

export default GithubStats;
