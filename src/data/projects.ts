export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
}

export const projects: Project[] = [
  {
    title: "Sistema de Gerenciamento de Tarefas",
    description:
      "Um sistema web para gerenciar tarefas, permitindo aos usuários criar, editar e excluir tarefas, bem como marcar tarefas como concluídas.",
    technologies: ["Java", "Spring Boot", "React", "MySQL"],
    github: "https://github.com/felippeleite/task-manager",
  },
  {
    title: "API de E-commerce",
    description:
      "Uma API RESTful para um sistema de e-commerce, permitindo a gestão de produtos, categorias e pedidos.",
    technologies: ["Java", "Spring Boot", "PostgreSQL"],
    github: "https://github.com/felippeleite/ecommerce-api",
  },
];
