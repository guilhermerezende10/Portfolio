import { skills } from "../data/content";

// One copy of the skill pills. `display: contents` (Tailwind `contents`) makes
// the wrapper transparent to flex layout, so the three copies still line up as
// one continuous row. Only the first copy is exposed to assistive tech; the two
// decorative duplicates are hidden with aria-hidden so a screen reader announces
// each skill once instead of three times.
function SkillsCopy({ decorative = false }: { decorative?: boolean }) {
  return (
    <span className="contents" aria-hidden={decorative || undefined}>
      {skills.map((skill, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-7 pr-7 text-[20px] font-medium tracking-[-0.01em] text-ink"
        >
          {skill}
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      ))}
    </span>
  );
}

export default function SkillsMarquee() {
  return (
    <section
      aria-label="Skills"
      className="overflow-hidden border-y border-line bg-band py-[34px]"
    >
      {/* Three identical copies so the -33.33% loop is seamless and gapless. */}
      <div className="marquee-track">
        <SkillsCopy />
        <SkillsCopy decorative />
        <SkillsCopy decorative />
      </div>
    </section>
  );
}
