interface HeroProps {
  name: string;
  role: string;
  description: string;
}

function Hero({ name, role, description }: HeroProps) {
  return (
    <section className="flex flex-col items-center gap-4 py-20">
      <p>Olá</p>

      <h1 className="text-5xl font-bold">{name}.</h1>

      <p className="text-xl font-medium">{role}</p>

      <p className="max-w-xl text-center text-lg">{description}</p>
    </section>
  );
}

export default Hero;
