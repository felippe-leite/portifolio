import { useLanguage } from "../../i18n/useLanguage";
import { useState } from "react";
import { certificates } from "../../data/certificates";
import { education } from "../../data/education";

function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="border-b border-white/10 pb-6">
      <div className="flex items-center justify-between gap-4">
        <a
          href="#"
          className="text-sm font-semibold tracking-wide"
          onClick={() => setIsOpen(false)}
        >
          Felippe Leite
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-3 text-sm text-gray-400 lg:flex xl:gap-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-cyan-400"
              >
                {t(link.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-4">
          <div
            role="group"
            aria-label={t("Idioma")}
            className="flex rounded-md border border-white/15 p-1 font-mono text-xs"
          >
            {(["pt", "en"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                aria-pressed={language === option}
                aria-label={option === "pt" ? "Português" : "English"}
                lang={option === "pt" ? "pt-BR" : "en"}
                className={`rounded px-2 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  language === option
                    ? "bg-cyan-400 text-black"
                    : "text-gray-400 hover:text-cyan-400"
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
            className="text-gray-400 transition-colors hover:text-cyan-400 lg:hidden"
            aria-label={t(isOpen ? "Fechar menu" : "Abrir menu")}
            aria-expanded={isOpen}
          >
            <span className="text-xl">{isOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-400 lg:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block transition-colors hover:text-cyan-400"
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
