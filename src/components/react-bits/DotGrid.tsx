"use client";

/**
 * Dot Grid (React Bits style) - electrified proximity field for full-page use.
 * Monochrome only. Pointer via window (canvas is pointer-events-none).
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
  glowStrength?: number;
  returnDuration?: number;
  baseOpacity?: number;
  activeOpacity?: number;
  waveSpeed?: number;
  /** Traveling charge pulse strength 0-1 */
  pulseStrength?: number;
  /** Max distance for circuit arcs (px) */
  arcDistance?: number;
  /** Hard cap arcs drawn per frame */
  maxArcs?: number;
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
  col: number;
  row: number;
  phase: number;
  charge: number;
};

export function DotGrid({
  className,
  dotSize = 2.2,
  gap = 30,
  baseColor = "#5a5a54",
  activeColor = "#ffffff",
  proximity = 170,
  glowStrength = 1.5,
  returnDuration = 0.4,
  baseOpacity = 0.38,
  activeOpacity = 1,
  waveSpeed = 0.7,
  pulseStrength = 0.55,
  arcDistance = 34,
  maxArcs = 72,
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
    let cols = 0;
    let size = { w: 0, h: 0 };
    let raf = 0;
    let last = performance.now();
    let running = true;
    const spring = 1 / Math.max(6, returnDuration * 16);

    const build = () => {
      const w = wrap.clientWidth || window.innerWidth;
      const h = wrap.clientHeight || window.innerHeight;
      if (w < 2 || h < 2) return false;

      size = { w, h };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / gap) + 1;
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
            col: c,
            row: r,
            phase: c * 0.22 + r * 0.31,
            charge: 0,
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

      // Traveling electric front (row + column)
      const pulseX = ((t * 90) % (w + 200)) - 100;
      const pulseY = ((t * 55) % (h + 200)) - 100;

      // First pass: physics + charge
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = d.ox - px;
        const dy = d.oy - py;
        const dist2 = dx * dx + dy * dy;
        const near = !reduce && pointer.active && dist2 < prox2;
        const dist = near ? Math.sqrt(dist2) : prox;
        const influence = near ? Math.pow(1 - dist / prox, 1.35) : 0;

        let pulse = 0;
        if (!reduce && pulseStrength > 0) {
          const dxP = Math.abs(d.ox - pulseX);
          const dyP = Math.abs(d.oy - pulseY);
          const rowPulse = Math.exp(-dxP / 48);
          const colPulse = Math.exp(-dyP / 64);
          const breath =
            0.35 +
            0.65 *
              (0.5 +
                0.5 * Math.sin(t * 1.4 + d.phase) *
                  Math.cos(t * 0.9 + d.col * 0.08));
          pulse = pulseStrength * Math.max(rowPulse, colPulse * 0.85) * breath;
          // Sparse spark
          const spark = Math.sin(t * 6 + d.phase * 3);
          if (spark > 0.97) pulse = Math.min(1, pulse + 0.45);
        }

        d.charge = Math.max(influence, pulse);

        const wave = reduce ? 0 : 0.08 * Math.sin(t + d.phase);
        const targetS =
          1 + d.charge * 2.2 * glowStrength + wave + influence * 0.4;
        d.s += (targetS - d.s) * (near ? 0.35 : spring);

        if (near && dist > 0.5) {
          const force = influence * 12;
          const nx = dx / dist;
          const ny = dy / dist;
          d.vx += nx * force * dt * 60;
          d.vy += ny * force * dt * 60;
        }

        d.vx += (d.ox - d.x) * spring * 2.2;
        d.vy += (d.oy - d.y) * spring * 2.2;
        d.vx *= 0.82;
        d.vy *= 0.82;
        d.x += d.vx;
        d.y += d.vy;
      }

      // Arcs between charged neighbors (same row / col preferred)
      if (!reduce && maxArcs > 0) {
        let arcs = 0;
        ctx.lineWidth = 1;
        for (let i = 0; i < dots.length && arcs < maxArcs; i++) {
          const d = dots[i];
          if (d.charge < 0.28) continue;
          // right neighbor
          const right = dots[i + 1];
          if (
            right &&
            right.row === d.row &&
            right.col === d.col + 1 &&
            right.charge > 0.22
          ) {
            const a = Math.min(d.charge, right.charge) * 0.55;
            ctx.strokeStyle = `rgba(255,255,255,${a})`;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            // slight crackle
            const mx = (d.x + right.x) / 2;
            const my = (d.y + right.y) / 2 + (Math.sin(t * 20 + i) * 1.2);
            ctx.lineTo(mx, my);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();
            arcs++;
          }
          // below neighbor
          const below = dots[i + cols];
          if (
            below &&
            below.col === d.col &&
            below.row === d.row + 1 &&
            below.charge > 0.22
          ) {
            const a = Math.min(d.charge, below.charge) * 0.5;
            ctx.strokeStyle = `rgba(255,255,255,${a})`;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            const mx = (d.x + below.x) / 2 + Math.sin(t * 18 + i) * 1.1;
            const my = (d.y + below.y) / 2;
            ctx.lineTo(mx, my);
            ctx.lineTo(below.x, below.y);
            ctx.stroke();
            arcs++;
          }
        }
      }

      // Dots + glow
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const mix = Math.min(1, d.charge);
        const a = baseOpacity + mix * (activeOpacity - baseOpacity);
        const r = base[0] + (active[0] - base[0]) * mix;
        const g = base[1] + (active[1] - base[1]) * mix;
        const b = base[2] + (active[2] - base[2]) * mix;
        const radius = Math.max(0.55, (dotSize / 2) * d.s);

        if (mix > 0.12) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.1 + mix * 0.18})`;
          ctx.arc(d.x, d.y, radius * (2.8 + mix * 2), 0, Math.PI * 2);
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
      // Full viewport field: always track when over window
      if (x < -20 || y < -20 || x > rect.width + 20 || y > rect.height + 20) {
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
      if (build()) {
        if (reduce) paint(performance.now());
      }
    };

    rebuild();
    requestAnimationFrame(rebuild);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(rebuild);
    ro.observe(wrap);
    window.addEventListener("resize", rebuild);

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
      window.removeEventListener("resize", rebuild);
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
    pulseStrength,
    arcDistance,
    maxArcs,
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
