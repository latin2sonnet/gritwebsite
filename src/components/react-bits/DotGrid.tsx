"use client";

/**
 * Dot Grid (React Bits style) - interactive proximity grid for backgrounds.
 * https://reactbits.dev/backgrounds/dot-grid
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
  returnDuration?: number;
  baseOpacity?: number;
  activeOpacity?: number;
  speedTrigger?: number;
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
  x: number;
  y: number;
  ox: number;
  oy: number;
  s: number;
  t: number;
};

export function DotGrid({
  className,
  dotSize = 2.5,
  gap = 28,
  baseColor = "#6a6a64",
  activeColor = "#f7f7f2",
  proximity = 160,
  returnDuration = 0.55,
  baseOpacity = 0.55,
  activeOpacity = 1,
  speedTrigger = 90,
  style,
}: DotGridProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
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

      const step = gap;
      const cols = Math.ceil(w / step) + 1;
      const rows = Math.ceil(h / step) + 1;
      const offsetX = (w - (cols - 1) * step) / 2;
      const offsetY = (h - (rows - 1) * step) / 2;

      const next: Dot[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * step;
          const y = offsetY + r * step;
          next.push({
            x,
            y,
            ox: x,
            oy: y,
            s: 1,
            t: Math.random() * Math.PI * 2,
          });
        }
      }
      dots = next;
      return true;
    };

    const paintFrame = (now: number) => {
      const { w, h } = size;
      if (!w || !h || dots.length === 0) return;

      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);

      const px = pointer.x;
      const py = pointer.y;
      const prox2 = proximity * proximity;
      const idle = !reduce && speedTrigger > 0;
      const easeBack = 1 / Math.max(8, returnDuration * 20);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = px - d.ox;
        const dy = py - d.oy;
        const dist2 = dx * dx + dy * dy;
        const inRange = !reduce && dist2 < prox2 && pointer.active;
        const dist = inRange ? Math.sqrt(dist2) : proximity;
        const influence = inRange ? 1 - dist / proximity : 0;

        if (idle) d.t += dt * (speedTrigger / 100);

        const breathe = idle ? 0.1 * Math.sin(d.t + d.ox * 0.015) : 0;
        const targetScale = 1 + influence * 2.1 + breathe;
        d.s += (targetScale - d.s) * (inRange ? 0.32 : easeBack);

        if (inRange && dist > 0.001) {
          const push = influence * 7;
          d.x += (d.ox - (dx / dist) * push - d.x) * 0.24;
          d.y += (d.oy - (dy / dist) * push - d.y) * 0.24;
        } else {
          d.x += (d.ox - d.x) * 0.14;
          d.y += (d.oy - d.y) * 0.14;
        }

        const a = baseOpacity + influence * (activeOpacity - baseOpacity);
        const r = base[0] + (active[0] - base[0]) * influence;
        const g = base[1] + (active[1] - base[1]) * influence;
        const b = base[2] + (active[2] - base[2]) * influence;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${a})`;
        ctx.arc(d.x, d.y, (dotSize / 2) * d.s, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const paintStatic = () => {
      last = performance.now();
      paintFrame(last);
    };

    const loop = (now: number) => {
      if (!running) return;
      paintFrame(now);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        pointer.active = false;
        pointer.x = -9999;
        pointer.y = -9999;
        return;
      }
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const rebuild = () => {
      if (build()) {
        if (reduce) paintStatic();
      }
    };

    rebuild();
    // Second tick catches late layout after fonts / sticky chrome
    requestAnimationFrame(rebuild);

    window.addEventListener("pointermove", onMove, { passive: true });
    const ro = new ResizeObserver(rebuild);
    ro.observe(wrap);

    if (!reduce) {
      raf = requestAnimationFrame(loop);
    } else {
      paintStatic();
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
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
    returnDuration,
    speedTrigger,
  ]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full min-h-[100%]",
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
