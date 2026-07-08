import { contact, personal, sections } from "../data/content";
import { useT } from "../context/SiteContext";
import Footer from "./Footer";

export default function Contact() {
  const t = useT();

  const socialClass =
    "text-[13px] uppercase tracking-[0.12em] text-[#8A8A8A] transition-colors hover:text-white";

  return (
    <section id="contact" className="relative scroll-mt-28 overflow-hidden bg-dark">
      <div
        data-parallax="0.1"
        className="pointer-events-none absolute -inset-x-[10%] -inset-y-[30%]"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 30% 30%, rgba(232,115,12,0.12), rgba(0,0,0,0) 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-12 px-6 pb-28 pt-40 sm:px-12">
        <p
          data-reveal
          className="m-0 font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
        >
          05 — <span>{t(sections.contact)}</span>
        </p>

        <h2
          data-reveal
          data-para="0.06"
          className="m-0 tracking-[-0.025em] text-white"
          style={{ fontSize: "clamp(40px, 5vw, 80px)" }}
        >
          {t(contact.title)}
        </h2>

        <a
          data-reveal
          href={`mailto:${personal.email}`}
          className="self-start border-b-2 border-accent pb-1.5 font-medium tracking-[-0.01em] text-white transition-colors hover:text-accent"
          style={{ fontSize: "clamp(18px, 2.4vw, 32px)" }}
        >
          {personal.email}
        </a>

        <div data-reveal className="flex flex-wrap gap-9 pt-6">
          <a href={personal.github} target="_blank" rel="noopener noreferrer" className={socialClass}>
            {t(contact.githubLabel)}
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={socialClass}
          >
            {t(contact.linkedinLabel)}
          </a>
          <a
            href={personal.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className={socialClass}
          >
            {t(contact.resumeLabel)}
          </a>
        </div>
      </div>

      <Footer />
    </section>
  );
}
