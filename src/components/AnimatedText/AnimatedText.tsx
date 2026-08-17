import { useEffect, useState } from "react";

const texts = [
  "FELIPPE LEITE",
  "BACKEND DEVELOPER",
  "JAVA • SPRING BOOT • TYPESCRIPT",
];

function AnimatedText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[1.5rem]">
      <span
        key={texts[index]}
        className="inline-block font-mono text-sm tracking-[0.2em] text-cyan-400 animate-[fadeIn_1s_ease-in-out]"
      >
        {texts[index]}
      </span>
    </div>
  );
}

export default AnimatedText;
