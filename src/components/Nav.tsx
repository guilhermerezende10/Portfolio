import { nav } from "../data/content";
import { useSite, useT } from "../context/SiteContext";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  const { theme, toggleTheme, lang, toggleLang } = useSite();
  const t = useT();

  return (
    <nav>
      <button onClick={() => scrollToId("hero")} aria-label="Home">
        {nav.logo}
      </button>

      <ul>
        {nav.links.map((link) => (
          <li key={link.id}>
            <button onClick={() => scrollToId(link.id)}>{t(link.label)}</button>
          </li>
        ))}
      </ul>

      <button onClick={toggleLang} aria-label="Toggle language">
        {lang.toUpperCase()}
      </button>

      <button onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "dark" ? "☾" : "☀"}
      </button>
    </nav>
  );
}
