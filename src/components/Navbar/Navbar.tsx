import { useLanguage } from "../../i18n/useLanguage";
import { useState } from "react";
import type { MouseEvent } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { certificates } from "../../data/certificates";
import { education } from "../../data/education";

function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // The theme still works when browser storage is unavailable.
    }
  }

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    setIsOpen(false);

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }

  const links = [
    { label: "Sobre", href: "#about" },
    { label: "Experiência", href: "#experience" },
    { label: "Projetos", href: "#projects" },
    ...(education.length > 0
      ? [{ label: "Educação", href: "#education" }]
      : []),
    ...(certificates.length > 0
      ? [{ label: "Certificados", href: "#certificates" }]
      : []),
    { label: "Tecnologias", href: "#technologies" },
    { label: "Explorando", href: "#exploring" },
    { label: "Contato", href: "#contact" },
  ];

  return (
    <nav className="border-b border-line/10 pb-6">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <a
          href="#"
          className="font-display text-sm font-semibold tracking-tight"
          onClick={(event) => handleNavigation(event, "#")}
        >
          Felippe Leite
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-3 text-sm text-muted xl:flex xl:gap-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => handleNavigation(event, link.href)}
                className="transition-colors hover:text-accent"
              >
                {t(link.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t(theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro")}
            title={t(theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro")}
            className="rounded-md border border-line/15 p-2 text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            {theme === "dark" ? <FiSun aria-hidden="true" size={18} /> : <FiMoon aria-hidden="true" size={18} />}
          </button>
          <div
            role="group"
            aria-label={t("Idioma")}
            className="flex rounded-md border border-line/15 p-1 font-mono text-xs"
          >
            {(["pt", "en"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                aria-pressed={language === option}
                aria-label={option === "pt" ? "Português" : "English"}
                lang={option === "pt" ? "pt-BR" : "en"}
                className={`rounded px-2 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                  language === option
                    ? "bg-action text-on-action"
                    : "text-muted hover:text-accent"
                }`}
              >
                {option === "pt" ? "PT" : "ENG"}
              </button>
            ))}
          </div>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="text-muted transition-colors hover:text-accent xl:hidden"
            aria-label={t(isOpen ? "Fechar menu" : "Abrir menu")}
            aria-expanded={isOpen}
          >
            <span className="text-xl">{isOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="mt-6 flex flex-col gap-4 border-t border-line/10 pt-6 text-sm text-muted xl:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => handleNavigation(event, link.href)}
                className="block transition-colors hover:text-accent"
              >
                {t(link.label)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
