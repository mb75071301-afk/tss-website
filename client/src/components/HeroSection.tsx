/*
 * Design: Motorsport Editorial — full-screen hero with diagonal overlay,
 * large Oswald heading, and animated entrance
 * Multi-language support
 */
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { t } = useLanguage();
  
  return (
    <section id="hero" className="relative h-screen min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={isMobile ? IMAGES.heroBgMobile : IMAGES.heroBg}
          alt="TSS Racing"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay - stronger for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
        <div className="absolute inset-0 bg-black/25" />
        {/* Red diagonal accent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, transparent 0%, transparent 40%, rgba(227,25,55,0.08) 50%, transparent 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 lg:pb-32 container pt-32 md:pt-40">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-4"
        >
          TSS 台灣超級摩托車聯賽
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 md:mt-8 text-white/70 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex gap-4"
        >
          <a
            href="#classes"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("classes")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-heading text-sm tracking-widest transition-all hover:translate-x-1"
          >
            {t('hero.cta')}
            <ChevronDown size={16} className="-rotate-90" />
          </a>
          <a
            href="#records"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("records")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-6 py-3 font-heading text-sm tracking-widest transition-all hover:bg-white/5"
          >
            {t('hero.lapRecord')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={24} className="text-white/40" />
        </motion.div>
      </motion.div>

      {/* Bottom diagonal cut */}
      <div
        className="absolute -bottom-1 left-0 right-0 h-24"
        style={{ clipPath: "polygon(0 100%, 100% 30%, 100% 100%)" }}
      >
        <div className="w-full h-full bg-background" />
      </div>
    </section>
  );
}
