import AnimatedText from "../AnimatedText/AnimatedText";

interface HeroProps {
  name: string;
  description: string;
  github: string;
  linkedin: string;
  resume: string;
}

function Hero({ name, description, github, linkedin, resume }: HeroProps) {
  return (
    <section className="grid min-h-[60vh] items-center gap-12 py-20 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="flex flex-col justify-center gap-6">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
          // Olá, eu sou
        </p>

        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          {name}
        </h1>

        <AnimatedText />

        <p className="max-w-2xl text-lg leading-relaxed text-gray-400">
          {description}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/10 px-5 py-2.5 text-sm font-medium transition-colors hover:border-cyan-400/40 hover:text-cyan-400"
          >
            GitHub
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/10 px-5 py-2.5 text-sm font-medium transition-colors hover:border-cyan-400/40 hover:text-cyan-400"
          >
            LinkedIn
          </a>

          <a
            href={resume}
            download
            className="rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-cyan-300"
          >
            Baixar CV
          </a>
        </div>
      </div>

      <div className="hidden justify-center lg:flex">
        <div className="relative flex h-64 w-64 items-center justify-center">
          {/* Órbitas */}
          <div className="absolute h-48 w-48 rounded-full border border-cyan-400/10" />

          <div className="absolute h-36 w-36 rounded-full border border-cyan-400/15" />

          <div className="absolute h-24 w-24 rounded-full border border-cyan-400/20" />

          {/* Núcleo */}
          <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse" />

          {/* Planeta da órbita externa */}
          <div className="absolute h-48 w-48 animate-[orbit_18s_linear_infinite]">
            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400/70" />
          </div>

          {/* Planeta da órbita intermediária */}
          <div className="absolute h-36 w-36 animate-[orbit_12s_linear_infinite_reverse]">
            <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/40" />
          </div>

          {/* Planeta da órbita interna */}
          <div className="absolute h-24 w-24 animate-[orbit_8s_linear_infinite]">
            <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
