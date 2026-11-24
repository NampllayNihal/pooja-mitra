import { createContext, useContext, useEffect, useState } from "react";

import en from "../locales/en.json";
import te from "../locales/te.json";
import hi from "../locales/hi.json";

const LanguageContext = createContext();

const translations = {
  en,
  te,
  hi,
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("poojamitra_language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("poojamitra_language", language);
  }, [language]);

  const t = (path) => {
    const keys = path.split(".");

    let value = translations[language];

    for (const key of keys) {
      value = value?.[key];
    }

    if (value === undefined) {
      let fallback = translations.en;

      for (const key of keys) {
        fallback = fallback?.[key];
      }

      return fallback || path;
    }

    return value;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}