"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";
const SHOW_CLASS = "is-visible";

export function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );

    if (elements.length === 0) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyTiming = (element: HTMLElement) => {
      if (element.dataset.revealDelay) {
        element.style.setProperty("--reveal-delay", element.dataset.revealDelay);
      }
      if (element.dataset.revealDuration) {
        element.style.setProperty(
          "--reveal-duration",
          element.dataset.revealDuration,
        );
      }
      if (element.dataset.revealOffset) {
        element.style.setProperty(
          "--reveal-offset",
          element.dataset.revealOffset,
        );
      }
    };

    const showImmediately = () => {
      elements.forEach((element) => {
        element.classList.add(SHOW_CLASS);
        element.style.removeProperty("transition-delay");
      });
    };

    elements.forEach(applyTiming);

    if (reduceMotion.matches) {
      showImmediately();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.classList.add(SHOW_CLASS);
            if (element.dataset.revealRepeat !== "true") {
              observer.unobserve(element);
            }
          } else if (element.dataset.revealRepeat === "true") {
            element.classList.remove(SHOW_CLASS);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    const handlePreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        elements.forEach((element) => {
          element.classList.add(SHOW_CLASS);
        });
        observer.disconnect();
      }
    };

    reduceMotion.addEventListener("change", handlePreferenceChange);

    const handleMutations: MutationCallback = (mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }
          if (node.matches(REVEAL_SELECTOR)) {
            applyTiming(node);
            observer.observe(node);
          }
          node
            .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
            .forEach((child) => {
              applyTiming(child);
              observer.observe(child);
            });
        });
      });
    };

    const observerConfig: MutationObserverInit = {
      childList: true,
      subtree: true,
    };

    const mutationObserver = new MutationObserver(handleMutations);
    mutationObserver.observe(document.body, observerConfig);

    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener("change", handlePreferenceChange);
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
