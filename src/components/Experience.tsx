import { useState } from "react";
import { experiences, experienceSection, sections } from "../data/content";
import { useT } from "../context/SiteContext";
import Eyebrow from "./Eyebrow";

/**
 * Company mark, painted in a palette token so it follows both themes without a
 * chip behind it.
 *
 * The file is monochrome and fills with `currentColor`, but an SVG referenced
 * through <img> renders in its own isolated document and never sees the page's
 * `color` — it would paint black on the dark theme's near-black page. So the
 * mark is drawn here instead: the wrapper fills its own box with `currentColor`
 * (`bg-current` off `text-muted`, the same tier as the card's period) through a
 * mask cut to the same file, and the <img> inside is held at opacity 0 purely to
 * contribute two things CSS masks can't: the file's intrinsic aspect ratio — so
 * a fixed height with auto width sizes wide wordmarks and square marks alike —
 * and a load-failure signal.
 *
 * If the file is missing the whole mark is dropped: no broken glyph, no reserved
 * space, so the card falls back to its logo-less layout.
 */
const MASK = {
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskSize: "contain",
  WebkitMaskSize: "contain",
} as const;

function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <span
      className="mb-4 inline-block bg-current text-muted"
      style={{ ...MASK, maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
    >
      {/* Eager on purpose: the wrapper's width comes from this file's aspect
          ratio, so deferring the load would leave the mark at zero width. */}
      <img
        src={src}
        alt={alt}
        decoding="async"
        className="h-[22px] w-auto opacity-0"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

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
          {t(experienceSection.title)}
        </h2>
      </div>

      <div className="flex flex-col gap-12">
        {experiences.map((job) => (
          <div key={job.id} data-reveal className="border-t border-line pt-8">
            {/* Only rendered when the entry carries a logo — no placeholder,
                no reserved space. */}
            {job.logo && <CompanyLogo src={job.logo.src} alt={job.logo.alt} />}

            <div className="flex flex-wrap items-baseline justify-between gap-6">
              <h3 className="m-0 flex flex-wrap items-center gap-3 text-[28px] tracking-[-0.01em] text-ink">
                <span>
                  {t(job.role)} · {job.company}
                </span>
                {job.current && (
                  <span className="rounded-full border border-accent px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {t(experienceSection.currentLabel)}
                  </span>
                )}
              </h3>
              <span className="font-mono text-[13px] text-muted">{t(job.period)}</span>
            </div>

            {/* Team sits on its own line rather than inside the company string,
                which kept the heading to one long unbreakable phrase on mobile.
                Same mono/muted tier as the period beside it. */}
            {job.team && (
              <p className="m-0 mt-2 font-mono text-[13px] text-muted">{t(job.team)}</p>
            )}
            <p className="m-0 mt-5 max-w-[640px] text-[19px] leading-[1.6] text-body">
              {t(job.description)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
