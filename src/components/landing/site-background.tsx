"use client";

import DotGrid from "@/components/react-bits/DotGrid";

/**
 * Concept D (confirmed): calm idle grid, local electrical surge on hover.
 * Fixed full-page field under all sections.
 */
export function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full overflow-hidden bg-[#0b0b0b]"
      aria-hidden
    >
      <DotGrid
        className="absolute inset-0"
        dotSize={2.05}
        gap={30}
        baseColor="#454540"
        activeColor="#ffffff"
        proximity={155}
        glowStrength={1.4}
        baseOpacity={0.3}
        activeOpacity={1}
        returnDuration={0.4}
        arcDistance={36}
        maxArcs={40}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 78% 72% at 50% 42%, transparent 35%, rgba(11,11,11,0.5) 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0b0b0b]/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0b0b0b]/65 to-transparent" />
    </div>
  );
}
