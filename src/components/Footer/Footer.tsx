import { useLanguage } from "../../i18n/useLanguage";
function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/10 pt-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display font-semibold tracking-tight">Felippe Leite</p>

          <p className="mt-1 font-mono text-xs text-subtle">{t("footer.profile")}</p>
        </div>

        <div className="flex gap-5 text-sm text-muted">
          <a
            href="https://github.com/felippe-leite"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/felippeleite27/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-line/5 pt-5 text-xs text-subtle md:flex-row md:items-center md:justify-between">
        <p>© {year} Felippe Leite. {t("Todos os direitos reservados.")}</p>

        <p className="font-mono">{t("Built with React + TypeScript")}</p>
      </div>
    </footer>
  );
}

export default Footer;
