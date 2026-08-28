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
      "Aplicação de linha de comando desenvolvida em JavaScript e Node.js para criar, listar, atualizar e excluir tarefas. Utiliza persistência de dados em arquivos locais, estruturas com Map, funções assíncronas e validações de entrada, com foco em organização modular, lógica de programação e boas práticas de desenvolvimento.",
    descEn:
      "Command-line application built with JavaScript and Node.js to create, list, update and delete tasks. Uses local file persistence, Map data structures, async functions and input validation, focused on modular organization, programming logic and development best practices.",
    stack: ["JavaScript", "Node.js", "Map", "Async", "File I/O"],
    href: "https://github.com/rportocortes/gerenciador-de-tarefas",
  },
];

const achievements: Achievement[] = [
  {
    name: "AutoCare",
    award: "Startup Weekend Anápolis · 1º lugar",
    descPt:
      "Projeto construído em 72 horas durante o Startup Weekend Anápolis. Atuei em todas as etapas: definição do problema, validação com usuários reais, estruturação da solução, desenvolvimento do MVP e apresentação do pitch. Resultado: 1º lugar na competição.",
    descEn:
      "Project built in 72 hours during Startup Weekend Anápolis. I took part in every stage: problem definition, validation with real users, solution design, MVP development and pitch presentation. Result: 1st place in the competition.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7457610548852035584/",
    hrefLabelPt: "Ver post no LinkedIn",
    hrefLabelEn: "See LinkedIn post",
  },
];

// mini cometas do fundo (minimalista): poucos e espalhados. O card é opaco,
// então os que cruzam a área dele ficam escondidos atrás — nunca por cima.
// Cometas espalhados por toda a seção. Variação de tempo/atraso evita o
// efeito de "chuva sincronizada" e mantém a sensação orgânica.
const comets = [
  { top: "5%", left: "14%", delay: 0.6, duration: 4.0 },
  { top: "8%", left: "68%", delay: 2.4, duration: 4.2 },
  { top: "22%", left: "40%", delay: 1.3, duration: 3.8 },
  { top: "28%", left: "88%", delay: 3.1, duration: 4.4 },
  { top: "40%", left: "18%", delay: 2.0, duration: 4.1 },
  { top: "46%", left: "72%", delay: 0.4, duration: 3.9 },
  // faixa próxima da divisão entre Projetos e Conquistas
  { top: "62%", left: "30%", delay: 1.8, duration: 4.2 },
  { top: "66%", left: "82%", delay: 3.3, duration: 3.7 },
  { top: "78%", left: "12%", delay: 0.9, duration: 4.3 },
  { top: "84%", left: "56%", delay: 2.6, duration: 4.0 },
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
