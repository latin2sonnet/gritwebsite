"use client";

import DotGrid from "@/components/react-bits/DotGrid";

/**
 * Single fixed electrified field for the whole landing page.
 * Content layers above at z-10+.
 */
export function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full overflow-hidden bg-[#0b0b0b]"
      aria-hidden
    >
      <DotGrid
        className="absolute inset-0"
        dotSize={2.15}
        gap={30}
        baseColor="#4e4e48"
        activeColor="#ffffff"
        proximity={180}
        glowStrength={1.55}
        baseOpacity={0.36}
        activeOpacity={1}
        returnDuration={0.38}
        waveSpeed={0.72}
        pulseStrength={0.58}
        arcDistance={34}
        maxArcs={72}
      />
      {/* Readability vignette - keeps type clear at edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 40%, transparent 30%, rgba(11,11,11,0.55) 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0b0b0b]/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0b0b]/70 to-transparent" />
    </div>
  );
}
