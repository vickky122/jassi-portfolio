"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, type MotionSet } from "@/lib/motion/motion";

const INTERACTIVE = "a, button, summary, [role='button'], [data-cursor]";

/**
 * A small dot that trails the pointer and grows into a ring over links and buttons. The native cursor stays.
 * Only exists for a fine pointer with hover (hidden on touch). Its colour follows the surface under it
 * (the --edge variable set by .surface-*). Reduced motion: the dot tracks the pointer exactly and changes
 * size instantly.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = dot.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add({ fine: MQ.fine, calm: MQ.reduce }, (ctx) => {
        if (!ctx.conditions?.fine) return;
        const calm = Boolean(ctx.conditions.calm);
        const m: MotionSet = calm ? motion.reduced : motion.full;

        gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });
        const moveX = calm ? (v: number) => gsap.set(el, { x: v }) : gsap.quickTo(el, "x", { duration: m.duration.micro, ease: m.ease.ui });
        const moveY = calm ? (v: number) => gsap.set(el, { y: v }) : gsap.quickTo(el, "y", { duration: m.duration.micro, ease: m.ease.ui });

        let visible = false;
        let grown = false;

        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
          if (!visible) {
            gsap.set(el, { x: e.clientX, y: e.clientY });
            gsap.to(el, { opacity: 1, duration: m.duration.micro });
            visible = true;
          }
          moveX(e.clientX);
          moveY(e.clientY);
        };
        const onOver = (e: PointerEvent) => {
          const target = e.target as Element | null;
          if (!target) return;
          const colour = getComputedStyle(target).getPropertyValue("--edge").trim();
          if (colour) gsap.set(el, { borderColor: colour, backgroundColor: colour });
          const interactive = Boolean(target.closest(INTERACTIVE));
          if (interactive === grown) return;
          grown = interactive;
          // translucent when grown so the link text underneath stays readable
          const to = { scale: interactive ? 3.4 : 1, opacity: interactive ? 0.35 : 1 };
          if (calm) gsap.set(el, to);
          else gsap.to(el, { ...to, duration: m.duration.micro, ease: m.ease.ui, overwrite: "auto" });
        };
        const hide = () => {
          if (!visible) return;
          visible = false;
          gsap.to(el, { opacity: 0, duration: m.duration.micro });
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerover", onOver, { passive: true });
        document.documentElement.addEventListener("pointerleave", hide);
        return () => {
          window.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerover", onOver);
          document.documentElement.removeEventListener("pointerleave", hide);
        };
      });
      return () => mm.revert();
    },
    { scope: dot },
  );

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-60 size-3 rounded-full border border-paper bg-paper opacity-0"
    />
  );
}
