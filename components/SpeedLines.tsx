/**
 * Manga speed lines: thin radial wedges around a centre. Pre-drawn SVG (no gradients, no animation of its own),
 * deterministic so server and client markup match. The caller scales or fades it with transform/opacity.
 */
export function SpeedLines({
  count = 56,
  inner = 46,
  className = "",
  fill = "currentColor",
}: {
  count?: number;
  inner?: number;
  className?: string;
  fill?: string;
}) {
  return (
    <svg aria-hidden="true" viewBox="-100 -100 200 200" className={`speed-lines ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 + (i % 5) * 0.01;
        const r0 = inner + ((i * 7) % 5) * 5;
        const r1 = 98;
        const w = 0.012 + ((i * 3) % 5) * 0.008;
        const x = (r: number, d: number) => (Math.cos(a + d) * r).toFixed(2);
        const y = (r: number, d: number) => (Math.sin(a + d) * r).toFixed(2);
        return <polygon key={i} points={`${x(r0, 0)},${y(r0, 0)} ${x(r1, -w)},${y(r1, -w)} ${x(r1, w)},${y(r1, w)}`} fill={fill} />;
      })}
    </svg>
  );
}
