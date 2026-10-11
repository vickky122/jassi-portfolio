"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { content } from "@/content/content";

const links = [
  { href: "/#cases", label: "arcs" },
  { href: "/#craft", label: "skills" },
  { href: "/#contact", label: "contact" },
  { href: "/resume", label: "plain view" },
];

/**
 * Minimal top bar. Hides while scrolling down and returns on scroll up (a direct style write, no React state).
 * Always reachable by keyboard: hiding is visual only, and focus inside the bar brings it back.
 */
export function Nav() {
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const hide = y > last && y > 160;
      el.style.transform = hide ? "translateY(-140%)" : "translateY(0)";
      el.dataset.stuck = String(y > 40);
      last = y;
    };
    const show = () => void (el.style.transform = "translateY(0)");
    window.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("focusin", show);
    return () => {
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("focusin", show);
    };
  }, []);

  return (
    <header
      ref={bar}
      className="pad-x fixed top-[calc(var(--frame-inset)+10px)] right-0 left-0 z-50 transition-transform duration-500"
    >
      <nav
        aria-label="primary"
        className="nav-bar t-label panel flex items-center justify-between gap-4 px-4 py-2 text-paper"
      >
        <Link href="/#intro" className="hidden font-bold tracking-wider whitespace-nowrap sm:block">
          {content.name.first} {content.name.last}
        </Link>
        <ul className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end md:gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-draw inline-block py-2">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
