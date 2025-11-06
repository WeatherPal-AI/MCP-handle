"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type TransitionTone = "dark" | "light";

type SectionTransitionProps = {
  from: TransitionTone;
  to: TransitionTone;
};

type ParticleData = {
  id: string;
  x: string;
  y: string;
  size: string;
  duration: string;
  delay: string;
  opacity: string;
};

const gradientMap: Record<`${TransitionTone}-${TransitionTone}`, string> = {
  "dark-light":
    "linear-gradient(180deg, rgba(20,20,30,1) 5%, rgba(20,20,30,0.45) 30%, rgba(250,250,250,0.95) 80%, rgba(255,255,255,1) 100%)",
  "light-dark":
    "linear-gradient(180deg, rgba(255,255,255,1) 10%, rgba(246,246,250,0.85) 45%, rgba(30,30,40,0.8) 85%, rgba(10,10,15,1) 100%)",
  "dark-dark":
    "linear-gradient(180deg, rgba(20,20,30,1) 0%, rgba(28,28,40,1) 100%)",
  "light-light":
    "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(244,244,250,1) 100%)",
};

const warpToneClass: Record<TransitionTone, string> = {
  dark: "section-transition__warp--dark",
  light: "section-transition__warp--light",
};

const beamToneClass: Record<TransitionTone, string> = {
  dark: "section-transition__beam--dark",
  light: "section-transition__beam--light",
};

const glowToneClass: Record<TransitionTone, string> = {
  dark: "section-transition__glow--dark",
  light: "section-transition__glow--light",
};

export function SectionTransition({ from, to }: SectionTransitionProps) {
  const transitionRef = useRef<HTMLDivElement | null>(null);

  const [particles] = useState<ParticleData[]>(() =>
    Array.from({ length: 10 }).map((_, index) => ({
      id: `particle-${index}`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 80}%`,
      size: `${Math.random() * 18 + 6}px`,
      duration: `${Math.random() * 12 + 14}s`,
      delay: `${Math.random() * 8}s`,
      opacity: `${0.35 + Math.random() * 0.5}`,
    })),
  );

  useEffect(() => {
    const element = transitionRef.current;
    if (!element) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let active = false;

    const setProgress = (value: number) => {
      const clamped = Math.min(Math.max(value, 0), 1);
      const tiltAngle = 56 * (1 - clamped);
      const translate = 140 * (1 - clamped);
      const beamOffset = 160 * (clamped - 0.5);
      const flare = 0.28 + clamped * 0.55;

      element.style.setProperty("--scroll-progress", clamped.toFixed(3));
      element.style.setProperty("--tilt-angle", `${tiltAngle.toFixed(2)}deg`);
      element.style.setProperty("--vertical-shift", `${translate.toFixed(1)}px`);
      element.style.setProperty("--beam-offset", `${beamOffset.toFixed(1)}px`);
      element.style.setProperty("--flare-opacity", flare.toFixed(3));
    };

    const measure = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const total = viewportHeight + rect.height;
      const raw = (viewportHeight - rect.top) / total;
      setProgress(raw);
    };

    const scheduleMeasure = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    const enable = () => {
      if (active) return;
      active = true;
      scheduleMeasure();
      window.addEventListener("scroll", scheduleMeasure, { passive: true });
      window.addEventListener("resize", scheduleMeasure);
    };

    const disable = () => {
      if (!active) return;
      active = false;
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            enable();
          } else {
            disable();
          }
        });
      },
      { threshold: [0, 0.25, 0.6] },
    );

    observer.observe(element);

    if (mediaQuery.matches) {
      setProgress(1);
    } else {
      enable();
    }

    const handlePreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        disable();
        setProgress(1);
      } else {
        enable();
      }
    };

    mediaQuery.addEventListener("change", handlePreference);

    return () => {
      disable();
      observer.disconnect();
      mediaQuery.removeEventListener("change", handlePreference);
    };
  }, []);

  const gradientKey = `${from}-${to}` as `${TransitionTone}-${TransitionTone}`;
  const gradientBackground =
    gradientMap[gradientKey] ??
    "linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(255,255,255,1) 100%)";

  const particleTone =
    to === "dark" ? "section-transition__particle--dark" : "section-transition__particle--light";

  return (
    <div
      aria-hidden="true"
      ref={transitionRef}
      className="section-transition relative overflow-hidden bg-transparent"
      style={{ backgroundImage: gradientBackground }}
    >
      <div className="section-transition__surface" />
      <div className="section-transition__surface-noise" />
      <div className="section-transition__scan" />
      <div className="section-transition__grid" />
      <div className={`section-transition__warp ${warpToneClass[from]}`} />
      <div
        className={`section-transition__warp section-transition__warp--secondary ${warpToneClass[to]}`}
      />
      <div className={`section-transition__beam ${beamToneClass[from]}`} />
      <div
        className={`section-transition__beam section-transition__beam--secondary ${beamToneClass[to]}`}
      />
      <div className="section-transition__particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={`section-transition__particle ${particleTone}`}
            style={
              {
                "--particle-x": particle.x,
                "--particle-y": particle.y,
                "--particle-size": particle.size,
                "--particle-duration": particle.duration,
                "--particle-delay": particle.delay,
                "--particle-opacity": particle.opacity,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div
        className={`section-transition__glow section-transition__glow--top ${glowToneClass[from]}`}
      />
      <div
        className={`section-transition__glow section-transition__glow--bottom ${glowToneClass[to]}`}
      />
    </div>
  );
}
