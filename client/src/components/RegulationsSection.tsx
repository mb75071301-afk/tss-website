/*
 * Race regulations section
 */
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RegulationsSection() {
  const { language } = useLanguage();
  return (
    <section id="regulations" className="relative py-14 lg:py-20 overflow-hidden">
      {/* Background with racing action image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.racingAction}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 to-transparent" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-red-500" />
            <span className="font-heading text-red-500 text-sm tracking-[0.3em]">RACE REGULATIONS</span>
            <div className="w-12 h-0.5 bg-red-500" />
          </div>

          {/* Title */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {language === "zh" ? "賽事規章" : "Race Regulations"}
          </h2>

          {/* Official regulations link */}
          <div className="flex justify-center mt-8">
            <a
              href="https://tss.pse.is/8w32rx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-white/40 hover:border-white text-white px-8 py-4 font-heading text-lg tracking-wider transition-all hover:bg-white/10 rounded"
            >
              <FileText size={20} />
              {language === "zh" ? "查看賽事規章" : "View Regulations"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
