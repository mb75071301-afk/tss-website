/*
 * Design: Motorsport Editorial — masonry-style photo gallery with
 * hover zoom and lightbox-style overlay. Uses gallery + extra images.
 * Multi-language support
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useLanguage } from "@/contexts/LanguageContext";

const allPhotos = [...IMAGES.gallery, ...IMAGES.extra];

// Define layout pattern for visual variety
const layoutPattern = [
  "col-span-2 row-span-2", // 0: gallery1 - large
  "col-span-1 row-span-1", // 1: gallery2
  "col-span-1 row-span-1", // 2: gallery3
  "col-span-1 row-span-1", // 3: gallery4
  "col-span-1 row-span-1", // 4: gallery5
  "col-span-2 row-span-1", // 5: gallery6 - wide
  "col-span-1 row-span-1", // 6: gallery7
  "col-span-1 row-span-1", // 7: gallery8
  "col-span-1 row-span-1", // 8: extra1
  "col-span-1 row-span-1", // 9: extra2
  "col-span-2 row-span-1", // 10: extra3 - wide
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { t } = useLanguage();

  const navigateLightbox = (dir: "prev" | "next") => {
    if (lightbox === null) return;
    if (dir === "prev") {
      setLightbox(lightbox > 0 ? lightbox - 1 : allPhotos.length - 1);
    } else {
      setLightbox(lightbox < allPhotos.length - 1 ? lightbox + 1 : 0);
    }
  };

  return (
    <section id="gallery" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-0.5 bg-red-500" />
          <span className="font-heading text-red-500 text-sm tracking-[0.3em]">{t('gallery.label')}</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-16">
          {t('gallery.title')}<span className="text-red-500">{t('gallery.titleHighlight')}</span>
        </h2>

        {/* Masonry grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-64 lg:auto-rows-80"
        >
          {allPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`${layoutPattern[i] || "col-span-1 row-span-1"} relative overflow-hidden group cursor-pointer`}
              onClick={() => setLightbox(i)}
            >
              <img
                src={photo}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight size={32} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              {/* Image */}
              <img
                src={allPhotos[lightbox]}
                alt={`Gallery ${lightbox + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              {/* Navigation */}
              <button
                onClick={() => navigateLightbox("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-all rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => navigateLightbox("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-all rounded-full"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Close button */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-all rounded-full"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                {lightbox + 1} / {allPhotos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
