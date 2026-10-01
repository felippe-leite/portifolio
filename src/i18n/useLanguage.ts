import { createContext, useContext } from "react";

export type Language = "en" | "pt";

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage requires LanguageProvider");
  return context;
}
