import { useEffect, useRef } from "react";

interface PlexusBackgroundProps {
  theme: "dark" | "light";
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Fundo animado minimalista (efeito "plexus"): pontos que flutuam
 * suavemente e se conectam por linhas quando estão próximos.
 * Renderiza num <canvas> e fica contido no elemento pai (o Hero).
 */
function PlexusBackground({ theme }: PlexusBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // No tema claro as linhas precisam ser escuras para aparecerem.
    const rgb = theme === "light" ? "15, 23, 42" : "255, 255, 255";
    const maxDist = 140;

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let rafId = 0;

    let lastWidth = 0;

    const createPoints = () => {
      // densidade proporcional à área, com limites de segurança
      const count = Math.min(
        90,
        Math.max(26, Math.round((width * height) / 16000))
      );
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const resize = () => {
      // dimensiona pela própria caixa do canvas (controlada por CSS)
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      width = w;
      height = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Só recria os pontos quando a LARGURA muda. Assim a barra de
      // endereço do celular (que muda só a altura ao rolar) não
      // reinicia a animação — os pontos seguem de onde estavam.
      if (points.length === 0 || w !== lastWidth) {
        lastWidth = w;
        createPoints();
      } else {
        for (const p of points) {
          if (p.x > width) p.x = width;
          if (p.y > height) p.y = height;
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // linhas entre pontos próximos
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.07;
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // pontos
      ctx.fillStyle = `rgba(${rgb}, 0.26)`;
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
      }
      render();
      rafId = requestAnimationFrame(step);
    };

    resize();
    if (prefersReduced) {
      render(); // frame estático para quem prefere menos movimento
    } else {
      rafId = requestAnimationFrame(step);
    }

    const handleResize = () => {
      resize();
      if (prefersReduced) render();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="plexusCanvas" aria-hidden="true" />;
}

export default PlexusBackground;
