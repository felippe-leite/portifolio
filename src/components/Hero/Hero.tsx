interface HeroProps {
  name: string;
  role: string;
  description: string;
}

function Hero({ name, role, description }: HeroProps) {
  return (
    <section className="flex min-h-[60vh] flex-col justify-center gap-6 py-20">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
        // Olá, eu sou
      </p>

      <h1 className="text-5xl font-bold tracking-tight md:text-7xl">{name}.</h1>

      <p className="mt-3 font-mono text-xl text-gray-400 md:text-2xl">{role}</p>

      <p className="max-w-2xl text-lg leading-relaxed text-gray-400">
        {description}
      </p>
    </section>
  );
}

export default Hero;
