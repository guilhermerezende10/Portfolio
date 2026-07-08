import { education, educationSection, sections, type EducationItem } from "../data/content";
import { useT } from "../context/SiteContext";
import Eyebrow from "./Eyebrow";

function BigYear({ item }: { item: EducationItem }) {
  return (
    <p
      className="m-0 font-medium leading-none text-ink"
      style={{ fontSize: "clamp(44px, 4.6vw, 76px)", letterSpacing: "-0.03em" }}
    >
      {item.start}
      <span className="text-accent">—</span>
      {item.end}
    </p>
  );
}

function Details({ item, align = "left" }: { item: EducationItem; align?: "left" | "right" }) {
  const t = useT();
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <p className="m-0 mb-2 text-[24px] font-medium tracking-[-0.01em] text-ink">{t(item.title)}</p>
      <p className="m-0 text-[16px] text-muted">{item.place}</p>
    </div>
  );
}

const Node = () => (
  <div className="flex justify-center">
    <span className="block h-4 w-4 rounded-full border-[3px] border-accent bg-paper" />
  </div>
);

export default function Education() {
  const t = useT();

  return (
    <section
      aria-label="Education"
      className="relative overflow-clip border-t border-line px-6 py-32 sm:px-12 md:pb-44 md:pt-40"
    >
      {/* drifting decorative shapes */}
      <div
        data-para="-0.07"
        className="pointer-events-none absolute left-[10%] top-[26%] h-60 w-60 rounded-full"
        style={{ border: "1px solid rgba(232,115,12,0.3)" }}
      />
      <div
        data-para="0.1"
        className="pointer-events-none absolute bottom-[20%] right-[14%] h-3.5 w-3.5 rounded-full bg-accent opacity-45"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div data-reveal className="mb-20 text-center md:mb-[110px]">
          <Eyebrow number="04" label={sections.education} className="mb-5 flex justify-center" />
          <h2 className="m-0 text-ink" style={{ fontSize: "clamp(36px, 3.6vw, 56px)" }}>
            {t(educationSection.title)}
          </h2>
        </div>

        <div className="relative">
          {/* center rail + scroll-driven fill (desktop only) */}
          <div className="absolute left-1/2 top-0 bottom-0 -ml-px hidden w-0.5 bg-line md:block">
            <div
              data-edu-fill
              className="absolute inset-0 origin-top bg-accent"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <div className="flex flex-col gap-14 py-5 md:gap-28 md:py-10">
            {education.map((item) => (
              <div key={item.title.en}>
                {/* mobile: simple stacked block */}
                <div data-reveal className="flex flex-col gap-3 md:hidden">
                  <BigYear item={item} />
                  <Details item={item} />
                </div>

                {/* desktop: centered timeline row */}
                <div
                  data-reveal
                  className="hidden items-center md:grid md:grid-cols-[1fr_120px_1fr]"
                >
                  {item.yearLeft ? (
                    <>
                      <div data-para="-0.04" className="text-right">
                        <BigYear item={item} />
                      </div>
                      <Node />
                      <div data-para="0.05">
                        <Details item={item} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div data-para="0.05">
                        <Details item={item} align="right" />
                      </div>
                      <Node />
                      <div data-para="-0.04">
                        <BigYear item={item} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
