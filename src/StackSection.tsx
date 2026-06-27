interface StackSectionProps {
  language: "pt" | "en";
}

interface Tech {
  /** nome exibido */
  name: string;
  /** slug do simple-icons (https://simpleicons.org) usado para o ícone */
  slug: string;
}

interface Category {
  titlePt: string;
  titleEn: string;
  items: Tech[];
}

/*
 * ⚠️ EDITE ESTA LISTA: deixe APENAS as tecnologias que você realmente
 * conhece e consegue defender numa entrevista. Para adicionar/remover,
 * basta mexer nos arrays abaixo. O `slug` segue os nomes do simple-icons
 * (ex.: "nodedotjs", "nextdotjs", "postgresql"). Veja simpleicons.org.
 */
const categories: Category[] = [
  {
    titlePt: "Linguagens",
    titleEn: "Languages",
    items: [
      { name: "JavaScript", slug: "javascript" },
      { name: "Python", slug: "python" },
    ],
  },
  {
    titlePt: "Frontend",
    titleEn: "Frontend",
    items: [
      { name: "HTML", slug: "html5" },
      { name: "CSS", slug: "css" },
    ],
  },
  {
    titlePt: "Backend",
    titleEn: "Backend",
    items: [{ name: "Node.js", slug: "nodedotjs" }],
  },
  {
    titlePt: "Banco de Dados",
    titleEn: "Databases",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Railway", slug: "railway" },
    ],
  },
];

/**
 * Seção "Stack": tecnologias organizadas em colunas por categoria, em estilo
 * minimalista monocromático (combina com o hero/plexus). Ícones vêm do CDN do
 * simple-icons em tom de cinza, e o texto acompanha o tema (claro/escuro).
 */
function StackSection({ language }: StackSectionProps) {
  const pt = language === "pt";

  return (
    <section id="skills" className="stackSection">
      <div className="stackInner">
        <span className="stackLabel">Stack</span>

        <div className="stackGrid">
        {categories.map((cat) => (
          <div key={cat.titlePt} className="stackCol">
            <h3 className="stackColTitle">{pt ? cat.titlePt : cat.titleEn}</h3>
            <ul className="stackList">
              {cat.items.map((tech) => (
                <li key={tech.name} className="stackItem">
                  <img
                    className="stackIcon"
                    src={`https://cdn.simpleicons.org/${tech.slug}/a1a1aa`}
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={18}
                    loading="lazy"
                  />
                  <span>{tech.name}</span>
                </li>
              ))}
            </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StackSection;
