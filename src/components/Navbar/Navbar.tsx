function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-white/10 pb-6">

    <a href="#" className="text-sm font-semibold tracking-wide">
      Felippe Leite
    </a>

      <ul className="flex gap-6 text-sm text-gray-400">
        <li>
          <a href="#about"
          className="transition-colors hover:text-cyan-400"
          >Sobre</a>
        </li>
        <li>
          <a href="#projects"
          className="transition-colors hover:text-cyan-400"
          >Projetos</a>
        </li>
        <li>
          <a href="#technologies"
          className="transition-colors hover:text-cyan-400"
          >Tecnologias</a>
        </li>
        <li>
          <a href="#contact"
          className="transition-colors hover:text-cyan-400"
          >Contato</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
