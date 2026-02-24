import ArticleLayout from "../../../components/layout/ArticleLayout";
import CodeBlock from "../../../components/layout/CodeBlock";
import { ARTICLES } from "@/data/articles";

export default function TerminalPortfolioPost() {
  // Grab the metadata from your data file
  const postMeta = ARTICLES.find((p) => p.slug === "terminal-portfolio");

  return (
    <ArticleLayout
      title={postMeta?.title}
      date={postMeta?.date}
      readTime={postMeta?.readTime}
    >
      {/* 🚀 WRITE YOUR POST HERE USING STANDARD HTML/JSX */}

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

      <p>
        One of the trickiest parts was managing the 'System Sound' engine
        without re-rendering the entire app on every click. Here is the custom
        hook I built:
      </p>

      {/* Drop in your new interactive component! */}
      <CodeBlock
        language="javascript"
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
