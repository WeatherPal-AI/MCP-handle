import type { FeatureColumn, SectionIntroCopy } from "@/types/landing";

type PlatformPillarsSectionProps = {
  featureColumns: FeatureColumn[];
  copy: SectionIntroCopy;
};

export function PlatformPillarsSection({
  featureColumns,
  copy,
}: PlatformPillarsSectionProps) {
  return (
    <section className="relative border-t border-zinc-100 bg-slate-50 text-zinc-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(14,165,233,0.15)] blur-[140px]" />
        <div className="absolute bottom-0 right-12 h-80 w-80 rounded-full bg-white/60 blur-[160px]" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-12 lg:px-20">
        <div className="max-w-3xl space-y-4">
          <p
            className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500"
            data-reveal
          >
            {copy.eyebrow}
          </p>
          <h2
            className="text-3xl font-semibold text-zinc-900 sm:text-4xl"
            data-reveal
            data-reveal-delay="0.08s"
          >
            {copy.title}
          </h2>
          <p
            className="mt-2 text-lg leading-8 text-zinc-600"
            data-reveal
            data-reveal-delay="0.16s"
          >
            {copy.description}
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featureColumns.map((feature, index) => (
            <div
              key={feature.title}
              data-reveal
              data-reveal-delay={`${0.24 + index * 0.06}s`}
              className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-zinc-600">
                {feature.description}
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-600">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
