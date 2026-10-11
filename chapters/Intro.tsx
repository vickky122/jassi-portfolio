"use client";

import Image from "next/image";
import { useRef } from "react";
import { Jp } from "@/components/Jp";
import { SpeedLines } from "@/components/SpeedLines";
import { content } from "@/content/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, slash } from "@/lib/motion/motion";

/**
 * Chapter 01. Desktop: the giant name takes the left column (never covered), the portrait stands on the right in
 * front of the red sun and speed lines. Phones: the name stacks across the top and the portrait sits below it.
 * The entrance plays after the opening ("site-ready"). Scroll: the two name lines slide apart and the portrait rises
 * slightly (scrubbed). Cursor: portrait, sun disc and speed lines drift at different depths (multiplane camera).
 * Reduced motion: a short fade, then everything is still ("manga mode"): no drift, no scrub.
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
            const d = Number((g as HTMLElement).dataset.depth);
            return {
              x: gsap.quickTo(g, "x", { duration: 0.9, ease: "power3.out" }),
              y: gsap.quickTo(g, "y", { duration: 0.9, ease: "power3.out" }),
              d,
            };
          });
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
            dx(nx * -18);
            dy(ny * -10);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          cleanups.push(() => window.removeEventListener("pointermove", onMove));
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
      className="hero surface-ink relative isolate flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* sun disc, its halftone print-offset, and the speed lines: centred on the portrait */}
      <div aria-hidden="true" className="hero-disc-wrap pointer-events-none -z-10">
        <div data-pdisc className="hero-disc will-change-transform">
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

      {/* giant name: its own space, so no letter is ever hidden */}
      <div
        aria-hidden="true"
        className="pad-x pointer-events-none absolute inset-x-0 top-[max(6.9rem,14svh)] z-20 flex flex-col items-center md:top-[max(7.5rem,16svh)] md:z-0 md:items-start"
      >
        <div data-split="l">
          <div data-name data-intro className="t-hero-name text-paper">
            {name.first}
          </div>
        </div>
        <div data-split="r" className="md:ml-[4vw]">
          <div data-name data-intro className="t-hero-name text-paper">
            {name.last}
          </div>
        </div>
      </div>

      {/* the portrait: wrapper rises on scroll, inner figure does the entrance */}
      <div data-rise className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-full items-end justify-center md:w-[58%]">
        <div data-figure data-intro className="hero-fig">
          <div data-depth="1" className="h-full">
            <Image
              src="/portrait/jassi.webp"
              alt={`Illustrated portrait of ${name.first} ${name.last}: a smiling young man with short dark hair swept up and light stubble, in a black suit, white shirt and a red and navy striped tie`}
              width={820}
              height={1200}
              priority
              unoptimized
              className="h-full w-auto max-w-none"
            />
          </div>
        </div>
      </div>

      {/* episode label; on phones the open-to-work signal sits on the same row to save height */}
      <div className="pad-x absolute top-[5.2rem] right-0 left-0 z-30 flex items-center justify-between gap-3 md:top-24">
        <div data-tag data-intro className="t-label flex shrink-0 items-center gap-3 whitespace-nowrap text-paper">
          <Jp className="text-base">{content.ornaments.episodes[0]}</Jp>
          <span>
            <span className="md:hidden max-[380px]:hidden">ep 01</span>
            <span className="hidden md:inline">episode 01 · {content.chapters[0].episodeTitle}</span>
          </span>
        </div>
        <div data-tag data-intro className="t-label flex shrink-0 items-center gap-2 whitespace-nowrap text-cyan md:hidden">
          <i aria-hidden="true" className="size-2 rounded-full bg-cyan" />
          {content.target.availability}
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
      <div className="pad-x relative z-30 pb-[calc(var(--frame-inset)+1.6rem)] md:pb-[calc(var(--frame-inset)+2.2rem)]">
        <h1 id="intro-title" className="sr-only">
          {name.first} {name.last}: {content.target.role}
        </h1>
        <p data-info data-intro className="max-w-xl text-[clamp(1.02rem,2.4vw,1.7rem)] leading-snug font-bold">
          {content.positioning.options[content.positioning.chosen]}
        </p>
        <div data-info data-intro className="t-label mt-3 hidden flex-wrap items-center gap-x-5 gap-y-2 md:mt-4 md:flex">
          <span className="pill text-cyan">
            <i aria-hidden="true" />
            {content.target.availability}
          </span>
          <span>{content.contact.location}</span>
          <span>{content.target.domain}</span>
        </div>
        <div data-info data-intro className="mt-4 flex flex-wrap gap-3 md:mt-5">
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
