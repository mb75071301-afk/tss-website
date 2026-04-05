/*
 * Design: Motorsport Editorial — race class grid with Orbitron numbers,
 * diagonal stripe accents, hover reveal
 * Multi-language support + Mobile optimization + Navigation
 */
import { motion } from "framer-motion";
import { RACE_CLASSES } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";

export default function ClassesSection() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  
  const handleClassClick = (classNameShort: string) => {
    setLocation(`/class/${classNameShort}`);
  };
  
  return (
    <section id="classes" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Diagonal red stripe background */}
      <div className="absolute top-0 left-0 right-0 h-full opacity-[0.03]"
        style={{
          background: "repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(227,25,55,0.5) 40px, rgba(227,25,55,0.5) 42px)"
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-0.5 bg-red-500" />
          <span className="font-heading text-red-500 text-sm tracking-[0.3em]">{t('classes.label')}</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          {t('classes.title')}<span className="text-red-500">{t('classes.titleHighlight')}</span>
        </h2>
        <p className="text-white/60 max-w-2xl text-base leading-relaxed mb-16">
          {t('classes.description')}
        </p>

        {/* Class grid - optimized for mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {RACE_CLASSES.map((cls, i) => (
            <motion.button
              key={cls.nameShort}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => handleClassClick(cls.nameShort)}
              className="group relative bg-white/[0.02] border border-white/[0.06] overflow-hidden hover:border-red-500/40 transition-all duration-500 p-4 sm:p-6 lg:p-8 text-left hover:bg-white/[0.04]"
            >
              {/* Top red line on hover */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-500" />

              {/* CC Number */}
              <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-white/[0.06] group-hover:text-red-500/10 transition-colors duration-500 leading-none mb-3"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {cls.cc.replace(/[^0-9]/g, "")}
              </div>

              {/* Class name */}
              <h3 className="font-heading text-sm sm:text-base lg:text-lg font-bold text-white mb-1 line-clamp-2">
                {cls.name}
              </h3>
              <span className="text-white/40 text-xs sm:text-sm">{cls.cc}</span>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          ))}
        </div>

        {/* Notice section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-6 lg:p-8 bg-white/[0.02] border border-white/[0.06]"
        >
          <p className="text-white/70 text-sm leading-relaxed">
            {t('classes.notice')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
