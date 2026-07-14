"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type LogoItem =
  | {
      node: React.ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      width?: number;
      height?: number;
    };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === "number" ? `${value}px` : (value ?? undefined);

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

/** React Bits LogoLoop - continuous ticker https://reactbits.dev/animations/logo-loop */
export const LogoLoop = React.memo<LogoLoopProps>(function LogoLoop({
  logos,
  speed = 80,
  direction = "left",
  width = "100%",
  logoHeight = 20,
  gap = 40,
  pauseOnHover = true,
  hoverSpeed,
  fadeOut = true,
  fadeOutColor = "#0b0b0b",
  ariaLabel = "Scrolling items",
  className,
  style,
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    return undefined;
  }, [hoverSpeed, pauseOnHover]);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = direction === "left" || direction === "up" ? 1 : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceRect = seqRef.current?.getBoundingClientRect?.();
    const sequenceWidth = sequenceRect?.width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded =
        Math.ceil(containerWidth / sequenceWidth) +
        ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    if (containerRef.current) ro.observe(containerRef.current);
    if (seqRef.current) ro.observe(seqRef.current);
    window.addEventListener("resize", updateDimensions);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [updateDimensions, logos, gap, logoHeight]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || seqWidth <= 0) {
      track.style.transform = "translate3d(0,0,0)";
      return;
    }

    let raf = 0;
    let last: number | null = null;
    let offset = 0;
    let velocity = 0;

    const animate = (timestamp: number) => {
      if (last === null) last = timestamp;
      const dt = Math.max(0, timestamp - last) / 1000;
      last = timestamp;

      const target =
        isHovered && effectiveHoverSpeed !== undefined
          ? effectiveHoverSpeed
          : targetVelocity;

      const easing = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocity += (target - velocity) * easing;

      offset = ((offset + velocity * dt) % seqWidth + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [targetVelocity, seqWidth, isHovered, effectiveHoverSpeed]);

  const cssVariables = {
    "--logoloop-gap": `${gap}px`,
    "--logoloop-logoHeight": `${logoHeight}px`,
    ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
  } as React.CSSProperties;

  const renderItem = (item: LogoItem, key: React.Key) => {
    const isNode = "node" in item;
    return (
      <li
        key={key}
        className="mr-[var(--logoloop-gap)] flex-none leading-none"
        role="listitem"
      >
        {isNode ? (
          <span className="inline-flex items-center">{item.node}</span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.alt ?? ""}
            className="block h-[var(--logoloop-logoHeight)] w-auto object-contain"
            draggable={false}
          />
        )}
      </li>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cx("relative overflow-x-hidden", className)}
      style={{ width: toCssLength(width) ?? "100%", ...cssVariables, ...style }}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => effectiveHoverSpeed !== undefined && setIsHovered(true)}
      onMouseLeave={() =>
        effectiveHoverSpeed !== undefined && setIsHovered(false)
      }
    >
      {fadeOut && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,100px)] bg-[linear-gradient(to_right,var(--logoloop-fadeColor,#0b0b0b)_0%,transparent_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,100px)] bg-[linear-gradient(to_left,var(--logoloop-fadeColor,#0b0b0b)_0%,transparent_100%)]"
          />
        </>
      )}
      <div
        ref={trackRef}
        className="relative z-0 flex w-max select-none will-change-transform"
      >
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            key={`copy-${copyIndex}`}
            className="flex items-center"
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) =>
              renderItem(item, `${copyIndex}-${itemIndex}`)
            )}
          </ul>
        ))}
      </div>
    </div>
  );
});

export default LogoLoop;
