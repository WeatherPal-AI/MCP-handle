import type { Testimonial, SectionIntroCopy } from "@/types/landing";

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
  copy: SectionIntroCopy;
};

export function TestimonialsSection({
  testimonials,
  copy,
}: TestimonialsSectionProps) {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="relative border-t border-zinc-100 bg-white text-zinc-900">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/2 h-64 w-[42rem] -translate-x-1/2 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.18),_transparent_70%)] blur-[160px]" />
        <div className="absolute bottom-0 right-12 h-72 w-72 rounded-full bg-[rgba(37,99,235,0.12)] blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-white/80 to-white" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-12 lg:px-20">
        <div className="max-w-3xl space-y-4">
          <p
            className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]"
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
          <p className="mt-2 text-lg leading-8 text-zinc-600" data-reveal data-reveal-delay="0.16s">
            {copy.description}
          </p>
        </div>
        <div className="relative mt-14 overflow-hidden" data-reveal data-reveal-delay="0.24s">
          <div className="marquee-wrapper">
            <div className="marquee-track flex w-max gap-6 pr-6">
              {marqueeItems.map((testimonial, index) => (
                <figure
                  key={`${testimonial.name}-${index}`}
                  className="flex w-[320px] flex-shrink-0 flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-6 text-left text-zinc-900 shadow-[0_45px_90px_-60px_rgba(15,23,42,0.28)]"
                  aria-hidden={index >= testimonials.length}
                >
                  <blockquote className="text-base leading-7 text-zinc-600">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-zinc-200 pt-4 text-sm text-zinc-500">
                    <span className="block font-semibold text-zinc-900">
                      {testimonial.name}
                    </span>
                    <span className="text-zinc-500">{testimonial.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
