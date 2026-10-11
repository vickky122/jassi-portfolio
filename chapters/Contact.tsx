"use client";

import { useRef } from "react";
import { Jp } from "@/components/Jp";
import { content } from "@/content/content";
import { useSlash } from "@/hooks/useSlash";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { MQ } from "@/lib/motion/motion";

let toastTimer: number | undefined;

/** Copies the address and announces it in the live region. Falls back to the mailto link if copying is blocked. */
async function copyEmail(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const toast = document.getElementById("copy-toast");
  try {
    await navigator.clipboard.writeText(content.contact.email);
    if (!toast) return;
    toast.textContent = `copied ${content.contact.email}`;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => (toast.textContent = ""), 2800);
  } catch {
    window.location.href = `mailto:${content.contact.email}`;
  }
}

const PETALS = Array.from({ length: 11 }, (_, i) => ({
  left: `${(i * 9 + 4) % 100}%`,
  size: `${12 + ((i * 5) % 9)}px`,
  dur: `${13 + ((i * 3) % 7)}s`,
  delay: `-${(i * 2.3).toFixed(1)}s`,
  drift: `${(i % 2 ? 1 : -1) * (6 + (i % 4) * 3)}vw`,
  spin: `${360 + i * 60}deg`,
}));

/**
 * Chapter 06: the end credits. A black sun sets behind the headline as you scroll; a few petals fall (only
 * here, and only while this chapter is on screen). Links are written as paths. The email link copies the address
 * and announces it; it still works as a mailto link if copying is blocked.
 * Reduced motion: no setting sun, no petals; the sun is simply in place.
 */
export function Contact() {
  const root = useRef<HTMLElement>(null);
  useSlash(root);
  const ch = content.chapters[5];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add({ calm: MQ.reduce, full: MQ.noPreference }, (ctx) => {
        if (ctx.conditions?.calm) return;
        gsap.fromTo(
          q("[data-sun]"),
          { yPercent: -14 },
          { yPercent: 34, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.6 } },
        );
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          end: "bottom top",
          onToggle: (self) => el.classList.toggle("petals-on", self.isActive),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const links = [
    { label: "./email", note: "copies the address", href: `mailto:${content.contact.email}`, onClick: copyEmail },
    { label: "./linkedin", note: "opens in a new tab", href: content.contact.linkedin, external: true },
    { label: "./resume", note: "pdf download", href: content.contact.resume, download: true },
    { label: "./plain-view", note: "the facts, one page", href: "/resume" },
  ] as const;

  return (
    <section
      ref={root}
      id="contact"
      data-chapter="6"
      data-chapter-name={ch.name}
      data-tone="crimson"
      aria-labelledby="contact-title"
      className="surface-crimson pad-x relative isolate flex min-h-svh flex-col justify-center overflow-hidden py-24 md:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 grid place-items-end justify-center">
        <div data-sun className="relative size-[min(120vw,92vmin)] translate-y-[30%] rounded-full bg-ink">
          <span
            className="halftone absolute inset-0 -z-10 translate-x-[3%] translate-y-[3%] rounded-full text-crimson-deep"
            style={{ backgroundSize: "14px 14px" }}
          />
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {PETALS.map((p, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className="petal"
            style={{ left: p.left, "--size": p.size, "--dur": p.dur, "--delay": p.delay, "--drift": p.drift, "--spin": p.spin } as React.CSSProperties}
          >
            <path d="M10 1 C15 5 17 11 10 19 C3 11 5 5 10 1 Z" fill="var(--sakura)" />
          </svg>
        ))}
      </div>

      <div data-slash className="t-label mb-6 flex items-center gap-3">
        <Jp className="text-base">{content.ornaments.episodes[5]}</Jp>
        <span>episode 06 · end credits</span>
      </div>
      <h2 id="contact-title" className="sr-only">
        {ch.episodeTitle}: contact
      </h2>
      <p aria-hidden="true" data-slash data-delay="0.08" className="t-giant !text-[clamp(4.5rem,19vw,15rem)]">
        let&rsquo;s talk.
      </p>
      <p data-slash data-delay="0.16" className="mt-6 max-w-xl text-[clamp(1.1rem,1.8vw,1.5rem)] leading-snug font-semibold">
        I&rsquo;m open to opportunities in {content.target.domain}. Season 2 starts with you.
      </p>

      <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
        {links.map((l, i) => (
          <li key={l.label} data-slash data-delay={0.2 + i * 0.07}>
            <a
              href={l.href}
              className="group flex items-baseline justify-between gap-4 border-b border-paper/40 py-3"
              {...("external" in l ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...("download" in l ? { download: true } : {})}
              {...("onClick" in l ? { onClick: l.onClick } : {})}
            >
              <span className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] uppercase link-draw">{l.label}</span>
              <span className="t-label">{l.note}</span>
            </a>
          </li>
        ))}
      </ul>
      <p id="copy-toast" role="status" aria-live="polite" className="t-label mt-4 min-h-6 font-bold" />

      <p data-slash data-delay="0.5" className="t-label mt-8 max-w-md">
        off the clock: {content.hobbies}.
      </p>
      <Jp className="pointer-events-none absolute top-[18%] hidden md:block right-[calc(var(--frame-inset)+var(--rail)+1rem)] text-[clamp(3.5rem,10vw,9rem)] text-paper/25">
        {content.ornaments.end}
      </Jp>
    </section>
  );
}
