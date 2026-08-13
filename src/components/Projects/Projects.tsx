import { projects } from "../../data/projects";
import ProjectCard from "../ProjectCard/ProjectCard";

function Projects() {
  return (
    <section id="projects" className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">Projetos</h2>
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          github={project.github}
        />
      ))}
    </section>
  );
}

export default Projects;
