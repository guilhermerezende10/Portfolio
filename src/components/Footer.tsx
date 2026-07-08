import { footer } from "../data/content";
import { useT } from "../context/SiteContext";
import logoWhite from "../images/logo/logo-white.png";

// Rendered inside the dark Contact section, matching the design.
export default function Footer() {
  const t = useT();

  return (
    <footer className="relative border-t border-[#222222]">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6 px-6 py-7 sm:px-12">
        <div className="flex items-center gap-3">
          <img src={logoWhite} alt="GR logo" className="block h-6 w-6" />
          <span className="text-[13px] text-[#8A8A8A]">{footer.copyright}</span>
        </div>
        <span className="font-mono text-[12px] text-[#8A8A8A]">{t(footer.builtWith)}</span>
      </div>
    </footer>
  );
}
