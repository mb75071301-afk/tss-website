/*
 * R2 2026 Registration CTA section
 */
import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { IMAGES } from "@/lib/images";

export default function RegistrationSection() {
  return (
    <section id="registration" className="relative py-20 lg:py-28 overflow-hidden">
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
            <span className="font-heading text-red-500 text-sm tracking-[0.3em]">REGISTRATION OPEN</span>
            <div className="w-12 h-0.5 bg-red-500" />
          </div>

          {/* Title */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            2026 TSS 超級摩托車聯賽
          </h2>
          <p className="font-heading text-xl sm:text-2xl lg:text-3xl text-red-500 font-bold mb-10">
            第二站報名
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://tss.pse.is/8zs66e"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-heading text-lg tracking-wider transition-all hover:scale-105 rounded"
            >
              <ExternalLink size={20} />
              立即報名
            </a>
            <a
              href="https://tss.pse.is/8w32rx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-white/40 hover:border-white text-white px-8 py-4 font-heading text-lg tracking-wider transition-all hover:bg-white/10 rounded"
            >
              <FileText size={20} />
              賽事規章
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
