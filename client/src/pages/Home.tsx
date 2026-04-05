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
