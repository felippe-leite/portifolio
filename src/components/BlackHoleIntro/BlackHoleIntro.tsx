import { useEffect, useRef } from "react";
import { useLanguage } from "../../i18n/useLanguage";

const DURATION = 3000;
const STAR_COUNT = 90;

// Deterministic pseudo-random in [0, 1), so stars scatter evenly without lining up.
const hash = (n: number) => {
  const value = Math.sin(n * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  x: hash(i + 1),
  y: hash(i + 101),
  size: i % 3 === 0 ? 2 : 1,
  alpha: 0.12 + (i % 4) * 0.08,
}));

export default function BlackHoleIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      onComplete();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => {
      if (motionPreference.matches) onComplete();
    };
    motionPreference.addEventListener("change", handleMotionChange);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onComplete();
    };
    window.addEventListener("keydown", handleKeyDown);

    let width = 0;
    let height = 0;
    let frame = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const started = performance.now();

    function draw(now: number) {
      if (!ctx) return;
      const progress = Math.min((now - started) / DURATION, 1);
      const collapse = Math.max(0, Math.min((progress - 0.45) / 0.25, 1));
      const burst = Math.max(0, (progress - 0.7) / 0.3);
      const size = Math.min(width * 0.24, height * 0.2, 145);
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height * 0.46);

      // A deterministic star field keeps the scene stable between frames.
      for (const star of STARS) {
        ctx.fillStyle = `rgba(190, 215, 240, ${star.alpha})`;
        ctx.fillRect(star.x * width - width / 2, star.y * height - height * 0.46, star.size, 1);
      }

      if (burst === 0) {
        const radius = size * (1 - collapse * 0.72);
        const glow = ctx.createRadialGradient(0, 0, radius * 0.35, 0, 0, size * 2.4);
        glow.addColorStop(0, "rgba(34,211,238,0.35)");
        glow.addColorStop(0.4, "rgba(56,100,220,0.12)");
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(-size * 3, -size * 3, size * 6, size * 6);

        ctx.save();
        ctx.rotate(-0.32);
        for (let i = 18; i > 0; i--) {
          ctx.beginPath();
          ctx.ellipse(0, 0, radius * (1.1 + i * 0.045), radius * (0.24 + i * 0.012), 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${i < 5 ? "190,245,255" : "34,180,238"}, ${0.1 + (19 - i) * 0.025})`;
          ctx.lineWidth = i < 5 ? 2 : 1;
          ctx.stroke();
        }
        ctx.restore();

        for (let i = 0; i < 140; i++) {
          const phase = ((i / 140 + progress * (0.8 + collapse)) % 1);
          const distance = radius * 0.7 + (1 - phase) ** 2 * size * 3.5;
          const angle = i * 2.39996 + progress * 7 + phase * 5;
          ctx.beginPath();
          ctx.arc(Math.cos(angle) * distance, Math.sin(angle) * distance * 0.55, 0.7 + phase, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(125,225,255,${phase * 0.75})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = "#020308";
        ctx.shadowColor = "#67e8f9";
        ctx.shadowBlur = 18 + collapse * 25;
        ctx.fill();
        ctx.strokeStyle = "rgba(165,243,252,0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // One expanding bloom, with a gradual fade instead of repeated flashes.
        const radius = size * 0.2 + burst ** 0.7 * Math.hypot(width, height);
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        glow.addColorStop(0, `rgba(180,240,255,${0.85 * (1 - burst)})`);
        glow.addColorStop(0.25, `rgba(34,211,238,${0.55 * (1 - burst)})`);
        glow.addColorStop(1, "rgba(56,100,220,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(-width, -height, width * 2, height * 2);
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.65, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(165,243,252,${(1 - burst) * 0.6})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(1 - Math.max(0, (progress - 0.82) / 0.18));
      }
      if (progress < 1) frame = requestAnimationFrame(draw);
      else onComplete();
    }

    frame = requestAnimationFrame(draw);
    const timeout = window.setTimeout(onComplete, DURATION + 200);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", resize);
      motionPreference.removeEventListener("change", handleMotionChange);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 bg-[#020308] text-white" role="dialog" aria-modal="true" aria-label={t("Abertura do portfólio")}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[18%] px-6 text-center">
        <p className="font-display text-xl font-semibold tracking-tight">Felippe Leite</p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-cyan-200">{t("Entrando no meu universo")}</p>
      </div>
      <button type="button" autoFocus onClick={onComplete} className="absolute bottom-8 right-6 rounded-md border border-white/20 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-cyan-300 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300 sm:right-10">
        {t("Pular abertura")}
      </button>
    </div>
  );
}
