"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, slash, trigger } from "@/lib/motion/motion";

/**
 * The one reveal pattern: a diagonal slash wipe (clip-path) with a small slide, played once when the element
 * enters. Mark elements with data-slash; optional data-delay (seconds). Everything else is tuned in motion.ts.
 * Reduced motion: a short fade, same order, no travel.
 */
export function useSlash(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add({ calm: MQ.reduce, full: MQ.noPreference }, (ctx) => {
        const calm = Boolean(ctx.conditions?.calm);
        const m = calm ? motion.reduced : motion.full;
        root.querySelectorAll<HTMLElement>("[data-slash]").forEach((el) => {
          const delay = Number(el.dataset.delay ?? 0);
          const tween = calm
            ? gsap.to(el, { opacity: 1, duration: m.duration.reveal, delay, paused: true })
            : gsap.fromTo(
                el,
                { clipPath: slash.hidden, opacity: 1, x: -m.travel.x * 0.5 },
                {
                  clipPath: slash.shown,
                  x: 0,
                  duration: m.duration.reveal,
                  delay,
                  ease: m.ease.reveal,
                  paused: true,
                  // drop the clip afterwards so outlines, shadows and focus rings are never cut off
                  onComplete: () => void gsap.set(el, { clearProps: "clipPath,x" }),
                },
              );
          ScrollTrigger.create({ trigger: el, start: trigger.enter, once: true, onEnter: () => void tween.play() });
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}
