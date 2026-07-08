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
        background: "linear-gradient(160deg, #F7F7F7 0%, #F1F1F1 60%, #E9E9EA 100%)",
      }}
    >
      {/* 3D dome */}
      <div
        data-parallax="0.5"
        className="pointer-events-none absolute left-1/2 top-[4vh] h-[112vw] w-[112vw] rounded-full"
        style={{
          marginLeft: "-56vw",
          background:
            "radial-gradient(circle at 38% 20%, #FFFFFF 0%, #FCFCFC 30%, #F2F2F2 48%, #E3E3E4 62%, #CFCFD1 76%, #BFBFC2 88%, #B7B7BA 100%)",
          boxShadow: "0 80px 160px rgba(0,0,0,0.10), 0 20px 60px rgba(0,0,0,0.06)",
        }}
      />
      {/* soft ambient glow bottom-left, drifts slower */}
      <div
        data-parallax="0.25"
        className="pointer-events-none absolute bottom-[-30vh] left-[-20vw] h-[70vh] w-[70vw]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%)",
        }}
      />
      {/* fade into page background at the bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[22vh]"
        style={{ background: "linear-gradient(rgba(244,244,244,0), #F4F4F4)" }}
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
            className="rounded-full bg-ink px-7 py-3.5 text-[13px] uppercase tracking-[0.1em] text-white transition-colors hover:bg-accent"
          >
            {t(hero.viewProjectsButton)}
          </a>
          <a
            href={personal.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#C9C9C9] px-7 py-3.5 text-[13px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-black"
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
