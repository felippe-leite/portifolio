import { useEffect, useRef, useState, type CSSProperties } from "react";

/*
  Céu real do hemisfério sul (Cruzeiro do Sul → Escorpião), a partir do Yale
  Bright Star Catalog. Os dados são gerados por scripts/build-sky-data.mjs.

  - Posição: projeção estereográfica (preserva o formato das constelações),
    com leste para a esquerda, como se vê olhando para o sul.
  - Tamanho/opacidade: magnitude aparente.
  - Cor: temperatura estimada pelo índice B-V.
  - Via Láctea: desenhada ao longo do plano galáctico real (b = 0°).
  - Movimento: a rotação da Terra, acelerada. A cada quadro a ascensão reta de
    tudo é deslocada e o céu é reprojetado, então as estrelas giram em torno
    do polo sul celeste, nascem a leste e se põem a oeste, como no céu real.
*/

interface SkyData {
  center: { ra: number; dec: number };
  stars: number[][]; // [ascensão reta°, declinação°, magnitude, B-V]
  constellations: Record<string, number[][][]>; // segmentos [[ra, dec], [ra, dec]]
}

type Point = { x: number; y: number };

const FIELD_OF_VIEW = 100; // graus visíveis na maior dimensão da tela (telas em pé)

const SIDEREAL_DAY = 86164; // s: uma volta completa do céu
const SPEEDUP = 30; // 30x mais rápido que o real: uma volta a cada ~48 min
const SKY_SPEED = (360 / SIDEREAL_DAY) * SPEEDUP; // graus de ascensão reta por segundo
const FRAME_INTERVAL = 1000 / 30; // o céu anda devagar; 30 fps bastam

const TWINKLE_MAGNITUDE = 1; // estrelas mais brilhantes que isso cintilam
const MILKY_WAY_RESOLUTION = 0.25; // a Via Láctea é difusa: desenhada em 1/4 da resolução
const MILKY_WAY_BOOST = 8;

/*
  Nebulosas escuras: nuvens de poeira que bloqueiam a luz da Via Láctea.
  Raio em graus; `strength` é quanto do brilho some no centro da nuvem.
*/
const COALSACK = { ra: 192.5, dec: -62.5, radius: 3.5, strength: 0.75 }; // Saco de Carvão, colado ao Cruzeiro

// Grande Fenda, em coordenadas galácticas: de Cygnus (l ≈ 75°) até a Nebulosa do Cachimbo, em Ofiúco (l ≈ 357°),
// um pouco acima do plano galáctico
const GREAT_RIFT_PATH = [
  { l: 75, b: 1 },
  { l: 50, b: 1.5 },
  { l: 30, b: 2.5 },
  { l: 15, b: 3.5 },
  { l: 5, b: 5 },
  { l: -3, b: 6.5 },
];
const GREAT_RIFT = { radius: 3, strength: 0.5 };

const toRad = (deg: number) => (deg * Math.PI) / 180;

/*
  O enquadramento inicial é ancorado em duas constelações: Escorpião na margem
  esquerda e Cruzeiro do Sul na direita, em qualquer largura de tela.
  Para isso o campo é girado até as duas ficarem na horizontal, que é como
  elas aparecem no céu do Brasil em certas horas da noite. Depois disso o céu
  gira e elas seguem o caminho real, saindo e voltando a cada volta.
*/
const ANCHOR_LEFT = { ra: 252, dec: -33 }; // Escorpião
const ANCHOR_RIGHT = { ra: 187.5, dec: -60 }; // Cruzeiro do Sul
const CARD_MAX_WIDTH = 1152; // max-w-6xl do card principal em App.tsx

// Fração da largura entre as âncoras: cada uma fica no meio da sua margem
function anchorSpread(width: number) {
  const margin = Math.max(0, (width - CARD_MAX_WIDTH) / 2);
  return Math.min(0.9, Math.max(0.7, 1 - margin / width));
}

