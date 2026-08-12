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
    <article>
      <h2>{title}</h2>
      <p>{description}</p>

  <div>
    {technologies.map((tech) => (
        <span key={tech}>{tech}</span>
    ))}
</div>
      <a href={github}>GitHub</a>
    </article>
  );
}

export default ProjectCard;
