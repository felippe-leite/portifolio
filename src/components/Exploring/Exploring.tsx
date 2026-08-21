const topics = [
  "Arquitetura de Software",
  "Cyber Security",
  "Sistemas Distribuídos",
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

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {topics.map((topic) => (
          <div
            key={topic}
            className="
              group
              rounded-lg
              border border-white/10
              bg-white/[0.02]
              px-5 py-4
              transition-all duration-300
              hover:-translate-y-1
              hover:border-cyan-400/40
              hover:bg-white/[0.04]
            "
          >
            <span
              className="
                font-mono text-sm text-gray-400
                transition-colors duration-300
                group-hover:text-cyan-400
              "
            >
              {topic}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Exploring;
