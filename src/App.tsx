import { useState } from "react";
import PlexusBackground from "./PlexusBackground";
import StackSection from "./StackSection";
import ProjectsSection from "./ProjectsSection";

function App() {
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = "dark" as const;

  const menuLinks =
    language === "pt"
      ? [
          { label: "Início", href: "#home" },
          { label: "Habilidades", href: "#skills" },
          { label: "Projetos", href: "#projects" },
        ]
      : [
          { label: "Home", href: "#home" },
          { label: "Skills", href: "#skills" },
          { label: "Projects", href: "#projects" },
        ];

  const toggleLanguage = () => {
    setLanguage((current) => (current === "pt" ? "en" : "pt"));
  };

  const heroContent = {
    pt: {
      greeting: "Olá, me chamo",
      name: "Rafael Porto",
      roleHighlight: "Full Stack",
      rolePart: "Developer",
      description:
        "Estou construindo minha base em desenvolvimento backend, estudando JavaScript, React, banco de dados, APIs e automação de processos.",
      projectsBtn: "Ver Projetos",
      skillsBtn: "Ver Habilidades",
    },
    en: {
      greeting: "Hello, I'm",
      name: "Rafael Porto",
      roleHighlight: "Full Stack",
      rolePart: "Developer",
      description:
        "Building my foundation in backend development, studying JavaScript, React, databases, APIs and process automation.",
      projectsBtn: "View Projects",
      skillsBtn: "View Skills",
    },
  };

  const content = heroContent[language];

  return (
    <div className={`page ${theme}`}>
      <PlexusBackground theme={theme} />

      <header className="header">
        <nav className="navbar">
          <a href="#home" className="logo">
            RP
          </a>

          <div className="navSeparator" aria-hidden="true"></div>

          <div className={`navLinks ${menuOpen ? "open" : ""}`}>
            {menuLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={index === 0 ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="headerActions">
            <button
              type="button"
              className="smallButton"
              onClick={toggleLanguage}
            >
              {language.toUpperCase()}
            </button>

            <button
              type="button"
              className="navToggle"
              aria-label={language === "pt" ? "Abrir menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className={`navToggleIcon ${menuOpen ? "open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="heroLeft">
            <div className="heroEyebrow">{content.greeting}</div>
            
            <h1>
              <strong>{content.name}</strong>
            </h1>

            <div className="heroRole">
              <span className="typedRole">Backend Developer</span>
            </div>

            <p className="heroDescription">{content.description}</p>

            <div className="socialLinks">
              <a
                href="https://github.com/rportocortes"
                className="socialLink"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/rafael-porto-543bba397"
                className="socialLink"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
              <a
                href="https://wa.me/5562994586396"
                className="socialLink"
                aria-label="WhatsApp"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.521 5.276l-.999 3.648 3.751-.983zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>

            <div className="heroActions">
              <a href="#projects" className="primaryButton">
                {content.projectsBtn}
                <svg className="btnArrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a href="#" className="secondaryButton">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                </svg>
                Baixar CV
              </a>
            </div>
          </div>

          <a
            href="#about"
            className="scrollIndicator"
            aria-label={language === "pt" ? "Ir para a seção Sobre" : "Go to About section"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </section>

        <StackSection language={language} />

        <ProjectsSection language={language} />
      </main>
    </div>
  );
}

export default App;