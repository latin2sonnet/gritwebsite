"use client";

/**
 * Dot Grid (React Bits style) - interactive proximity field.
 * https://reactbits.dev/backgrounds/dot-grid
 *
 * Always runs the RAF loop unless prefers-reduced-motion.
 * Pointer tracked on window so CTAs stay clickable.
 */

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type DotGridProps = {
  className?: string;
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  /** Extra radius for soft falloff */
  glowStrength?: number;
  returnDuration?: number;
  baseOpacity?: number;
  activeOpacity?: number;
  /** Idle wave speed (0 = none) */
  waveSpeed?: number;
  style?: React.CSSProperties;
};

function parseRgb(color: string): [number, number, number] {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    const n = parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = color.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];
  return [200, 200, 195];
}

type Dot = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  phase: number;
};

export function DotGrid({
  className,
  dotSize = 2.5,
  gap = 28,
  baseColor = "#6a6a64",
  activeColor = "#ffffff",
  proximity = 160,
  glowStrength = 1.4,
  returnDuration = 0.45,
  baseOpacity = 0.45,
  activeOpacity = 1,
  waveSpeed = 0.55,
  style,
}: DotGridProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const base = parseRgb(baseColor);
    const active = parseRgb(activeColor);
    const pointer = { x: -9999, y: -9999, active: false };
    let dots: Dot[] = [];
    let size = { w: 0, h: 0 };
    let raf = 0;
    let last = performance.now();
    let running = true;
    const spring = 1 / Math.max(6, returnDuration * 16);

    const build = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return false;

      size = { w, h };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const offsetX = (w - (cols - 1) * gap) / 2;
      const offsetY = (h - (rows - 1) * gap) / 2;

      const next: Dot[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offsetX + c * gap;
          const oy = offsetY + r * gap;
          next.push({
            ox,
            oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            s: 1,
            phase: (c + r) * 0.35,
          });
        }
      }
      dots = next;
      return true;
    };

    const paint = (now: number) => {
      const { w, h } = size;
      if (!w || !h || !dots.length) return;

      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);

      const px = pointer.x;
      const py = pointer.y;
      const prox = proximity;
      const prox2 = prox * prox;
      const t = now * 0.001 * waveSpeed;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = d.ox - px;
        const dy = d.oy - py;
        const dist2 = dx * dx + dy * dy;
        const near = pointer.active && dist2 < prox2;
        const dist = near ? Math.sqrt(dist2) : prox;
        const influence = near ? Math.pow(1 - dist / prox, 1.35) : 0;

        // Idle wave keeps field alive even without pointer
        const wave = reduce
          ? 0
          : 0.12 * Math.sin(t + d.phase) + 0.06 * Math.cos(t * 0.7 + d.ox * 0.01);

        const targetS = 1 + influence * 2.6 * glowStrength + wave;
        d.s += (targetS - d.s) * (near ? 0.35 : spring);

        if (near && dist > 0.5) {
          // Push away from cursor (magnetic repel)
          const force = influence * 14;
          const nx = dx / dist;
          const ny = dy / dist;
          d.vx += nx * force * dt * 60;
          d.vy += ny * force * dt * 60;
        }

        // Spring home
        d.vx += (d.ox - d.x) * spring * 2.2;
        d.vy += (d.oy - d.y) * spring * 2.2;
        d.vx *= 0.82;
        d.vy *= 0.82;
        d.x += d.vx;
        d.y += d.vy;

        const a = baseOpacity + influence * (activeOpacity - baseOpacity);
        const r = base[0] + (active[0] - base[0]) * influence;
        const g = base[1] + (active[1] - base[1]) * influence;
        const b = base[2] + (active[2] - base[2]) * influence;
        const radius = Math.max(0.6, (dotSize / 2) * d.s);

        // Soft glow when active
        if (influence > 0.08) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.12 * influence})`;
          ctx.arc(d.x, d.y, radius * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${a})`;
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      paint(now);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < -40 || y < -40 || x > rect.width + 40 || y > rect.height + 40) {
        pointer.active = false;
        return;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    };

    const onLeave = () => {
      pointer.active = false;
    };

    const rebuild = () => {
      build();
      if (reduce) paint(performance.now());
    };

    rebuild();
    requestAnimationFrame(rebuild);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(rebuild);
    ro.observe(wrap);

    // Always animate unless reduced motion - wave alone proves liveness
    if (reduce) {
      paint(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
    };
  }, [
    baseColor,
    activeColor,
    baseOpacity,
    activeOpacity,
    dotSize,
    gap,
    proximity,
    glowStrength,
    returnDuration,
    waveSpeed,
  ]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      style={style}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default DotGrid;
