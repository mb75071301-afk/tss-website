/*
 * Design: Motorsport Editorial — 2025 年度各組別冠軍展示
 * 放在場地最速區塊下方
 */
import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CHAMPIONS = [
  {
    class: "Super Stock 400",
    rider: "劉耘青",
    team: "忠孝車業",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412219175/S2436YpFoG9bkAdWgxxsXa/st400_champion_5b91c2bf.jpg",
  },
  {
    class: "Super Sport 400",
    rider: "黃晧",
    team: "YX Racing Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412219175/S2436YpFoG9bkAdWgxxsXa/sp400_champion_cd662c8e.jpg",
  },
  {
    class: "Super Stock 300",
    rider: "呂昶陞",
    team: "AS RACING TEAM",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412219175/S2436YpFoG9bkAdWgxxsXa/st300_champion_05566e5f.jpg",
  },
  {
    class: "Super Sport 300",
    rider: "黃威",
    team: "菇菇賽道日",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412219175/S2436YpFoG9bkAdWgxxsXa/sp300_champion_f3370cef.jpg",
  },
  {
    class: "Super Stock 250",
    rider: "許瑋廷",
    team: "極樂HRT with kushitani TW",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412219175/S2436YpFoG9bkAdWgxxsXa/st250_champion_a3a9d518.jpg",
  },
  {
    class: "Super Sport 250",
    rider: "蔡明修",
    team: "IGOL O.B. Racing",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412219175/S2436YpFoG9bkAdWgxxsXa/sp250_champion_a5b40e10.jpg",
  },
  {
    class: "Super Stock 150",
    rider: "李俊輝",
    team: "萬威焦點車隊",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412219175/S2436YpFoG9bkAdWgxxsXa/st150_champion_497d50f1.jpg",
  },
  {
    class: "Super Sport 150",
    rider: "莊安育",
    team: "RCB Racing Team",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412219175/S2436YpFoG9bkAdWgxxsXa/sp150_champion_c393175c.jpg",
  },
];

export default function ChampionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="champions" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-yellow-950/5 to-background" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-0.5 bg-yellow-500" />
              <span className="font-heading text-yellow-500 text-sm tracking-[0.3em]">
                {language === 'zh' ? '2025 年度冠軍' : '2025 CHAMPIONS'}
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              {language === 'zh' ? '年度' : 'ANNUAL '}
              <span className="text-yellow-500">{language === 'zh' ? '冠軍' : 'CHAMPIONS'}</span>
            </h2>
          </div>

          {/* Scroll controls */}
          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-yellow-500 text-white/50 hover:text-white hover:bg-yellow-500/10 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-yellow-500 text-white/50 hover:text-white hover:bg-yellow-500/10 transition-all"
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
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
          >
            {CHAMPIONS.map((champ) => (
              <div
                key={champ.class}
                className="flex-shrink-0 w-80 relative overflow-hidden group"
              >
                {/* Champion image */}
                <div className="w-full aspect-[3/4] relative overflow-hidden">
                  <img
                    src={champ.image}
                    alt={`${champ.class} - ${champ.rider}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Champion badge */}
                  <div className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 text-xs font-heading font-bold tracking-wider">
                    CHAMPION
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-yellow-400 text-xs font-heading tracking-widest mb-1">{champ.class}</p>
                    <h3 className="font-heading text-2xl font-bold text-white mb-1">{champ.rider}</h3>
                    <p className="text-white/60 text-sm">{champ.team}</p>
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
            className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-yellow-500 text-white/50 hover:text-white hover:bg-yellow-500/10 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-yellow-500 text-white/50 hover:text-white hover:bg-yellow-500/10 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
