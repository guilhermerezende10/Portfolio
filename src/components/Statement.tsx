import { statement } from "../data/content";
import { useT } from "../context/SiteContext";

export default function Statement() {
  const t = useT();

  return (
    <section aria-label="Statement" className="relative overflow-hidden bg-dark">
      <div
        data-parallax="0.12"
        className="pointer-events-none absolute inset-x-0 -inset-y-[20%]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 60%, rgba(232,115,12,0.14), rgba(0,0,0,0) 70%)",
        }}
      />
      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-10 px-6 py-32 sm:px-12 md:py-44">
        <div data-reveal className="h-0.5 w-16 bg-accent" />
        <h2
          data-reveal
          data-para="0.06"
          className="m-0 max-w-[900px] leading-[1.15] text-white"
          style={{ fontSize: "clamp(34px, 4.2vw, 62px)" }}
        >
          {t(statement.heading)}
        </h2>
        <p
          data-reveal
          data-para="0.12"
          className="m-0 max-w-[560px] text-[20px] leading-[1.5] text-[#8A8A8A]"
        >
          {t(statement.sub)}
        </p>
      </div>
    </section>
  );
}
