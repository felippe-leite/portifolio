export interface Education {
  course: string;
  institution: string;
  period: string;
  description?: string;
}

export const education: Education[] = [
  {
    course: "Análise e Desenvolvimento de Sistemas",
    institution: "Sua instituição",
    period: "2025 — Atual",
    description:
      "Formação voltada ao desenvolvimento de software, programação, banco de dados e engenharia de sistemas.",
  },
];