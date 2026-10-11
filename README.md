# Jassi Sharma: portfolio, "Season 1"

An anime-episode portfolio for Jassi Sharma (MBA, International Business, Amity). The site is the first season of
an anime about him: an opening with a skip button, a recap card, then six episodes. Next.js (App Router) +
TypeScript, Tailwind CSS 4, Lenis smooth scroll, GSAP (ScrollTrigger). No 3D. All real wording is English;
Japanese appears only as decoration (`lang="ja"`, `aria-hidden`).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Routes: `/` (opening, recap, six chapters) and `/resume` (the plain view: one page, no motion, printable).

## Content rules

All copy lives in [`content/content.ts`](content/content.ts), taken only from Jassi's CV and the public top card of
his LinkedIn profile. Anything unknown is `"TODO"`: shown as a dashed marker in development, hidden in production.
**Never published:** phone, home address, father's name, date of birth, school percentages, CGPA. The download is
`public/Jassi-Sharma-Resume.pdf`, a redacted copy of the CV.

## Structure

```
app/            layout, tokens.css, globals.css, page, resume/, not-found, icon, robots
chapters/       Intro, Recap, Profile, Journey, Cases, Craft, Contact
components/     Character (layered SVG), Frame (rails), Loader, Nav, Cursor, Footer, KeyVisual, SpeedLines, ...
hooks/          useReducedMotion, useSlash (the one reveal pattern)
lib/motion/     gsap.ts, motion.ts (eases, durations, the slash polygon, reduced-motion twins)
content/        content.ts
docs/           PLAN-jassi.md, anime-portfolio-plan-general.md
```

## Design notes

- Palette "Crimson Night": ink `#0b0a0f`, crimson `#c8102e`, paper `#f6f1ea`, cyan `#3de0ff` for HUD only.
  Paper on crimson is 5.24:1 and paper on ink 17.6:1.
- One reveal pattern everywhere: a diagonal slash wipe (clip-path). "Limited animation" (stepped easing) for small accents.
- Only transform, opacity and clip-path are animated. Reduced motion is a calm "manga mode": no scrub, no parallax,
  no blink, no speed lines, no petals, no stacking; short fades only.
- The character is an original SVG drawn for the site (`components/Character.tsx`), based on a photo. Swap in better art
  by keeping the layer names (back, body, head, front).

## Still open

See `docs/PLAN-jassi.md`: approve the positioning line and About, confirm the employer descriptor and hobbies line,
internship numbers, BBA/MBA start years, a Japanese speaker to check the katakana name, rewrite the CV objective
(it still says audit and assurance), domain, OG image, JSON-LD, Lighthouse and real-device testing, deploy.
