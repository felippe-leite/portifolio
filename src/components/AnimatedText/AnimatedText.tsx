import { useLanguage } from "../../i18n/useLanguage";
import { useEffect, useState } from "react";

const texts = [
  "BACKEND DEVELOPER",
  "JAVA • SPRING BOOT • TYPESCRIPT",
  "NODE.JS • SUPABASE • POSTGRESQL",
];

function AnimatedText() {
  const { t } = useLanguage();
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
        key={t(texts[index])}
        className="inline-block font-mono text-sm tracking-[0.2em] text-cyan-400 animate-[fadeIn_1s_ease-in-out]"
      >
        {t(texts[index])}
      </span>
    </div>
  );
}

export default AnimatedText;
