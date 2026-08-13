interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  github: string;
}

function ProjectCard({
  title,
  description,
  technologies,
  github,
}: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-cyan-400/40">
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="text-gray-400">{description}</p>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-gray-400"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline underline-offset-4 transition-colors hover:text-cyan-400"
      >
        GitHub →
      </a>
    </article>
  );
}

export default ProjectCard;
