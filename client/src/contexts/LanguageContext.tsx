import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh');

  // Initialize language from localStorage or URL
  useEffect(() => {
    // Check URL for language preference
    const pathLang = window.location.pathname.split('/')[1];
    if (pathLang === 'en' || pathLang === 'zh') {
      setLanguageState(pathLang as Language);
      localStorage.setItem('language', pathLang);
    } else {
      // Check localStorage
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang === 'en' || savedLang === 'zh') {
        setLanguageState(savedLang);
      } else {
        // Default to Chinese
        setLanguageState('zh');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update URL
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Remove old language prefix if exists
    if (pathParts[0] === 'zh' || pathParts[0] === 'en') {
      pathParts.shift();
    }
    
    // Add new language prefix
    const newPath = `/${lang}/${pathParts.join('/')}`;
    window.history.pushState({}, '', newPath);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

// Import translations for the context
import { translations } from '@/lib/translations';
