"use client";

import { useRef } from "react";
import { Copy, has } from "@/components/Copy";
import { EpisodeHeader } from "@/components/EpisodeHeader";
import { content } from "@/content/content";
import { useSlash } from "@/hooks/useSlash";

/**
 * Chapter 05: the status window. A cyan HUD panel listing skills with how each was used. No percentages and no
 * levels: nothing on the CV measures them, so nothing here pretends to.
 */
export function Craft() {
  const root = useRef<HTMLElement>(null);
  useSlash(root);
  const ch = content.chapters[4];

  return (
    <section
      ref={root}
      id="craft"
      data-chapter="5"
      data-chapter-name={ch.name}
      data-tone="ink"
      aria-labelledby="craft-title"
      className="surface-ink pad-x py-24 md:py-32"
    >
      <EpisodeHeader index={5} label={`episode 05 · ${ch.name}`} title={ch.episodeTitle} headingId="craft-title" className="mb-12 md:mb-16" />

      <div className="grid gap-6 md:grid-cols-12">
        <div
          data-slash
          className="panel relative bg-ink-2 md:col-span-7"
          style={{ boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--cyan) 60%, transparent)" }}
        >
          <div className="t-label flex items-center justify-between border-b border-cyan/30 px-6 py-3 text-cyan">
            <span>status window</span>
            <span aria-hidden="true" className="flex gap-1.5">
              <i className="size-2 rounded-full bg-cyan" />
              <i className="size-2 rounded-full bg-cyan/50" />
              <i className="size-2 rounded-full bg-cyan/25" />
            </span>
          </div>
          <ol>
            {content.skills.map((s, i) => (
              <li key={s.name} data-slash data-delay={i * 0.08} className="flex gap-5 border-b border-paper/10 px-6 py-5 last:border-0">
                <span aria-hidden="true" className="font-display text-3xl leading-none text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="t-h3">{s.name}</h3>
                  {has(s.line) ? (
                    <p className="mt-1.5 text-mute">
                      <Copy>{s.line}</Copy>
                    </p>
                  ) : process.env.NODE_ENV !== "production" ? (
                    <p className="mt-1.5">
                      <Copy>{s.line}</Copy>
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-6 md:col-span-5">
          <div data-slash data-delay="0.1" className="panel panel-ink p-6 md:p-8">
            <h3 className="t-label mb-4 text-cyan">traits</h3>
            <ul className="flex flex-wrap gap-2">
              {content.behavioural.map((b) => (
                <li key={b} className="chip t-label !text-sm">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div data-slash data-delay="0.2" className="panel panel-ink p-6 md:p-8">
            <h3 className="t-label mb-4 text-cyan">side quests · certifications</h3>
            <ul className="space-y-4">
              {content.certifications.map((c) => (
                <li key={c.name} className="border-t border-paper/10 pt-4 first:border-0 first:pt-0">
                  <p className="font-semibold">{c.name}</p>
                  <p className="t-label mt-1 text-mute">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
