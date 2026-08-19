export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  image?: string;
  category?: "BACKEND" | "SIMULATION" | "ASTRONOMY" | "PHYSICS" | "Full Stack";
  status?: "completed" | "in-progress" | "exploring";
}

export const projects: Project[] = [
  {
    title: "Orion - Sistema de Transcrição de Áudio e Vídeo",
    description:
      "Sistema web para transcrição automatizada de áudio e vídeo, integrado à API da AssemblyAI para processamento do conteúdo e separação de locutores (speaker diarization), com geração automática de documentos PDF e persistência dos dados em MySQL.",
    technologies: ["TypeScript", "Node.js", "React", "Docker"],
    image: "orion.png",
    category: "Full Stack",
    status: "completed",
  },
  {
    title: "Eclipse - Sistema de Avaliação e Fluxo de Processos",
    description:
      "Sistema web voltado ao gerenciamento e avaliação de peças processuais, com recursos de assinatura digital e verificação de documentos por QR Code e hash. Atuei no desenvolvimento e manutenção de funcionalidades relacionadas ao fluxo de avaliações, incluindo cálculo de notas, geração e atualização de PDFs, assinatura digital, verificação de autenticidade e correções de regras de negócio no backend e na versão mobile.",
    technologies: ["TypeScript", "Node.js", "React"],
    image: "EclipsePC.png",
    category: "Full Stack",
    status: "completed",
  },

  {
    title: "Sistema de Gestão Patrimonial (Web)",
    description:
      "Sistema web e mobile para gestão patrimonial, permitindo cadastrar, consultar e importar bens, organizar patrimônios por locais e setores, realizar buscas por QR Code e gerar relatórios. A aplicação também conta com gerenciamento de usuários e recursos voltados à administração e acompanhamento dos bens patrimoniais",
    technologies: ["TypeScript", "Node.js", "Docker"],
    image: "patrimonio.png",
    category: "Full Stack",
    status: "completed",
  },
];
