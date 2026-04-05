/*
 * Design: Motorsport Editorial — contact section with social links,
 * diagonal accent, and CTA
 * Multi-language support
 */
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, ExternalLink, MapPin } from "lucide-react";
import { ORGANIZER } from "@/lib/data";
import { IMAGES } from "@/lib/images";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-black" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-0.5 bg-red-500" />
              <span className="font-heading text-red-500 text-sm tracking-[0.3em]">{t('contact.label')}</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('contact.title')}<span className="text-red-500">{t('contact.titleHighlight')}</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              {t('contact.description')}
            </p>

            {/* Info items */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06]">
                <Mail size={18} className="text-red-500 flex-shrink-0" />
                <div>
                  <span className="text-white/40 text-xs tracking-wider block">主辦單位</span>
                  <span className="text-white font-medium">{ORGANIZER.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06]">
                <MapPin size={18} className="text-red-500 flex-shrink-0" />
                <div>
                  <span className="text-white/40 text-xs tracking-wider block">比賽場地</span>
                  <span className="text-white font-medium">{ORGANIZER.venue}</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href={ORGANIZER.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-red-500 text-white/50 hover:text-white hover:bg-red-500/10 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={ORGANIZER.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-red-500 text-white/50 hover:text-white hover:bg-red-500/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>

          {/* Right — CTA card with background image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${IMAGES.heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
            </div>

            <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-between min-h-96">
              <div>
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-4">
                  {t('contact.followUs')}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  追蹤我們的社群媒體，獲取最新賽事資訊、精彩瞬間和獨家內容。
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href={ORGANIZER.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 font-heading text-sm tracking-widest transition-all"
                  aria-label="Follow on Facebook"
                >
                  <Facebook size={18} />
                  <span>Facebook</span>
                </a>
                <a
                  href={ORGANIZER.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 font-heading text-sm tracking-widest transition-all"
                  aria-label="Follow on Instagram"
                >
                  <Instagram size={18} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
