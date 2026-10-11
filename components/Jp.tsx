/**
 * Decorative Japanese. Never real copy: hidden from assistive tech and marked lang="ja".
 * All meaningful wording on the site stays English.
 */
export function Jp({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span lang="ja" aria-hidden="true" className={`jp ${className}`}>
      {children}
    </span>
  );
}
