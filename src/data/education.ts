export interface Education {
  course: string;
  institution: string;
  period?: string;
  description?: string;
}

export const education: Education[] = [
  {
    course: "education.degree.title",
    institution: "UNICEPLAC → Universidade Cesumar",
    description:
      "education.degree.description",
  },
  {
    course: "education.technical.title",
    institution: "CETEP",
    description: "education.technical.description",
  },
];
