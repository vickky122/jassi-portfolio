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
components/     Frame (rails), Loader, Nav, Cursor, Footer, KeyVisual, SpeedLines, ...
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
- The hero portrait is `public/portrait/jassi.webp`: an illustrated portrait of Jassi (smiling, in a suit and the
  red and navy striped tie), supplied by Vikrant, cut out of its white background with Apple Vision, edges cleaned,
  soft fade at the sides and bottom, about 76 KB, served as-is. Earlier versions (a hand-drawn SVG, then two
  hooded-jacket portraits) were dropped because they did not look like him or read as stern. To use a different
  portrait, replace that file (transparent WebP, 820 x 1200; hair top about 4% and chin about 60% down the image,
  which the phone layout relies on). The hero never covers the name: on desktop the name takes the left column
  (its size is calculated so the hair never reaches the last letter) and the portrait stands on the right; on phones
  the portrait is sized to the space between the name and the text, so the chin always lands just above it (see the
  `.hero` rules in `app/globals.css`).

## Deploy

Live at **https://jassi-sharma.vercel.app** (Vercel Hobby, Next.js preset, project `jassi-sharma`, deploys from
`main` of the private GitHub repo `vickky122/jassi-portfolio`). Notes:

- `lib/site.ts` takes the site address from `NEXT_PUBLIC_SITE_URL` if set, else Vercel's production URL, so the
  canonical URL, sitemap, share image and structured data are correct without any setting. After attaching a custom
  domain, no change is needed (or set `NEXT_PUBLIC_SITE_URL`) and redeploy.
- Vercel's free plan builds only commits authored by the account owner. Commit with the personal identity
  (this repo's local git config: `vickky122` and the GitHub no-reply address), not a work email, or the deploy is
  marked Blocked. Commits carry no co-author trailer.
- Vercel Authentication (the login wall) is switched off, so every deployment link opens directly.
- The resume download is the redacted PDF in `public/`; it is public once deployed.

## Still open

See `docs/PLAN-jassi.md`: approve the positioning line and About, confirm the employer descriptor and hobbies line,
internship numbers, BBA/MBA start years, a Japanese speaker to check the katakana name, rewrite the CV objective
(it still says audit and assurance), a custom domain (optional), and real-device testing (Safari, Firefox, phones).
