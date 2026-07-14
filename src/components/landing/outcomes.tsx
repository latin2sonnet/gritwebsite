"use client";

import CircularGallery from "@/components/react-bits/CircularGallery";
import { OUTCOMES } from "@/lib/content";
import { Reveal } from "@/components/reveal";

const GALLERY_ITEMS = [
  {
    image: "/images/outcome-trailer.webp",
    text: OUTCOMES[0].title,
  },
  {
    image: "/images/outcome-manual.webp",
    text: OUTCOMES[1].title,
  },
  {
    image: "/images/outcome-answer.webp",
    text: OUTCOMES[2].title,
  },
];

export function Outcomes() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-neutral-950 md:text-5xl">
              Your shift gets shorter when the book is already open.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-neutral-500">
              Three outcomes plant leads care about. Drag the strip or use the
              arrow keys when focused.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-10 h-[460px] w-full md:mt-14 md:h-[580px]">
        <CircularGallery
          items={GALLERY_ITEMS}
          bend={0}
          textColor="#0f1115"
          borderRadius={0.045}
          scrollEase={0.08}
          scrollSpeed={1.6}
          font='600 26px "Geist", system-ui, sans-serif'
          fontUrl=""
        />
      </div>

      <div className="relative mx-auto mt-4 max-w-6xl px-4 md:mt-6">
        <ul className="grid gap-6 border-t border-black/[0.06] pt-8 md:grid-cols-3 md:gap-8">
          {OUTCOMES.map((item) => (
            <li key={item.title}>
              <p className="text-[15px] font-semibold tracking-tight text-neutral-950">
                {item.title}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
