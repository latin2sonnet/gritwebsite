"use client";

import CircularGallery from "@/components/react-bits/CircularGallery";
import { OUTCOMES } from "@/lib/content";
import { Reveal } from "@/components/reveal";

/**
 * Outcomes as React Bits CircularGallery (option B portrait / curved strip).
 * Uses GRIT field photography + outcome titles as labels.
 */
const GALLERY_ITEMS = [
  {
    image: "/images/story-floor.webp",
    text: OUTCOMES[0].title,
  },
  {
    image: "/images/bento-manual.webp",
    text: OUTCOMES[1].title,
  },
  {
    image: "/images/bento-chat.webp",
    text: OUTCOMES[2].title,
  },
  // Duplicate set once more so the ring never feels empty at wide viewports
  {
    image: "/images/inline-vfd.webp",
    text: OUTCOMES[0].title,
  },
  {
    image: "/images/inline-motor.webp",
    text: OUTCOMES[1].title,
  },
  {
    image: "/images/hero-field.webp",
    text: OUTCOMES[2].title,
  },
];

export function Outcomes() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0.8px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
              Your shift gets shorter when the book is already open.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-neutral-400">
              Three outcomes plant leads care about. Drag or scroll the gallery
              to move through them.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-10 h-[420px] w-full md:mt-14 md:h-[560px]">
        <CircularGallery
          items={GALLERY_ITEMS}
          bend={1}
          textColor="#ffffff"
          borderRadius={0.06}
          scrollEase={0.05}
          scrollSpeed={2}
          font='600 28px "Geist", system-ui, sans-serif'
          fontUrl=""
        />
      </div>

      <div className="relative mx-auto mt-6 grid max-w-6xl gap-4 px-4 md:mt-10 md:grid-cols-3">
        {OUTCOMES.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
          >
            <p className="text-sm font-semibold tracking-tight text-white">
              {item.title}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-neutral-400">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
