import React, { useEffect, useState } from "react";
import { fetchPageBySlug } from "../api";

const Description = () => {
  const [page, setPage] = useState(null);
  const [filteredContent, setFilteredContent] = useState("");
  const [asideList, setAsideList] = useState([]);
  const [asideTitle, setAsideTitle] = useState("");

  useEffect(() => {
    const loadPage = async () => {
      const data = await fetchPageBySlug("description-of-our-project");

      const contentHTML = data.content.rendered;

      // Marqueur pour séparer le contenu principal et aside
      const splitMarker = '<h2 class="wp-block-heading">Group data sheet</h2>';
      const [mainContent, asideContentRaw] = contentHTML.split(splitMarker);

      // Extraire la liste d'aside et le titre
      const parser = new DOMParser();
      const asideDoc = parser.parseFromString(asideContentRaw, "text/html");
      const listItems = asideDoc.querySelectorAll("li");
      const asideList = Array.from(listItems).map((item) => item.innerHTML);

      // Extraire le titre de l'aside
      const titleElement = asideDoc.querySelector("h2");
      const asideTitle = titleElement
        ? titleElement.textContent
        : "Group data sheet";

      // Mettre à jour l'état
      setPage(data);
      setFilteredContent(mainContent); // Contenu principal sans "Group data"
      setAsideList(asideList); // Liste propre des éléments d'aside
      setAsideTitle(asideTitle); // Titre dynamique récupéré
    };

    loadPage();
  }, []);

  if (!page) return <p>Loading...</p>;

  return (
    <main>
      <section id="articles">
        <article>
          <header>
            <h2>{page.title.rendered}</h2>
            <hr />
          </header>
          <div
            className="content-block"
            dangerouslySetInnerHTML={{ __html: filteredContent }}
          />
        </article>
      </section>
      <aside>
        <div>
          <h3 className="asideHeader">{asideTitle}</h3>
          <ul>
            {asideList.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
};

export default Description;
