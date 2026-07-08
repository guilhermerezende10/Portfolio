// Centralized bilingual content for the whole site.
// Components should never hardcode copy — pull everything from here.
// Copy mirrors the "Portfolio A · Bricolage" design one-to-one.

export type Lang = "pt" | "en";

export interface Bilingual {
  pt: string;
  en: string;
}

export const personal = {
  name: "Guilherme Rezende",
  role: {
    pt: "Desenvolvedor de Software | React",
    en: "Software Developer | React",
  } satisfies Bilingual,
  email: "rezendeguilherme733@gmail.com",
  github: "https://github.com/guilhermerezende10",
  linkedin: "https://www.linkedin.com/in/guilherme-rezende-silva-518297235/",
  location: "São Paulo, SP, Brazil",
  resumeFile: "/guilherme_rezende_resume.pdf",
};

// Document-level metadata (browser tab title + meta description). Kept bilingual
// so it can follow the language toggle. The English values mirror the static
// defaults in index.html, which cover first paint before React mounts.
export const meta = {
  title: {
    pt: "Guilherme Rezende — Desenvolvedor de Software",
    en: "Guilherme Rezende — Software Developer",
  } satisfies Bilingual,
  description: {
    pt: "Guilherme Rezende — Desenvolvedor de Software (React/TypeScript). Aberto a oportunidades de estágio em front-end e full stack.",
    en: "Guilherme Rezende — Software Developer (React/TypeScript). Open to front-end and full-stack internship opportunities.",
  } satisfies Bilingual,
};

export const sections = {
  about: { pt: "Sobre", en: "About" } satisfies Bilingual,
  experience: { pt: "Experiência", en: "Experience" } satisfies Bilingual,
  projects: { pt: "Projetos", en: "Projects" } satisfies Bilingual,
  education: { pt: "Educação", en: "Education" } satisfies Bilingual,
  contact: { pt: "Contato", en: "Contact" } satisfies Bilingual,
};

export const nav = {
  links: [
    { id: "about", label: sections.about },
    { id: "experience", label: sections.experience },
    { id: "projects", label: sections.projects },
    { id: "contact", label: sections.contact },
  ],
};

export const hero = {
  headline: {
    pt: "Guilherme Rezende",
    en: "Guilherme Rezende",
  } satisfies Bilingual,
  subhead: {
    pt: "Desenvolvedor - React & TypeScript.",
    en: "Developer — React & TypeScript.",
  } satisfies Bilingual,
  viewProjectsButton: {
    pt: "Ver projetos",
    en: "View projects",
  } satisfies Bilingual,
  downloadResumeButton: {
    pt: "Baixar currículo",
    en: "Download resume",
  } satisfies Bilingual,
  scrollHint: {
    pt: "role para explorar",
    en: "scroll to explore",
  } satisfies Bilingual,
};

export const about = {
  title: { pt: "Olá.", en: "Hello." } satisfies Bilingual,
  paragraphs: [
    {
      pt: "Estudante do segundo período de Ciência da Computação na Universidade Presbiteriana Mackenzie, formado em Desenvolvimento de Sistemas pela ETEC. Experiência prática no desenvolvimento de aplicações web com React e integração com APIs.",
      en: "Second-semester Computer Science student at Universidade Presbiteriana Mackenzie, graduated in Systems Development from ETEC. Practical experience building web applications with React and API integration.",
    },
    {
      pt: "Buscando oportunidade de estágio para aplicar e expandir conhecimentos em desenvolvimento front-end e full stack.",
      en: "Looking for an internship to apply and grow front-end and full-stack skills.",
    },
  ] satisfies Bilingual[],
  languagesLabel: { pt: "Idiomas", en: "Languages" } satisfies Bilingual,
  languages: {
    pt: "Inglês Avançado/Fluente; Português Nativo",
    en: "English Advanced/Fluent; Portuguese Native",
  } satisfies Bilingual,
  basedLabel: { pt: "Base", en: "Based in" } satisfies Bilingual,
};

export const skills: string[] = [
  "React",
  "TypeScript",
  "JavaScript",
  "Git & GitHub",
  "HTML5 & CSS3",
  "Tailwind CSS",
  "Python",
  "Claude Code",
];

export const statement = {
  heading: {
    pt: "Aberto a oportunidades de estágio em desenvolvimento front-end e full stack.",
    en: "Open to front-end and full-stack internship opportunities.",
  } satisfies Bilingual,
  sub: {
    pt: "Atualmente desenvolvendo em produção na toLearn — e pronto para o próximo desafio.",
    en: "Currently shipping production features at toLearn — and ready for the next challenge.",
  } satisfies Bilingual,
};

export const experience = {
  title: { pt: "Onde trabalho.", en: "Where I work." } satisfies Bilingual,
  role: {
    pt: "Desenvolvedor Full Stack",
    en: "Full Stack Developer",
  } satisfies Bilingual,
  company: "toLearn",
  period: {
    pt: "03/2026 — presente",
    en: "03/2026 — present",
  } satisfies Bilingual,
  description: {
    pt: "Desenvolvimento de funcionalidades frontend em React/TypeScript para plataforma educacional com IA adaptativa, incluindo personalização de trilhas, ferramentas interativas de aprendizagem e gamificação.",
    en: "Frontend feature development in React/TypeScript for an adaptive-AI educational platform, including learning-path personalization, interactive learning tools, and gamification.",
  } satisfies Bilingual,
};

