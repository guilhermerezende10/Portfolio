/* eslint-disable react-refresh/only-export-components --
   The SiteProvider component is intentionally colocated with its consumer hooks
   (useSite, useT) — the standard React context pattern. This only relaxes
   Fast Refresh for this rarely-edited module; splitting hooks into a separate
   file would ripple import changes across every consumer for no runtime gain. */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { meta, type Lang } from "../data/content";

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

    // Keep the tab title and meta description in sync with the language.
    document.title = meta.title[lang];
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", meta.description[lang]);
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
