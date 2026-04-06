/**
 * SeoHead — dynamically manages <link rel="canonical"> and hreflang tags
 * to prevent Google from flagging language-variant routes as duplicate pages.
 *
 * Rules:
 *   /           → canonical: /        (zh default)
 *   /zh/...     → canonical: /...     (strip /zh/ prefix; zh is default)
 *   /en/...     → canonical: /en/...  (en is non-default)
 *   /teams      → canonical: /teams
 *   /en/teams   → canonical: /en/teams
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

const SITE = "https://taiwansuperbikeseries.com";

function getCanonicalPath(rawPath: string): string {
  // Strip /zh prefix so /zh/ and / both resolve to /
  return rawPath.replace(/^\/zh(\/|$)/, "/") || "/";
}

function getEnPath(canonicalPath: string): string {
  // /       → /en/
  // /teams  → /en/teams
  if (canonicalPath === "/") return "/en/";
  return "/en" + canonicalPath;
}

function getZhPath(canonicalPath: string): string {
  return canonicalPath;
}

function setOrCreate(rel: string, hreflang: string | null, href: string): HTMLLinkElement {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.href = href;
  return el;
}

export default function SeoHead() {
  const [location] = useLocation();

  useEffect(() => {
    const canonicalPath = getCanonicalPath(location);
    const zhPath = getZhPath(canonicalPath);
    const enPath = getEnPath(canonicalPath);

    // <link rel="canonical" href="https://...">
    setOrCreate("canonical", null, SITE + canonicalPath);

    // <link rel="alternate" hreflang="zh" href="...">
    setOrCreate("alternate", "zh", SITE + zhPath);

    // <link rel="alternate" hreflang="zh-TW" href="...">
    setOrCreate("alternate", "zh-TW", SITE + zhPath);

    // <link rel="alternate" hreflang="en" href="...">
    setOrCreate("alternate", "en", SITE + enPath);

    // <link rel="alternate" hreflang="x-default" href="..."> (zh/default)
    setOrCreate("alternate", "x-default", SITE + zhPath);
  }, [location]);

  return null;
}
