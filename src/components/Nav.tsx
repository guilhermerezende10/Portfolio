import { useCallback, useEffect, useRef, useState } from "react";
import { nav } from "../data/content";
import { useSite, useT } from "../context/SiteContext";
import { useActiveSection } from "../hooks/useActiveSection";
import logoBlack from "../images/logo/logo-black.png";
import logoWhite from "../images/logo/logo-white.png";

// Stable id list for the active-section observer. Derived once at module load
// (ids never change; only their translated labels do), so the hook's effect
// isn't torn down and rebuilt on every render.
const NAV_IDS = nav.links.map((link) => link.id);

const FLAG_BR = "https://flagcdn.com/w80/br.png";
const FLAG_US = "https://flagcdn.com/w80/us.png";

// Frosted-glass surface shared by the nav pill and the mobile menu panel.
// The colors come from theme variables (see index.css) so the pill turns to
// dark glass in dark mode; the blur/border stay put.
const glassStyle: React.CSSProperties = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(18px) saturate(1.4)",
  WebkitBackdropFilter: "blur(18px) saturate(1.4)",
  boxShadow: "var(--glass-shadow)",
  border: "1px solid var(--glass-border)",
};

export default function Nav() {
  const { lang, toggleLang, theme, toggleTheme } = useSite();
  const t = useT();

  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Id of the section currently on screen ("" when none), used to highlight the
  // matching nav link as the user scrolls.
  const activeId = useActiveSection(NAV_IDS);

  // The flag shows the language you'd switch TO: EN → BR flag, PT → US flag.
  const flagSrc = lang === "en" ? FLAG_BR : FLAG_US;

  // Like the flag, the toggle advertises the theme you'd switch TO: a moon in
  // light mode, a sun in dark mode.
  const themeLabel =
    theme === "light"
      ? lang === "pt"
        ? "Ativar tema escuro"
        : "Switch to dark theme"
      : lang === "pt"
        ? "Ativar tema claro"
        : "Switch to light theme";

  const closeMenu = useCallback(() => {
    setOpen(false);
    // Unlock scroll synchronously so a link's fragment jump (fired right after
    // this click) isn't suppressed by the still-locked body for a frame.
    document.body.style.overflow = "";
    triggerRef.current?.focus();
  }, []);

  // While the menu is open: lock background scroll, move focus inside, trap Tab,
  // close on Escape, and collapse if the viewport grows past the `sm` breakpoint.
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []
      );

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const mq = window.matchMedia("(min-width: 640px)");
    const onViewportChange = () => {
      if (mq.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onViewportChange);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onViewportChange);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeMenu]);

  const menuLabel = open
    ? lang === "pt"
      ? "Fechar menu"
      : "Close menu"
    : lang === "pt"
      ? "Abrir menu"
      : "Open menu";

  return (
    <>
      <nav
        className="fixed top-4 left-6 right-6 z-50 flex items-center justify-between rounded-full px-4 py-3 sm:px-7"
        style={glassStyle}
      >
        <a href="#top" className="flex items-center gap-3">
          <img
            src={theme === "dark" ? logoWhite : logoBlack}
            alt="GR logo"
            className="block h-[30px] w-[30px]"
          />
        </a>

        <div className="flex items-center gap-5 sm:gap-9">
          {nav.links.map((link) => {
            const isActive = link.id === activeId;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`nav-link hidden py-1.5 text-[12px] uppercase tracking-[0.12em] text-body sm:inline-block${
                  isActive ? " nav-link--active" : ""
                }`}
              >
                {t(link.label)}
              </a>
            );
          })}

          <button
            type="button"
            onClick={toggleLang}
            title="Switch language / Mudar idioma"
            className="flex h-[34px] w-[34px] flex-none cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[color:var(--control-border)] p-0 transition-colors hover:border-ink"
          >
            <img
              src={flagSrc}
              alt="Switch language / Mudar idioma"
              className="block h-full w-full object-cover"
            />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            title={themeLabel}
            aria-label={themeLabel}
            className="flex h-[34px] w-[34px] flex-none cursor-pointer items-center justify-center rounded-full border border-[color:var(--control-border)] p-0 text-ink transition-colors hover:border-ink"
          >
            {theme === "light" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            )}
          </button>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => (open ? closeMenu() : setOpen(true))}
            aria-label={menuLabel}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-[34px] w-[34px] flex-none cursor-pointer items-center justify-center rounded-full border border-[color:var(--control-border)] p-0 text-ink transition-colors hover:border-ink sm:hidden"
          >
            {open ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 sm:hidden"
            aria-hidden="true"
            onClick={closeMenu}
          />
          <div
            id="mobile-menu"
            ref={menuRef}
            className="mobile-menu-panel fixed left-6 right-6 top-[84px] z-50 flex flex-col gap-1 rounded-3xl p-3 sm:hidden"
            style={glassStyle}
          >
            {nav.links.map((link) => {
              const isActive = link.id === activeId;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  aria-current={isActive ? "location" : undefined}
                  className={`rounded-2xl px-4 py-3 text-[13px] uppercase tracking-[0.12em] transition-colors hover:bg-[var(--glass-hover)] hover:text-ink${
                    isActive ? " bg-[var(--glass-hover)] text-ink" : " text-body"
                  }`}
                >
                  {t(link.label)}
                </a>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
