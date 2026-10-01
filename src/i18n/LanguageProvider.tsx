import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { LanguageContext } from "./useLanguage";
import type { Language } from "./useLanguage";
import { english, portuguese } from "./translations";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const t = (text: string) =>
    (language === "en" ? english[text] : portuguese[text]) ?? text;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
