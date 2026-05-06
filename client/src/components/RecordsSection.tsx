/*
 * Design: Motorsport Editorial — grid layout record cards,
 * using original TSS record card images (which already contain all info)
 * Multi-language support
 */
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { IMAGES } from "@/lib/images";

export default function RecordsSection() {
  const { t } = useLanguage();

  // Split into two rows
  const firstRow = IMAGES.records.slice(0, 5);
  const secondRow = IMAGES.records.slice(5);

  return (
    <section id="records" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-red-950/5 to-background" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-red-500" />
            <span className="font-heading text-red-500 text-sm tracking-[0.3em]">{t('records.label')}</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {t('records.title')}<span className="text-red-500">{t('records.titleHighlight')}</span>
          </h2>
        </div>

        {/* Row 1: 5 cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4"
        >
          {firstRow.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden group rounded-lg"
            >
              <img
                src={src}
                alt={`Track record ${i + 1}`}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>

        {/* Row 2: 4 cards, centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {/* Offset by half a column on lg to center 4 cards */}
          <div className="hidden lg:block" />
          {secondRow.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden group rounded-lg"
            >
              <img
                src={src}
                alt={`Track record ${firstRow.length + i + 1}`}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
