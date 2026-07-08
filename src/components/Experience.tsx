import { experience, sections } from "../data/content";
import { useT } from "../context/SiteContext";
import Eyebrow from "./Eyebrow";

export default function Experience() {
  const t = useT();

  return (
    <section
      id="experience"
      className="mx-auto grid max-w-[1280px] scroll-mt-28 gap-12 px-6 py-24 sm:px-12 md:grid-cols-[1fr_1.6fr] md:gap-16 md:py-36"
    >
      <div data-reveal>
        <Eyebrow number="02" label={sections.experience} className="mb-5" />
        <h2 className="m-0 text-ink" style={{ fontSize: "clamp(36px, 3.6vw, 56px)" }}>
          {t(experience.title)}
        </h2>
      </div>

      <div data-reveal className="border-t border-line pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <h3 className="m-0 text-[28px] tracking-[-0.01em] text-ink">
            {t(experience.role)} · {experience.company}
          </h3>
          <span className="font-mono text-[13px] text-muted">{t(experience.period)}</span>
        </div>
        <p className="m-0 mt-5 max-w-[640px] text-[19px] leading-[1.6] text-body">
          {t(experience.description)}
        </p>
      </div>
    </section>
  );
}
