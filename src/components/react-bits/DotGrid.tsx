"use client";

/**
 * Dot Grid — Concept D (confirmed):
 * Idle = calm, still field.
 * Hover = local electrical charge surge around the cursor only.
 * Full-page fixed background. Monochrome only.
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
  /** Max neighbor distance for hover arcs (px) */
  arcDistance?: number;
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
  charge: number;
};

export function DotGrid({
  className,
  dotSize = 2.1,
  gap = 30,
  baseColor = "#4a4a46",
  activeColor = "#ffffff",
  proximity = 150,
  glowStrength = 1.35,
  returnDuration = 0.42,
  baseOpacity = 0.32,
  activeOpacity = 1,
  arcDistance = 36,
  maxArcs = 48,
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
      const hoverLive = !reduce && pointer.active;

      // Physics + charge (charge ONLY from hover proximity — idle stays calm)
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let influence = 0;
        let dist = prox;

        if (hoverLive) {
          const dx = d.ox - px;
          const dy = d.oy - py;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < prox2) {
            dist = Math.sqrt(dist2);
            influence = Math.pow(1 - dist / prox, 1.45);
          }
        }

        // Smooth charge decay when leaving hover zone
        const targetCharge = influence;
        d.charge += (targetCharge - d.charge) * (influence > 0 ? 0.28 : 0.12);

        const targetS = 1 + d.charge * 2.4 * glowStrength;
        d.s += (targetS - d.s) * (influence > 0 ? 0.32 : spring);

        if (influence > 0.05 && dist > 0.5) {
          const dx = d.ox - px;
          const dy = d.oy - py;
          const force = influence * 10;
          const nx = dx / dist;
          const ny = dy / dist;
          d.vx += nx * force * dt * 55;
          d.vy += ny * force * dt * 55;
        }

        d.vx += (d.ox - d.x) * spring * 2.4;
        d.vy += (d.oy - d.y) * spring * 2.4;
        d.vx *= 0.84;
        d.vy *= 0.84;
        d.x += d.vx;
        d.y += d.vy;
      }

      // Circuit arcs only in charged hover cluster
      if (hoverLive && maxArcs > 0) {
        let arcs = 0;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        for (let i = 0; i < dots.length && arcs < maxArcs; i++) {
          const d = dots[i];
          if (d.charge < 0.35) continue;

          const right = dots[i + 1];
          if (
            right &&
            right.row === d.row &&
            right.col === d.col + 1 &&
            right.charge > 0.3
          ) {
            const a = Math.min(d.charge, right.charge) * 0.65;
            ctx.strokeStyle = `rgba(255,255,255,${a})`;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();
            arcs++;
          }

          const below = dots[i + cols];
          if (
            below &&
            below.col === d.col &&
            below.row === d.row + 1 &&
            below.charge > 0.3
          ) {
            const a = Math.min(d.charge, below.charge) * 0.55;
            ctx.strokeStyle = `rgba(255,255,255,${a})`;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(below.x, below.y);
            ctx.stroke();
            arcs++;
          }
        }
      }

      // Soft radial wash under cursor (hover only)
      if (hoverLive) {
        const g = ctx.createRadialGradient(px, py, 0, px, py, proximity * 1.15);
        g.addColorStop(0, "rgba(255,255,255,0.07)");
        g.addColorStop(0.45, "rgba(255,255,255,0.025)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, proximity * 1.15, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dots
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const mix = Math.min(1, d.charge);
        const a = baseOpacity + mix * (activeOpacity - baseOpacity);
        const r = base[0] + (active[0] - base[0]) * mix;
        const g = base[1] + (active[1] - base[1]) * mix;
        const b = base[2] + (active[2] - base[2]) * mix;
        const radius = Math.max(0.5, (dotSize / 2) * d.s);

        if (mix > 0.15) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.08 + mix * 0.2})`;
          ctx.arc(d.x, d.y, radius * (2.4 + mix * 2.2), 0, Math.PI * 2);
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
      if (x < -8 || y < -8 || x > rect.width + 8 || y > rect.height + 8) {
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

    // Always RAF so charge can decay smoothly after hover leaves
    // Reduce: single static paint (no hover motion)
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
