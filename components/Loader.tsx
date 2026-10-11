"use client";

import { useRef } from "react";
import { content } from "@/content/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, slash } from "@/lib/motion/motion";
import { Jp } from "./Jp";

const SEEN = "opening-seen";

/** Tell the rest of the page the opening is over: scrolling starts, the intro plays. */
function finish() {
  const html = document.documentElement;
  try {
    sessionStorage.setItem(SEEN, "1");
  } catch {}
  html.removeAttribute("data-loading");
  html.setAttribute("data-loader", "skip");
  window.dispatchEvent(new Event("site-ready"));
}

/**
 * The opening sequence (OP): a red sun and a title card over ink, a counter tied to real loading (fonts and
 * the page), one soft burst of speed lines, then two diagonal panels slide apart. First visit per session only.
 * "skip intro" is always on screen. Reduced motion: the title card fades in and out, no burst, no split.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const skip = useRef(false);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const html = document.documentElement;
      if (html.getAttribute("data-loader") === "skip" || !html.hasAttribute("data-loading")) {
        window.dispatchEvent(new Event("site-ready"));
        return;
      }

      const q = gsap.utils.selector(el);
      const counter = q("[data-counter]")[0] as HTMLElement;
      const write = (v: number) => void (counter.textContent = String(Math.round(v)).padStart(3, "0"));

      const loaded = Promise.all([
        document.fonts.ready,
        new Promise<void>((r) => (document.readyState === "complete" ? r() : window.addEventListener("load", () => r(), { once: true }))),
      ]);

      const mm = gsap.matchMedia();
      mm.add({ calm: MQ.reduce, full: MQ.noPreference }, (ctx) => {
        const calm = Boolean(ctx.conditions?.calm);
        const m = calm ? motion.reduced : motion.full;
        const p = { v: 0 };
        const tl = gsap.timeline({ onComplete: finish });

        if (calm) {
          gsap.set(q("[data-line]"), { opacity: 1 });
          tl.fromTo(q("[data-card]"), { opacity: 0 }, { opacity: 1, duration: m.duration.reveal });
          tl.add(() => {
            write(100);
            tl.pause();
            void loaded.then(() => tl.play());
          });
          tl.to(el, { opacity: 0, duration: m.duration.ui, delay: 0.3 });
          return;
        }

        tl.fromTo(q("[data-sun]"), { scale: 0.45, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: m.ease.reveal }, 0)
          .fromTo(
            q("[data-line]"),
            { clipPath: slash.hidden, opacity: 1 },
            { clipPath: slash.shown, duration: 0.8, stagger: m.stagger.lines, ease: m.ease.reveal },
            0.35,
          )
          // one soft burst of speed lines: a single rise and fall, nowhere near a flash
          .fromTo(q("[data-burst]"), { opacity: 0, scale: 0.85 }, { opacity: 0.35, scale: 1, duration: 0.3, ease: m.ease.ui }, 0.5)
          .to(q("[data-burst]"), { opacity: 0.1, duration: 0.7, ease: "none" }, ">")
          .to(p, { v: 90, duration: 1.0, ease: "power1.out", onUpdate: () => write(p.v) }, 0)
          .addPause(1.2, () => {
            if (skip.current) return void tl.play();
            void loaded.then(() => tl.play());
          })
          .to(p, { v: 100, duration: 0.3, ease: "none", onUpdate: () => write(p.v) })
          .to(q("[data-card]"), { opacity: 0, duration: 0.3, delay: 0.35 })
          .to(q("[data-panel='l']"), { xPercent: -102, duration: m.duration.transition, ease: m.ease.move }, ">")
          .to(q("[data-panel='r']"), { xPercent: 102, duration: m.duration.transition, ease: m.ease.move }, "<");

        // "skip intro": run everything else at speed
        const onSkip = () => {
          skip.current = true;
          tl.timeScale(6);
          if (tl.paused()) tl.play();
        };
        el.addEventListener("loader-skip", onSkip);
        return () => el.removeEventListener("loader-skip", onSkip);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      role="status"
      aria-label="opening sequence"
      className="loader fixed inset-0 z-90 overflow-hidden text-paper"
    >
      <div data-panel="l" className="surface-ink absolute inset-0" style={{ clipPath: "polygon(0 0, 56% 0, 44% 100%, 0 100%)" }} />
      <div data-panel="r" className="surface-ink absolute inset-0" style={{ clipPath: "polygon(56% 0, 100% 0, 100% 100%, 44% 100%)" }} />

      <div data-card className="absolute inset-0 grid place-items-center">
        <svg
          data-burst
          aria-hidden="true"
          viewBox="-100 -100 200 200"
          className="speed-lines absolute size-[130vmin] opacity-0"
        >
          {Array.from({ length: 36 }, (_, i) => {
            const a = (i / 36) * Math.PI * 2;
            const r0 = 52 + (i % 3) * 6;
            const r1 = 96;
            const w = 0.02 + (i % 4) * 0.01;
            const x = (r: number, da: number) => (Math.cos(a + da) * r).toFixed(2);
            const y = (r: number, da: number) => (Math.sin(a + da) * r).toFixed(2);
            return <polygon key={i} points={`${x(r0, 0)},${y(r0, 0)} ${x(r1, -w)},${y(r1, -w)} ${x(r1, w)},${y(r1, w)}`} fill="#f6f1ea" />;
          })}
        </svg>
        <div data-sun aria-hidden="true" className="absolute size-[min(70vw,46vh)] rounded-full bg-crimson" />
        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
          <div data-line className="opacity-0">
            <Jp className="text-lg tracking-[0.4em]">第一期</Jp>
          </div>
          <div data-line className="t-giant !text-[clamp(3.4rem,15vw,9rem)] opacity-0">
            {content.name.first} {content.name.last}
          </div>
          <div data-line className="t-label opacity-0">
            season 1 · {content.target.domain}
          </div>
        </div>
      </div>

      <div className="t-label absolute right-0 bottom-0 left-0 flex items-end justify-between px-[calc(var(--frame-inset)+14px)] pb-[calc(var(--frame-inset)+14px)]">
        <span aria-hidden="true" className="tabular-nums">
          loading <span data-counter>000</span>
        </span>
        <button
          type="button"
          className="btn btn-line"
          onClick={() => root.current?.dispatchEvent(new Event("loader-skip"))}
        >
          skip intro
        </button>
      </div>
    </div>
  );
}
