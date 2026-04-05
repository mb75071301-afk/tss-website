/*
 * Design: Motorsport Editorial — dark transparent navbar with red accent underline
 * Fixed top, glass morphism on scroll, hamburger menu on mobile
 * Multi-language support with language switcher
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { NAV_ITEMS } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // External routes
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    // If not on home page, navigate to home page with anchor
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(zh|en)/, '') || '/';
    if (pathWithoutLang !== "/") {
      window.location.href = `/${language}${href}`;
      return;
    }
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLanguageChange = (lang: 'zh' | 'en') => {
    setLanguage(lang);
    setLangOpen(false);
  };

  const getNavLabel = (label: string): string => {
    const labelMap: Record<string, string> = {
      "首頁": "nav.home",
      "關於賽事": "nav.about",
      "賽事組別": "nav.classes",
      "場地最速": "nav.records",
      "年度冠軍": "nav.champions",
      "精彩瞬間": "nav.gallery",
      "賽道資訊": "nav.track",
      "車隊介紹": "nav.teams",
      "贊助夥伴": "nav.sponsors",
      "聯絡我們": "nav.contact",
    };
    return t(labelMap[label] || label);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="flex items-center gap-3 group"
        >
          <img
            src={IMAGES.logo}
            alt="TSS Logo"
            className="h-10 lg:h-12 w-auto object-contain"
          />
          <div className="hidden sm:block">
            <span className="text-white font-heading text-sm tracking-widest leading-none block">
              TAIWAN SUPERBIKE
            </span>
            <span className="text-red-500 font-heading text-xs tracking-[0.3em] leading-none block">
              SERIES
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isExternal = item.href.startsWith("/");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (!isExternal) {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }
                }}
                className="relative px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group"
              >
                {getNavLabel(item.label)}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
              </a>
            );
          })}
        </div>

        {/* Language Selector & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Desktop Language Selector */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              aria-label="Change language"
            >
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>
            
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 bg-black/95 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => handleLanguageChange('zh')}
                    className={`block w-full px-4 py-2 text-sm text-left ${
                      language === 'zh'
                        ? 'bg-red-500/20 text-red-400'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    } transition-colors`}
                  >
                    中文
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`block w-full px-4 py-2 text-sm text-left ${
                      language === 'en'
                        ? 'bg-red-500/20 text-red-400'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    } transition-colors`}
                  >
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Language & Menu Toggle */}
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Change language"
          >
            <Globe size={20} />
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Language Dropdown */}
        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 right-16 lg:hidden bg-black/95 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => handleLanguageChange('zh')}
                className={`block w-full px-4 py-2 text-sm text-left ${
                  language === 'zh'
                    ? 'bg-red-500/20 text-red-400'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                } transition-colors`}
              >
                中文
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`block w-full px-4 py-2 text-sm text-left ${
                  language === 'en'
                    ? 'bg-red-500/20 text-red-400'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                } transition-colors`}
              >
                English
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu - Slide-in from top */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -400 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -400 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden bg-black/98 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          >
            <div className="container py-4 flex flex-col gap-0">
              {NAV_ITEMS.map((item) => {
                const isExternal = item.href.startsWith("/");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (!isExternal) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
                    className="px-4 py-3.5 text-white/80 hover:text-white hover:bg-red-500/10 transition-all font-medium text-sm border-l-3 border-transparent hover:border-red-500 active:bg-red-500/20"
                  >
                    {getNavLabel(item.label)}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 lg:hidden bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
