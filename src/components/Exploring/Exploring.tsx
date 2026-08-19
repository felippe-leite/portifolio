const topics = [
  "Arquitetura de Software",
  "Cyber Security",
  "Sistemas Distribuídos",
  "Computação",
  "Astronomia",
  "Física",
];

function Exploring() {
  return (
    <section id="exploring" className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
          // Atualmente explorando
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Explorando novos conhecimentos
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 font-mono text-sm text-gray-300 transition-colors hover:border-cyan-400/30 hover:text-cyan-400"
          >
            {topic}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Exploring;