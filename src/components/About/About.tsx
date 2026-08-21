function About() {
  return (
    <section id="about" className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
          // Sobre mim
        </p>

        <h2 className="text-3xl font-bold md:text-4xl">
          Desenvolvedor focado em Backend
        </h2>
      </div>
      <p className="max-w-3xl text-lg leading-relaxed text-gray-400">
        Desenvolvedor focado em backend, com interesse em construir sistemas
        robustos, APIs e soluções escaláveis. Tenho trabalhado principalmente
        com Java e Spring Boot, buscando aplicar boas práticas de engenharia de
        software, arquitetura e desenvolvimento orientado a problemas.
      </p>
    </section>
  );
}

export default About;
