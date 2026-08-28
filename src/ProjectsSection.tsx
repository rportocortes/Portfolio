interface ProjectsSectionProps {
  language: "pt" | "en";
}

interface Project {
  name: string;
  tag: string;
  descPt: string;
  descEn: string;
  /** stack usada no projeto (chips) */
  stack: string[];
  /** link do projeto (GitHub, deploy...). Use "#" se ainda não tiver. */
  href: string;
}

interface Achievement {
  name: string;
  award: string;
  descPt: string;
  descEn: string;
  href: string;
  hrefLabelPt: string;
  hrefLabelEn: string;
}

const projects: Project[] = [
  {
    name: "Gerenciador de Tarefas",
    tag: "CLI · Back-End",
    descPt:
      "Aplicação de linha de comando desenvolvida em JavaScript e Node.js para criar, listar, atualizar e excluir tarefas. Usa persistência de dados em arquivos locais, estruturas de dados com Map, funções assíncronas e validações de entrada — com foco em organização modular, lógica de programação e boas práticas de desenvolvimento.",
    descEn:
      "Command-line application built with JavaScript and Node.js to create, list, update and delete tasks. Uses local file persistence, Map data structures, async functions and input validation — focused on modular organization, programming logic and development best practices.",
    stack: ["JavaScript", "Node.js", "Map", "Async", "File I/O"],
    href: "https://github.com/rportocortes/gerenciador-de-tarefas",
  },
];

const achievements: Achievement[] = [
  {
    name: "AutoCare",
    award: "Startup Weekend Anápolis · 1º lugar",
    descPt:
      "Como integrante do time da AutoCare, participei da validação da ideia, do desenvolvimento do MVP e da apresentação do pitch final durante 72 horas de imersão. O projeto conquistou o 1º lugar entre as equipes e recebeu premiação de R$ 6.000.",
    descEn:
      "As part of the AutoCare team, I helped validate the idea, build the MVP and pitch the final product during a 72-hour immersion. The project won 1st place and a R$6,000 prize.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7457610548852035584/",
    hrefLabelPt: "Ver post no LinkedIn",
    hrefLabelEn: "See LinkedIn post",
  },
];

// mini cometas do fundo (minimalista): poucos e espalhados. O card é opaco,
// então os que cruzam a área dele ficam escondidos atrás — nunca por cima.
const comets = [
  { top: "3%", left: "16%", delay: 0.6, duration: 4 },
  { top: "5%", left: "70%", delay: 2.6, duration: 3.8 },
  { top: "34%", left: "88%", delay: 1.4, duration: 4.4 },
  { top: "26%", left: "52%", delay: 3.2, duration: 4.1 },
];

/**
 * Seção "Projetos": um projeto em destaque (Gerenciador de Tarefas) + subseção
 * "Conquistas" com AutoCare/Startup Weekend e link para o post no LinkedIn.
 */
function ProjectsSection({ language }: ProjectsSectionProps) {
  const pt = language === "pt";

  return (
    <section id="projects" className="projectsSection">
      <div className="projectsStars" aria-hidden="true">
        {comets.map((comet, i) => (
          <span
            key={i}
            className="comet"
            style={{
              top: comet.top,
              left: comet.left,
              animationDelay: `${comet.delay}s`,
              animationDuration: `${comet.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="projectsInner">
        <span className="stackLabel">
          {pt ? "Projetos Selecionados" : "Selected Projects"}
        </span>

        <div className="projectFeatureList">
          {projects.map((project, index) => {
            const isLink = project.href && project.href !== "#";
            return (
              <article key={project.name} className="projectFeature">
                <div className="projectFeatureTop">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.tag}</span>
                </div>

                <h3 className="projectFeatureName">{project.name}</h3>

                <p className="projectFeatureDesc">
                  {pt ? project.descPt : project.descEn}
                </p>

                <ul className="projectStack" aria-label={pt ? "Stack" : "Stack"}>
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                {isLink && (
                  <a
                    className="projectLink"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pt ? "Ver no GitHub" : "View on GitHub"}
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M7 17L17 7M17 7H8M17 7v9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </article>
            );
          })}
        </div>

        <div className="achievementsBlock">
          <div className="dividerComets" aria-hidden="true">
            {[
              { left: "18%", delay: 0.2, duration: 3.2 },
              { left: "42%", delay: 1.6, duration: 3.8 },
              { left: "68%", delay: 2.4, duration: 3.4 },
              { left: "86%", delay: 0.9, duration: 4.1 },
            ].map((c, i) => (
              <span
                key={i}
                className="comet"
                style={{
                  left: c.left,
                  animationDelay: `${c.delay}s`,
                  animationDuration: `${c.duration}s`,
                }}
              />
            ))}
          </div>

          <span className="stackLabel">
            {pt ? "Conquistas" : "Achievements"}
          </span>

          <div className="projectFeatureList">
            {achievements.map((item) => (
              <article key={item.name} className="projectFeature">
                <div className="projectFeatureTop">
                  <span>🏆</span>
                  <span>{item.name}</span>
                </div>

                <h3 className="projectFeatureName">{item.name}</h3>

                <span className="projectAward">🏅 {item.award}</span>

                <p className="projectFeatureDesc">
                  {pt ? item.descPt : item.descEn}
                </p>

                <a
                  className="projectLink"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pt ? item.hrefLabelPt : item.hrefLabelEn}
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 17L17 7M17 7H8M17 7v9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
