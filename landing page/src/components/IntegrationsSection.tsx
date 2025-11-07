"use client";

import Image from "next/image";
import { useRef } from "react";
import type { IntegrationsCopy } from "@/types/landing";
import { useScrollFlip } from "@/hooks/useScrollFlip";

type IntegrationsSectionProps = {
  copy: IntegrationsCopy;
};

export function IntegrationsSection({ copy }: IntegrationsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useScrollFlip(sectionRef, panelRef, {
    rotate: [48, 0],
    translate: [64, 0],
    scale: [0.9, 1],
    shadow: [0.32, 0.62],
    viewportStart: 0.92,
    viewportEnd: 0.32,
  });

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-zinc-100 bg-[#f5f7ff] text-zinc-900"
    >
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-32 left-12 h-[22rem] w-[22rem] rounded-full bg-white/60 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[32rem] rounded-full bg-[rgba(14,165,233,0.15)] blur-[200px]" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-12 lg:px-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="max-w-xl space-y-6">
            <p
              className="text-sm font-semibold uppercase tracking-[0.3em] text-[rgba(14,165,233,0.75)]"
              data-reveal
            >
              {copy.intro.eyebrow}
            </p>
            <h2
              className="text-3xl font-semibold text-zinc-900 sm:text-4xl"
              data-reveal
              data-reveal-delay="0.08s"
            >
              {copy.intro.title}
            </h2>
            <p
              className="text-lg leading-7 text-zinc-600"
              data-reveal
              data-reveal-delay="0.16s"
            >
              {copy.intro.description}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.stats.map((stat, index) => (
                <div
                  key={`${stat.value}-${index}`}
                  className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-[0_25px_55px_-45px_rgba(14,165,233,0.6)]"
                  data-reveal
                  data-reveal-delay={`${0.22 + index * 0.08}s`}
                >
                  <p className="text-3xl font-semibold text-zinc-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flip-stage relative flex-1">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_70%)] blur-3xl" />
            <div
              ref={panelRef}
              className="flip-card"
              data-reveal="scale"
              data-reveal-delay="0.18s"
            >
              <div className="flip-card-panel overflow-hidden rounded-[2.2rem] border border-white/70 bg-white/80 shadow-[0_45px_95px_-60px_rgba(63,63,94,0.6)] backdrop-blur">
                <div className="border-b border-zinc-100 bg-white/90 px-6 py-4" data-reveal data-reveal-delay="0.26s">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <span className="inline-flex h-3 w-3 rounded-full bg-rose-400/80" />
                    <span className="inline-flex h-3 w-3 rounded-full bg-amber-300/80" />
                    <span className="inline-flex h-3 w-3 rounded-full bg-[var(--accent)]/80" />
                    <p className="ml-3 text-sm text-zinc-500">
                      {copy.windowTitle}
                    </p>
                  </div>
                </div>
                <div className="relative aspect-video bg-white" data-reveal data-reveal-delay="0.34s">
                  <Image
                    src="/assets/dashboard.png"
                    alt={copy.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 640px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
