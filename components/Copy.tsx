import { TODO } from "@/content/content";

/**
 * Renders content text. A value equal to TODO shows a visible dashed marker in development so missing copy can
 * never pass for finished copy; in production it renders nothing (the page stays clean and honest, never invents).
 */
export function Copy({ children }: { children: string }) {
  if (children !== TODO) return <>{children}</>;
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span className="t-label border border-dashed border-cyan px-2 py-0.5 text-cyan" title="missing content">
      todo
    </span>
  );
}

/** True when a content value is real copy (not the TODO marker). */
export const has = (v: string) => v !== TODO;
