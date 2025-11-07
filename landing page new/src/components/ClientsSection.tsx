import Link from "next/link";
import type { ClientChannel, SectionIntroCopy } from "@/types/landing";

type ClientsSectionProps = {
  clientChannels: ClientChannel[];
  copy: SectionIntroCopy;
};

export function ClientsSection({
  clientChannels,
  copy,
}: ClientsSectionProps) {
  return (
    <section className="relative border-t border-zinc-100 bg-[#f8fafc] text-zinc-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-28 h-60 w-60 rounded-full bg-white/70 blur-[140px]" />
        <div className="absolute bottom-0 right-16 h-72 w-72 rounded-full bg-[rgba(14,165,233,0.18)] blur-[150px]" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-12 lg:px-20">
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
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {clientChannels.map((channel, index) => (
            <div
              key={channel.name}
              data-reveal
              data-reveal-delay={`${0.24 + index * 0.08}s`}
              className="group flex h-full flex-col gap-6 rounded-3xl border border-zinc-200 bg-white/95 p-6 shadow-sm transition hover:-translate-y-1 hover:border-transparent hover:shadow-[0_35px_55px_-40px_rgba(14,165,233,0.55)]"
            >
              <h3 className="text-lg font-semibold text-zinc-900">
                {channel.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-zinc-600">
                {channel.description}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <div className="h-1 w-12 rounded-full bg-[rgba(14,165,233,0.35)] opacity-0 transition group-hover:opacity-100" />
                <Link
                  href={channel.ctaHref}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition hover:text-[var(--accent)]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]"
                >
                  {channel.ctaLabel}
                  <span aria-hidden>-&gt;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
