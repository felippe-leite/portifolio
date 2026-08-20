interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  image?: string;
  category?: "BACKEND" | "SIMULATION" | "ASTRONOMY" | "PHYSICS" | "Full Stack";
  status?: "completed" | "in-progress" | "exploring";
}

function ProjectCard({
  title,
  description,
  technologies,
  github,
  image,
  category,
  status,
}: ProjectCardProps) {
  const statusLabel = {
    completed: "Concluído",
    "in-progress": "Em desenvolvimento",
    exploring: "Explorando",
  };

  return (
    <article
      className="
        group
        flex w-full shrink-0 snap-start flex-col gap-5
        rounded-lg border border-white/10
        bg-white/[0.02]
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:border-cyan-400/40
        hover:bg-white/[0.03]
        md:w-[600px]
      "
    >
      {image && (
        <div className="group relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/30">
          <img
            src={image}
            alt={`Screenshot do projeto ${title}`}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.03]
            "
          />

          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-t
              from-black/20
              to-transparent
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          {category ? (
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              {category}
            </span>
          ) : (
            <span />
          )}

          {status && (
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-gray-400">
              {statusLabel[status]}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold transition-colors group-hover:text-white">
            {title}
          </h3>

          <p className="leading-relaxed text-gray-400">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="
              rounded
              border border-white/10
              bg-white/[0.04]
              px-2.5 py-1
              font-mono text-xs text-gray-400
              transition-colors
              group-hover:border-white/15
            "
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto border-t border-white/10 pt-4">
        {github ? (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-fit
              font-medium
              transition-colors
              hover:text-cyan-400
            "
          >
            GitHub →
          </a>
        ) : (
          <span className="font-mono text-xs text-gray-500">
            Código-fonte privado
          </span>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;