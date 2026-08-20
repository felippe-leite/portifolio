import {
  SiDocker,
  SiPostgresql,
  SiReact,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

interface Technology {
  name: string;
  icon: React.ElementType;
}

interface TechnologyGroup {
  name: string;
  technologies: Technology[];
}

const technologyGroups: TechnologyGroup[] = [
  {
    name: "Backend",
    technologies: [
      {
        name: "Java",
        icon: FaJava,
      },
      {
        name: "Spring Boot",
        icon: SiSpringboot,
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
      },
    ],
  },
  {
    name: "Frontend",
    technologies: [
      {
        name: "React",
        icon: SiReact,
      },
    ],
  },
  {
    name: "Database",
    technologies: [
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
      },
    ],
  },
  {
    name: "DevOps",
    technologies: [
      {
        name: "Docker",
        icon: SiDocker,
      },
    ],
  },
];

function Technologies() {
  return (
    <section id="technologies" className="flex flex-col gap-8">
      <div>
        <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
          // Stack
        </p>

        <h2 className="text-2xl font-bold">Tecnologias</h2>
      </div>

      <div className="flex flex-col gap-8">
        {technologyGroups.map((group) => (
          <div key={group.name} className="flex flex-col gap-3">
            <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-gray-500">
              {group.name}
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {group.technologies.map((technology) => {
                const Icon = technology.icon;

                return (
                  <div
                    key={technology.name}
                    className="
                      group
                      flex items-center gap-3
                      rounded-lg
                      border border-white/10
                      bg-white/[0.02]
                      px-4 py-4
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-cyan-400/40
                      hover:bg-white/[0.04]
                    "
                  >
                    <Icon
                      className="
                        text-2xl
                        text-gray-400
                        transition-colors
                        duration-300
                        group-hover:text-cyan-400
                      "
                    />

                    <span className="font-mono text-sm text-gray-400 transition-colors group-hover:text-white">
                      {technology.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Technologies;
