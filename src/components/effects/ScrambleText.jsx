import { useEffect, useRef } from "react";

const ScrambleText = ({ text, className = "" }) => {
  const elementRef = useRef(null);

  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  const scrambleEffect = () => {
    let iterations = 0;

    const interval = setInterval(() => {
      if (!elementRef.current) return;

      elementRef.current.innerText = text
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return text[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iterations >= text.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);
  };
  useEffect(() => {
    scrambleEffect();
  }, []);

  return (
    <h1
      ref={elementRef}
      className={`hacker-name ${className}`}
      onMouseOver={scrambleEffect}
    >
      {text}
    </h1>
  );
};

export default ScrambleText;
