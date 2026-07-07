import { about, education, skills, nav } from "../data/content";
import { useT } from "../context/SiteContext";

export default function About() {
  const t = useT();
  const label = nav.links.find((l) => l.id === "about")!.label;

  return (
    <section id="about">
      <h2>{t(label)}</h2>

      <p>{t(about.bio)}</p>

      <p>
        <strong>{t(about.languagesLabel)}:</strong> {t(about.languages)}
      </p>

      <div>
        <div>
          <h3>{t(about.skillsLabel)}</h3>
          <ul>
            {skills.map((skill) => (
              <li key={skill.name}>
                {skill.name} — {t(skill.level)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>{t(about.educationLabel)}</h3>
          <ul>
            {education.map((item) => (
              <li key={item.title.en}>
                <span>{item.period}</span> — {t(item.title)}, {item.place}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
