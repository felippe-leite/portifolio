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
      "Atuei na área de Suporte de TI no Exército Brasileiro, prestando atendimento técnico a usuários, realizando manutenção preventiva e corretiva de computadores, impressoras e periféricos, além da instalação e configuração de sistemas operacionais Windows e Linux. Também ofereci suporte à infraestrutura de redes locais (LAN) e colaborei no controle e organização do inventário de equipamentos. Utilizei ferramentas como Windows, Linux, pacote Microsoft Office, redes TCP/IP e aplicativos de diagnóstico de hardware e software..",
    technologies: ["Linxu", "Redes TCP/IP", "Diagnóstico de Sistemas"],
  },
];
