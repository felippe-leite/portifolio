import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Sobre", href: "#about" },
    { label: "Experiência", href: "#experience" },
    { label: "Educação", href: "#education" },
    // { label: "Certificados", href: "#certificates" },
    { label: "Projetos", href: "#projects" },
    { label: "Tecnologias", href: "#technologies" },
    { label: "Explorando", href: "#exploring" },
    { label: "Contato", href: "#contact" },
  ];

  return (
    <nav className="border-b border-white/10 pb-6">
      <div className="flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-semibold tracking-wide"
          onClick={() => setIsOpen(false)}
        >
          Felippe Leite
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-6 text-sm text-gray-400 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-cyan-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="text-gray-400 transition-colors hover:text-cyan-400 lg:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
        >
          <span className="text-xl">{isOpen ? "✕" : "☰"}</span>
        </button>
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
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
