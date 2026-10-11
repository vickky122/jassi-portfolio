"use client";

import { useRef } from "react";
import { Character } from "@/components/Character";
import { Jp } from "@/components/Jp";
import { SpeedLines } from "@/components/SpeedLines";
import { content } from "@/content/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, slash } from "@/lib/motion/motion";

/**
 * Chapter 01. The giant name sits behind the layered character, on a red sun disc. Entrance plays after the
 * opening ("site-ready"). Scroll: the two name lines slide apart and the character rises slightly (scrubbed).
 * Cursor: the character's layers drift at different depths and the pupils follow (multiplane camera).
 * Reduced motion: a short fade, then everything is still ("manga mode"): no drift, no scrub, no blink.
 */
export function Intro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add({ calm: MQ.reduce, full: MQ.noPreference, fine: MQ.fine }, (ctx) => {
        const calm = Boolean(ctx.conditions?.calm);
        const fine = Boolean(ctx.conditions?.fine);
        const m = calm ? motion.reduced : motion.full;
        const cleanups: Array<() => void> = [];
        let started = false;

        const play = () => {
          if (started) return;
          started = true;
          const tl = gsap.timeline({ defaults: { ease: m.ease.reveal } });
          if (calm) {
            tl.to(q("[data-intro]"), { opacity: 1, duration: m.duration.reveal });
            return;
          }
          tl.fromTo(q("[data-disc]"), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.3 }, 0)
            .fromTo(q("[data-burst]"), { opacity: 0, scale: 0.9 }, { opacity: 0.16, scale: 1, duration: 1.4 }, 0.1)
            .fromTo(
              q("[data-name]"),
              { clipPath: slash.hidden, opacity: 1, x: (i) => (i ? 90 : -90) },
              { clipPath: slash.shown, x: 0, duration: 1.1, stagger: m.stagger.lines },
              0.15,
            )
            .fromTo(q("[data-figure]"), { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3 }, 0.3)
            .fromTo(
              q("[data-info]"),
              { clipPath: slash.hidden, opacity: 1, x: -m.travel.x * 0.5 },
              {
                clipPath: slash.shown,
                x: 0,
                duration: m.duration.reveal,
                stagger: m.stagger.lines,
                onComplete: () => void gsap.set(q("[data-info]"), { clearProps: "clipPath,x" }),
              },
              0.8,
            )
            .fromTo(q("[data-tag]"), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: m.ease.limited, stagger: 0.1 }, 0.9);
        };
        const html = document.documentElement;
        if (html.hasAttribute("data-loading")) window.addEventListener("site-ready", play, { once: true });
        else play();
        cleanups.push(() => window.removeEventListener("site-ready", play));

        if (!calm) {
          // names slide apart, character rises, disc grows (scrubbed, transform only)
          const scrub = { trigger: el, start: "top top", end: "bottom top", scrub: m.scrub };
          gsap.to(q("[data-split='l']"), { xPercent: -16, ease: "none", scrollTrigger: scrub });
          gsap.to(q("[data-split='r']"), { xPercent: 16, ease: "none", scrollTrigger: scrub });
          gsap.to(q("[data-rise]"), { yPercent: -7, ease: "none", scrollTrigger: scrub });
          gsap.to(q("[data-pdisc]"), { scale: 1.12, ease: "none", scrollTrigger: scrub });
        }

        if (!calm && fine) {
          // cursor parallax: each character layer moves by its own depth
          const layers = q("[data-depth]").map((g) => {
            const d = Number((g as unknown as SVGElement).dataset.depth);
            return {
              x: gsap.quickTo(g, "x", { duration: 0.9, ease: "power3.out" }),
              y: gsap.quickTo(g, "y", { duration: 0.9, ease: "power3.out" }),
              d,
            };
          });
          const pupils = q(".pupils")[0];
          const px = pupils && gsap.quickTo(pupils, "x", { duration: 0.5, ease: "power3.out" });
          const py = pupils && gsap.quickTo(pupils, "y", { duration: 0.5, ease: "power3.out" });
          const disc = q("[data-pdisc]")[0];
          const dx = gsap.quickTo(disc, "x", { duration: 1.1, ease: "power3.out" });
          const dy = gsap.quickTo(disc, "y", { duration: 1.1, ease: "power3.out" });

          const onMove = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            layers.forEach(({ x, y, d }) => {
              x(nx * 14 * d);
              y(ny * 8 * d);
            });
            px?.(nx * 5);
            py?.(ny * 3);
            dx(nx * -18);
            dy(ny * -10);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          cleanups.push(() => window.removeEventListener("pointermove", onMove));
        }

        if (!calm) {
          // an occasional blink: swap the two eye states for a moment, only while the hero is on screen
          const open = q(".eyes-open")[0];
          const shut = q(".eyes-closed")[0];
          let alive = true;
          let visible = true;
          let call: gsap.core.Tween | undefined;
          const schedule = () => {
            call = gsap.delayedCall(2.4 + (Math.sin(performance.now()) + 1) * 1.8, () => {
              if (!alive) return;
              if (visible) {
                gsap.set(open, { opacity: 0 });
                gsap.set(shut, { opacity: 1 });
                gsap.delayedCall(0.12, () => {
                  gsap.set(open, { opacity: 1 });
                  gsap.set(shut, { opacity: 0 });
                });
              }
              schedule();
            });
          };
          schedule();
          const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
          io.observe(el);
          cleanups.push(() => {
            alive = false;
            call?.kill();
            io.disconnect();
          });
        }

        return () => cleanups.forEach((fn) => fn());
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const name = content.name;
  return (
    <section
      ref={root}
      id="intro"
      data-chapter="1"
      data-chapter-name={content.chapters[0].name}
      data-tone="ink"
      aria-labelledby="intro-title"
      className="surface-ink relative isolate flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* sun disc, its halftone print-offset, and the speed lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grid place-items-center">
        <div data-pdisc className="relative size-[min(96vw,84svh)] translate-y-[-4%] will-change-transform">
          <div data-burst data-intro className="absolute -inset-[34%]">
            <SpeedLines className="size-full text-paper" />
          </div>
          <div
            data-disc
            data-intro
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: "var(--crimson)" }}
          />
          <div
            data-disc
            data-intro
            className="halftone absolute inset-0 translate-x-[3.5%] translate-y-[3%] rounded-full text-crimson-deep"
            style={{
              WebkitMaskImage: "radial-gradient(circle, transparent 62%, #000 63%, transparent 100%)",
              maskImage: "radial-gradient(circle, transparent 62%, #000 63%, transparent 100%)",
              backgroundSize: "14px 14px",
              zIndex: -1,
            }}
          />
        </div>
      </div>

      {/* giant name, behind the character */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[18svh] -z-0 flex flex-col items-center md:top-[10svh]">
        <div data-split="l">
          <div data-name data-intro className="t-giant text-paper">
            {name.first}
          </div>
        </div>
        <div data-split="r">
          <div data-name data-intro className="t-giant text-paper">
            {name.last}
          </div>
        </div>
      </div>

      {/* the character: wrapper rises on scroll, inner figure does the entrance */}
      <div data-rise className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
        <div data-figure data-intro className="h-[74svh] md:h-[88svh]">
          <Character
            title={`Illustrated portrait of ${name.first} ${name.last}: a young man with thick dark hair swept across the forehead and a full short beard, in a black suit and a red and navy striped tie`}
            className="h-full w-auto"
          />
        </div>
      </div>

      {/* episode label */}
      <div className="pad-x absolute top-[5.2rem] right-0 left-0 z-20 flex items-center justify-between md:top-24">
        <div data-tag data-intro className="t-label flex items-center gap-3 text-paper">
          <Jp className="text-base">{content.ornaments.episodes[0]}</Jp>
          <span>episode 01 · {content.chapters[0].episodeTitle}</span>
        </div>
      </div>

      {/* vertical decorative marks, desktop only */}
      <div aria-hidden="true" className="pad-x pointer-events-none absolute top-1/2 right-0 z-20 hidden -translate-y-1/2 md:block">
        <Jp className="block text-5xl text-paper/80 [writing-mode:vertical-rl]">
          {content.ornaments.international + content.ornaments.trade}
        </Jp>
      </div>

      {/* legibility scrim for the info block */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[52%] bg-linear-to-t from-ink via-ink/85 to-transparent md:h-[36%]" />

      {/* info: the 5-second recruiter test lives here */}
      <div className="pad-x relative z-30 pb-[calc(var(--frame-inset)+2.2rem)]">
        <h1 id="intro-title" className="sr-only">
          {name.first} {name.last}: {content.target.role}
        </h1>
        <p data-info data-intro className="max-w-xl text-[clamp(1.15rem,2.4vw,1.7rem)] leading-snug font-bold">
          {content.positioning.options[content.positioning.chosen]}
        </p>
        <div data-info data-intro className="t-label mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="pill text-cyan">
            <i aria-hidden="true" />
            {content.target.availability}
          </span>
          <span>{content.contact.location}</span>
          <span>{content.target.domain}</span>
        </div>
        <div data-info data-intro className="mt-5 flex flex-wrap gap-3">
          <a href="#cases" className="btn btn-solid">
            view arcs
          </a>
          <a href={content.contact.resume} download className="btn btn-line">
            resume
          </a>
        </div>
      </div>
    </section>
  );
}
