import { useLanguage } from "../../i18n/useLanguage";
import {
  SiDocker,
  SiNodedotjs,
  SiSupabase,
  SiMysql,
  SiPostgresql,
  SiReact,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import { FaJava, FaLinux, FaServer, FaShieldAlt, FaKey } from "react-icons/fa";

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
      { name: "Node.js", icon: SiNodedotjs },
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
      { name: "Supabase", icon: SiSupabase },
      { name: "MySQL", icon: SiMysql },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
      },
    ],
  },
  {
    name: "stack.infrastructure",
    technologies: [
      {
        name: "Docker",
        icon: SiDocker,
      },
      { name: "Linux", icon: FaLinux },
      { name: "EasyPanel", icon: FaServer },
    ],
  },
  {
    name: "stack.security",
    technologies: [
      { name: "RLS", icon: FaShieldAlt },
      { name: "stack.policies", icon: FaKey },
    ],
  },
];

function Technologies() {
  const { t } = useLanguage();
  return (
    <section id="technologies" className="flex flex-col gap-8">
      <div>
        <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-accent">{t("// Stack")}</p>

        <h2 className="text-2xl font-bold">{t("Tecnologias")}</h2>
      </div>

      <div className="flex flex-col gap-8">
        {technologyGroups.map((group) => (
          <div key={group.name} className="flex flex-col gap-3">
            <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-subtle">
              {t(group.name)}
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
                      border border-line/10
                      bg-card
                      px-4 py-4
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-accent/40
                      hover:bg-card-hover
                    "
                  >
                    <Icon
                      className="
                        text-2xl
                        text-muted
                        transition-colors
                        duration-300
                        group-hover:text-accent
                      "
                    />

                    <span className="font-mono text-sm text-muted transition-colors group-hover:text-foreground">
                      {t(technology.name)}
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
