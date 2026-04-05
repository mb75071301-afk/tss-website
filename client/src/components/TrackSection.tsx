/*
 * Design: Motorsport Editorial — track info with map image,
 * stats in Orbitron font, diagonal layout
 * Multi-language support
 */
import { motion } from "framer-motion";
import { MapPin, Ruler, Award } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { TRACK_INFO } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TrackSection() {
  const { t, language } = useLanguage();

  const stats = [
    { icon: <Ruler size={20} />, label: language === 'zh' ? "賽道長度" : "Circuit Length", value: TRACK_INFO.fullCircuitLength },
    { icon: <Award size={20} />, label: language === 'zh' ? "國際認證" : "Certification", value: TRACK_INFO.certification },
    { icon: <MapPin size={20} />, label: language === 'zh' ? "賽道位置" : "Location", value: TRACK_INFO.location },
  ];

  return (
    <section id="track" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle diagonal stripe */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          background: "repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(227,25,55,0.5) 60px, rgba(227,25,55,0.5) 62px)"
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-0.5 bg-red-500" />
          <span className="font-heading text-red-500 text-sm tracking-[0.3em]">{t('track.label')}</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-16">
          {t('track.title')}<span className="text-red-500">{t('track.titleHighlight')}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Track map — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 relative"
          >
            <div className="relative overflow-hidden border border-white/[0.06] bg-white/[0.02] p-4 lg:p-6">
              <img
                src={IMAGES.trackMap}
                alt={language === 'zh' ? "大鵬灣國際賽車場賽道圖" : "Dapeng Bay Circuit Map"}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-red-500" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-red-500" />
            </div>
          </motion.div>

          {/* Track info — takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Track name */}
            <div>
              <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-2">
                {t('track.trackName')}
              </h3>
              <p className="text-white/40 text-sm">
                {language === 'zh' ? "DaPeng Bay International Circuit (PIC)" : "DaPeng Bay International Circuit (PIC)"}
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/[0.06] hover:border-red-500/20 transition-colors"
                >
                  <div className="text-red-500 flex-shrink-0 mt-1">{stat.icon}</div>
                  <div>
                    <span className="text-white/40 text-xs tracking-wider block">{stat.label}</span>
                    <span className="text-white font-medium text-sm">{stat.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/50 text-sm leading-relaxed pt-4 border-t border-white/[0.06]"
            >
              {t('track.description')}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
