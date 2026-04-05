/*
 * Design: Motorsport Editorial — three feature cards with icons,
 * asymmetric layout, red accent borders, racing action image
 * Multi-language support
 */
import { motion } from "framer-motion";
import { Trophy, Shield, Heart } from "lucide-react";
import { FEATURES } from "@/lib/data";
import { IMAGES } from "@/lib/images";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Trophy size={28} />,
  shield: <Shield size={28} />,
  heart: <Heart size={28} />,
};

export default function AboutSection() {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url(${IMAGES.carbonTexture})`, backgroundSize: "300px" }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-0.5 bg-red-500" />
          <span className="font-heading text-red-500 text-sm tracking-[0.3em]">{t('about.label')}</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          {t('about.title')}<span className="text-red-500">{t('about.titleHighlight')}</span>
        </h2>
        <p className="text-white/60 max-w-2xl text-base leading-relaxed mb-16">
          {t('about.description')}
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-white/[0.03] border border-white/[0.06] p-8 lg:p-10 hover:border-red-500/30 transition-all duration-500"
            >
              {/* Top red accent */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-500" />

              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center bg-red-500/10 text-red-500 mb-6 border border-red-500/20">
                {iconMap[feature.icon]}
              </div>

              {/* Title */}
              <h3 className="font-heading text-2xl font-bold text-white mb-1">
                {t(`about.features.${feature.title.toLowerCase()}.title`)}
              </h3>
              <span className="text-red-500/80 text-sm font-medium mb-4 block">
                {t(`about.features.${feature.title.toLowerCase()}.subtitle`)}
              </span>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed">
                {t(`about.features.${feature.title.toLowerCase()}.description`)}
              </p>

              {/* Bottom corner accent */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/[0.06] group-hover:border-red-500/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Racing action image with stats overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Main image */}
            <div className="lg:col-span-3 relative overflow-hidden">
              <img
                src={IMAGES.racingAction}
                alt="Racing Action"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-transparent" />
            </div>

            {/* Stats panel */}
            <div className="lg:col-span-2 flex flex-col gap-4 justify-center">
              <div className="bg-white/[0.02] border border-white/[0.06] p-6">
                <span className="text-red-500 font-heading text-xs tracking-[0.3em] block mb-2">{t('about.stats.classes').split(' ')[0]}</span>
                <span className="font-heading text-4xl font-bold text-white" style={{ fontFamily: "'Orbitron', monospace" }}>8</span>
                <span className="text-white/40 text-sm ml-2">{t('about.stats.classes').split(' ')[1]}</span>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.06] p-6">
                <span className="text-red-500 font-heading text-xs tracking-[0.3em] block mb-2">ENGINE RANGE</span>
                <span className="font-heading text-4xl font-bold text-white" style={{ fontFamily: "'Orbitron', monospace" }}>150-1000</span>
                <span className="text-white/40 text-sm ml-2">{t('about.stats.engineRange')}</span>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.06] p-6">
                <span className="text-red-500 font-heading text-xs tracking-[0.3em] block mb-2">CERTIFIED BY</span>
                <span className="font-heading text-lg font-bold text-white">{t('about.stats.certifiedBy')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
