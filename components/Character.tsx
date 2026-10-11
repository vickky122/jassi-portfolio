import type { SVGProps } from "react";

/**
 * Original flat, cel-shaded character drawn for the site, based on Jassi's photo: black suit, red and navy
 * striped tie, trimmed beard, dark quiff, eyes cast down and to the side. No third-party art.
 *
 * Layers are separate <g data-depth> groups so the Intro can drift them at different depths (multiplane camera).
 * The eyes have two states (`.eyes-open` / `.eyes-closed`) for the blink, and `.pupils` follow the cursor.
 * To swap in better art later, keep the same data-layer names: back, body, head, front.
 *
 * Palette: ink outline #0b0a0f, cyan rim light on the lit (left) edges to separate the black suit from the ink
 * background, crimson sun disc is drawn by the Intro behind this SVG.
 */
const INK = "#0b0a0f";
const SKIN = "#d9a27e";
const SKIN_SHADE = "#b97c5c";
const HAIR = "#15121a";
const HAIR_HI = "#3a3560";
const SUIT = "#1b1925";
const SUIT_HI = "#2d2a3d";
const SHIRT = "#f4efe7";
const SHIRT_SHADE = "#d5cec2";
const RED = "#c8102e";
const NAVY = "#1e2a5a";
const RIM = "#3de0ff";

