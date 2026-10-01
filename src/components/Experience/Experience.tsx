import { useLanguage } from "../../i18n/useLanguage";
import { experiences } from "../../data/experience";

function Experience() {
  const { t } = useLanguage();
  return (
    <section id="experience" className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">{t("// Experiência")}</p>

        <h2 className="mt-2 text-3xl font-bold">{t("Experiência profissional")}</h2>
      </div>

      <div className="flex flex-col gap-6">
        {experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.role}`}
            className="rounded-lg border border-line/10 bg-card p-6"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{t(experience.role)}</h3>

                <p className="font-mono text-sm text-accent">
                  {t(experience.company)}
                </p>
              </div>

              <span className="font-mono text-sm text-subtle">
                {t(experience.period)}
              </span>
            </div>

            <p className="mt-4 max-w-3xl leading-relaxed text-muted">
              {t(experience.description)}
            </p>

            {experience.highlights && (
              <ul className="mt-5 flex max-w-3xl flex-col gap-3 text-sm leading-relaxed text-secondary">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-action" />
                    <span>{t(highlight)}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {experience.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-line/10 bg-card-hover px-3 py-1 font-mono text-xs text-secondary"
                >
                  {t(technology)}
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
