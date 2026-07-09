import { hero, personal } from "../data/content";
import { useT } from "../context/SiteContext";

export default function Hero() {
  const t = useT();

  return (
    <header
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-32 text-center sm:px-12"
      style={{
        overflow: "clip",
        background: "var(--hero-bg)",
      }}
    >
      {/* 3D dome */}
      <div
        data-parallax="0.5"
        className="pointer-events-none absolute left-1/2 top-[4vh] h-[112vw] w-[112vw] rounded-full"
        style={{
          marginLeft: "-56vw",
          background: "var(--hero-dome)",
          boxShadow: "var(--hero-dome-shadow)",
        }}
      />
      {/* soft ambient glow bottom-left, drifts slower */}
      <div
        data-parallax="0.25"
        className="pointer-events-none absolute bottom-[-30vh] left-[-20vw] h-[70vh] w-[70vw]"
        style={{
          background: "var(--hero-glow)",
        }}
      />
      {/* fade into page background at the bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[22vh]"
        style={{ background: "var(--hero-fade)" }}
      />

      <h1
        data-hero="0"
        className="relative z-[2] m-0 leading-[1.05] text-ink"
        style={{ fontSize: "clamp(44px, 6.2vw, 92px)", letterSpacing: "-0.025em" }}
      >
        {t(hero.headline)}
      </h1>

      <div className="relative flex max-w-[1100px] flex-col items-center">
        <p
          data-hero="1"
          className="m-0 mt-3 text-[24px] font-medium leading-[1.1] tracking-[-0.02em] text-faint sm:text-[31px]"
        >
          {t(hero.subhead)}
        </p>

        <div data-hero="2" className="mt-14 flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-ink px-7 py-3.5 text-[13px] uppercase tracking-[0.1em] text-paper transition-colors hover:bg-accent"
          >
            {t(hero.viewProjectsButton)}
          </a>
          <a
            href={t(personal.resumeFile)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[color:var(--control-border)] px-7 py-3.5 text-[13px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink"
          >
            {t(hero.downloadResumeButton)}
          </a>
        </div>
      </div>

      <div data-hero="3" className="absolute inset-x-0 bottom-9 flex justify-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {t(hero.scrollHint)}
        </span>
      </div>
    </header>
  );
}
