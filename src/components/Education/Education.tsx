import { education } from "../../data/education";

function Education() {
  return (
    <section id="education" className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
          // Educação
        </p>

        <h2 className="mt-2 text-3xl font-bold">Formação acadêmica</h2>
      </div>

      <div className="flex flex-col gap-6">
        {education.map((item) => (
          <article
            key={`${item.institution}-${item.course}`}
            className="rounded-lg border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{item.course}</h3>

                <p className="font-mono text-sm text-cyan-400">
                  {item.institution}
                </p>
              </div>

              <span className="font-mono text-sm text-gray-500">
                {item.period}
              </span>
            </div>

            {item.description && (
              <p className="mt-4 max-w-3xl leading-relaxed text-gray-400">
                {item.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Education;