"use client";

import { OUTCOMES } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function Outcomes() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
            Your shift gets shorter when the book is already open.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-3 md:grid-cols-12">
          {OUTCOMES.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.06}
              className={cn(
                i === 0 && "md:col-span-7",
                i === 1 && "md:col-span-5",
                i === 2 && "md:col-span-12"
              )}
            >
              <article
                className={cn(
                  "h-full border border-white/12 bg-[#131313] p-7 md:p-8",
                  i === 0 && "rounded-2xl md:min-h-[220px]",
                  i === 1 && "rounded-2xl",
                  i === 2 &&
                    "rounded-2xl md:flex md:items-center md:justify-between md:gap-10"
                )}
              >
                <h3
                  className={cn(
                    "font-semibold tracking-tight text-white",
                    i === 0 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 max-w-[36ch] text-[15px] leading-relaxed text-neutral-400",
                    i === 2 && "md:mt-0 md:max-w-[48ch] md:text-base"
                  )}
                >
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
