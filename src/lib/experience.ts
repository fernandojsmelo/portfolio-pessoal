export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
}

/** Experiência profissional, mais recente primeiro — fonte: currículo curado. */
export const experience: ExperienceEntry[] = [
  {
    role: "Programador Web Full Stack",
    company: "Smart Data Solutions",
    period: "jul/2025 — atual",
    description:
      "Desenvolvimento de sistemas, análise de dados, estruturação de bancos de dados e manutenção de sistemas próprios e de terceiros.",
  },
  {
    role: "Manutenção de Computadores e Programação",
    company: "Autônomo",
    period: "2017 — 2025",
    description:
      "Suporte técnico e manutenção de hardware, com desenvolvimento de sistemas sob demanda para clientes diversos.",
  },
  {
    role: "Programador Pleno",
    company: "Claudino S/A — Lojas de Departamentos",
    period: "2009 — 2017",
    description: "Análise de sistemas e desenvolvimento de aplicações internas.",
  },
  {
    role: "Técnico em Manutenção",
    company: "SOCIC — Sociedade Comercial Irmãs Claudino S/A",
    period: "2003 — 2007",
    description:
      "Manutenção de equipamentos de informática e instalação de redes física e lógica.",
  },
  {
    role: "Auxiliar de Manutenção",
    company: "UPS Tecnologia",
    period: "2000 — 2002",
    description: "Manutenção e conserto de no-breaks.",
  },
];

export const education = {
  course: "Sistemas de Informação",
  institution: "Faculdade de Tecnologia do Piauí — FATEPI",
  status: "Cursado parcialmente, até o 5º período",
};
