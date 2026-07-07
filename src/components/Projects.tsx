import { projects, nav } from "../data/content";
import { useT } from "../context/SiteContext";

export default function Projects() {
  const t = useT();
  const label = nav.links.find((l) => l.id === "projects")!.label;

  return (
    <section id="projects">
      <h2>{t(label)}</h2>

      <div>
        {projects.map((project) => (
          <article key={project.name}>
            <h3>{project.name}</h3>
            <p>{t(project.status)}</p>
            <p>{t(project.description)}</p>

            <ul>
              {project.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            <div>
              {project.github && <a href={project.github}>GitHub</a>}
              {project.deploy && <a href={project.deploy}>Deploy</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
