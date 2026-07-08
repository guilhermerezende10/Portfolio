import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "../data/content";

interface SiteContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LANG_KEY = "portfolio-lang";

const SiteContext = createContext<SiteContextValue | undefined>(undefined);

function getInitialLang(): Lang {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === "pt" || stored === "en") return stored;

  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const value = useMemo<SiteContextValue>(
    () => ({
      lang,
      toggleLang: () => setLang((l) => (l === "pt" ? "en" : "pt")),
    }),
    [lang]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within a SiteProvider");
  return ctx;
}

/** Convenience hook: returns the string for the current language from a Bilingual object. */
export function useT() {
  const { lang } = useSite();
  return (bilingual: { pt: string; en: string }) => bilingual[lang];
}
