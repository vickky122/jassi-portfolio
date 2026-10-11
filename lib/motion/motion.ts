/**
 * Motion tokens. Pure data (no gsap import) so it can be read anywhere.
 *
 * Anime motion rules:
 *  - Two speeds only: smooth (Lenis scroll, panel wipes) and "limited animation" (stepped easing at ~12 fps)
 *    for small accents like episode numbers and the character's micro-motion.
 *  - One reveal pattern everywhere: the diagonal slash wipe (clip-path). Tune it here.
 *  - Animate only transform, opacity and clip-path.
 *  - Every value has a reduced-motion twin with the same shape: no travel, no scroll-linked motion, no flashes,
 *    short fades only. Same story, told calmly ("manga mode").
 */

export type MotionSet = {
  ease: { reveal: string; move: string; ui: string; limited: string };
  /** seconds */
  duration: { micro: number; ui: number; reveal: number; section: number; transition: number };
  /** seconds between siblings */
  stagger: { lines: number; cards: number };
  /** ScrollTrigger scrub smoothing in seconds, or false for no scroll-linked motion */
  scrub: number | false;
  /** entrance travel in px */
  travel: { x: number; y: number };
  /** multiplier for cursor and scroll parallax; 0 disables */
  parallax: number;
};

export const motion = {
  full: {
    ease: { reveal: "power3.out", move: "power3.inOut", ui: "power2.out", limited: "steps(6)" },
    duration: { micro: 0.25, ui: 0.5, reveal: 0.9, section: 1.2, transition: 0.9 },
    stagger: { lines: 0.12, cards: 0.09 },
    scrub: 0.6,
    travel: { x: 48, y: 28 },
    parallax: 1,
  },
  reduced: {
    ease: { reveal: "power1.out", move: "power1.out", ui: "power1.out", limited: "none" },
    duration: { micro: 0.15, ui: 0.3, reveal: 0.5, section: 0.5, transition: 0.4 },
    stagger: { lines: 0, cards: 0 },
    scrub: false,
    travel: { x: 0, y: 0 },
    parallax: 0,
  },
} as const satisfies Record<"full" | "reduced", MotionSet>;

/** The diagonal slash wipe: clip-path polygons, hidden -> shown. Slant is 10% of the width. */
export const slash = {
  hidden: "polygon(0% 0%, 0% 0%, -10% 100%, 0% 100%)",
  shown: "polygon(0% 0%, 110% 0%, 100% 100%, -10% 100%)",
} as const;

/** Shared ScrollTrigger start positions. */
export const trigger = { enter: "top 88%", mid: "top 65%" } as const;

/** Media queries for gsap.matchMedia. */
export const MQ = {
  reduce: "(prefers-reduced-motion: reduce)",
  noPreference: "(prefers-reduced-motion: no-preference)",
  fine: "(hover: hover) and (pointer: fine)",
  wide: "(min-width: 768px)",
} as const;
