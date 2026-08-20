function Footer() {
  return (
    <footer className="border-t border-white/10 pt-8">
      <div className="flex flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Felippe Leite. Todos os direitos
          reservados.
        </p>

        <p className="font-mono text-xs text-gray-600">
          Java · Spring Boot · TypeScript
        </p>
      </div>
    </footer>
  );
}

export default Footer;