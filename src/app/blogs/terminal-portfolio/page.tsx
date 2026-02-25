import ArticleLayout from "../../../components/layout/ArticleLayout";
import CodeBlock from "../../../components/layout/CodeBlock";
import { ARTICLES } from "@/data/articles";
import Highlight from "@/components/layout/Highlight";
import Callout from "@/components/layout/Callout";
import Schematic from "@/components/layout/Schematic";

export default function TerminalPortfolioPost() {
  const postMeta = ARTICLES.find((p) => p.slug === "terminal-portfolio");

  return (
    <ArticleLayout
      title={postMeta?.title}
      date={postMeta?.date}
      readTime={postMeta?.readTime}
    >
      <p>
        When I set out to build my portfolio, I didn't want just another grid of
        project cards. I wanted an environment. A space that felt alive,
        reactive, and perhaps a bit nostalgic for the days of green phosphor
        screens.
      </p>

      <h2>The Concept: Glass & Grit</h2>

      <p>
        The main design challenge was balancing the "high-tech" feel of a
        terminal with the "editorial" elegance of a magazine.
      </p>

      <blockquote>
        Good design is consistent. Great design is a consistent story told
        through every pixel.
      </blockquote>

      <h2>Handling The Global State</h2>

      <Schematic
        src="/projects/2.jpg"
        alt="Failover mechanism"
        caption="Fig 2.0: Automated failover sequence."
        invert={true}
      />

      <p>
        One of the trickiest parts was managing the{" "}
        <Highlight>System Sound</Highlight> engine without re-rendering the
        entire app on every click. Here is the custom hook I built:
      </p>

      <Callout type="danger" title="Watch Out for Race Conditions">
        <p>
          Be incredibly careful when transitioning from{" "}
          <strong>Half-Open</strong> back to <strong>Closed</strong>. If
          multiple requests hit the service at the exact same millisecond, you
          might overwhelm the recovering database.
        </p>
      </Callout>

      <CodeBlock
        language="javascript"
        filename="hooks/useTerminal.js"
        code={`const useSystemSound = () => {
  const playSound = useCallback((type) => {
    const audio = new Audio(\`/sounds/\${type}.ogg\`);
    audio.volume = 0.2;
    audio.play();
  }, []);
  
  return { playSound };
};`}
      />
    </ArticleLayout>
  );
}
