"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { CtaLink, TrustSignal, HeroCopy } from "@/types/landing";
import { useScrollFlip } from "@/hooks/useScrollFlip";

type HeroSectionProps = {
  ctaLinks: CtaLink[];
  trustSignals: TrustSignal[];
  copy: HeroCopy;
};

export function HeroSection({ ctaLinks, trustSignals, copy }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useScrollFlip(heroRef, cardRef);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50 px-6 pb-24 pt-24 text-zinc-900 sm:px-12 lg:px-24 xl:px-32"
    >
      <div className="absolute inset-0 -z-10" data-reveal="fade">
        <div className="absolute -top-64 left-1/2 h-[36rem] w-[80rem] -translate-x-1/2 rounded-full bg-amber-100/60 blur-[200px]" />
        <div className="absolute top-6 left-10 h-[22rem] w-[22rem] rounded-full bg-[rgba(14,165,233,0.12)] blur-[160px]" />
        <div className="absolute -right-44 top-0 h-[30rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.25),_rgba(255,255,255,0))] blur-[120px]" />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.1fr,0.9fr] lg:items-stretch lg:gap-16">
          <div className="w-full lg:max-w-none" data-reveal>
            <div className="flex flex-col gap-3" data-reveal>
              <div className="flex items-center gap-3">
                <Image
                  src={copy.brandLogoSrc}
                  alt={copy.brandLogoAlt}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-zinc-200 bg-white p-1 shadow-sm"
                  priority
                />
                <span className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
                  {copy.brandName}
                </span>
              </div>
              <div
                className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500"
                data-reveal
                data-reveal-delay="0.08s"
              >
                {copy.eyebrowLabel}
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,32rem)_minmax(0,27rem)] lg:items-end lg:gap-12">
              <h1 className="text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl lg:text-6xl lg:max-w-none" data-reveal>
                {copy.title}
              </h1>
              <p
                className="text-lg leading-8 text-zinc-600 lg:self-end lg:justify-self-end lg:text-left lg:text-xl lg:leading-9"
                data-reveal
                data-reveal-delay="0.08s"
              >
                {copy.description}
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4" data-reveal data-reveal-delay="0.16s">
              {ctaLinks.map((cta, idx) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  data-reveal="up"
                  data-reveal-delay={`${0.16 + idx * 0.07}s`}
                  className={`group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition duration-300 ${
                    cta.primary
                      ? "bg-[var(--accent)] text-white shadow-[0_15px_40px_-25px_rgba(2,132,199,0.45)] hover:shadow-[0_25px_52px_-28px_rgba(2,132,199,0.5)]"
                      : "border border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300"
                  }`}
                >
                  {cta.label}
                  <span
                    className={`ml-2 text-base transition group-hover:translate-x-1 ${
                      cta.primary ? "text-white/80" : "text-zinc-500"
                    }`}
                  >
                    -&gt;
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flip-stage relative">
            <div
              ref={cardRef}
              className="flip-card"
              data-reveal="scale"
              data-reveal-delay="0.1s"
            >
              <div className="absolute inset-0 -translate-y-6 rounded-[38px] bg-gradient-to-br from-indigo-100/50 via-white to-white blur-3xl" aria-hidden />
              <div className="flip-card-panel relative overflow-hidden rounded-[32px] border border-zinc-100 bg-white/90 p-8 backdrop-blur-sm md:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold uppercase tracking-[0.36em] text-zinc-400" data-reveal data-reveal-delay="0.18s">
                      {copy.whyHeading}
                    </p>
                  </div>
                  <p className="text-base leading-7 text-zinc-500 md:max-w-md lg:max-w-lg" data-reveal data-reveal-delay="0.24s">
                    {copy.whyDescription}
                  </p>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {copy.whyFeatures.map((feature, index) => (
                    <div
                      key={feature.id}
                      data-reveal
                      data-reveal-delay={`${0.32 + index * 0.08}s`}
                      className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(2,132,199,0.35)] transition hover:-translate-y-1 hover:shadow-[0_32px_80px_-48px_rgba(2,132,199,0.4)]"
                    >
                      <h3 className="text-xl font-semibold leading-7 text-zinc-900">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-500">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 grid gap-6 text-sm text-zinc-500 sm:grid-cols-3 lg:mx-auto lg:max-w-5xl">
          {trustSignals.map((signal, index) => {
            const content = (
              <div className="flex h-full items-center gap-3 rounded-xl border border-white/60 bg-white/90 px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${
                    signal.badge
                      ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "bg-slate-100 text-slate-500"
                  }`}
                  aria-hidden
                >
                  {signal.badge ?? String(index + 1).padStart(2, "0")}
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-800">
                    {signal.name}
                  </p>
                  <p className="text-xs text-zinc-500">{signal.description}</p>
                </div>
              </div>
            );

            if (signal.href) {
              return (
                <Link
                  key={signal.name}
                  href={signal.href}
                  data-reveal
                  data-reveal-delay={`${0.22 + index * 0.08}s`}
                  className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={signal.name}
                data-reveal
                data-reveal-delay={`${0.22 + index * 0.08}s`}
                className="h-full"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
