"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Copy, has } from "@/components/Copy";
import { Jp } from "@/components/Jp";
import { KeyVisual } from "@/components/KeyVisual";
import { content } from "@/content/content";
import { useSlash } from "@/hooks/useSlash";

type Case = (typeof content.cases)[number];

/**
 * Stacked panels use position: sticky. A panel taller than the screen must stick by its bottom edge, or its lower
 * half could never be seen, so the sticky offset is min(0, viewport height - panel height), kept in --stick.
 */
function useStickOffset(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => el.style.setProperty("--stick", `${Math.min(0, window.innerHeight - el.offsetHeight)}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    window.addEventListener("resize", set);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", set);
    };
  }, [ref]);
}

function Field({ label, children }: { label: string; children: string }) {
  if (!has(children)) {
    if (process.env.NODE_ENV === "production") return null;
  }
  return (
    <div>
      <dt className="t-label mb-2 border-t border-current/40 pt-2">{label}</dt>
      <dd className="leading-snug">
        <Copy>{children}</Copy>
      </dd>
    </div>
  );
}

/** "next time on..." strip that links to the next arc. */
function NextTime({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      data-slash
      className="group t-label mt-10 inline-flex items-center gap-3 self-start border-b border-current/40 pb-2"
    >
      <Jp className="text-base">{content.ornaments.nextPreview}</Jp>
      <span>next time: </span>
      <span className="link-draw font-bold">{label}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

function CaseArc({ c, deep, next }: { c: Case; deep?: boolean; next: { href: string; label: string } }) {
  const ref = useRef<HTMLElement>(null);
  useSlash(ref);
  useStickOffset(ref);
  const n = String(c.arc).padStart(2, "0");
  return (
    <section
      ref={ref}
      id={`case-${c.slug}`}
      data-chapter="4"
      data-chapter-name={`arc ${n} · ${c.slug}`}
      data-tone="crimson"
      aria-labelledby={`case-${c.slug}-title`}
      className={`surface-crimson pad-x relative flex min-h-svh flex-col justify-center py-24 md:py-16 ${deep ? "!bg-crimson-deep" : ""}`}
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <div data-slash className="mb-5 flex items-end gap-4">
            <span aria-hidden="true" className="outline-num text-[clamp(4rem,10vw,8rem)]">
              {n}
            </span>
            <span className="t-label pb-2">arc {n} · case file</span>
          </div>
          <h3 id={`case-${c.slug}-title`} data-slash data-delay="0.08" className="t-h1 !text-[clamp(2.2rem,5.6vw,4.8rem)]">
            {c.title}
          </h3>
          <p data-slash data-delay="0.14" className="t-label mt-4">
            {c.role} · {c.org} · {c.dates}
          </p>
          <dl data-slash data-delay="0.2" className="mt-8 grid gap-6 sm:grid-cols-2">
            <Field label="the assignment">{c.assignment}</Field>
            <Field label="what i checked, and against what">{c.checked}</Field>
            <Field label="the control behind it">{c.control}</Field>
            <Field label="the evidence trail">{c.evidence}</Field>
            <Field label="in practice">{c.result}</Field>
          </dl>
          <ul data-slash data-delay="0.26" className="t-label mt-8 flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div data-slash data-delay="0.15" className="panel relative hidden self-center bg-ink p-8 md:col-span-5 md:block">
          <span aria-hidden="true" className="halftone halftone-fade-r absolute inset-0 text-crimson opacity-40" />
          <KeyVisual kind={c.slug === "exports" ? "export" : "payroll"} className="relative w-full" />
        </div>
      </div>
      <NextTime {...next} />
    </section>
  );
}

function Tournament() {
  const ref = useRef<HTMLElement>(null);
  useSlash(ref);
  useStickOffset(ref);
  return (
    <section
      ref={ref}
      id="case-tournament"
      data-chapter="4"
      data-chapter-name="arc 03 · tournament"
      data-tone="ink"
      aria-labelledby="case-tournament-title"
      className="surface-ink-2 pad-x relative flex min-h-svh flex-col justify-center py-24 md:py-16"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <div data-slash className="mb-5 flex items-end gap-4">
            <span aria-hidden="true" className="outline-num text-[clamp(4rem,10vw,8rem)]">
              03
            </span>
            <span className="t-label pb-2">arc 03 · tournament arc</span>
          </div>
          <h3 id="case-tournament-title" data-slash data-delay="0.08" className="t-h1 !text-[clamp(2.2rem,5.6vw,4.8rem)]">
            teams, trophies and the court
          </h3>
          <p data-slash data-delay="0.14" className="mt-5 max-w-md text-mute">
            Competitions and sport, where teamwork and leadership are tested in public.
          </p>
          <div data-slash data-delay="0.18" className="panel relative mt-8 hidden bg-ink p-6 md:block">
            <span aria-hidden="true" className="halftone halftone-fade-r absolute inset-0 text-crimson opacity-40" />
            <KeyVisual kind="tournament" className="relative mx-auto w-3/4" />
          </div>
        </div>
        <ul className="grid gap-4 md:col-span-7 md:grid-cols-2">
          {content.achievements.map((a, i) => (
            <li
              key={a.title}
              data-slash
              data-delay={0.1 + i * 0.08}
              className={`tile panel panel-ink flex flex-col justify-between gap-6 p-6 ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <span aria-hidden="true" className="tile-dots halftone text-paper" />
              <span className="t-label relative flex items-center justify-between text-cyan">
                <span>{"year" in a ? a.year : "trophy"}</span>
                <span aria-hidden="true">★</span>
              </span>
              <div className="relative">
                <h4 className="t-h3">{a.title}</h4>
                <p className="mt-2 text-mute">{a.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <NextTime href="#craft" label="the status window" />
    </section>
  );
}

/** Chapter 04: the arcs. Two internship case files, then the tournament arc, stacked like episodes. */
export function Cases() {
  const [first, second] = content.cases;
  return (
    <div id="cases" className="case-stack">
      <CaseArc c={first} next={{ href: `#case-${second.slug}`, label: second.title }} />
      <CaseArc c={second} deep next={{ href: "#case-tournament", label: "the tournament arc" }} />
      <Tournament />
    </div>
  );
}
