# Anime Cinematic Portfolio: Plan "Season 1"

Date: 11 Oct 2026. Status: plan only, nothing built. The person this site is for is **not decided yet** (slots written as `[NAME]`, `[ROLE]`, `[CITY]`).

> This is a separate project from the deployed Devansh site. Fork the engine (Lenis + GSAP + Frame + content.ts pattern), do not overwrite the live site.

---

## 1. What the two Pinterest references actually share

| | Pin 1: "Deadpool" movie-site shot (Toofan) | Pin 2: dark-red designer portfolio board |
|---|---|---|
| Background | Near-black with a flat crimson disc behind the subject | Deep burgundy gradient, glassy dark cards |
| Hero trick | Giant white condensed caps title **behind** a cut-out character who overlaps the letters | Giant display word "Portfolio" with the character's hair/head **overlapping** it |
| Details | Tiny uppercase labels, dotted ticker line, pill buttons, vertical side counter | Bento grid of case-study tiles, petals, a round avatar CTA |
| Mood | Poster / key visual | Editorial, a little gothic |

**The DNA to keep:** dark crimson + black, a red sun disc, one giant word behind a cut-out character, tiny labels, bento tiles. The anime layer goes on top of that: cel shading, halftone, speed lines, episode structure.

## 2. Research: what matters (and what did not turn up)

