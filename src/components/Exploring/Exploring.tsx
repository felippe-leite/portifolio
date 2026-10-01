import { useLanguage } from "../../i18n/useLanguage";
const topics = [
  "Arquitetura de Software",
  "exploring.security",
  "Sistemas Distribuídos",
  "exploring.pentest",
];

function Exploring() {
  const { t } = useLanguage();
  return (
    <section id="exploring" className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">{t("// Atualmente explorando")}</p>

        <h2 className="mt-2 text-3xl font-bold">{t("Explorando novos conhecimentos")}</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {topics.map((topic) => (
          <div
            key={topic}
            className="
              group
              rounded-lg
              border border-line/10
              bg-card
              px-5 py-4
              transition-all duration-300
              hover:-translate-y-1
              hover:border-accent/40
              hover:bg-card-hover
            "
          >
            <span
              className="
                font-mono text-sm text-muted
                transition-colors duration-300
                group-hover:text-accent
              "
            >
              {t(topic)}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Exploring;
