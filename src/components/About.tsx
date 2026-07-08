import { about, personal, sections } from "../data/content";
import { useT } from "../context/SiteContext";
import Eyebrow from "./Eyebrow";

export default function About() {
  const t = useT();

  return (
    <section
      id="about"
      className="mx-auto grid max-w-[1280px] scroll-mt-28 gap-12 border-t border-line px-6 py-24 sm:px-12 md:grid-cols-[1fr_1.6fr] md:gap-16 md:py-36"
    >
      <div data-reveal data-para="-0.04">
        <Eyebrow number="01" label={sections.about} className="mb-5" />
        <h2 className="m-0 text-ink" style={{ fontSize: "clamp(36px, 3.6vw, 56px)" }}>
          {t(about.title)}
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {about.paragraphs.map((para, i) => (
          <p key={i} data-reveal className="m-0 text-[20px] leading-[1.55] text-body sm:text-[22px]">
            {t(para)}
          </p>
        ))}

        <div
          data-reveal
          className="grid grid-cols-1 gap-8 border-t border-line pt-6 sm:grid-cols-2"
        >
          <div>
            <p className="m-0 mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {t(about.languagesLabel)}
            </p>
            <p className="m-0 text-[16px] leading-[1.5] text-body">{t(about.languages)}</p>
          </div>
          <div>
            <p className="m-0 mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {t(about.basedLabel)}
            </p>
            <p className="m-0 text-[16px] leading-[1.5] text-body">{personal.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
