"use client";

import { BENTO } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function Bento() {
  return (
    <section id="product" className="py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="flex flex-col gap-5 md:max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-neutral-950 md:text-5xl">
              From plate to procedure without the PDF hunt.
            </h2>
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-neutral-500 md:text-base">
              Capture, identify, ground the book, answer. Every cell below is a
              job the product does so you stay on the floor.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-flow-dense md:auto-rows-[minmax(240px,auto)] md:grid-cols-12 md:gap-4">
          {BENTO.map((cell, i) => (
            <Reveal
              key={cell.id}
              delay={i * 0.04}
              className={cn("h-full", cell.span)}
            >
              <article
                className={cn(
                  "group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white",
                  "shadow-[0_1px_2px_rgba(15,17,21,0.04),0_12px_32px_rgba(15,17,21,0.05)]",
                  "image" in cell
                    ? "justify-end"
                    : "justify-between p-6 md:p-7",
                  "tall" in cell && cell.tall && "md:min-h-[500px]"
                )}
              >
                {"image" in cell ? (
                  <>
                    <div className="absolute inset-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cell.image}
                        alt=""
                        className="img-bw h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
                        aria-hidden
                      />
                    </div>
                    <div className="relative z-10 p-6 md:p-8">
                      <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                        {cell.title}
                      </h3>
                      <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-white/85">
                        {cell.body}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {"mono" in cell && cell.mono ? (
                      <div className="mb-4 font-mono text-5xl font-semibold tracking-tight text-neutral-950 md:text-6xl">
                        {cell.mono}
                      </div>
                    ) : null}
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-neutral-950 md:text-2xl">
                        {cell.title}
                      </h3>
                      <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-neutral-500">
                        {cell.body}
                      </p>
                    </div>
                  </>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
