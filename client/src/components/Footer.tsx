/*
 * Design: Motorsport Editorial — minimal dark footer with red accent
 * Multi-language support
 */
import { IMAGES } from "@/lib/images";
import { NAV_ITEMS } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();
  
  const handleNavClick = (href: string) => {
    // If not on home page, navigate to home + hash
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(zh|en)/, "") || "/";
    if (pathWithoutLang !== "/") {
      const homePath = language === "en" ? "/en/" : "/";
      window.location.href = `${homePath}${href}`;
      return;
    }
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const getNavLabel = (label: string): string => {
    const labelMap: Record<string, string> = {
      "首頁": "nav.home",
      "賽程表": "nav.schedule",
      "關於賽事": "nav.about",
      "賽事組別": "nav.classes",
      "場地最速": "nav.records",
      "精彩瞬間": "nav.gallery",
      "賽道資訊": "nav.track",
      "車隊介紹": "nav.teams",
      "贊助夥伴": "nav.sponsors",
      "聯絡我們": "nav.contact",
    };
    return t(labelMap[label] || label);
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-black">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={IMAGES.logo}
                alt="TSS Logo"
                className="h-10 w-auto object-contain"
              />
              <div>
                <span className="text-white font-heading text-sm tracking-widest leading-none block">
                  TAIWAN SUPERBIKE
                </span>
                <span className="text-red-500 font-heading text-xs tracking-[0.3em] leading-none block">
                  SERIES
                </span>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              {language === 'zh' 
                ? '台灣最高規格二輪爭先賽事，由 CTMSA 中華賽車會認證。'
                : "Taiwan's premier superbike racing series, certified by CTMSA."}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-sm text-white/60 tracking-[0.2em] mb-4">
              {language === 'zh' ? '快速連結' : 'Quick Links'}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (!item.href.startsWith("/")) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className="text-white/40 hover:text-white/80 text-sm transition-colors"
                >
                  {getNavLabel(item.label)}
                </a>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading text-sm text-white/60 tracking-[0.2em] mb-4">
              {language === 'zh' ? '賽事資訊' : 'Event Info'}
            </h4>
            <div className="space-y-2">
              <p className="text-white/40 text-sm">
                <span className="text-white/60">{language === 'zh' ? '地點：' : 'Location: '}</span>
                大鵬灣國際賽車場
              </p>
              <p className="text-white/40 text-sm">
                <span className="text-white/60">{language === 'zh' ? '認證：' : 'Certified: '}</span>
                CTMSA
              </p>
              <p className="text-white/40 text-sm">
                <span className="text-white/60">{language === 'zh' ? '等級：' : 'Grade: '}</span>
                FIA Grade 2
              </p>
            </div>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs tracking-wider">
            © 2026 Taiwan Superbike Series. {t('footer.allRightsReserved')}.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 text-xs tracking-wider transition-colors">
              {language === 'zh' ? '隱私政策' : 'Privacy'}
            </a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs tracking-wider transition-colors">
              {language === 'zh' ? '使用條款' : 'Terms'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
