import { useState } from "react";

function App() {
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const menuLinks =
    language === "pt"
      ? [
          { label: "Início", href: "#home" },
          { label: "Sobre", href: "#about" },
          { label: "Habilidades", href: "#skills" },
          { label: "Projetos", href: "#projects" },
        ]
      : [
          { label: "Home", href: "#home" },
          { label: "About", href: "#about" },
          { label: "Skills", href: "#skills" },
          { label: "Projects", href: "#projects" },
        ];

  const toggleLanguage = () => {
    setLanguage((current) => (current === "pt" ? "en" : "pt"));
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
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
      <header className="header">
        <nav className="navbar">
          <a href="#home" className="logo">
            RP
          </a>

          <div className="navSeparator" aria-hidden="true"></div>

          <div className="navLinks">
            {menuLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={index === 0 ? "active" : ""}
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
            <button type="button" className="smallButton" onClick={toggleTheme}>
              {theme === "dark" ? "☾" : "☀"}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="codeBackground" aria-hidden="true">
            <span>const dev = "Rafael Porto";</span>
            <span>npm run dev</span>
            <span>git commit -m "portfolio"</span>
            <span>SELECT * FROM projects;</span>
            <span>{'function createApi() { return true; }'}</span>
            <span>const skills = ["JS", "React", "SQL"];</span>
          </div>

          <div className="heroLeft">
            <div className="heroEyebrow">{content.greeting}</div>
            
            <h1>
              <strong>{content.name}</strong>
            </h1>

            <div className="heroRole">
              <span className="typedRole">Full Stack Developer</span>
            </div>

            <p className="heroDescription">{content.description}</p>

            <div className="heroSocials">
              <a href="#" className="socialIcon" aria-label="GitHub">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 . 405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.016 12.016 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="socialIcon" aria-label="LinkedIn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.9 0 3.36 1.25 3.36 3.88z" />
                </svg>
              </a>
            </div>

            <div className="heroButtons">
              <a href="#projects" className="primaryButton">
                {content.projectsBtn}
                <svg className="btnArrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a href="#" className="secondaryButton">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 11l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 21h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Baixar CV
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <h2>{language === "pt" ? "Sobre mim" : "About me"}</h2>

          <p>
            {language === "pt"
              ? "Sou estudante de Análise e Desenvolvimento de Sistemas e estou construindo minha base em programação com foco em backend. Atualmente estudo JavaScript, React, banco de dados, APIs e GitHub."
              : "I'm an ADS student building my foundation in programming with a focus on backend development. Currently studying JavaScript, React, databases, APIs and GitHub."}
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;