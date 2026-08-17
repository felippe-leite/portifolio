import { experiences } from "../../data/experience";

function Experience() {
  return (
    <section id="experience" className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
          // Experiência
        </p>

        <h2 className="mt-2 text-3xl font-bold">Experiência profissional</h2>
      </div>

      <div className="flex flex-col gap-6">
        {experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.role}`}
            className="rounded-lg border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {experience.role}
                </h3>

                <p className="font-mono text-sm text-cyan-400">
                  {experience.company}
                </p>
              </div>

              <span className="font-mono text-sm text-gray-500">
                {experience.period}
              </span>
            </div>

            <p className="mt-4 max-w-3xl leading-relaxed text-gray-400">
              {experience.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {experience.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-gray-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;