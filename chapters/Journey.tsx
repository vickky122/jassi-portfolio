"use client";

import { useRef } from "react";
import { Copy, has } from "@/components/Copy";
import { EpisodeHeader } from "@/components/EpisodeHeader";
import { content } from "@/content/content";
import { useSlash } from "@/hooks/useSlash";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion } from "@/lib/motion/motion";

/**
 * Chapter 03: the flashback. A washed-out paper chapter. A thread draws down the page (scrubbed scaleY) and a
 * crimson stamp lands on each year as the thread reaches it. Desktop: entries alternate around the thread.
 * Mobile: all on the right. Reduced motion: the thread is simply drawn and the stamps are in place.
 */
export function Journey() {
  const root = useRef<HTMLElement>(null);
  useSlash(root);
  const ch = content.chapters[2];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add({ calm: MQ.reduce, full: MQ.noPreference }, (ctx) => {
        const calm = Boolean(ctx.conditions?.calm);
        const m = calm ? motion.reduced : motion.full;
        if (calm) {
          gsap.set(q("[data-thread]"), { scaleY: 1 });
          return;
        }
        gsap.fromTo(
          q("[data-thread]"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: q("[data-track]")[0], start: "top 70%", end: "bottom 65%", scrub: m.scrub },
          },
        );
        q("[data-stamp]").forEach((s) => {
          gsap.fromTo(
            s,
            { scale: 0, rotation: -25 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: s, start: "top 68%", once: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="journey"
      data-chapter="3"
      data-chapter-name={ch.name}
      data-tone="paper"
      aria-labelledby="journey-title"
      className="surface-paper relative overflow-hidden pad-x py-24 md:py-32"
    >
      <div aria-hidden="true" className="halftone halftone-fade-b pointer-events-none absolute top-0 right-0 h-[40%] w-[60%] text-ink opacity-10" />
      <EpisodeHeader index={3} label={`episode 03 · ${ch.name}`} title={ch.episodeTitle} headingId="journey-title" className="relative mb-14 md:mb-20" />

      <div data-track className="relative">
        <div aria-hidden="true" className="absolute top-0 bottom-0 left-[16px] w-[3px] -translate-x-1/2 bg-ink/15 md:left-1/2" />
        <div
          data-thread
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[16px] w-[3px] origin-top -translate-x-1/2 bg-crimson md:left-1/2"
        />
        <ol className="space-y-14 md:space-y-20">
          {content.timeline.map((e, i) => {
            const even = i % 2 === 0;
            return (
              <li
                key={e.year}
                data-slash
                className={`relative pl-12 md:w-1/2 md:pl-0 ${
                  even ? "md:pr-16 md:text-right" : "md:ml-[50%] md:pl-16"
                }`}
              >
                <span
                  data-stamp
                  aria-hidden="true"
                  className={`absolute top-3 left-[16px] size-[22px] -translate-x-1/2 rounded-full border-[3px] border-paper bg-crimson ${
                    even ? "md:right-0 md:left-auto md:translate-x-1/2" : "md:left-0"
                  }`}
                />
                <p className="font-display text-[clamp(3.4rem,9vw,7rem)] leading-none text-crimson">{e.year}</p>
                <h3 className="t-h3 mt-2">{e.title}</h3>
                <p className="t-label mt-2 text-ink/75">{e.place}</p>
                {has(e.line) && (
                  <p className="mt-3 max-w-md md:inline-block">
                    <Copy>{e.line}</Copy>
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
