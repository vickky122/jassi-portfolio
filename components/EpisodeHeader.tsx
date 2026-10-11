import { content } from "@/content/content";
import { Jp } from "./Jp";

/** Chapter title card: decorative episode mark, "episode 02" label, and the real heading in English. */
export function EpisodeHeader({
  index,
  label,
  title,
  headingId,
  className = "",
}: {
  index: number;
  label?: string;
  title: string;
  headingId: string;
  className?: string;
}) {
  return (
    <header className={className}>
      <div data-slash className="t-label mb-4 flex items-center gap-3">
        <Jp className="text-base">{content.ornaments.episodes[index - 1]}</Jp>
        <span>
          {label ?? `episode ${String(index).padStart(2, "0")}`}
        </span>
        <span aria-hidden="true" className="h-px w-12 bg-current opacity-50" />
      </div>
      <h2 id={headingId} data-slash data-delay="0.08" className="t-h1">
        {title}
      </h2>
    </header>
  );
}
