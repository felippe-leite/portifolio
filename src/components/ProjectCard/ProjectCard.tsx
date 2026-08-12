interface ProjectCardProps {
  title: string;
  description: string;
  techologies: string[];
  github: string;
}

function ProjectCard({
  title,
  description,
  techologies,
  github,
}: ProjectCardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
        
      <a href={github}>GitHub</a>
    </article>
  );
}

export default ProjectCard;
