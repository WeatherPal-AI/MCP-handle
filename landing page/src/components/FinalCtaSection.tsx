import Link from "next/link";
import type { CtaLink, SectionIntroCopy } from "@/types/landing";

type FinalCtaSectionProps = {
  ctaLinks: CtaLink[];
  copy: SectionIntroCopy;
};

export function FinalCtaSection({
  ctaLinks,
  copy,
}: FinalCtaSectionProps) {
  return (
    <section className="relative isolate overflow-hidden border-t border-zinc-100 bg-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[rgba(14,165,233,0.12)] blur-[200px]" />
        <div className="absolute top-10 right-[14%] h-[18rem] w-[18rem] rounded-full bg-[rgba(79,70,229,0.16)] blur-[180px]" />
        <div className="absolute inset-x-0 bottom-0 h-[26rem] bg-gradient-to-b from-transparent via-[#eef6ff]/70 to-white" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center sm:px-12 lg:px-20">
        <p
          className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]"
          data-reveal
        >
          {copy.eyebrow}
        </p>
        <h2
          className="mt-6 text-3xl font-semibold text-zinc-900 sm:text-4xl"
          data-reveal
          data-reveal-delay="0.08s"
        >
          {copy.title}
        </h2>
        <p
          className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-600"
          data-reveal
          data-reveal-delay="0.16s"
        >
          {copy.description}
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {ctaLinks.map((cta, index) => (
            <Link
              key={cta.href}
              href={cta.href}
              data-reveal="up"
              data-reveal-delay={`${0.18 + index * 0.08}s`}
              className={`group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition duration-300 ${
                cta.primary
                  ? "bg-[var(--accent)] text-white shadow-[0_18px_45px_-24px_rgba(2,132,199,0.6)] hover:brightness-[1.12]"
                  : "border border-zinc-200 bg-white/90 text-zinc-900 hover:border-[color:var(--accent)] hover:text-[var(--accent)] hover:bg-white"
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
    </section>
  );
}
