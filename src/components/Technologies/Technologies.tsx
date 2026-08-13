const technologies = [
  "Java",
  "Spring Boot",
  "TypeScript",
  "React",
  "PostgreSQL",
  "Docker",
];

function Technologies() {
  return (
    <section id="technologies" className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
          // Stack
        </p>

        <h2 className="text-2xl font-bold">Tecnologias</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-gray-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Technologies;
