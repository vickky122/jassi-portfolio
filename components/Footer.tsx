"use client";

import { useEffect, useRef } from "react";
import { content } from "@/content/content";
import { useLenis } from "./LenisProvider";

/** Name, local time in IST, back to top. The clock is written to the DOM after mount, so server and client agree. */
export function Footer() {
  const time = useRef<HTMLTimeElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
    const tick = () => time.current && (time.current.textContent = `${fmt.format(new Date())} ist`);
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="surface-ink pad-x t-label flex flex-col items-start justify-between gap-4 py-10 md:flex-row md:items-center">
      <p>
        {content.name.first} {content.name.last} · season 1
      </p>
      <p>
        junagarh, odisha · <time ref={time}>&nbsp;</time>
      </p>
      <p>made with care in odisha</p>
      <button
        type="button"
        className="btn btn-line"
        onClick={() => (lenis.current ? lenis.current.scrollTo(0) : window.scrollTo({ top: 0 }))}
      >
        back to top ↑
      </button>
    </footer>
  );
}
