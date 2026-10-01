import { useLanguage } from "../../i18n/useLanguage";
import { certificates } from "../../data/certificates";

function Certificates() {
  const { t } = useLanguage();
  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">{t("// Certificados")}</p>

        <h2 className="mt-2 text-3xl font-bold">{t("Certificações e cursos")}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {certificates.map((certificate) => (
          <article
            key={`${certificate.name}-${certificate.institution}`}
            className="flex flex-col justify-between gap-5 rounded-lg border border-line/10 bg-card p-6 transition-colors hover:border-accent/30"
          >
            <div>
              <h3 className="text-xl font-semibold">
                {certificate.name}
              </h3>

              <p className="mt-2 font-mono text-sm text-accent">
                {certificate.institution}
              </p>

              <p className="mt-2 text-sm text-subtle">
                {certificate.year}
              </p>
            </div>

            {certificate.link && (
              <a
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm font-medium underline underline-offset-4 transition-colors hover:text-accent"
              >{t("Ver certificado")}</a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Certificates;
