/*
 * Design: Motorsport Editorial — sponsor banner display with
 * original sponsor image and partner tiers
 * Multi-language support
 */
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SponsorsSection() {
  const { t } = useLanguage();
  
  return (
    <section id="sponsors" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-red-950/5 to-background" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-0.5 bg-red-500" />
          <span className="font-heading text-red-500 text-sm tracking-[0.3em]">{t('sponsors.label')}</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          {t('sponsors.title')}<span className="text-red-500">{t('sponsors.titleHighlight')}</span>
        </h2>
        <p className="text-white/60 max-w-2xl text-base leading-relaxed mb-16">
          感謝所有贊助夥伴的支持，讓 TSS 台灣超級摩托車聯賽得以持續舉辦，
          為台灣的賽車運動注入更多能量。
        </p>

        {/* Sponsor banner image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative overflow-hidden">
            <img
              src={IMAGES.sponsorsBanner}
              alt="TSS Sponsors"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Sponsor tiers */}
        <div className="mt-10 space-y-4">
          {/* Title Sponsor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 bg-white/[0.02] border border-white/[0.06] text-center hover:border-red-500/20 transition-colors"
          >
            <span className="font-heading text-red-500 text-xs tracking-[0.3em] block mb-3">{t('sponsors.titleSponsor')}</span>
            <span className="font-heading text-3xl text-white font-bold">KYT</span>
          </motion.div>

          {/* Official Tyre Supplier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-6 bg-white/[0.02] border border-white/[0.06] text-center hover:border-red-500/20 transition-colors"
          >
            <span className="font-heading text-red-500 text-xs tracking-[0.3em] block mb-3">{t('sponsors.officialTyreSponsor')}</span>
            <span className="font-heading text-3xl text-white font-bold">Pirelli</span>
          </motion.div>

          {/* Main Sponsors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-red-500/20 transition-colors"
          >
            <span className="font-heading text-red-500 text-xs tracking-[0.3em] block mb-4">{t('sponsors.mainSponsors')}</span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {["GEARS", "Alpinestars", "SHOEI", "BOSCH", "UOS Oil"].map((sponsor, i) => (
                <motion.div
                  key={sponsor}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  className="text-center py-2 border-l border-white/10 last:border-l-0"
                >
                  <span className="font-heading text-white font-bold text-sm">{sponsor}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
