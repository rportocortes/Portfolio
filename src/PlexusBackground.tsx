import { useEffect, useRef } from "react";

interface PlexusBackgroundProps {
  theme: "dark" | "light";
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** profundidade 0.45–1: afeta tamanho, brilho e velocidade (parallax) */
  depth: number;
  /** nós "destaque" recebem glow e raio maior */
  bright: boolean;
}

/**
 * Fundo animado (efeito "plexus"/NET): pontos que flutuam e se conectam por
 * linhas; entre trios de pontos próximos são preenchidas facetas triangulares
 * translúcidas, dando o aspecto cristalino. Alguns nós recebem brilho (glow).
 * Renderiza num <canvas> contido no elemento pai (o Hero).
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

    // No tema claro as linhas/facetas precisam ser escuras para aparecerem.
    const rgb = theme === "light" ? "15, 23, 42" : "255, 255, 255";
    const maxDist = 160;

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let rafId = 0;
    let lastWidth = 0;

    const createPoints = () => {
      // densidade proporcional à área, com limites de segurança
      const count = Math.min(
        110,
        Math.max(34, Math.round((width * height) / 13000))
      );

      // Distribui numa grade com "jitter" em vez de posições totalmente
      // aleatórias: isso evita aglomerados (clumps) e espalha os pontos —
      // e, por consequência, as facetas triangulares — por toda a tela.
      const aspect = width / height;
      const cols = Math.max(1, Math.round(Math.sqrt(count * aspect)));
      const rows = Math.max(1, Math.ceil(count / cols));
      const cellW = width / cols;
      const cellH = height / rows;

      points = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (points.length >= count) break;
          const depth = 0.45 + Math.random() * 0.55;
          points.push({
            // centro da célula + deslocamento aleatório (70% da célula)
            x: (col + 0.5) * cellW + (Math.random() - 0.5) * cellW * 0.7,
            y: (row + 0.5) * cellH + (Math.random() - 0.5) * cellH * 0.7,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            depth,
            bright: Math.random() < 0.16,
          });
        }
      }
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      width = w;
      height = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Só recria os pontos quando a LARGURA muda (evita reiniciar a animação
      // quando a barra de endereço do celular muda apenas a altura ao rolar).
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

      // --- vizinhanças (uma vez por frame) ---
      const neighbors: number[][] = points.map(() => []);
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          if (Math.abs(a.x - b.x) > maxDist || Math.abs(a.y - b.y) > maxDist)
            continue;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDist) {
            neighbors[i].push(j);
            neighbors[j].push(i);
          }
        }
      }

      // --- facetas triangulares (cada trio desenhado uma vez no menor índice) ---
      ctx.lineJoin = "round";
      for (let i = 0; i < points.length; i++) {
        const ns = neighbors[i].filter((n) => n > i);
        for (let a = 0; a < ns.length; a++) {
          for (let b = a + 1; b < ns.length; b++) {
            const j = ns[a];
            const k = ns[b];
            // só forma triângulo se j e k também estão conectados
            const pj = points[j];
            const pk = points[k];
            if (Math.hypot(pj.x - pk.x, pj.y - pk.y) >= maxDist) continue;

            const p0 = points[i];
            const depth = (p0.depth + pj.depth + pk.depth) / 3;
            const alpha = 0.022 * depth;
            ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.lineTo(pk.x, pk.y);
            ctx.closePath();
            ctx.fill();
          }
        }
      }

      // --- linhas entre pontos próximos ---
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (const j of neighbors[i]) {
          if (j <= i) continue;
          const b = points[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          const depth = (a.depth + b.depth) / 2;
          const alpha = (1 - dist / maxDist) * 0.16 * depth;
          ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
          ctx.lineWidth = 0.9 * depth;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // --- nós ---
      for (const p of points) {
        const r = (p.bright ? 2.2 : 1.4) * (0.7 + p.depth * 0.6);
        if (p.bright) {
          ctx.shadowColor = `rgba(${rgb}, ${0.9 * p.depth})`;
          ctx.shadowBlur = 8 * p.depth;
          ctx.fillStyle = `rgba(${rgb}, ${0.85 * p.depth})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(${rgb}, ${0.4 * p.depth})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const step = () => {
      for (const p of points) {
        // pontos mais "próximos" (depth alto) se movem um pouco mais → parallax
        p.x += p.vx * (0.6 + p.depth * 0.6);
        p.y += p.vy * (0.6 + p.depth * 0.6);
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
