"use client";

import { useRef } from "react";
import { Jp } from "@/components/Jp";
import { content } from "@/content/content";
import { useSlash } from "@/hooks/useSlash";

/** "Previously on...": the 5-second summary, straight after the hero. */
export function Recap() {
  const root = useRef<HTMLElement>(null);
  useSlash(root);

  return (
    <section
      ref={root}
      id="recap"
      data-chapter="1"
      data-chapter-name="recap"
      data-tone="ink"
      aria-labelledby="recap-title"
      className="surface-ink-2 pad-x py-20 md:py-28"
    >
      <div data-slash className="t-label mb-8 flex items-center gap-3">
        <Jp className="text-base">{content.ornaments.recap}</Jp>
        <h2 id="recap-title">previously on…</h2>
        <span aria-hidden="true" className="h-px flex-1 bg-current opacity-30" />
      </div>
      <ol className="grid gap-5 md:grid-cols-3">
        {content.recap.map((line, i) => (
          <li
            key={line}
            data-slash
            data-delay={i * 0.1}
            className="panel panel-ink flex flex-col gap-6 p-6 md:p-8"
          >
            <span aria-hidden="true" className="font-display text-6xl leading-none text-crimson">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[clamp(1.05rem,1.5vw,1.3rem)] leading-snug font-semibold">{line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
