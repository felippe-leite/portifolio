export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  highlights?: string[];
}

export const experiences: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Defensoria Pública",
    period: "Atual",
    description:
      "experience.current.description",
    highlights: [
      "experience.current.backend",
      "experience.current.infrastructure",
      "experience.current.security",
    ],
    technologies: ["TypeScript", "Node.js", "React", "Supabase", "PostgreSQL", "Docker", "EasyPanel"],
  },
  {
    role: "IT Support",
    company: "Exército Brasileiro",
    period: "Mar 2022 - Fev 2023",
    description:
      "Atuei com Suporte de TI, prestando atendimento a usuários, manutenção de computadores e periféricos, configuração de Windows e Linux, suporte a redes locais e controle de inventário de equipamentos.",
    technologies: ["Linux", "Redes TCP/IP", "Diagnóstico de Sistemas"],
  },
];
