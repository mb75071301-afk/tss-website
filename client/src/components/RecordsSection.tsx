/*
 * Design: Motorsport Editorial — grid layout record cards,
 * SP1000 and SP600 side by side, remaining 8 cards in 2 rows of 4
 * Multi-language support
 */
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { IMAGES } from "@/lib/images";

export default function RecordsSection() {
  const { t } = useLanguage();

  // SP1000 and SP600 share the featured row, followed by two rows of 4
  const featured = IMAGES.records.slice(0, 2);
  const row1 = IMAGES.records.slice(2, 6);
  const row2 = IMAGES.records.slice(6);

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

        {/* Featured: SP1000 and SP600 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-4 max-w-3xl mx-auto mb-4"
        >
          {featured.map((src, i) => (
            <div key={src} className="relative overflow-hidden group rounded-lg">
              <img
                src={src}
                alt={`Track record ${i === 0 ? "SP1000" : "SP600"}`}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>

        {/* Row 1: 4 cards (400, 300) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4"
        >
          {row1.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden group rounded-lg"
            >
              <img
                src={src}
                alt={`Track record ${i + 3}`}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>

        {/* Row 2: 4 cards (250, 150) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {row2.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden group rounded-lg"
            >
              <img
                src={src}
                alt={`Track record ${i + 7}`}
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
