import { useEffect, useRef, useState } from "react";
import { hero, personal, projects } from "../data/content";
import { useT, prefersReducedMotion } from "../context/SiteContext";

// One "line" the terminal will render, in order.
type Line =
  | { type: "command"; text: string }
  | { type: "output"; text: string }
  | { type: "projectList" };

const TYPE_SPEED_MS = 35;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const t = useT();

  const lines: Line[] = [
    { type: "command", text: hero.terminal.whoamiCommand },
    { type: "output", text: t(hero.terminal.whoamiOutput) },
    { type: "command", text: hero.terminal.statusCommand },
    { type: "output", text: t(hero.terminal.statusOutput) },
    { type: "command", text: hero.terminal.lsCommand },
    { type: "projectList" },
  ];

  // How many lines are fully revealed, and how much of the current
  // command line has been typed so far.
  const [revealedCount, setRevealedCount] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setRevealedCount(lines.length);
      return;
    }

    setRevealedCount(0);
    setTypedChars(0);

    let cancelled = false;

    function runLine(index: number) {
      if (cancelled || index >= lines.length) return;
      const line = lines[index];

      if (line.type === "command") {
        let chars = 0;
        const typeNext = () => {
          if (cancelled) return;
          chars += 1;
          setTypedChars(chars);
          if (chars < line.text.length) {
            timeoutRef.current = setTimeout(typeNext, TYPE_SPEED_MS);
          } else {
            timeoutRef.current = setTimeout(() => {
              setRevealedCount(index + 1);
              setTypedChars(0);
              runLine(index + 1);
            }, 200);
          }
        };
        typeNext();
      } else {
        timeoutRef.current = setTimeout(() => {
          setRevealedCount(index + 1);
          runLine(index + 1);
        }, 300);
      }
    }

    runLine(0);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const currentLine = lines[revealedCount];
  const isTypingCommand = currentLine?.type === "command";

  return (
    <section id="hero">
      <div role="group" aria-label="terminal">
        {lines.slice(0, revealedCount).map((line, i) => (
          <TerminalLine key={i} line={line} />
        ))}

        {isTypingCommand && (
          <TerminalLine
            line={{ type: "command", text: currentLine.text.slice(0, typedChars) }}
          />
        )}
      </div>

      <div>
        <button onClick={() => scrollToId("projects")}>{t(hero.viewProjectsButton)}</button>
        <a href={personal.resumeFile} download>
          {t(hero.downloadResumeButton)}
        </a>
      </div>
    </section>
  );
}

function TerminalLine({ line }: { line: Line }) {
  if (line.type === "command") {
    return (
      <p>
        <span aria-hidden="true">$ </span>
        {line.text}
      </p>
    );
  }

  if (line.type === "output") {
    return <p>{line.text}</p>;
  }

  // projectList
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.name}>
          <button onClick={() => scrollToId("projects")}>{project.name}</button>
        </li>
      ))}
    </ul>
  );
}
