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
    // Retry for up to ~1.5s in case the target section mounts late.
    let tries = 0;
    const tryScroll = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries++ < 15) {
        setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
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
