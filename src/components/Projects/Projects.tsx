import { useLanguage } from "../../i18n/useLanguage";
import ProjectCard from "../ProjectCard/ProjectCard";
import { projects } from "../../data/projects";

function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="flex flex-col gap-8">
      <div>
        <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-accent">
          {t("// Projetos")}
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          {t("projects.heading")}
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">
          {t("projects.intro")}
        </p>
      </div>

      <div className="grid auto-rows-fr items-stretch gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
