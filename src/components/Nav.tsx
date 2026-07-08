import { nav } from "../data/content";
import { useSite, useT } from "../context/SiteContext";
import logoBlack from "../images/logo/logo-black.png";

const FLAG_BR = "https://flagcdn.com/w80/br.png";
const FLAG_US = "https://flagcdn.com/w80/us.png";

export default function Nav() {
  const { lang, toggleLang } = useSite();
  const t = useT();

  // The flag shows the language you'd switch TO: EN → BR flag, PT → US flag.
  const flagSrc = lang === "en" ? FLAG_BR : FLAG_US;

  return (
    <nav
      className="fixed top-4 left-6 right-6 z-50 flex items-center justify-between rounded-full border border-white/60 px-4 py-3 sm:px-7"
      style={{
        background: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(18px) saturate(1.4)",
        WebkitBackdropFilter: "blur(18px) saturate(1.4)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
      }}
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
      </div>
    </nav>
  );
}
