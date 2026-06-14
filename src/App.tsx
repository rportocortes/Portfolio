import { useState } from "react";

function App() {
  const dev = "Rafael Porto";
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

  return (
    <div className={`page ${theme}`}>
      <header className="header">
        <nav className="navbar">
          <a href="#home" className="logo">
            RP
          </a>
          
          <div className="navSeparator"></div>

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
            <button type="button" className="smallButton" onClick={toggleLanguage}>
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
            <span className="tag">Portfólio em desenvolvimento</span>

            <h1>
              Olá, eu sou <strong>{dev}</strong>
            </h1>

            <p className="heroDescription">
              Estudante de Análise e Desenvolvimento de Sistemas, focado em
              backend, JavaScript, banco de dados e automação de processos.
            </p>

            <div className="heroButtons">
              <a href="#projects" className="primaryButton">
                Ver projetos
              </a>

              <a href="#skills" className="secondaryButton">
                Ver habilidades
              </a>
            </div>
          </div>

          <aside className="heroRight">
            <div className="heroCard">
              <p className="cardTitle">Foco atual</p>
              <h2>Backend &amp; Automação</h2>

              <div className="cardTags">
                <span>JavaScript</span>
                <span>React</span>
                <span>SQL</span>
                <span>APIs</span>
                <span>n8n</span>
              </div>
            </div>
          </aside>
        </section>
        <section id="about" className="section">
          <h2>Sobre mim</h2>

          <p>
            Sou estudante de Análise e Desenvolvimento de Sistemas e estou
            construindo minha base em programação com foco em backend.
            Atualmente estudo JavaScript, React, banco de dados, APIs e GitHub.
          </p>
        </section>
      </main>
    </div>
  );
}
export default App;