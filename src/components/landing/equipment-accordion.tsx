"use client";

import { useState } from "react";
import { EQUIPMENT } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function EquipmentAccordion() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-[-0.03em] text-neutral-950 md:text-5xl">
            The iron you already stand in front of.
          </h2>
        </Reveal>

        <div className="mt-14 hidden h-[420px] gap-3 md:flex">
          {EQUIPMENT.map((item, i) => {
            const open = active === i;
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "relative overflow-hidden rounded-[1.5rem] border border-black/[0.06] text-left shadow-[0_12px_32px_rgba(15,17,21,0.08)] transition-[flex] duration-500 ease-out",
                  open ? "flex-[3.2]" : "flex-[0.9]"
                )}
                aria-expanded={open}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  className="img-bw absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"
                  aria-hidden
                />
                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  <span
                    className={cn(
                      "font-semibold tracking-tight text-white transition-all",
                      open
                        ? "text-2xl"
                        : "text-sm uppercase tracking-[0.18em] text-neutral-200 [writing-mode:vertical-rl] rotate-180"
                    )}
                  >
                    {item.title}
                  </span>
                  {open && (
                    <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-neutral-200">
                      {item.body}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 md:hidden">
          {EQUIPMENT.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white shadow-[0_8px_24px_rgba(15,17,21,0.06)]"
            >
              <div className="relative aspect-[16/10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  className="img-bw h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>
              <p className="p-5 text-sm leading-relaxed text-neutral-500">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
