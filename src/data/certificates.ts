export interface Certificate {
  name: string;
  institution: string;
  year: string;
  link?: string;
}

export const certificates: Certificate[] = [
  {
    name: "Nome do certificado",
    institution: "Instituição",
    year: "2026",
    link: "#",
  },
];
