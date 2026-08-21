export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Defensoria Pública",
    period: "Atual",
    description:
      "Atuação no desenvolvimento e manutenção de aplicações, implementação de funcionalidades, correção de bugs e integração entre frontend e backend.",
    technologies: ["React", "TypeScript", "Java"],
  },
  {
    role: "IT Support ",
    company: "Exército Brasileiro",
    period: "Mar 2022 - Fev 2023",
    description:
      "Atuei com **Suporte de TI**, prestando atendimento a usuários, manutenção de computadores e periféricos, configuração de Windows e Linux, suporte a redes locais e controle de inventário de equipamentos.",
    technologies: ["Linxu", "Redes TCP/IP", "Diagnóstico de Sistemas"],
  },
];
