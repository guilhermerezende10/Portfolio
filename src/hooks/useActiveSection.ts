import { useEffect, useState } from "react";

/**
 * Tracks which page section currently sits under a thin band across the
 * viewport's vertical center and returns its id, so the nav can highlight the
 * matching link. Returns "" when no section is in the band (e.g. over the hero
 * or between sections) — callers treat that as "no active link", which is the
 * graceful-degradation fallback.
 *
 * This is a standalone observer dedicated to nav tracking: it deliberately does
 * not touch the single-pass reveal/parallax observers in useSiteAnimations, so
 * the two never fight over the same elements. It also runs regardless of
 * prefers-reduced-motion, since the highlight is a static orientation cue rather
 * than an animation.
 *
 * `ids` must be a stable reference (e.g. a module-level constant); the observer
 * re-subscribes whenever it changes.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Remembers each observed section's current in-band state so a single
    // callback (which only reports the sections that changed) can still resolve
    // the winner across all of them.
    const inBand = new Map<string, boolean>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inBand.set(entry.target.id, entry.isIntersecting);
        });
        // Pick the first section, in the given order, currently in the band.
        setActive(ids.find((id) => inBand.get(id)) ?? "");
      },
      // Collapse the viewport to a thin band at its vertical center so, at any
      // scroll position, at most one section straddles it — the one on screen.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}
