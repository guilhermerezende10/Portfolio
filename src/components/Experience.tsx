import { experience, nav } from "../data/content";
import { useT } from "../context/SiteContext";

export default function Experience() {
  const t = useT();
  const label = nav.links.find((l) => l.id === "experience")!.label;

  return (
    <section id="experience">
      <h2>{t(label)}</h2>

      <article>
        <h3>{t(experience.role)}</h3>
        <p>
          {experience.company} — {experience.period}
        </p>
        <p>{t(experience.description)}</p>
      </article>
    </section>
  );
}
