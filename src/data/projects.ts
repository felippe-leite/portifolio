export interface Project {
  id: string;
  title: string;
  description: string;
  highlights?: string[];
  technologies: string[];
  github?: string;
  image?: string;
  category?: "BACKEND" | "SIMULATION" | "ASTRONOMY" | "PHYSICS" | "Full Stack";
  status?: "completed" | "in-progress" | "exploring";
}

export const projects: Project[] = [
  {
    id: "eclipse",
    title: "projects.eclipse.title",
    description: "projects.eclipse.description",
    highlights: [
      "projects.eclipse.backend",
      "projects.eclipse.workflow",
      "projects.eclipse.documents",
    ],
    technologies: ["TypeScript", "Node.js", "React"],
    image: "/EclipsePC.png",
    category: "Full Stack",
    status: "completed",
  },
  {
    id: "orion",
    title: "projects.orion.title",
    description: "projects.orion.description",
    highlights: [
      "projects.orion.transcription",
      "projects.orion.documents",
      "projects.orion.storage",
    ],
    technologies: ["TypeScript", "Node.js", "React", "AssemblyAI", "MySQL", "Docker"],
    image: "/orion.png",
    category: "Full Stack",
    status: "completed",
  },
  {
    id: "patrimonio",
    title: "projects.assets.title",
    description: "projects.assets.description",
    highlights: [
      "projects.assets.inventory",
      "projects.assets.search",
      "projects.assets.management",
    ],
    technologies: ["TypeScript", "Node.js", "Docker"],
    image: "/patrimonio.png",
    category: "Full Stack",
    status: "completed",
  },
];
