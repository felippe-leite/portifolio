function AstronomyBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Campo de estrelas */}
      <div className="astronomy-stars" />

      {/* Órbita esquerda */}
      <div className="astronomy-orbit astronomy-orbit-left">
        <span className="astronomy-planet astronomy-planet-left" />
      </div>

      {/* Órbita direita */}
      <div className="astronomy-orbit astronomy-orbit-right">
        <span className="astronomy-planet astronomy-planet-right" />
      </div>

      {/* Estrelas maiores */}
      <span className="astronomy-star star-1" />
      <span className="astronomy-star star-2" />
      <span className="astronomy-star star-3" />
      <span className="astronomy-star star-4" />
      <span className="astronomy-star star-5" />
    </div>
  );
}

export default AstronomyBackground;
