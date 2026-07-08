import { useCallback, useEffect, useRef, useState } from "react";
import { nav } from "../data/content";
import { useSite, useT } from "../context/SiteContext";
import logoBlack from "../images/logo/logo-black.png";

const FLAG_BR = "https://flagcdn.com/w80/br.png";
const FLAG_US = "https://flagcdn.com/w80/us.png";

// Frosted-glass surface shared by the nav pill and the mobile menu panel.
const glassStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.45)",
  backdropFilter: "blur(18px) saturate(1.4)",
  WebkitBackdropFilter: "blur(18px) saturate(1.4)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
};

export default function Nav() {
  const { lang, toggleLang } = useSite();
  const t = useT();

  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // The flag shows the language you'd switch TO: EN → BR flag, PT → US flag.
  const flagSrc = lang === "en" ? FLAG_BR : FLAG_US;

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
        className="fixed top-4 left-6 right-6 z-50 flex items-center justify-between rounded-full border border-white/60 px-4 py-3 sm:px-7"
        style={glassStyle}
      >
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logoBlack}
            alt="GR logo"
            className="block h-[30px] w-[30px]"
          />
        </a>

        <div className="flex items-center gap-5 sm:gap-9">
          {nav.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav-link hidden py-1.5 text-[12px] uppercase tracking-[0.12em] text-body sm:inline-block"
            >
              {t(link.label)}
            </a>
          ))}

          <button
            type="button"
            onClick={toggleLang}
            title="Switch language / Mudar idioma"
            className="flex h-[34px] w-[34px] flex-none cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[#C9C9C9] p-0 transition-colors hover:border-black"
          >
            <img
              src={flagSrc}
              alt="Switch language / Mudar idioma"
              className="block h-full w-full object-cover"
            />
          </button>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => (open ? closeMenu() : setOpen(true))}
            aria-label={menuLabel}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-[34px] w-[34px] flex-none cursor-pointer items-center justify-center rounded-full border border-[#C9C9C9] p-0 text-ink transition-colors hover:border-black sm:hidden"
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
            className="mobile-menu-panel fixed left-6 right-6 top-[84px] z-50 flex flex-col gap-1 rounded-3xl border border-white/60 p-3 sm:hidden"
            style={glassStyle}
          >
            {nav.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={closeMenu}
                className="rounded-2xl px-4 py-3 text-[13px] uppercase tracking-[0.12em] text-body transition-colors hover:bg-white/40 hover:text-ink"
              >
                {t(link.label)}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
}
