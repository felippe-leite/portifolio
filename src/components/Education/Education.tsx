import { useLanguage } from "../../i18n/useLanguage";
import { education } from "../../data/education";

function Education() {
  const { t } = useLanguage();
  if (education.length === 0) return null;

  return (
    <section id="education" className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">{t("// Educação")}</p>

        <h2 className="mt-2 text-3xl font-bold">{t("Formação acadêmica")}</h2>
      </div>

      <div className="flex flex-col gap-6">
        {education.map((item) => (
          <article
            key={`${item.institution}-${item.course}`}
            className="rounded-lg border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{t(item.course)}</h3>

                <p className="font-mono text-sm text-cyan-400">
                  {item.institution}
                </p>
              </div>

              {item.period && (
                <span className="font-mono text-sm text-gray-500">
                  {t(item.period)}
                </span>
              )}
            </div>

            {item.description && (
              <p className="mt-4 max-w-3xl leading-relaxed text-gray-400">
                {t(item.description)}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Education;
