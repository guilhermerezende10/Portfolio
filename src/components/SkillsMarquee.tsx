import { skills } from "../data/content";

// Three identical copies so the -33.33% loop is seamless and gapless.
const loop = [...skills, ...skills, ...skills];

export default function SkillsMarquee() {
  return (
    <section
      aria-label="Skills"
      className="overflow-hidden border-y border-line bg-band py-[34px]"
    >
      <div className="marquee-track">
        {loop.map((skill, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-7 pr-7 text-[20px] font-medium tracking-[-0.01em] text-ink"
          >
            {skill}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}
