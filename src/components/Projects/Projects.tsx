import { useEffect, useRef, useState } from "react";
import ProjectCard from "./../ProjectCard/ProjectCard";
import { projects } from "../../data/projects";

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  const goToProject = (index: number) => {
    const nextIndex = (index + projects.length) % projects.length;

    setCurrentIndex(nextIndex);

    const carousel = carouselRef.current;
    const card = carousel?.children[nextIndex] as HTMLElement;

    card?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  useEffect(() => {
    if (isPaused || projects.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      goToProject(currentIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  return (
    <section id="projects" className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
          // Projetos
        </p>

        <h2 className="text-2xl font-bold">Projetos</h2>
      </div>

      <div
        ref={carouselRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="scrollbar-hidden flex snap-x snap-mandatory gap-6 overflow-x-auto"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            github={project.github}
            image={project.image}
            category={project.category}
            status={project.status}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goToProject(currentIndex - 1)}
            className="rounded border border-white/10 px-3 py-1.5 transition-colors hover:border-cyan-400/40 hover:text-cyan-400"
            aria-label="Projeto anterior"
          >
            ←
          </button>

          <span className="font-mono text-xs text-gray-500">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={() => goToProject(currentIndex + 1)}
            className="rounded border border-white/10 px-3 py-1.5 transition-colors hover:border-cyan-400/40 hover:text-cyan-400"
            aria-label="Próximo projeto"
          >
            →
          </button>
        </div>

        <span className="font-mono text-xs text-gray-600">
          {isPaused ? "PAUSED" : "AUTO"}
        </span>
      </div>
    </section>
  );
}

export default Projects;
