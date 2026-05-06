/*
 * Design: Motorsport Editorial — grid layout record cards,
 * SP1000 featured large, remaining 8 cards in 2 rows of 4
 * Multi-language support
 */
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { IMAGES } from "@/lib/images";

export default function RecordsSection() {
  const { t } = useLanguage();

  // SP1000 is the first card (featured), rest in two rows of 4
  const featured = IMAGES.records[0];
  const row1 = IMAGES.records.slice(1, 5);
  const row2 = IMAGES.records.slice(5);

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

        {/* Featured: SP1000 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-4"
        >
          <div className="relative overflow-hidden group rounded-lg w-full max-w-sm">
            <img
              src={featured}
              alt="Track record SP1000"
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
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
                alt={`Track record ${i + 2}`}
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
                alt={`Track record ${i + 6}`}
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
