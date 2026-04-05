import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ClassesSection from "@/components/ClassesSection";
import RecordsSection from "@/components/RecordsSection";
import ChampionsSection from "@/components/ChampionsSection";
import GallerySection from "@/components/GallerySection";
import TrackSection from "@/components/TrackSection";
import TeamsSection from "@/components/TeamsSection";
import SponsorsSection from "@/components/SponsorsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  // When arriving at home with a hash (e.g. /#classes after clicking a nav
  // item from a sub-page), scroll to that section once sections have mounted.
  // The browser's native hash scroll fires too early, before sections render.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#hero") {
      window.scrollTo(0, 0);
      return;
    }

    // Cancel the browser's native hash-scroll (which fires before sections
    // render) and take over ourselves. We use `behavior: "auto"` (instant)
    // because smooth scrolling can be interrupted by late layout shifts
    // from images/fonts loading, leaving the page stranded at the top.
    let cancelled = false;
    let lastTop = -1;
    let stableCount = 0;

    const doScroll = () => {
      if (cancelled) return;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return false;
      el.scrollIntoView({ behavior: "auto", block: "start" });
      return true;
    };

    // Retry for up to ~4s. Each try: find the element, scroll instantly,
    // then check if its position has stabilised (same top value twice in
    // a row) before giving up — this handles late-loading images shifting
    // layout after the initial scroll.
    let tries = 0;
    const tick = () => {
      if (cancelled) return;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top === lastTop) {
          stableCount++;
        } else {
          stableCount = 0;
          lastTop = top;
        }
        // Instant scroll to current position every tick until layout stable.
        window.scrollTo({ top, behavior: "auto" });
        if (stableCount >= 3) return; // stable for 3 ticks → done
      }
      if (tries++ < 40) {
        setTimeout(tick, 100);
      }
    };

    // Kick off immediately, then again after the window `load` event in case
    // the initial run happened before the DOM was fully ready.
    doScroll();
    tick();
    const onLoad = () => {
      doScroll();
    };
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ClassesSection />
      <RecordsSection />
      <ChampionsSection />
      <GallerySection />
      <TeamsSection />
      <SponsorsSection />
      <ContactSection />
      <AboutSection />
      <TrackSection />
      <Footer />
    </div>
  );
}