function createProjection(center: SkyData["center"], width: number, height: number) {
  const ra0 = toRad(center.ra);
  const dec0 = toRad(center.dec);

  // Estereográfica, com leste para a esquerda e y crescendo para baixo.
  // Pontos a mais de ~120° do centro ficam enormemente esticados: descartados.
  const stereographic = (ra: number, dec: number): Point | null => {
    const deltaRa = toRad(ra) - ra0;
    const decRad = toRad(dec);
    const cosC =
      Math.sin(dec0) * Math.sin(decRad) + Math.cos(dec0) * Math.cos(decRad) * Math.cos(deltaRa);
    if (cosC < -0.5) return null;

    const k = 2 / (1 + cosC);
    return {
      x: -k * Math.cos(decRad) * Math.sin(deltaRa),
      y: -k * (Math.cos(dec0) * Math.sin(decRad) - Math.sin(dec0) * Math.cos(decRad) * Math.cos(deltaRa)),
    };
  };

  const left = stereographic(ANCHOR_LEFT.ra, ANCHOR_LEFT.dec)!;
  const right = stereographic(ANCHOR_RIGHT.ra, ANCHOR_RIGHT.dec)!;
  const angle = -Math.atan2(right.y - left.y, right.x - left.x);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const midX = (left.x + right.x) / 2;
  const midY = (left.y + right.y) / 2;
  const anchorDistance = Math.hypot(right.x - left.x, right.y - left.y);

  // Em telas largas valem as âncoras; em telas em pé, um campo de visão fixo
  const fieldScale = Math.max(width, height) / 2 / (2 * Math.tan(toRad(FIELD_OF_VIEW / 4)));
  const scale = Math.max(fieldScale, (anchorSpread(width) * width) / anchorDistance);

  return (ra: number, dec: number): Point | null => {
    const point = stereographic(ra, dec);
    if (!point) return null;

    const dx = point.x - midX;
    const dy = point.y - midY;
    return {
      x: width / 2 + (dx * cos - dy * sin) * scale,
      y: height / 2 + (dx * sin + dy * cos) * scale,
    };
  };
}

// Coordenadas galácticas → equatoriais (J2000)
function galacticToEquatorial(l: number, b = 0) {
  const raPole = toRad(192.85948);
  const decPole = toRad(27.12825);
  const lNcp = toRad(122.93192);
  const delta = lNcp - toRad(l);
  const bRad = toRad(b);

  const dec = Math.asin(
    Math.sin(decPole) * Math.sin(bRad) + Math.cos(decPole) * Math.cos(bRad) * Math.cos(delta),
  );
  const ra =
    raPole +
    Math.atan2(
      Math.cos(bRad) * Math.sin(delta),
      Math.cos(decPole) * Math.sin(bRad) - Math.sin(decPole) * Math.cos(bRad) * Math.cos(delta),
    );

  return { ra: ((ra * 180) / Math.PI + 360) % 360, dec: (dec * 180) / Math.PI };
}

// Índice B-V → temperatura (Ballesteros) → RGB de corpo negro, suavizado para o tema
function starColor(bv: number) {
  const t = 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bv + 0.62)) / 100;

  const red = t <= 66 ? 255 : 329.7 * Math.pow(t - 60, -0.1332);
  const green = t <= 66 ? 99.47 * Math.log(t) - 161.12 : 288.12 * Math.pow(t - 60, -0.0755);
  const blue = t >= 66 ? 255 : t <= 19 ? 0 : 138.52 * Math.log(t - 10) - 305.04;

  const soften = (channel: number) => Math.round(Math.min(255, Math.max(0, channel)) * 0.6 + 255 * 0.4);
  return `${soften(red)}, ${soften(green)}, ${soften(blue)}`;
}

const starRadius = (mag: number) => Math.max(0.35, 1.9 - 0.3 * mag);
const starAlpha = (mag: number) => Math.min(1, Math.max(0.18, 1 - mag * 0.14));

