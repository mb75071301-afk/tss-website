/*
 * Design: Motorsport Editorial — horizontal scrolling record cards,
 * using original TSS record card images (which already contain all info)
 * Multi-language support
 */
import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const RECORD_LABELS = [
  "Super Stock 400",
  "Super Sport 400",
  "Super Stock 300",
  "Super Sport 300",
  "Super Stock 250",
  "Super Sport 250",
  "Super Stock 150",
  "Super Sport 150",
];

export default function RecordsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="records" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-red-950/5 to-background" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-0.5 bg-red-500" />
              <span className="font-heading text-red-500 text-sm tracking-[0.3em]">{t('records.label')}</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              {t('records.title')}<span className="text-red-500">{t('records.titleHighlight')}</span>
            </h2>
          </div>

          {/* Scroll controls */}
          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-red-500 text-white/50 hover:text-white hover:bg-red-500/10 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-red-500 text-white/50 hover:text-white hover:bg-red-500/10 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {RECORD_LABELS.map((label, i) => (
              <div
                key={label}
                className="flex-shrink-0 w-80 h-96 relative overflow-hidden group"
              >
                {/* Image placeholder - reserved for future use */}
                <div className="w-full h-full bg-white/[0.03] border border-white/[0.06]" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">{label}</h3>
                    <p className="text-white/60 text-sm mt-2">{t('records.label')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient fade on edges */}
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </motion.div>

        {/* Mobile scroll buttons */}
        <div className="lg:hidden flex gap-2 justify-center mt-6">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-red-500 text-white/50 hover:text-white hover:bg-red-500/10 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-red-500 text-white/50 hover:text-white hover:bg-red-500/10 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
