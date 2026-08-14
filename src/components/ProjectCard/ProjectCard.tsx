interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  image?: string;
  category?: "BACKEND" | "SIMULATION" | "ASTRONOMY" | "PHYSICS" | "Full Stack";
}

function ProjectCard({
  title,
  description,
  technologies,
  github,
  image,
  category,
}: ProjectCardProps) {
  return (
    <article className="flex w-full shrink-0 snap-start flex-col gap-5 rounded-lg border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-cyan-400/40 md:w-[600px]">
      {image && (
        <div className="aspect-video overflow-hidden rounded-lg border border-white/10">
          <img
            src={image}
            alt={`Screenshot do projeto ${title}`}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col gap-3">
        {category && (
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
            {category}
          </span>
        )}

        <h3 className="text-xl font-semibold">{title}</h3>

        <p className="text-gray-400">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded border border-white/10 bg-white/4 px-2.5 py-1 font-mono text-xs text-gray-400"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit font-medium underline underline-offset-4 transition-colors hover:text-cyan-400"
      >
        GitHub →
      </a>
    </article>
  );
}

export default ProjectCard;
