import type { CSSProperties } from "react";
import { projects, projectsSection, sections, techColors, type Project } from "../data/content";
import { useT } from "../context/SiteContext";
import Eyebrow from "./Eyebrow";

const DEFAULT_TECH = { bg: "#111111", fg: "#FFFFFF" };

function TechPill({ tech }: { tech: string }) {
  const color = techColors[tech] ?? DEFAULT_TECH;
  return (
    <span
      className="tech-tag cursor-default rounded-full border border-[color:var(--tech-border)] px-3 py-[5px] font-mono text-[11px] text-body"
      style={{ "--tech-bg": color.bg, "--tech-fg": color.fg } as CSSProperties}
    >
      {tech}
    </span>
  );
}

function ProjectMedia({ name, image }: { name: string; image: string }) {
  return (
    <div className="project-media-frame">
      <div className="project-media-frame__inner">
        <img
          src={image}
          alt={`${name} screenshot`}
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useT();
  const imageLeft = index % 2 === 0;

  return (
    <article
      data-reveal
      className={`grid grid-cols-1 items-center gap-10 md:gap-14 ${
        imageLeft
          ? "md:[grid-template-columns:1.25fr_1fr]"
          : "md:[grid-template-columns:1fr_1.25fr]"
      }`}
    >
      <div className={imageLeft ? "" : "md:order-2"}>
        <ProjectMedia name={project.name} image={project.image} />
      </div>

      <div className={imageLeft ? "" : "md:order-1"}>
        <p className="m-0 mb-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {t(project.status)}
        </p>
        <h3 className="m-0 mb-[18px] text-[36px] tracking-[-0.02em] text-ink">
          {project.name}
        </h3>
        <p className="m-0 mb-6 text-[17px] leading-[1.6] text-body">{t(project.description)}</p>

        <div className="mb-7 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <TechPill key={tech} tech={tech} />
          ))}
        </div>

        <div className="flex gap-6">
          {project.deploy && (
            <a
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-accent pb-0.5 text-[14px] font-medium text-ink transition-colors hover:text-accent"
            >
              {t(projectsSection.liveLabel)}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-accent pb-0.5 text-[14px] font-medium text-ink transition-colors hover:text-accent"
            >
              {t(projectsSection.githubLabel)}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const t = useT();

  return (
    <section
      id="projects"
      className="mx-auto max-w-[1280px] scroll-mt-28 px-6 pb-24 pt-10 sm:px-12 md:pb-36"
    >
      <div data-reveal className="mb-16 md:mb-[72px]">
        <Eyebrow number="03" label={sections.projects} className="mb-5" />
        <h2 className="m-0 text-ink" style={{ fontSize: "clamp(36px, 3.6vw, 56px)" }}>
          {t(projectsSection.title)}
        </h2>
      </div>

      <div className="flex flex-col gap-20 md:gap-24">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
