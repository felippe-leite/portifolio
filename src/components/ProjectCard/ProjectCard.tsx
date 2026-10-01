import { useLanguage } from "../../i18n/useLanguage";
import type { Project } from "../../data/projects";

function ProjectCard({
  title,
  description,
  highlights,
  technologies,
  github,
  image,
  category,
  status,
}: Project) {
  const { t } = useLanguage();
  const statusLabel = {
    completed: "Concluído",
    "in-progress": "Em desenvolvimento",
    exploring: "Explorando",
  };

  return (
    <article
      className="group flex min-w-0 flex-col gap-5 rounded-lg border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.03]"
    >
      {image && (
        <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/30">
          <img
            src={image}
            alt={`${t("Screenshot do projeto")} ${t(title)}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan-400">
            {category}
          </span>
          {status && (
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-gray-400">
              {t(statusLabel[status])}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            {t(title)}
          </h3>
          <p className="mt-3 leading-relaxed text-gray-400">{t(description)}</p>
        </div>

        {highlights && highlights.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-200">
              {t("projects.contribution")}
            </h4>
            <ul className="flex flex-col gap-3 text-sm leading-relaxed text-gray-300">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span>{t(highlight)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-gray-400">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-white/10 pt-4">
          {github ? (
            <a href={github} target="_blank" rel="noopener noreferrer" className="font-medium transition-colors hover:text-cyan-400">
              GitHub →
            </a>
          ) : (
            <span className="font-mono text-xs text-gray-500">
              {t("Código-fonte privado")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
