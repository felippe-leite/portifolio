function Navbar() {
  return (
    <nav className="flex justify-between py-6">
      <h1>Felippe Leite</h1>

      <ul className="flex gap-6">
        <li>
          <a href="#about">Sobre</a>
        </li>
        <li>
          <a href="#projects">Projetos</a>
        </li>
        <li>
          <a href="#tecnologias">Tecnologias</a>
        </li>
        <li>
          <a href="#contato">Contato</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
