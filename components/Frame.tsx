"use client";

import { useRef } from "react";
import { content } from "@/content/content";
import { ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

const TONE: Record<string, { rail: string; strong: string }> = {
  ink: { rail: "var(--mute)", strong: "var(--paper)" },
  crimson: { rail: "var(--paper)", strong: "var(--paper)" },
  paper: { rail: "var(--ink)", strong: "var(--ink)" },
};

const total = String(content.chapters.length).padStart(2, "0");

/**
 * The thin frame and the two vertical rails: season label on the left, "01 / 06" chapter counter and chapter
 * name on the right. Chapters are any [data-chapter] element (with data-chapter-name and data-tone). The text is
 * written straight to the DOM from the ScrollTrigger callback, never through React state.
 * The rails are decorative duplicates of the real headings, so they are hidden from assistive tech.
 */
export function Frame() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLElement>(null);
  const name = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      const apply = (el: HTMLElement) => {
        if (count.current) count.current.textContent = `${String(el.dataset.chapter).padStart(2, "0")} / ${total}`;
        if (name.current) name.current.textContent = el.dataset.chapterName ?? "";
        const tone = TONE[el.dataset.tone ?? "ink"] ?? TONE.ink;
        html.style.setProperty("--rail-color", tone.rail);
        html.style.setProperty("--rail-strong", tone.strong);
      };
      // document-level query on purpose: inside a gsap context, gsap.utils.toArray would be scoped to this component
      document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) apply(el);
          },
        });
      });
      return () => {
        html.style.removeProperty("--rail-color");
        html.style.removeProperty("--rail-strong");
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden="true">
      <div className="frame" />
      <div className="rail rail-left t-label">
        <span>
          {content.name.first} {content.name.last}
        </span>
        <span>season 1</span>
      </div>
      <div className="rail rail-right t-label">
        <b ref={count}>{`01 / ${total}`}</b>
        <span ref={name}>{content.chapters[0].name}</span>
      </div>
    </div>
  );
}