/*
  Prepara tudo que não muda entre quadros (tamanhos, cores, pontos da Via
  Láctea) e devolve a função que desenha o céu deslocado de `shift` graus.
*/
function createSkyRenderer(canvas: HTMLCanvasElement, sky: SkyData) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = window.devicePixelRatio || 1;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext("2d");

  const milkyWay = document.createElement("canvas");
  milkyWay.width = Math.ceil(width * MILKY_WAY_RESOLUTION);
  milkyWay.height = Math.ceil(height * MILKY_WAY_RESOLUTION);
  const glowCtx = milkyWay.getContext("2d");

  if (!ctx || !glowCtx) return null;

  const project = createProjection(sky.center, width, height);
  const origin = project(sky.center.ra, sky.center.dec)!;
  const oneDegreeNorth = project(sky.center.ra, sky.center.dec + 1)!;
  const pixelsPerDegree = Math.hypot(oneDegreeNorth.x - origin.x, oneDegreeNorth.y - origin.y);
  const isVisible = ({ x, y }: Point, padding: number) =>
    x >= -padding && x <= width + padding && y >= -padding && y <= height + padding;

  const stars = sky.stars.map(([ra, dec, mag, bv], index) => ({
    ra,
    dec,
    radius: starRadius(mag),
    alpha: starAlpha(mag),
    color: starColor(bv),
    twinkle: mag < TWINKLE_MAGNITUDE,
    phase: index * 1.7, // fases diferentes para não piscarem juntas
  }));

  // Mais larga e brilhante perto do centro galáctico (l = 0°, em Sagitário),
  // com um segundo trecho claro entre Carina e o Cruzeiro (l ≈ 295°)
  const milkyWayPoints: { ra: number; dec: number; radius: number; alpha: number }[] = [];
  for (let l = 0; l < 360; l += 2) {
    const fromCenter = Math.min(l, 360 - l);
    const glow = Math.exp(-((fromCenter / 45) ** 2));
    const carinaGlow = Math.exp(-(((l - 295) / 20) ** 2));
    milkyWayPoints.push({
      ...galacticToEquatorial(l),
      radius: (7 + 6 * glow) * pixelsPerDegree,
      alpha: (0.011 + 0.011 * glow + 0.009 * carinaGlow) * MILKY_WAY_BOOST,
    });
  }

  // Nuvens escuras: o Saco de Carvão e a Grande Fenda amostrada a cada 2°
  const darkClouds = [COALSACK];
  for (let i = 1; i < GREAT_RIFT_PATH.length; i++) {
    const from = GREAT_RIFT_PATH[i - 1];
    const to = GREAT_RIFT_PATH[i];
    const steps = Math.ceil(Math.abs(to.l - from.l) / 2);
    for (let step = 0; step < steps; step++) {
      const t = step / steps;
      const l = from.l + (to.l - from.l) * t;
      const b = from.b + (to.b - from.b) * t;
      darkClouds.push({ ...galacticToEquatorial((l + 360) % 360, b), ...GREAT_RIFT });
    }
  }

  return (shift: number, time: number) => {
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Via Láctea: desenhada à parte com intensidade multiplicada e composta
    // uma vez só; somar muitas camadas quase transparentes cria faixas visíveis
    glowCtx.setTransform(MILKY_WAY_RESOLUTION, 0, 0, MILKY_WAY_RESOLUTION, 0, 0);
    glowCtx.clearRect(0, 0, width, height);

    for (const blob of milkyWayPoints) {
      const point = project(blob.ra - shift, blob.dec);
      if (!point || !isVisible(point, blob.radius)) continue;

      const gradient = glowCtx.createRadialGradient(point.x, point.y, 0, point.x, point.y, blob.radius);
      gradient.addColorStop(0, `rgba(200, 210, 235, ${blob.alpha})`);
      gradient.addColorStop(0.5, `rgba(200, 210, 235, ${blob.alpha * 0.45})`);
      gradient.addColorStop(1, "rgba(200, 210, 235, 0)");
      glowCtx.fillStyle = gradient;
      glowCtx.beginPath();
      glowCtx.arc(point.x, point.y, blob.radius, 0, Math.PI * 2);
      glowCtx.fill();
    }

    // A poeira apaga parte do brilho já desenhado
    glowCtx.globalCompositeOperation = "destination-out";
    for (const cloud of darkClouds) {
      const point = project(cloud.ra - shift, cloud.dec);
      const radius = cloud.radius * pixelsPerDegree;
      if (!point || !isVisible(point, radius)) continue;

      const gradient = glowCtx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
      gradient.addColorStop(0, `rgba(0, 0, 0, ${cloud.strength})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      glowCtx.fillStyle = gradient;
      glowCtx.beginPath();
      glowCtx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      glowCtx.fill();
    }
    glowCtx.globalCompositeOperation = "source-over";

    ctx.globalAlpha = 1 / MILKY_WAY_BOOST;
    ctx.drawImage(milkyWay, 0, 0, width, height);
    ctx.globalAlpha = 1;

    // Linhas das constelações
    ctx.strokeStyle = "rgba(165, 243, 252, 0.12)";
    ctx.lineWidth = 0.75;
    for (const segments of Object.values(sky.constellations)) {
      for (const [[ra1, dec1], [ra2, dec2]] of segments) {
        const from = project(ra1 - shift, dec1);
        const to = project(ra2 - shift, dec2);
        if (!from || !to) continue;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
    }

    // Estrelas
    for (const star of stars) {
      const point = project(star.ra - shift, star.dec);
      if (!point || !isVisible(point, 10)) continue;

      let { radius, alpha } = star;

      if (star.twinkle) {
        const wave = Math.sin(time * 1.4 + star.phase);
        alpha *= 0.6 + 0.4 * wave;
        radius *= 1 + 0.12 * wave;

        const halo = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 5);
        halo.addColorStop(0, `rgba(${star.color}, ${0.3 * alpha})`);
        halo.addColorStop(1, `rgba(${star.color}, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius * 5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };
}

// Comprimento do rastro + distância percorrida (px), em sincronia com .shooting-star no CSS
const METEOR_LENGTH = 140;
const METEOR_TRAVEL = 240;

/*
  A estrela cadente nasce sempre numa das margens laterais, onde o céu aparece
  sem o card na frente, e cai inclinada para caber mesmo em margens estreitas.
*/
function randomMeteor(): CSSProperties | null {
  const width = window.innerWidth;
  const margin = Math.max(0, (width - CARD_MAX_WIDTH) / 2);
  if (margin < 48) return null; // telas estreitas: o card cobre quase tudo

  const angle = 60 + Math.random() * 18; // graus abaixo da horizontal
  const goingRight = Math.random() < 0.5;
  const onLeftMargin = Math.random() < 0.5;
  const marginCenter = onLeftMargin ? margin / 2 : width - margin / 2;
  const horizontalSpan = (METEOR_LENGTH + METEOR_TRAVEL) * Math.cos(toRad(angle));

  return {
    left: marginCenter + (goingRight ? -1 : 1) * (horizontalSpan / 2),
    top: `${5 + Math.random() * 45}%`,
    rotate: `${goingRight ? angle : 180 - angle}deg`,
  };
}

function ShootingStar() {
  const [meteor, setMeteor] = useState<{ id: number; style: CSSProperties } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timeout: number;
    const schedule = (delay: number) => {
      timeout = window.setTimeout(() => {
        const style = randomMeteor();
        if (style) setMeteor({ id: Date.now(), style });
        schedule(12000 + Math.random() * 13000);
      }, delay);
    };

    schedule(4000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!meteor) return null;
  return <span key={meteor.id} className="shooting-star" style={meteor.style} />;
}

function AstronomyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let sky: SkyData | null = null;
    let renderFrame: ReturnType<typeof createSkyRenderer> = null;
    let animationFrame = 0;
    let resizeTimeout: number;
    let cancelled = false;
    let start = 0;
    let lastFrame = 0;

    const setup = () => {
      if (!sky || !canvasRef.current) return;
      renderFrame = createSkyRenderer(canvasRef.current, sky);
      if (reduceMotion) renderFrame?.(0, 0);
    };

    const loop = (now: number) => {
      animationFrame = requestAnimationFrame(loop);
      if (now - lastFrame < FRAME_INTERVAL) return;
      lastFrame = now;

      const elapsed = (now - start) / 1000;
      renderFrame?.(elapsed * SKY_SPEED, elapsed);
    };

    // Carregado sob demanda para não pesar no bundle inicial
    import("../../data/sky.json").then((module) => {
      if (cancelled) return;
      sky = module.default as SkyData;
      setup();

      if (!reduceMotion) {
        start = performance.now();
        animationFrame = requestAnimationFrame(loop);
      }
    });

    const onResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(setup, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="astronomy-background pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <ShootingStar />
    </div>
  );
}

export default AstronomyBackground;
