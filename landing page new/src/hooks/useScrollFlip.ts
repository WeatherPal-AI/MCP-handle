"use client";

import { useEffect, useMemo } from "react";

type ScrollFlipOptions = {
  rotate?: [number, number];
  translate?: [number, number];
  scale?: [number, number];
  shadow?: [number, number];
  viewportStart?: number;
  viewportEnd?: number;
};

const defaultOptions: Required<ScrollFlipOptions> = {
  rotate: [52, 0],
  translate: [76, 0],
  scale: [0.87, 1],
  shadow: [0.34, 0.64],
  viewportStart: 0.95,
  viewportEnd: 0.25,
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function useScrollFlip<TSection extends HTMLElement, TCard extends HTMLElement>(
  sectionRef: React.RefObject<TSection | null>,
  cardRef: React.RefObject<TCard | null>,
  options: ScrollFlipOptions = {},
) {
  const mergedOptions = useMemo(
    () => ({
      rotate: options.rotate ?? defaultOptions.rotate,
      translate: options.translate ?? defaultOptions.translate,
      scale: options.scale ?? defaultOptions.scale,
      shadow: options.shadow ?? defaultOptions.shadow,
      viewportStart: options.viewportStart ?? defaultOptions.viewportStart,
      viewportEnd: options.viewportEnd ?? defaultOptions.viewportEnd,
    }),
    [
      options.rotate,
      options.translate,
      options.scale,
      options.shadow,
      options.viewportStart,
      options.viewportEnd,
    ],
  );

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const cardEl = cardRef.current;

    if (!sectionEl || !cardEl) {
      return;
    }

    const { rotate, translate, scale, shadow, viewportStart, viewportEnd } =
      mergedOptions;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const lerp = ([start, end]: [number, number], progress: number) =>
      start + (end - start) * progress;

    const setState = (progress: number) => {
      const clamped = clamp(progress, 0, 1);

      cardEl.style.setProperty("--flip-rotate", `${lerp(rotate, clamped).toFixed(2)}deg`);
      cardEl.style.setProperty("--flip-translate", `${lerp(translate, clamped).toFixed(2)}px`);
      cardEl.style.setProperty("--flip-scale", lerp(scale, clamped).toFixed(3));
      cardEl.style.setProperty("--flip-shadow", lerp(shadow, clamped).toFixed(3));
    };

    const setStaticState = () => {
      setState(1);
    };

    let animationFrame = 0;

    const applyTransforms = () => {
      animationFrame = 0;

      const rect = sectionEl.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const start = viewportHeight * viewportStart;
      const end = viewportHeight * viewportEnd;
      const distance = Math.max(start - end, 1);

      let progress = 0;
      if (rect.top <= start) {
        if (rect.top <= end) {
          progress = 1;
        } else {
          progress = 1 - (rect.top - end) / distance;
        }
      }

      setState(progress);
    };

    const scheduleUpdate = () => {
      if (animationFrame !== 0) {
        return;
      }
      animationFrame = window.requestAnimationFrame(applyTransforms);
    };

    const enableAnimation = () => {
      scheduleUpdate();
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
    };

    const disableAnimation = () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    if (mediaQuery.matches) {
      setStaticState();
    } else {
      enableAnimation();
    }

    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        disableAnimation();
        setStaticState();
      } else {
        enableAnimation();
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      disableAnimation();
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [cardRef, mergedOptions, sectionRef]);
}
