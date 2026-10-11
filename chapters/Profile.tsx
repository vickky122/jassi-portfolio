"use client";

import { useRef } from "react";
import { EpisodeHeader } from "@/components/EpisodeHeader";
import { content } from "@/content/content";
import { useSlash } from "@/hooks/useSlash";

/** Layout per tile (md: 6-column bento). Keys are the labels in content.profile. */
const SPAN: Record<string, string> = {
  domain: "md:col-span-3 md:row-span-2",
  degree: "md:col-span-3",
  university: "md:col-span-2",
  expected: "md:col-span-1",
  undergraduate: "md:col-span-3",
  "audio tracks": "md:col-span-3",
  strengths: "md:col-span-6",
};
const LIST = new Set(["audio tracks", "strengths"]);

/** Chapter 02: the character sheet, plus the About as a visual-novel dialogue box. */
export function Profile() {
  const root = useRef<HTMLElement>(null);
  useSlash(root);
  const ch = content.chapters[1];

  return (
    <section
      ref={root}
      id="profile"
      data-chapter="2"
      data-chapter-name={ch.name}
      data-tone="ink"
      aria-labelledby="profile-title"
      className="surface-ink pad-x py-24 md:py-32"
    >
      <EpisodeHeader index={2} label={`episode 02 · ${ch.name}`} title={ch.episodeTitle} headingId="profile-title" className="mb-12 md:mb-16" />

      <ul className="grid gap-4 md:grid-cols-6">
        {content.profile.map((t, i) => {
          const hero = t.label === "domain";
          const list = LIST.has(t.label);
          return (
            <li
              key={t.label}
              data-slash
              data-delay={i * 0.07}
              className={`tile panel flex flex-col justify-between gap-6 p-6 md:p-8 ${SPAN[t.label] ?? "md:col-span-3"} ${
                hero ? "surface-crimson" : "panel-ink"
              }`}
            >
              <span aria-hidden="true" className={`tile-dots halftone ${hero ? "text-ink" : "text-paper"}`} />
              <span className={`t-label relative ${hero ? "text-paper" : "text-mute"}`}>{t.label}</span>
              {list ? (
                <ul className="relative flex flex-wrap gap-2">
                  {t.value.split(" · ").map((v) => (
                    <li key={v} className="chip t-label !text-sm">
                      {v}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={`relative ${hero ? "t-h2" : "text-[clamp(1.1rem,1.7vw,1.45rem)] leading-snug font-bold"}`}>{t.value}</p>
              )}
            </li>
          );
        })}
      </ul>

      <figure data-slash className="panel panel-ink relative mt-10 p-6 pt-12 md:mt-14 md:p-10 md:pt-14">
        <figcaption className="t-label absolute top-0 left-0 bg-cyan px-4 py-1.5 font-bold text-ink">{content.name.first.toLowerCase()}</figcaption>
        <blockquote className="max-w-3xl space-y-4 text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed">
          {content.about.lines.map((line, i) => (
            <p key={line} data-slash data-delay={0.1 + i * 0.12}>
              {line}
            </p>
          ))}
        </blockquote>
      </figure>
    </section>
  );
}
