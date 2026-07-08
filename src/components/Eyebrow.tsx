import { useT } from "../context/SiteContext";
import type { Bilingual } from "../data/content";

/** The "01 — About" section marker: mono, orange, wide-tracked. */
export default function Eyebrow({
  number,
  label,
  className = "",
}: {
  number: string;
  label: Bilingual;
  className?: string;
}) {
  const t = useT();
  return (
    <p
      className={`m-0 font-mono text-[11px] uppercase tracking-[0.22em] text-accent ${className}`}
    >
      {number} — <span>{t(label)}</span>
    </p>
  );
}
