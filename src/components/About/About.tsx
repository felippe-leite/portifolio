import { useLanguage } from "../../i18n/useLanguage";
function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">{t("// Sobre mim")}</p>

        <h2 className="text-3xl font-bold md:text-4xl">{t("Desenvolvedor focado em Backend")}</h2>
      </div>
      <p className="max-w-3xl text-lg leading-relaxed text-gray-400">{t("about.description")}</p>
    </section>
  );
}

export default About;
