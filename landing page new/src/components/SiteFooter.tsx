import Link from "next/link";
import type { FooterCopy } from "@/types/landing";

const currentYear = new Date().getFullYear();

type SiteFooterProps = {
  copy: FooterCopy;
};

export function SiteFooter({ copy }: SiteFooterProps) {
  return (
    <footer className="relative isolate overflow-hidden border-t border-zinc-100 bg-white text-zinc-900">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-32 bg-gradient-to-b from-[#eef6ff]/80 via-white to-transparent" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-1/2 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-[rgba(14,165,233,0.12)] blur-[180px]" />
      <div className="pointer-events-none absolute bottom-[-4rem] right-[12%] h-44 w-44 rounded-full bg-[rgba(79,70,229,0.14)] blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-12 lg:px-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md space-y-4">
            <div className="flex items-center" data-reveal>
              <p className="text-sm leading-6 text-zinc-600">
                {copy.description}
              </p>
            </div>
            <p className="text-xs text-zinc-400">
              {copy.license}
            </p>
          </div>
          <div className="grid gap-10 text-sm text-zinc-600 sm:grid-cols-2" data-reveal data-reveal-delay="0.08s">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
                {copy.resourcesHeading}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                {copy.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
                {copy.connectHeading}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                {copy.connect.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/40 pt-6 text-xs text-zinc-400" data-reveal data-reveal-delay="0.12s">
          &copy; {currentYear} {copy.copyright}
        </div>
      </div>
    </footer>
  );
}
