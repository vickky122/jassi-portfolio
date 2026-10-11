import type { Metadata } from "next";
import Link from "next/link";
import { Copy, has } from "@/components/Copy";
import { content } from "@/content/content";

export const metadata: Metadata = {
  title: "Plain view",
  description: `${content.name.first} ${content.name.last}: the facts on one page.`,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 break-inside-avoid">
      <h2 className="t-label border-b border-ink/30 pb-2 font-bold tracking-widest">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** The plain view: no motion, no art, one page. For recruiters, screen readers and print. */
export default function PlainView() {
  const { name, contact, target } = content;
  return (
    <div className="surface-paper min-h-svh">
      <main id="main" className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <nav className="no-print t-label mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="link-draw">
            ← back to the full site
          </Link>
          <a href={contact.resume} download className="btn btn-solid !bg-ink !text-paper">
            download resume (pdf)
          </a>
        </nav>

        <h1 className="t-h1">
          {name.first} {name.last}
        </h1>
        <p className="mt-3 text-lg font-semibold">{content.positioning.options[content.positioning.chosen]}</p>
        <p className="t-label mt-3 text-ink/80">
          {target.role} · {contact.location} · {target.availability}
        </p>
        <p className="t-label mt-3">
          <a className="link-draw" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          {" · "}
          <a className="link-draw" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            linkedin
          </a>
        </p>

        <Section title="about">
          <div className="space-y-3">
            {content.about.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </Section>

        <Section title="experience">
          <ol className="space-y-7">
            {content.cases.map((c) => (
              <li key={c.slug}>
                <h3 className="font-bold">{c.role}</h3>
                <p className="t-label text-ink/80">
                  {c.org} · {c.dates}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>{c.assignment}</li>
                  <li>{c.checked}</li>
                  <li>{c.control}</li>
                  <li>{c.evidence}</li>
                  {has(c.result) && (
                    <li>
                      <Copy>{c.result}</Copy>
                    </li>
                  )}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="education">
          <ul className="space-y-2">
            {content.timeline
              .filter((e) => Number(e.year) >= 2025)
              .reverse()
              .map((e) => (
                <li key={e.year}>
                  <span className="font-bold">{e.title}</span>, {e.place} ({e.year === "2027" ? "expected 2027" : e.year})
                </li>
              ))}
          </ul>
        </Section>

        <Section title="achievements">
          <ul className="list-disc space-y-1 pl-5">
            {content.achievements.map((a) => (
              <li key={a.title}>
                <span className="font-bold">{a.title}</span>: {a.detail}
                {"year" in a ? ` (${a.year})` : ""}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="skills">
          <ul className="list-disc space-y-1 pl-5">
            {content.skills.map((s) => (
              <li key={s.name}>{s.name}</li>
            ))}
          </ul>
          <p className="mt-3">
            <span className="font-bold">traits:</span> {content.behavioural.join(", ")}
          </p>
        </Section>

        <Section title="certifications">
          <ul className="list-disc space-y-1 pl-5">
            {content.certifications.map((c) => (
              <li key={c.name}>
                {c.name}, {c.issuer}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="languages">
          <p>{content.profile.find((p) => p.label === "audio tracks")?.value.replaceAll(" · ", ", ")}</p>
        </Section>
      </main>
    </div>
  );
}
