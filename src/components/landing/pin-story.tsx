"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { STORY_STEPS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function PinStory() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".story-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.42,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, wrap);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="how" className="relative bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-28 md:pt-40">
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] text-neutral-950 md:text-5xl">
          Four moves. Fault cleared at the cabinet.
        </h2>
        <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-neutral-500">
          No office detour. No guessing which PDF is the right one.
        </p>
      </div>

      <div ref={wrap} className="relative">
        {STORY_STEPS.map((step) => (
          <div
            key={step.title}
            className="story-card sticky top-0 flex min-h-[100dvh] items-center justify-center px-4 py-16"
          >
            <article className="grid w-full max-w-6xl overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white shadow-[0_24px_64px_rgba(15,17,21,0.12)] md:grid-cols-2">
              <div className="relative min-h-[280px] md:min-h-[500px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.image}
                  alt=""
                  className="img-bw absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-14">
                <h3 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-neutral-500 md:text-lg">
                  {step.body}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
