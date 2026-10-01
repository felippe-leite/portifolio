import { useLanguage } from "../../i18n/useLanguage";
import AnimatedText from "../AnimatedText/AnimatedText";
import SolarSystem from "../SolarSystem/SolarSystem";

interface HeroProps {
  name: string;
  description: string;
  github: string;
  linkedin: string;
  resume: string;
}

function Hero({ name, description, github, linkedin, resume }: HeroProps) {
  const { t } = useLanguage();
  return (
    <section className="grid min-h-[60vh] items-center gap-12 py-20 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="flex flex-col justify-center gap-6">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">{t("// Olá, eu sou")}</p>

        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          {name}
        </h1>

        <AnimatedText />

        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {t(description)}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-line/10 px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
          >
            GitHub
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-line/10 px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
          >
            LinkedIn
          </a>

          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-action px-5 py-2.5 text-sm font-medium text-on-action transition-colors hover:bg-action-hover"
          >{t("Ver CV")}</a>
        </div>
      </div>

      <div className="hidden justify-center lg:flex">
        <SolarSystem />
      </div>
    </section>
  );
}

export default Hero;
