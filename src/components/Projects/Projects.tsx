import { projects } from "../../data/projects";
import ProjectCard from '../ProjectCard/ProjectCard';

function Projects() {
  return (
    <section>
      <h2>Projetos</h2>
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