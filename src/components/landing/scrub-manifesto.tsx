"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { MANIFESTO_WORDS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function ScrubManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const words = MANIFESTO_WORDS.split(" ");

  useEffect(() => {
    if (reduce || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const spans = gsap.utils.toArray<HTMLElement>(".scrub-word");
      gsap.set(spans, { opacity: 0.14 });
      gsap.to(spans, {
        opacity: 1,
        ease: "none",
        stagger: 0.06,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/10 bg-white/[0.025] py-28 md:py-40"
      aria-label="Manifesto"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-4">
        <p className="text-balance text-center text-[clamp(1.65rem,3.6vw,2.9rem)] font-semibold leading-[1.22] tracking-[-0.025em] text-white">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="scrub-word inline">
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>

        <p className="mt-16 text-center text-2xl font-semibold tracking-tight text-white md:text-4xl">
          Clear faults with{" "}
          <span
            className="mx-1.5 inline-block h-9 w-24 align-middle rounded-full border border-white/20 bg-cover bg-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)] md:h-11 md:w-32"
            style={{
              backgroundImage: "url(/images/inline-vfd.webp)",
              filter: "grayscale(1) contrast(1.15)",
            }}
            role="img"
            aria-label="VFD equipment"
          />{" "}
          and{" "}
          <span
            className="mx-1.5 inline-block h-9 w-24 align-middle rounded-full border border-white/20 bg-cover bg-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)] md:h-11 md:w-32"
            style={{
              backgroundImage: "url(/images/inline-motor.webp)",
              filter: "grayscale(1) contrast(1.15)",
            }}
            role="img"
            aria-label="Motor nameplate"
          />{" "}
          still in front of you.
        </p>
      </div>
    </section>
  );
}
