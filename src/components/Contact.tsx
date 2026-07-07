import { contact, personal } from "../data/content";
import { useT } from "../context/SiteContext";

export default function Contact() {
  const t = useT();

  return (
    <section id="contact">
      <h2>{t(contact.heading)}</h2>

      <p>{t(contact.pitch)}</p>

      <ul>
        <li>
          <span>{t(contact.emailLabel)}:</span>{" "}
          <a href={`mailto:${personal.email}`}>{personal.email}</a>
        </li>
        <li>
          <a href={personal.github}>GitHub</a>
        </li>
        <li>
          <a href={personal.linkedin}>LinkedIn</a>
        </li>
      </ul>
    </section>
  );
}
