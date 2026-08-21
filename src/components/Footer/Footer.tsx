function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 pt-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">Felippe Leite</p>

          <p className="mt-1 font-mono text-xs text-gray-500">
            Backend Developer • Java • Spring Boot • TypeScript
          </p>
        </div>

        <div className="flex gap-5 text-sm text-gray-400">
          <a
            href="https://github.com/felippe-leite"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-cyan-400"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/felippeleite27/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-cyan-400"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-5 text-xs text-gray-600 md:flex-row md:items-center md:justify-between">
        <p>© {year} Felippe Leite. Todos os direitos reservados.</p>

        <p className="font-mono">Built with React + TypeScript</p>
      </div>
    </footer>
  );
}

export default Footer;