Verified from sources:
- **Restraint wins**: one strong visual idea held start to end (from the earlier plan's research). So anime is the *one metaphor*, not a pile of effects.
- **Halftone / manga vocabulary** is well documented as a design trend: halftone dots, ink outlines, panel frames, speech balloons, action bursts, one large "splash" panel for the main moment. Dots are cheap in CSS (radial-gradient screen, roughly 10-14 px pitch, hard offset shadows with no blur). [daisyUI halftone trend](https://trends.daisyui.com/trend/halftone-comic-book/), [pure CSS halftone](https://master.dev/blog/pure-css-halftone-effect-in-3-declarations/)
- **Spider-Verse-style layered text**: duplicate the text in `::before`/`::after` from a `data-text` attribute, offset a hair, for print "misregistration". [LogRocket](https://blog.logrocket.com/5-ways-style-text-css-inspired-spider-verse)
- **Manga speed lines in CSS** use repeating conic gradients, but the author calls it inefficient for production. We will use a pre-rendered SVG instead. [CSS manga lines](https://levelup.gitconnected.com/css-surprise-manga-lines-a70f57bc6faa)
- **Persona 5's lesson**: UI that *is* the style (saturated red + black + white, cut-out lettering, diagonal panels, menu-to-menu motion) while staying readable. Diagonals are done with `clip-path` polygons, skew on the container and counter-skew on the text. [analysis](https://medium.com/game-design-fundamentals/visual-design-of-games-practice-analysis-of-persona-5-royal-61a5c18ba9c1)
- **2026 trend context**: "cute-alism" (kawaii + neo-brutalism), Y2K chrome/glitch, dopamine colour. Useful flavour, but the guidance is that these need control or they turn into noise. [overview](https://blog.cgfrog.com/y2k-vs-neo-brutalism-design-trends/)
- **GSAP is fully free including SplitText, MorphSVG, DrawSVG, Flip** (post-Webflow). Install from the public `gsap` package, no token. Source is third-party skill pages quoting GreenSock's own guidance, so confirm on gsap.com before relying on it for a client. [GreenSock skills](https://tessl.io/registry/skills/github/greensock/gsap-skills/gsap-plugins)
- **CSS scroll-driven animations**: Chrome/Edge yes, Safari 26 yes, **Firefox still behind a flag** in stable (single-blog source, re-check caniuse). So GSAP ScrollTrigger stays primary; CSS-only is progressive enhancement. [source](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)
- **Route transitions**: cross-document View Transitions are Chromium-only; Next.js's own `viewTransition` flag is marked experimental, not for production. So keep the GSAP overlay approach (as the current site does) with a fade fallback. [Next.js docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition)
- **Character animation options**: Rive has real state machines (look-at, hover, blink) and benchmarks better than Lottie for interactive mascots (vendor-adjacent sources, treat as indicative). Live2D web works through `pixi-live2d-display` forks with built-in mouse tracking, but you need the proprietary Cubism Core, a rigged model, and a licence check. [Rive vs Lottie](https://lottiefiles.com/blog/lottie-animations/lottiefiles-or-rive), [pixi-live2d-display](https://cdn.jsdelivr.net/npm/@naari3/pixi-live2d-display@1.2.5/README.md)
- **Accessibility**: WCAG 2.3.1 (no more than 3 flashes per second, or below threshold). Impact-frame flashes must be single, small and soft, and absent in reduced motion. Test with PEAT. [W3C](https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold)
- **AniList** has a public GraphQL endpoint (`graphql.anilist.co`, ~90 req/min) usable without auth for public data. [reference](https://github.com/api-evangelist/anilist)

What I could **not** verify (so treated as open items, not facts):
- I found no Awwwards Site-of-the-Day that is genuinely anime-themed. The "anime" search is polluted by the Anime.js library. This is a gap in the market, which is good for us, but means there is no proven award recipe to copy.
- Pinterest page text could not be fetched; I read both pins visually in the browser. Pin 1's author appears as "Toofan"; I could not see a source site, so I treat both as mood references only and copy no layout 1:1.
- Persona 5's official web design, cel-shading techniques for the web, and font licences for specific anime fonts were not confirmed. Verify each Google Font on fonts.google.com before locking.

## 3. The concept: "Season 1"

**One metaphor: the portfolio is the first season of an anime about `[NAME]`.** Everyone, recruiters included, already knows the format, so the structure explains itself.

| Anime device | Becomes |
|---|---|
| Opening sequence (OP) | Loader: title card, red sun, speed lines, **"skip intro"** button |
| Previously on... | A 3-line recap card at the top: who, what, open to work. This is the 5-second recruiter test |
| Episode title cards | Each chapter opens with "episode 02 / character sheet" |
| Character intro card | Profile as a bento "character sheet" |
| Flashback (washed-out halftone) | Journey timeline |
| Story arcs + key visuals | Each project is an arc with a poster-style key visual |
| "Next time on..." preview | The "next project" panel |
| Status window (level / stats) | Craft chapter (skills) |
| End credits + post-credit scene | Contact + footer, petals fall, "season 2 starts with you" |
| Fansub captions | Small microcopy styled as white-on-black-outline subtitles |

**Visual grammar (the look):** cel-shaded flat colour, ink outlines, halftone screentone, diagonal panel cuts, speed lines, multiplane-camera parallax, tiny lowercase mono labels, giant condensed name behind the character (the pin move).

### Palette (pick one; recommended first)
1. **Crimson Night (recommended)**: near-black `#0B0A0F`, crimson `#C8102E`, paper white `#F6F1EA`, plus one HUD accent, electric cyan `#3DE0FF`, used only for "system" UI (status window, focus rings). Red + cyan is the classic complementary title-card pairing. Matches both pins.
2. Neon Tokyo: indigo `#12103A`, magenta `#FF2E93`, cyan `#2EE6FF`. Louder, riskier on contrast.
3. Sunset Cel: warm orange `#FF6A3D`, violet `#2A1B4D`, cream. Softer, less "poster".

Contrast must be measured, not assumed. The current site found cream-on-`#C41E3A` is 5.01:1 but on `#D7263D` only 4.26:1. Keep body text on the dark surface, and use crimson mainly for fills, big type and the disc.

### Type (all to be checked on Google Fonts)
- Giant name: **Anton** or Bebas Neue (condensed caps, as in Pin 1).
- Episode titles / accents: Dela Gothic One or Unbounded (chunky poster feel).
- Body: Manrope or Inter. Labels: JetBrains Mono, lowercase.
- Decision for you: **decorative Japanese** (episode marks, vertical side text) or **English only**? The earlier site banned it. For an anime theme, a little katakana ornament adds a lot of authenticity. Recommendation: allow small decorative accents only, marked `aria-hidden` / `lang="ja"`, with every real word in English.

## 4. The signature moments (one "wow" per episode, nothing more)

| # | Chapter | Wow moment |
|---|---|---|
| OP | Loader | Black screen, a red sun disc draws in, speed lines burst once, the title card "[NAME], season 1" lands. Real counter tied to fonts + portrait. "skip intro" always visible. |
| 01 | Intro | Giant `[FIRST]` / `[LAST]` behind the cut-out character; layers (back hair, body, head, front hair) drift at different depths with the cursor (multiplane camera). Eyes blink every few seconds, pupils follow the cursor. |
| 02 | Character sheet | Bento tiles snap in like panels cut on a diagonal; halftone fills on hover. |
| 03 | Flashback | Timeline is a film strip of washed-out halftone panels; a red thread draws down the page; each year "stamps". |
| 04 | Arcs | Each project pinned full-screen: key-visual poster, a speed-line wipe in, tags as episode credits. Ends with "next time on..." |
| 05 | Status window | A cyan HUD window; skills fill like stat bars as you scroll (only with real, honest levels or "how I used it", never fake percentages). |
| 06 | Credits | Credits roll the contact links; the red sun sets; a few sakura petals fall (only here, so it carries meaning). Optional: currently-watching strip from AniList. |

### Anime motion vocabulary (the equivalent of the old "one text-reveal pattern")
1. **Limited animation:** animate some things "on twos/threes" with GSAP `steps()` easing (about 12 fps) for text jitter, burst frames and character micro-motion. This is authentic and cheaper. Everything else stays smooth with Lenis.
2. **Diagonal slash wipe:** `clip-path: polygon()` reveal, the single text/panel reveal used everywhere (tune it in one place).
3. **Speed lines:** pre-rendered SVG, scaled and faded with transform/opacity only. Used 3 times max.
4. **Halftone:** static tiled SVG/CSS dot layer; animate the layer's `transform`, never `background-position`.
5. **Multiplane parallax:** 4-5 layers moving at different rates on scroll and cursor.
6. **Impact frame:** one soft invert flash, once, small area. Removed in reduced motion. WCAG 2.3.1 tested.
7. **Eyecatch transition:** between routes, diagonal panels slice across with the episode title, then open (GSAP overlay, fade fallback).
8. Every effect is driven by one 0-to-1 progress value; animate only transform, opacity, clip-path.

### Extras that make it feel alive (cheap, optional)
- **Visual-novel About:** the About text in a dialogue box with a name tag; text unmasks line by line. Full text is in the DOM for screen readers.
- **Fansub captions** for microcopy; hover shows a "translator's note" tooltip.
- **Konami code** easter egg unlocks a "power-up" gold variant.
- **Sound:** off by default, an explicit toggle, CC0/own audio only. Nothing autoplays.
- **Cursor:** small crosshair / star dot that grows on links, hidden on touch.

## 5. The character (the hardest, most important asset)

The site lives or dies on the cut-out character. Options:

| Path | Effort | Result | Risk |
|---|---|---|---|
| **A. Layered 2D (recommended)** | Medium | Flat anime portrait cut into layers (back hair, body, head, eyes open/closed, mouth, front hair, accessory); CSS/GSAP parallax + blink | Low. Light, works on phones |
| B. Rive | Medium-high | Real state machine: look-at-cursor, hover reaction, blink | Needs the Rive editor; lazy-load runtime |
| C. Live2D | High | The most "anime" feel, true head turn | Proprietary Cubism Core, licence check, rigging cost, heavier on phones. Treat as a stretch goal |

Pipeline for A: photo → stylised anime portrait with an image tool → pick the best → clean up and separate layers (Figma / Krita / Photopea) → export WebP/AVIF at 1x and 2x. Budget: hero portrait set ≤ 150 KB total, fixed dimensions (no layout shift). Rules:
- **Original character only**, drawn as the person. No copyrighted characters, no ripped sprites, screenshots, logos or studio-specific assets, and do not name a living artist or studio in generation prompts.
- Every art asset needs alt text; decorative layers get `alt=""`.

Starter prompt (edit the bracketed parts):
> Flat cel-shaded anime portrait of [a young man/woman] with [hair], [glasses?], front-facing, shoulders-up, [hoodie/shirt]. Bold ink outline, two-tone shading, limited palette of crimson, black and off-white, subtle halftone shadows, plain solid background, clean edges for cut-out, original character, no text.

## 6. Tech stack (reuse the proven engine)

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js App Router + TypeScript | Same as the live site. Note the repo's `AGENTS.md`: this Next version has breaking changes, read `node_modules/next/dist/docs/` first |
| Styling | Tailwind 4 + CSS variable tokens | Fast, consistent |
| Scroll | Lenis synced to `gsap.ticker` | One source of truth |
| Motion | GSAP + ScrollTrigger + SplitText + DrawSVG + Flip | All free; pinned arcs, reveals, wipes |
| Character | Layered WebP/AVIF + CSS/GSAP; Rive lazy-loaded (optional) | Light; Live2D only as stretch |
| Particles | Tiny canvas, ≤30 petals, idle-started, paused off-screen | Only in the credits |
| Data | `content.ts` | No invented facts; `TODO` renders visibly |
| Live data | AniList via a server route with revalidate (optional) | Avoids CORS and rate limits. Query shape unverified, check the schema |
| Hosting | Vercel | Preview link per change |

3D/WebGL: none in the core. A WebGL halftone/toon shader on the portrait is a **desktop-only stretch** (Step 12), never required for the story.

## 7. Performance and accessibility budgets

- Lighthouse mobile 90+ on all four; LCP < 2.5 s on 4G; CLS ≈ 0.
- Initial JS ≤ ~170 KB gzipped; Rive/canvas lazy-loaded after idle.
- Heavy effects (`mix-blend-mode`, large `filter: blur`) are used sparingly and never animated at full-screen size.
- Mobile-first: fewer layers, no pin on small screens where it hurts, no cursor effects.
- **Reduced motion = "manga mode":** every scene becomes static panels (stills with the same captions and order). Same story, calm. No flashes, no speed-line motion, no petals.
- WCAG AA contrast, text over art always on a scrim, visible focus (cyan ring), skip link, landmarks, full keyboard use, sound off by default.
- Recruiter safety: a **"recap"** card in the first screen and a one-tap **plain view** (a clean resume-style page). Recruiters can bypass the show entirely.

## 8. Build loop (same discipline as before)

One step per chat turn, test on phone + laptop, review against a strict score (Design, Motion, Performance, Accessibility, Recruiter clarity all ≥ 8), max 3 fix loops (simplify instead of adding), commit after every locked step, handoff note under 300 words when a chat gets long.

### Steps
| Step | Work | Done when |
|---|---|---|
| 0 | Intake: who it's for, resume → typed `content.ts`, positioning line, gaps list | Content complete; positioning approved |
| 1 | Character art: generate, pick, cut into layers, alt text | Portrait looks sharp on a phone; ≤150 KB |
| 2 | Tokens + style guide: palette, type, halftone, speed-line SVG, Frame, panel clip-paths | `/styleguide` shows everything; palette and fonts picked |
| 3 | Scaffold + motion engine: Lenis, reduced-motion hook, `SlashReveal`, `Halftone`, `SpeedLines`, `Parallax`, cursor, `/lab` | 60 fps demo; every primitive has a calm twin |
| 4 | OP loader + Chapter 01 intro (giant name behind character) | Feels like a title card; skip works |
| 5 | Chapter 02 character sheet (bento) | Every tile readable at a glance on a phone |
| 6 | Chapter 03 flashback timeline | Reads top to bottom on mobile |
| 7 | Chapter 04 arcs + `/works/[slug]` + eyecatch transitions | Each project shows problem, decision, result; transition is seamless |
| 8 | Chapter 05 status window | Keyboard-focusable; honest content |
| 9 | Chapter 06 credits + footer (+ optional AniList) | Contact and resume one tap from anywhere |
| 10 | Polish: hover/focus/active states, nav, 404 ("this episode does not exist"), easter eggs, optional sound | Nothing feels unfinished |
| 11 | Performance, a11y, SEO: budgets, flash test (PEAT), OG image, JSON-LD | Lighthouse 90+; keyboard-only works end to end |
| 12 | Deploy; stretch (Rive/Live2D/WebGL halftone) only if time | Live on domain |

### Master Context prompt (paste first in every build chat)
> You are a senior creative front-end engineer and motion designer. Build a cinematic anime-themed portfolio for **[NAME]**, targeting **[ROLE]**. Concept: "Season 1": the site is the first season of an anime about them. Chapters are episodes: OP loader with skip, 01 intro, 02 character sheet, 03 flashback, 04 arcs (projects), 05 status window (skills), 06 end credits (contact). Look: crimson `#C8102E`, near-black `#0B0A0F`, paper white `#F6F1EA`, cyan `#3DE0FF` for HUD only; cel-shaded flat art, halftone, speed lines, diagonal clip-path panels, giant condensed name behind a layered cut-out portrait. Stack: Next.js App Router + TypeScript, Tailwind CSS variables, Lenis synced to gsap.ticker, GSAP + ScrollTrigger + SplitText + DrawSVG. No 3D in the core.
> Rules: all copy from `content.ts`, never invent facts, numbers or links; mobile-first; every animation has a prefers-reduced-motion "manga mode" twin; animate only transform, opacity, clip-path; write DOM directly in scroll callbacks; clean up every ScrollTrigger/Lenis instance; single impact flash max, no flashing above WCAG 2.3.1 limits; original art only, no copyrighted characters or ripped assets; sound off by default; semantic HTML, visible focus, alt text, WCAG AA. Output complete files with paths. End every answer with how to test it and what you could not verify.

Review prompt and handoff prompt: reuse the ones in the earlier plan unchanged.

## 9. Open decisions (needed before Step 0)

1. **Who is the site for**, and what role are they targeting? (Name, role, city, resume.)
2. **New repo forked from the Devansh engine** (recommended) or a different approach?
3. Palette: Crimson Night (recommended), Neon Tokyo, or Sunset Cel?
4. Decorative Japanese accents allowed, or English only?
5. Character path: layered 2D (recommended), Rive, or Live2D stretch? Do they have a clear front-facing photo, or an existing avatar?
6. Sound toggle: yes or no? Currently-watching (AniList) strip: yes or no, and which username/favourite anime?

## 10. Risks

- **Too much anime, not enough proof of work.** Counter: recap card + plain view; every project still needs problem, decision, result.
- **Performance** from layered art and halftone. Counter: budgets above, fewer layers on mobile.
- **Photosensitivity.** Counter: one soft impact frame, PEAT test, none in reduced motion.
- **Legal.** Counter: original character, OFL fonts, own or CC0 audio, no ripped assets.
- **Unverified claims** listed in section 2 must be re-checked before they drive a decision.
