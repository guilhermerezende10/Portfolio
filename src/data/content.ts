// Centralized bilingual content for the whole site.
// Components should never hardcode copy — pull everything from here.

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

export const nav = {
  logo: "guilherme@dev:~$",
  links: [
    { id: "about", label: { pt: "Sobre", en: "About" } satisfies Bilingual },
    { id: "experience", label: { pt: "Experiência", en: "Experience" } satisfies Bilingual },
    { id: "projects", label: { pt: "Projetos", en: "Projects" } satisfies Bilingual },
    { id: "contact", label: { pt: "Contato", en: "Contact" } satisfies Bilingual },
  ],
};

export const hero = {
  terminal: {
    whoamiCommand: "whoami",
    whoamiOutput: {
      pt: "Guilherme Rezende — Desenvolvedor Full Stack (React/TypeScript)",
      en: "Guilherme Rezende — Full Stack Developer (React/TypeScript)",
    } satisfies Bilingual,
    statusCommand: "cat status.txt",
    statusOutput: {
      pt: "Buscando oportunidade de estágio em desenvolvimento front-end / full stack.",
      en: "Looking for a front-end / full stack internship opportunity.",
    } satisfies Bilingual,
    lsCommand: "ls ./projects",
  },
  viewProjectsButton: { pt: "ver projetos", en: "view projects" } satisfies Bilingual,
  downloadResumeButton: { pt: "baixar currículo", en: "download resume" } satisfies Bilingual,
};

export const about = {
  bio: {
    pt: "Estudante do segundo período de Ciência da Computação na Universidade Presbiteriana Mackenzie, formado em Desenvolvimento de Sistemas pela ETEC. Experiência prática no desenvolvimento de aplicações web com React e integração com APIs. Buscando oportunidade de estágio para aplicar e expandir conhecimentos em desenvolvimento front-end e full stack.",
    en: "Second-semester Computer Science student at Universidade Presbiteriana Mackenzie, graduated in Systems Development from ETEC. Practical experience building web applications with React and API integration. Looking for an internship to apply and grow front-end and full-stack skills.",
  } satisfies Bilingual,
  languagesLabel: { pt: "Idiomas", en: "Languages" } satisfies Bilingual,
  languages: {
    pt: "Inglês Avançado/Fluente; Português Nativo",
    en: "English Advanced/Fluent; Portuguese Native",
  } satisfies Bilingual,
  skillsLabel: { pt: "Habilidades", en: "Skills" } satisfies Bilingual,
  educationLabel: { pt: "Educação", en: "Education" } satisfies Bilingual,
};

export interface Skill {
  name: string;
  level: { pt: string; en: string };
}

export const skills: Skill[] = [
  { name: "React", level: { pt: "Avançado", en: "Advanced" } },
  { name: "TypeScript", level: { pt: "Avançado", en: "Advanced" } },
  { name: "JavaScript", level: { pt: "Avançado", en: "Advanced" } },
  { name: "Git & GitHub", level: { pt: "Avançado", en: "Advanced" } },
  { name: "HTML5 & CSS3", level: { pt: "Avançado", en: "Advanced" } },
  { name: "Tailwind CSS", level: { pt: "Avançado", en: "Advanced" } },
  { name: "Python", level: { pt: "Intermediário", en: "Intermediate" } },
  { name: "Claude Code", level: { pt: "Intermediário", en: "Intermediate" } },
];

export interface EducationItem {
  period: string;
  title: Bilingual;
  place: string;
}

export const education: EducationItem[] = [
  {
    period: "2026–2029",
    title: { pt: "Bacharel em Ciência da Computação (em andamento)", en: "BSc Computer Science (in progress)" },
    place: "Universidade Presbiteriana Mackenzie",
  },
  {
    period: "2023–2025",
    title: { pt: "Técnico em Desenvolvimento de Sistemas", en: "Technical Degree in Systems Development" },
    place: "ETEC de Praia Grande",
  },
  {
    period: "2022–2026",
    title: { pt: "Inglês como segundo idioma", en: "English as a second language" },
    place: "CNA Idiomas",
  },
];

export interface ExperienceItem {
  role: Bilingual;
  company: string;
  period: string;
  description: Bilingual;
}

export const experience: ExperienceItem = {
  role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
  company: "toLearn",
  period: "03/2026 — presente",
  description: {
    pt: "Desenvolvimento de funcionalidades frontend em React/TypeScript para plataforma educacional com IA adaptativa, incluindo personalização de trilhas, ferramentas interativas de aprendizagem e gamificação.",
    en: "Frontend feature development in React/TypeScript for an adaptive-AI educational platform, including learning-path personalization, interactive learning tools, and gamification.",
  },
};

export interface Project {
  name: string;
  status: Bilingual;
  tech: string[];
  github?: string;
  deploy?: string;
  description: Bilingual;
}

export const projects: Project[] = [
  {
    name: "FitMeta",
    status: { pt: "Projeto de conclusão de curso (TCC)", en: "Capstone project (TCC)" },
    tech: ["React", "TypeScript", "Supabase", "React Query", "Tailwind"],
    github: "https://github.com/guilhermerezende10/FitMeta",
    deploy: "https://fit-meta.vercel.app",
    description: {
      pt: "Aplicação web para gerenciamento de treinos com autenticação e CRUD integrado ao banco. Controle de rotas privadas, gerenciamento de estado global e tratamento de requisições assíncronas. Arquitetura componentizada com foco em escalabilidade e boas práticas.",
      en: "Training-management web app with authentication and database-backed CRUD. Private route control, global state management, and async request handling. Component-based architecture focused on scalability and best practices.",
    },
  },
  {
    name: "toLearn",
    status: { pt: "Repositório privado — trabalho atual", en: "Private repository — current work" },
    tech: ["React", "TypeScript"],
    description: {
      pt: "Plataforma educacional com IA adaptativa. Desenvolvimento de funcionalidades frontend incluindo personalização de trilhas de aprendizagem, ferramentas interativas e gamificação.",
      en: "Adaptive-AI educational platform. Frontend feature development including learning-path personalization, interactive learning tools, and gamification.",
    },
  },
  {
    name: "Docgen",
    status: { pt: "Projeto pessoal", en: "Personal project" },
    tech: ["React", "TypeScript", "Vite", "Ollama", "Vitest"],
    github: "https://github.com/guilhermerezende10/documentation-creator",
    description: {
      pt: "Web app que recebe código-fonte (JS, TS, Python, Go, Rust, Java, Ruby, PHP, C#, C/C++), detecta a linguagem automaticamente e gera documentação técnica estruturada via LLM local — sem cloud ou API key.",
      en: "Web app that ingests source code (JS, TS, Python, Go, Rust, Java, Ruby, PHP, C#, C/C++), auto-detects the language, and generates structured technical documentation via a local LLM — no cloud or API key required.",
    },
  },
];

export const contact = {
  heading: { pt: "Contato", en: "Contact" } satisfies Bilingual,
  pitch: hero.terminal.statusOutput,
  emailLabel: { pt: "Email", en: "Email" } satisfies Bilingual,
};

export const footer = {
  text: {
    pt: "Feito com React, TypeScript & Tailwind",
    en: "Built with React, TypeScript & Tailwind",
  } satisfies Bilingual,
};
