import type { SVGProps } from "react";

/**
 * Original flat, cel-shaded character drawn for the site, based on Jassi's photos: round face with a broad jaw,
 * thick dark hair with big volume and a fringe swept diagonally across the forehead, thick brows, heavy-lidded
 * dark eyes, a full short beard (halftone stubble on the cheeks, solid on the jaw and chin), black suit and a red
 * and navy striped tie. No third-party art.
 *
 * Layers are separate <g data-depth> groups so the Intro can drift them at different depths (multiplane camera).
 * The eyes have two states (`.eyes-open` / `.eyes-closed`) for the blink, and `.pupils` follow the cursor.
 * To swap in better art later, keep the same data-layer names: back, body, head, front.
 *
 * Palette: ink outline #0b0a0f, cyan rim light on the lit (left) edges to separate the black suit from the ink
 * background; the crimson sun disc is drawn by the Intro behind this SVG.
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
        <pattern id="stubble" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.8" cy="1.8" r="1.35" fill="#2a1f24" />
          <circle cx="5.3" cy="5.3" r="1.15" fill="#2a1f24" />
        </pattern>
        <pattern id="tie-stripes" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
          <rect width="30" height="30" fill={RED} />
          <rect y="0" width="30" height="9" fill={NAVY} />
        </pattern>
      </defs>

      {/* ---------- back: hair volume behind the head ---------- */}
      <g data-layer="back" data-depth="0.6">
        <path
          d="M196 304 C186 230 196 146 258 112 C296 96 372 100 402 124 C426 160 424 240 404 304 Z"
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
        <path d="M254 392 L254 524 C276 550 324 550 346 524 L346 392 Z" fill={SKIN_SHADE} stroke={INK} strokeWidth="4" />
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
        <ellipse cx="199" cy="312" rx="15" ry="27" fill={SKIN} stroke={INK} strokeWidth="4" />
        <ellipse cx="401" cy="312" rx="15" ry="27" fill={SKIN_SHADE} stroke={INK} strokeWidth="4" />
        {/* face: round, broad jaw, fuller cheeks */}
        <path
          d="M200 258 C196 350 236 436 300 450 C364 436 404 350 400 258 C398 196 352 160 300 160 C248 160 202 196 200 258 Z"
          fill={SKIN}
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* cel shadow, light from the left */}
        <path d="M346 196 C390 222 402 286 398 338 C392 390 350 434 300 448 C356 410 380 336 360 256 Z" fill={SKIN_SHADE} opacity="0.5" />
        {/* nose-bridge light, as in the photos */}
        <path d="M296 262 C300 282 300 300 296 318" fill="none" stroke="#efc4a0" strokeWidth="9" strokeLinecap="round" opacity="0.7" />

        {/* beard: halftone stubble over the cheeks, solid and dark on the jaw, chin and moustache */}
        <path
          d="M199 298 C196 394 240 462 300 466 C360 462 404 394 401 298 C394 334 372 352 350 360 L250 360 C228 352 206 334 199 298 Z"
          fill="#9a6a52"
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M199 298 C196 394 240 462 300 466 C360 462 404 394 401 298 C394 334 372 352 350 360 L250 360 C228 352 206 334 199 298 Z"
          fill="url(#stubble)"
        />
        <path d="M206 330 C214 400 252 452 300 458 C348 452 386 400 394 330 C388 374 360 422 300 430 C240 422 212 374 206 330 Z" fill="#221a20" />
        <path d="M262 404 C282 398 318 398 338 404 C336 430 322 448 300 452 C278 448 264 430 262 404 Z" fill="#221a20" />
        <path d="M258 364 C276 348 324 348 342 364 C324 374 276 374 258 364 Z" fill="#221a20" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        {/* lips: a calm, slightly downturned mouth */}
        <path d="M278 384 C290 378 310 378 322 384 C316 398 284 398 278 384 Z" fill="#b8715a" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M280 385 C292 389 308 389 320 385" fill="none" stroke="#6e362d" strokeWidth="2.5" strokeLinecap="round" />
        {/* nose: straight bridge, rounded tip */}
        <path d="M303 306 C302 326 298 338 290 346 C298 354 312 354 320 346" fill="none" stroke={SKIN_SHADE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M292 348 C294 352 298 353 301 352 M306 352 C310 353 314 352 316 348" fill="none" stroke="#7a4d3a" strokeWidth="2.5" strokeLinecap="round" />

        {/* eyes: open, big and heavy-lidded, looking a little to the viewer's left */}
        <g className="eyes-open">
          <path d="M212 306 C228 288 262 286 284 304 C266 320 232 322 212 306 Z" fill="#f6f1ea" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M388 306 C372 288 338 286 316 304 C334 320 368 322 388 306 Z" fill="#f6f1ea" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <g className="pupils">
            <circle cx="243" cy="304" r="14" fill="#2b1b14" />
            <circle cx="243" cy="304" r="7.5" fill={INK} />
            <circle cx="238" cy="299" r="3.6" fill="#fff" />
            <circle cx="248" cy="309" r="1.8" fill="#fff" />
            <circle cx="343" cy="304" r="14" fill="#2b1b14" />
            <circle cx="343" cy="304" r="7.5" fill={INK} />
            <circle cx="338" cy="299" r="3.6" fill="#fff" />
            <circle cx="348" cy="309" r="1.8" fill="#fff" />
          </g>
          {/* heavy upper lids */}
          <path d="M208 306 C226 284 266 282 288 304" fill="none" stroke={INK} strokeWidth="7.5" strokeLinecap="round" />
          <path d="M392 306 C374 284 334 282 312 304" fill="none" stroke={INK} strokeWidth="7.5" strokeLinecap="round" />
          <path d="M224 293 C240 283 264 283 278 292" fill="none" stroke={SKIN_SHADE} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path d="M376 293 C360 283 336 283 322 292" fill="none" stroke={SKIN_SHADE} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </g>
        {/* eyes: closed (blink), hidden until the blink */}
        <g className="eyes-closed" opacity="0">
          <path d="M210 304 C230 320 268 322 288 304" fill="none" stroke={INK} strokeWidth="7.5" strokeLinecap="round" />
          <path d="M390 304 C370 320 332 322 312 304" fill="none" stroke={INK} strokeWidth="7.5" strokeLinecap="round" />
        </g>
        {/* brows: thick and straight, apart at the centre */}
        <path d="M210 280 C230 266 260 266 282 278" fill="none" stroke={HAIR} strokeWidth="14" strokeLinecap="round" />
        <path d="M390 280 C370 266 340 266 318 278" fill="none" stroke={HAIR} strokeWidth="14" strokeLinecap="round" />
      </g>

      {/* ---------- front: big swept volume with tufts, a diagonal fringe ---------- */}
      <g data-layer="front" data-depth="1.5">
        {/* main mass: short tapered sides, volume on top with tufts, kept compact */}
        <path
          d="M198 300 L196 262 C190 236 188 208 194 184 C186 154 200 126 238 108 C252 88 288 82 314 94 C330 80 366 82 382 98 C414 106 430 134 424 166 C420 188 414 204 410 220 C408 236 406 252 402 272 L402 300 L388 274 C370 262 336 242 296 224 C266 210 236 198 214 210 C206 224 202 244 200 266 Z"
          fill={HAIR}
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* swept locks hanging off the diagonal fringe edge, largest over the right brow */}
        <path d="M338 234 C366 242 392 254 402 272 C406 286 402 296 396 304 C394 288 382 278 362 270 C348 262 340 250 338 234 Z" fill={HAIR} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M286 220 C312 226 338 238 348 254 C346 266 340 274 332 280 C332 266 322 254 306 246 C294 240 288 230 286 220 Z" fill={HAIR} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M240 208 C262 210 284 220 292 232 C288 242 282 248 276 252 C276 240 266 230 254 226 C246 222 242 216 240 208 Z" fill={HAIR} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        {/* cel highlights: wavy strands flowing diagonally */}
        <path d="M226 160 C262 130 322 124 376 146" fill="none" stroke={HAIR_HI} strokeWidth="8" strokeLinecap="round" opacity="0.9" />
        <path d="M214 198 C232 172 266 156 302 154" fill="none" stroke={HAIR_HI} strokeWidth="6" strokeLinecap="round" opacity="0.85" />
        <path d="M304 186 C344 186 380 200 408 226" fill="none" stroke={HAIR_HI} strokeWidth="5.5" strokeLinecap="round" opacity="0.8" />
        <path d="M252 200 C294 204 340 224 374 248" fill="none" stroke={HAIR_HI} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        {/* cyan rim light on the lit side */}
        <path d="M194 184 C186 154 200 126 238 108 C252 88 288 82 314 94" fill="none" stroke={RIM} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      </g>
    </svg>
  );
}
