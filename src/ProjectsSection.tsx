interface ProjectsSectionProps {
  language: "pt" | "en";
}

interface Project {
  name: string;
  tag: string;
  /** conquista/destaque (ex.: prêmio). Deixe "" se não houver. */
  award: string;
  descPt: string;
  descEn: string;
  /** link do projeto (GitHub, deploy...). Use "#" se ainda não tiver. */
  href: string;
}

/*
 * ⚠️ EDITE com seus projetos. Para adicionar um novo, copie um item e troque
 * os dados. O link ("Ver no GitHub") só aparece quando o `href` é real.
 */
const projects: Project[] = [
  {
    name: "AutoCare",
    tag: "Full Stack",
    award: "Startup Weekend Anápolis · 1º lugar",
    descPt:
      "Aplicativo mobile que simplifica o cuidado com o veículo, sem precisar de conhecimento mecânico. Substitui anotações dispersas por uma experiência digital organizada, preditiva e acessível.",
    descEn:
      "Mobile app that simplifies vehicle care without requiring mechanical knowledge. Replaces scattered notes with an organized, predictive and accessible digital experience.",
    href: "#",
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
 * Seção "Projetos" (terceira parte): cards compactos em grade, com mini cometas
 * caindo na diagonal ao fundo. Cada card mostra índice, etiqueta, conquista,
 * descrição e o link.
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

                {project.award && (
                  <span className="projectAward">🏅 {project.award}</span>
                )}

                <p className="projectFeatureDesc">
                  {pt ? project.descPt : project.descEn}
                </p>

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
      </div>
    </section>
  );
}

export default ProjectsSection;
