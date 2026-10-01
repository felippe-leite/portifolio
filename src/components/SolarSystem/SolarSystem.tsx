import type { CSSProperties } from "react";

/*
  Escala comprimida: as distâncias reais não cabem em 320px (Netuno fica ~77x
  mais longe que Mercúrio), então os raios são espaçados para leitura, e os
  períodos seguem a 3ª lei de Kepler sobre esses raios: T = 6s · (r / 28)^1.5.
  A ordem, os tamanhos relativos e as cores seguem os planetas reais.
*/

interface Moon {
  radius: number; // px, a partir do centro do planeta
  period: number; // s
}

interface Planet {
  name: string;
  radius: number; // raio da órbita em px
  size: number; // diâmetro do planeta em px
  period: number; // s
  phase: number; // 0–1, posição inicial na órbita
  lit: string;
  dark: string;
  moons?: Moon[];
  ring?: boolean;
}

const planets: Planet[] = [
  { name: "Mercúrio", radius: 28, size: 3, period: 6, phase: 0.3, lit: "#d4d4d4", dark: "#3f3f46" },
  { name: "Vênus", radius: 40, size: 5, period: 10, phase: 0.7, lit: "#f5deb3", dark: "#6b5a3a" },
  {
    name: "Terra",
    radius: 54,
    size: 5,
    period: 16,
    phase: 0.15,
    lit: "#93c5fd",
    dark: "#1e3a5f",
    moons: [{ radius: 6, period: 3 }], // Lua
  },
  { name: "Marte", radius: 68, size: 4, period: 23, phase: 0.55, lit: "#f4a582", dark: "#6b2a1a" },
  {
    name: "Júpiter",
    radius: 92,
    size: 9,
    period: 36,
    phase: 0.85,
    lit: "#f3d2a8",
    dark: "#6b4a2e",
    // Luas galileanas: Io, Europa, Ganimedes, Calisto (ressonância 1:2:4 nas três primeiras)
    moons: [
      { radius: 7, period: 2.5 },
      { radius: 8.5, period: 5 },
      { radius: 10, period: 10 },
      { radius: 12, period: 23 },
    ],
  },
  { name: "Saturno", radius: 114, size: 8, period: 49, phase: 0.4, lit: "#f5e6b8", dark: "#6b5c38", ring: true },
  { name: "Urano", radius: 135, size: 6, period: 63, phase: 0.65, lit: "#cffafe", dark: "#155e75" },
  { name: "Netuno", radius: 156, size: 6, period: 79, phase: 0.1, lit: "#a5b4fc", dark: "#1e1b4b" },
];

// Cinturão de asteroides entre Marte e Júpiter
const ASTEROID_BELT_RADIUS = 78;
const ASTEROID_BELT_PERIOD = 30;

function orbitStyle(radius: number, period: number, phase = 0): CSSProperties {
  return {
    width: radius * 2,
    height: radius * 2,
    animationDuration: `${period}s`,
    animationDelay: `${-phase * period}s`,
  };
}

function SolarSystem() {
  return (
    <div
      className="relative flex h-80 w-80 items-center justify-center"
      role="img"
      aria-label="Sistema solar animado"
    >
      {/* Linhas das órbitas */}
      {planets.map((planet) => (
        <div
          key={`${planet.name}-ring`}
          className="absolute rounded-full border border-accent/10"
          style={{ width: planet.radius * 2, height: planet.radius * 2 }}
        />
      ))}

      {/* Cinturão de asteroides */}
      <div
        className="solar-orbit absolute rounded-full border border-dashed border-line/10"
        style={orbitStyle(ASTEROID_BELT_RADIUS, ASTEROID_BELT_PERIOD)}
      />

      {/* Sol */}
      <div className="solar-sun h-5 w-5 rounded-full" />

      {/* Planetas */}
      {planets.map((planet) => (
        <div
          key={planet.name}
          className="solar-orbit absolute"
          style={orbitStyle(planet.radius, planet.period, planet.phase)}
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
            style={{ width: planet.size, height: planet.size }}
            title={planet.name}
          >
            <div
              className="solar-planet h-full w-full rounded-full"
              style={{ "--planet-lit": planet.lit, "--planet-dark": planet.dark } as CSSProperties}
            />

            {planet.ring && (
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 solar-ring rounded-[50%] border"
                style={{ width: planet.size * 2.3, height: planet.size * 0.8, rotate: "-20deg" }}
              />
            )}

            {planet.moons?.map((moon) => (
              <div
                key={moon.radius}
                className="solar-orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={orbitStyle(moon.radius, moon.period)}
              >
                <div className="absolute left-1/2 top-0 h-[1.5px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 solar-moon rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SolarSystem;
