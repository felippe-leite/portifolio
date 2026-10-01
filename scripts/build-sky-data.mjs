/*
  Gera src/data/sky.json a partir do Yale Bright Star Catalog (BSC5).

  Uso:
    curl -O http://tdc-www.harvard.edu/catalogs/bsc5.dat.gz && gunzip bsc5.dat.gz
    node scripts/build-sky-data.mjs bsc5.dat

  Formato do catálogo (colunas, base 1): http://tdc-www.harvard.edu/catalogs/bsc5.readme
*/
import { readFileSync, writeFileSync } from "node:fs";

const [catalogPath] = process.argv.slice(2);
if (!catalogPath) {
  console.error("Uso: node scripts/build-sky-data.mjs <bsc5.dat>");
  process.exit(1);
}

// Centro da projeção: entre o Cruzeiro do Sul e Escorpião, sobre a Via Láctea
const CENTER = { ra: 217.5, dec: -45 };
// Com o céu girando, qualquer ascensão reta pode entrar na tela; só a
// declinação limita o que chega a aparecer
const MAX_DECLINATION = 15;
const MAX_MAGNITUDE = 5.5; // limite aproximado do olho nu

// Linhas das constelações, por designação de Bayer (colunas 8–14, sem espaços)
const CONSTELLATIONS = {
  crux: [
    ["Alp1Cru", "GamCru"],
    ["BetCru", "DelCru"],
  ],
  scorpius: [
    ["Bet1Sco", "DelSco"],
    ["DelSco", "PiSco"],
    ["DelSco", "SigSco"],
    ["SigSco", "AlpSco"],
    ["AlpSco", "TauSco"],
    ["TauSco", "EpsSco"],
    ["EpsSco", "Mu1Sco"],
    ["Mu1Sco", "Zet2Sco"],
    ["Zet2Sco", "EtaSco"],
    ["EtaSco", "TheSco"],
    ["TheSco", "Iot1Sco"],
    ["Iot1Sco", "KapSco"],
    ["KapSco", "LamSco"],
    ["LamSco", "UpsSco"],
  ],
};

const round = (value, digits = 2) => Number(value.toFixed(digits));

function parseLine(line) {
  const field = (start, end) => line.slice(start - 1, end).trim();

  const raH = field(76, 77);
  const magnitude = field(103, 107);
  if (!raH || !magnitude) return null; // entradas sem posição (novas, aglomerados)

  const ra = (Number(raH) + Number(field(78, 79)) / 60 + Number(field(80, 83)) / 3600) * 15;
  const sign = field(84, 84) === "-" ? -1 : 1;
  const dec = sign * (Number(field(85, 86)) + Number(field(87, 88)) / 60 + Number(field(89, 90)) / 3600);
  const bv = field(110, 114);

  return {
    bayer: line.slice(7, 14).replace(/\s/g, ""),
    ra,
    dec,
    mag: Number(magnitude),
    bv: bv ? Number(bv) : 0.6, // sem cor medida: assume tipo solar
  };
}

const catalog = readFileSync(catalogPath, "latin1")
  .split("\n")
  .map(parseLine)
  .filter(Boolean);

const stars = catalog
  .filter((s) => s.mag <= MAX_MAGNITUDE)
  .filter((s) => s.dec <= MAX_DECLINATION)
  .sort((a, b) => a.mag - b.mag) // mais brilhantes primeiro
  .map((s) => [round(s.ra), round(s.dec), round(s.mag), round(s.bv)]);

const byBayer = new Map(catalog.filter((s) => s.bayer).map((s) => [s.bayer, s]));

const constellations = Object.fromEntries(
  Object.entries(CONSTELLATIONS).map(([name, segments]) => [
    name,
    segments.map((pair) =>
      pair.map((id) => {
        const star = byBayer.get(id);
        if (!star) throw new Error(`Estrela não encontrada no catálogo: ${id}`);
        return [round(star.ra), round(star.dec)];
      }),
    ),
  ]),
);

writeFileSync(
  new URL("../src/data/sky.json", import.meta.url),
  JSON.stringify({ center: CENTER, stars, constellations }),
);

console.log(`${stars.length} estrelas, ${Object.keys(constellations).length} constelações`);
