import { ImageResponse } from "next/og";
import { content } from "@/content/content";

export const alt = `${content.name.first} ${content.name.last}: ${content.target.domain}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card in the site's style: ink, a crimson sun, the name, the domain. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0a0f", color: "#f6f1ea", position: "relative" }}>
        <div style={{ position: "absolute", right: 70, top: 60, width: 510, height: 510, borderRadius: 255, background: "#c8102e" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 70, gap: 14 }}>
          <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "lowercase", opacity: 0.85 }}>season 1 · episode 01</div>
          <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.9, textTransform: "uppercase", display: "flex", flexDirection: "column" }}>
            <span>{content.name.first}</span>
            <span>{content.name.last}</span>
          </div>
          <div style={{ fontSize: 34, marginTop: 10, color: "#3de0ff" }}>{`${content.target.domain} · mba · open to opportunities`}</div>
        </div>
      </div>
    ),
    size,
  );
}
