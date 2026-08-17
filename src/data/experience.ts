export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    role: "Estagiário em Desenvolvimento de Software",
    company: "Defensoria Pública",
    period: "Atual",
    description:
      "Atuação no desenvolvimento e manutenção de aplicações, implementação de funcionalidades, correção de bugs e integração entre frontend e backend.",
    technologies: ["Java", "TypeScript", "Spring Boot"],
  },
];