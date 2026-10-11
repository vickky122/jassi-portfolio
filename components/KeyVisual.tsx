/**
 * Small original key-visual illustrations, one per arc. Flat shapes, paper-white linework, no text.
 * Decorative: the surrounding heading carries the meaning.
 */
const P = "#f6f1ea";
const I = "#0b0a0f";
const C = "#c8102e";
const CY = "#3de0ff";

export function KeyVisual({ kind, className = "" }: { kind: "export" | "payroll" | "tournament"; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 300" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {kind === "export" && (
        <g strokeWidth="3.5">
          <circle cx="322" cy="62" r="30" fill={P} stroke="none" />
          <path d="M26 128 C112 14 282 6 372 112" stroke={P} strokeDasharray="2 12" strokeWidth="5" />
          <circle cx="372" cy="112" r="7" fill={P} stroke="none" />
          <path d="M20 252 H380" stroke={P} />
          {[
            [36, 172],
            [170, 172],
            [103, 92],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect x={x} y={y} width="124" height="80" fill={I} stroke={P} />
              {[1, 2, 3, 4, 5].map((n) => (
                <path key={n} d={`M${x + n * 20.6} ${y + 8} V${y + 72}`} stroke={P} strokeWidth="2.5" opacity="0.7" />
              ))}
            </g>
          ))}
        </g>
      )}
      {kind === "payroll" && (
        <g strokeWidth="3.5">
          <rect x="108" y="22" width="200" height="256" fill={P} stroke={I} />
          <rect x="128" y="2" width="200" height="256" fill="none" stroke={P} opacity="0.5" />
          {[70, 118, 166, 214].map((y, i) => (
            <g key={y}>
              <path d={`M136 ${y} h14 l8 10 l16 -22`} stroke={i === 3 ? C : I} strokeWidth="5" />
              <path d={`M196 ${y} H284`} stroke={I} strokeWidth="5" opacity="0.8" />
            </g>
          ))}
          <circle cx="268" cy="236" r="30" fill="none" stroke={C} strokeWidth="5" />
          <circle cx="268" cy="236" r="19" fill="none" stroke={C} strokeWidth="2.5" />
        </g>
      )}
      {kind === "tournament" && (
        <g strokeWidth="3.5">
          <path d="M130 52 H270 V120 C270 170 236 196 200 196 C164 196 130 170 130 120 Z" fill={P} stroke={I} />
          <path d="M130 70 H88 C88 120 108 140 138 144 M270 70 H312 C312 120 292 140 262 144" stroke={P} strokeWidth="6" />
          <path d="M200 196 V234 M150 262 H250 M164 234 H236 V262 H164 Z" stroke={P} strokeWidth="5" />
          <path d="M200 84 l12 26 28 3 -21 19 6 28 -25 -14 -25 14 6 -28 -21 -19 28 -3 Z" fill={CY} stroke={I} strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}
