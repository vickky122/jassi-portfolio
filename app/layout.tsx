import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Anton, Manrope, JetBrains_Mono } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import { LenisProvider } from "@/components/LenisProvider";
import { content } from "@/content/content";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const anton = Anton({ weight: "400", variable: "--font-anton", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

const title = `${content.name.first} ${content.name.last}`;
const description = content.positioning.options[content.positioning.chosen];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${title}: ${content.target.domain}`, template: `%s · ${title}` },
  description,
  openGraph: { type: "website", siteName: title, title, description },
  twitter: { card: "summary_large_image", title, description },
};

// Runs before first paint. A visitor who already saw the opening this session never sees the loader flash;
// anyone else gets data-loading, which holds scrolling until the loader reports "site-ready".
const LOADER_BOOT = `try{var d=document.documentElement;if(sessionStorage.getItem('opening-seen')==='1'){d.setAttribute('data-loader','skip')}else{d.setAttribute('data-loading','1')}}catch(e){}`;

// Person structured data: public facts only (no phone, address, birth date or family details).
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${content.name.first} ${content.name.last}`,
  description,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Amity University, Noida" },
  knowsLanguage: ["English", "Hindi", "Odia", "French"],
  address: { "@type": "PostalAddress", addressRegion: "Odisha", addressCountry: "IN" },
  sameAs: [content.contact.linkedin],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: the head script above may add attributes to <html> before React hydrates
    <html lang="en" className={`${anton.variable} ${manrope.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOADER_BOOT }} />
      </head>
      <body>
        <a
          href="#main"
          className="t-label surface-paper sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2"
        >
          skip to content
        </a>
        <noscript>
          <style>{`[data-slash],[data-intro]{opacity:1!important}.loader{display:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <LenisProvider>{children}</LenisProvider>
        <Cursor />
      </body>
    </html>
  );
}
