import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "../data/content";

export type Theme = "dark" | "light";

interface SiteContextValue {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  toggleLang: () => void;
}

const THEME_KEY = "portfolio-theme";
const LANG_KEY = "portfolio-lang";

const SiteContext = createContext<SiteContextValue | undefined>(undefined);

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLight ? "light" : "dark";
}

function getInitialLang(): Lang {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === "pt" || stored === "en") return stored;

  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const value = useMemo<SiteContextValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      lang,
      toggleLang: () => setLang((l) => (l === "pt" ? "en" : "pt")),
    }),
    [theme, lang]
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

/** True if the user prefers reduced motion — check at animation start, not just once. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
