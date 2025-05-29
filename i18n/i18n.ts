
import { useState, useEffect, useCallback } from 'react';
import enTranslations from './locales/en.js';
import faTranslations from './locales/fa.js';
import { WeatherCondition } from '../types'; // For typing tCondition

export type Language = 'en' | 'fa';
// Use the type of one of the imported translation objects directly
export type Translations = typeof enTranslations;

const translationsData: Record<Language, Translations> = {
  en: enTranslations,
  fa: faTranslations,
};

export const useTranslations = (initialLanguage: Language = 'en') => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [currentTranslations, setCurrentTranslations] = useState<Translations>(translationsData[initialLanguage]);

  useEffect(() => {
    setCurrentTranslations(translationsData[language]);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  const t = useCallback((key: keyof Translations, params?: Record<string, string | number>): string => {
    let translation = currentTranslations[key] || translationsData.en[key]; // Fallback to English if key missing in current lang
    
    if (translation === undefined) {
        console.warn(`Translation key "${String(key)}" not found.`);
        return String(key); // Fallback to key itself if not found in English either
    }

    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        const regex = new RegExp(`{{${paramKey}}}`, 'g');
        translation = (translation as string).replace(regex, String(value));
      });
    }
    return translation as string;
  }, [currentTranslations]);
  
  const tCondition = useCallback((condition: WeatherCondition): string => {
    // Convert enum value "Partly Cloudy" to "PartlyCloudy" for key matching
    const conditionKeySuffix = condition.replace(/\s+/g, '');
    const conditionKey = `WeatherCondition_${conditionKeySuffix}` as keyof Translations;
    
    const translated = t(conditionKey);
    // If the translation is the key itself (meaning not found via t's fallback mechanism), return the original condition enum value.
    if (translated === (conditionKey as string) || !currentTranslations[conditionKey]) { 
        return condition; // Return original enum value
    }
    return translated;
  }, [t, currentTranslations]);

  return { language, setLanguage, t, tCondition };
};