export function Character({ title, ...props }: SVGProps<SVGSVGElement> & { title: string }) {
  return (
    <svg viewBox="0 0 600 820" role="img" aria-label={title} {...props}>
      <defs>
        <pattern id="tie-stripes" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
          <rect width="30" height="30" fill={RED} />
          <rect y="0" width="30" height="9" fill={NAVY} />
        </pattern>
      </defs>

      {/* ---------- back: hair volume behind the head ---------- */}
      <g data-layer="back" data-depth="0.6">
        <path
          d="M188 304 C166 196 196 104 268 76 C330 54 412 66 426 130 C442 190 426 252 412 304 Z"
          fill={HAIR}
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </g>

      {/* ---------- body ---------- */}
      <g data-layer="body" data-depth="0.35">
        <g transform="translate(0 -56)">
        {/* jacket */}
        <path
          d="M50 890 L52 772 C62 652 115 576 225 536 L262 516 L338 516 L375 536 C485 576 538 652 548 772 L550 890 Z"
          fill={SUIT}
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* cel highlight on the lit shoulder */}
        <path d="M70 770 C82 664 130 596 232 552 C168 600 128 672 120 890 L70 890 Z" fill={SUIT_HI} opacity="0.9" />
        {/* cyan rim light, lit edge */}
        <path
          d="M52 772 C62 652 115 576 225 536 L262 516"
          fill="none"
          stroke={RIM}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* neck */}
        <path d="M262 392 L262 524 C280 548 320 548 338 524 L338 392 Z" fill={SKIN_SHADE} stroke={INK} strokeWidth="4" />
        {/* shirt V */}
        <path d="M262 518 L338 518 L322 604 L300 700 L278 604 Z" fill={SHIRT} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M300 700 L322 604 L338 518 L330 600 Z" fill={SHIRT_SHADE} />
        {/* collar */}
        <path d="M262 512 L238 552 L290 580 L296 532 Z" fill={SHIRT} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M338 512 L362 552 L310 580 L304 532 Z" fill={SHIRT_SHADE} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        {/* lapels */}
        <path d="M252 522 L204 604 L254 696 L300 706 L276 606 Z" fill={SUIT_HI} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M348 522 L396 604 L346 696 L300 706 L324 606 Z" fill={SUIT} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        {/* tie: knot + blade, diagonal red and navy stripes */}
        <path d="M284 566 L316 566 L322 594 L300 608 L278 594 Z" fill="url(#tie-stripes)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M282 600 L318 600 L336 780 L300 806 L264 780 Z" fill="url(#tie-stripes)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        {/* lapel pin */}
        <circle cx="236" cy="640" r="6" fill="#d9d2c6" stroke={INK} strokeWidth="2.5" />
        {/* sleeve creases */}
        <path d="M112 700 C132 740 138 780 134 820" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <path d="M488 700 C468 740 462 780 466 820" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </g>
      </g>

      {/* ---------- head ---------- */}
      <g data-layer="head" data-depth="1">
        {/* ears */}
        <ellipse cx="213" cy="304" rx="15" ry="26" fill={SKIN} stroke={INK} strokeWidth="4" />
        <ellipse cx="387" cy="304" rx="15" ry="26" fill={SKIN_SHADE} stroke={INK} strokeWidth="4" />
        {/* face */}
        <path
          d="M212 252 C210 342 240 418 300 440 C360 418 390 342 388 252 C386 192 345 160 300 160 C255 160 214 192 212 252 Z"
          fill={SKIN}
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* cel shadow, light from the left */}
        <path
          d="M342 196 C382 220 392 282 386 334 C380 384 342 426 300 438 C350 402 372 334 354 256 Z"
          fill={SKIN_SHADE}
          opacity="0.6"
        />
        {/* beard: jaw and cheeks, with the mouth left open */}
        <path
          d="M214 296 C212 384 252 446 300 448 C348 446 388 384 386 296 C372 340 352 352 332 358 C320 348 280 348 268 358 C248 352 228 340 214 296 Z"
          fill="#1a1620"
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M232 340 C246 394 272 424 300 430" fill="none" stroke={HAIR_HI} strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        {/* moustache */}
        <path d="M268 360 C286 346 314 346 332 360 C318 368 282 368 268 360 Z" fill="#1a1620" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        {/* mouth, a small calm line */}
        <path d="M284 384 C293 390 307 390 316 384" fill="none" stroke="#d9a27e" strokeWidth="3.5" strokeLinecap="round" />
        {/* nose */}
        <path d="M300 308 C298 322 292 332 286 340 C294 346 306 346 314 340" fill="none" stroke={SKIN_SHADE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* eyes: open */}
        <g className="eyes-open">
          <path d="M228 302 C240 288 270 286 286 300 C270 310 242 312 228 302 Z" fill="#f6f1ea" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M372 302 C360 288 330 286 314 300 C330 310 358 312 372 302 Z" fill="#f6f1ea" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <g className="pupils">
            <circle cx="250" cy="302" r="11" fill="#2b1b14" />
            <circle cx="250" cy="302" r="5.5" fill={INK} />
            <circle cx="246" cy="298" r="3" fill="#fff" />
            <circle cx="338" cy="302" r="11" fill="#2b1b14" />
            <circle cx="338" cy="302" r="5.5" fill={INK} />
            <circle cx="334" cy="298" r="3" fill="#fff" />
          </g>
          {/* heavy upper lids */}
          <path d="M224 302 C238 282 272 280 290 300" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <path d="M376 302 C362 282 328 280 310 300" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        </g>
        {/* eyes: closed (blink), hidden until the blink */}
        <g className="eyes-closed" opacity="0">
          <path d="M226 298 C240 312 272 314 288 298" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <path d="M374 298 C360 312 328 314 312 298" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        </g>
        {/* brows */}
        <path d="M222 274 C240 260 270 260 290 274" fill="none" stroke={HAIR} strokeWidth="9" strokeLinecap="round" />
        <path d="M378 274 C360 260 330 260 310 274" fill="none" stroke={HAIR} strokeWidth="9" strokeLinecap="round" />
      </g>

      {/* ---------- front: the quiff and fringe ---------- */}
      <g data-layer="front" data-depth="1.5">
        <path
          d="M194 286 C172 202 194 118 262 90 C300 66 376 62 410 110 C430 140 426 192 414 226 C410 242 398 264 392 286 C392 258 388 232 372 214 C370 236 356 250 336 250 C344 232 332 214 314 206 C312 230 296 244 272 246 C280 228 268 214 250 208 C248 232 232 246 214 256 C204 264 198 274 194 286 Z"
          fill={HAIR}
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* cel highlights */}
        <path d="M248 128 C280 100 332 96 370 114" fill="none" stroke={HAIR_HI} strokeWidth="7" strokeLinecap="round" opacity="0.9" />
        <path d="M222 190 C226 160 242 140 262 128" fill="none" stroke={HAIR_HI} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        <path d="M392 150 C402 168 402 188 396 208" fill="none" stroke={HAIR_HI} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
        {/* cyan rim light on the lit side of the hair */}
        <path d="M194 286 C172 202 194 118 262 90" fill="none" stroke={RIM} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      </g>
    </svg>
  );
}
