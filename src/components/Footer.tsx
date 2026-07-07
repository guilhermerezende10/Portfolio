import { footer } from "../data/content";
import { useT } from "../context/SiteContext";

export default function Footer() {
  const t = useT();

  return (
    <footer>
      <p>{t(footer.text)}</p>
    </footer>
  );
}