import docgenScreenshot from "../images/projects/docgen.png";
import tolearnScreenshot from "../images/projects/tolearn.png";
import fitmetaScreenshot from "../images/projects/fitmeta.png";

export interface Project {
  name: string;
  status: Bilingual;
  tech: string[];
  github?: string;
  deploy?: string;
  description: Bilingual;
  image: string;
}

export const projects: Project[] = [
  {
    name: "Docgen",
    status: { pt: "Projeto pessoal", en: "Personal project" },
    tech: ["React", "TypeScript", "Vite", "Ollama", "Vitest"],
    github: "https://github.com/guilhermerezende10/documentation-creator",
    description: {
      pt: "Web app que recebe código-fonte, detecta a linguagem automaticamente e gera documentação técnica estruturada via LLM local — sem cloud ou API key.",
      en: "Web app that ingests source code, auto-detects the language, and generates structured technical documentation via a local LLM — no cloud or API key required.",
    },
    image: docgenScreenshot,
  },
  {
    name: "toLearn",
    status: {
      pt: "Repositório privado — trabalho atual",
      en: "Private repository — current work",
    },
    tech: ["React", "TypeScript"],
    description: {
      pt: "Plataforma educacional com IA adaptativa. Desenvolvimento de funcionalidades frontend incluindo personalização de trilhas de aprendizagem, ferramentas interativas e gamificação.",
      en: "Adaptive-AI educational platform. Frontend feature development including learning-path personalization, interactive learning tools, and gamification.",
    },
    image: tolearnScreenshot,
  },
  {
    name: "FitMeta",
    status: {
      pt: "Projeto de conclusão de curso (TCC)",
      en: "Capstone project (TCC)",
    },
    tech: ["React", "TypeScript", "Supabase", "React Query", "Tailwind"],
    github: "https://github.com/guilhermerezende10/FitMeta",
    deploy: "https://fitmeta.com.br",
    description: {
      pt: "Aplicação web para gerenciamento de treinos com autenticação e CRUD integrado ao banco. Controle de rotas privadas, gerenciamento de estado global e tratamento de requisições assíncronas.",
      en: "Training-management web app with authentication and database-backed CRUD. Private route control, global state management, and async request handling.",
    },
    image: fitmetaScreenshot,
  },
];

export const projectsSection = {
  title: {
    pt: "Trabalhos selecionados.",
    en: "Selected work.",
  } satisfies Bilingual,
  liveLabel: { pt: "Ver site ↗", en: "Live site ↗" } satisfies Bilingual,
  githubLabel: { pt: "GitHub ↗", en: "GitHub ↗" } satisfies Bilingual,
};

export interface EducationItem {
  start: string;
  end: string;
  title: Bilingual;
  place: string;
  yearLeft: boolean;
}

export const educationSection = {
  title: {
    pt: "O caminho até aqui.",
    en: "The path so far.",
  } satisfies Bilingual,
};

export const education: EducationItem[] = [
  {
    start: "2026",
    end: "29",
    title: {
      pt: "Bacharel em Ciência da Computação (em andamento)",
      en: "BSc Computer Science (in progress)",
    },
    place: "Universidade Presbiteriana Mackenzie",
    yearLeft: true,
  },
  {
    start: "2023",
    end: "25",
    title: {
      pt: "Técnico em Desenvolvimento de Sistemas",
      en: "Technical Degree in Systems Development",
    },
    place: "ETEC de Praia Grande",
    yearLeft: false,
  },
  {
    start: "2022",
    end: "26",
    title: {
      pt: "Inglês como segundo idioma",
      en: "English as a second language",
    },
    place: "CNA Idiomas",
    yearLeft: true,
  },
];

export const contact = {
  title: { pt: "Vamos conversar.", en: "Let's talk." } satisfies Bilingual,
  githubLabel: { pt: "GitHub ↗", en: "GitHub ↗" } satisfies Bilingual,
  linkedinLabel: { pt: "LinkedIn ↗", en: "LinkedIn ↗" } satisfies Bilingual,
  resumeLabel: { pt: "Currículo ↗", en: "Resume ↗" } satisfies Bilingual,
};

export const footer = {
  copyright: "© 2026 Guilherme Rezende",
  builtWith: {
    pt: "Feito com React, TypeScript & Tailwind",
    en: "Built with React, TypeScript & Tailwind",
  } satisfies Bilingual,
};

export const techColors: Record<string, { bg: string; fg: string }> = {
  React: { bg: "#61DAFB", fg: "#0B2530" },
  TypeScript: { bg: "#3178C6", fg: "#FFFFFF" },
  Vite: { bg: "#646CFF", fg: "#FFFFFF" },
  Ollama: { bg: "#111111", fg: "#FFFFFF" },
  Vitest: { bg: "#6E9F18", fg: "#FFFFFF" },
  Supabase: { bg: "#3ECF8E", fg: "#0B2E1E" },
  "React Query": { bg: "#FF4154", fg: "#FFFFFF" },
  Tailwind: { bg: "#38BDF8", fg: "#062A38" },
};
