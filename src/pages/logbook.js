import React, { useEffect, useState } from "react";
import { fetchPageBySlug } from "../api";

const Logbook = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      const data = await fetchPageBySlug("logbook-of-our-project");
      setPage(data);
    };

    loadPage();
  }, []);

  if (!page) return <p>Loading...</p>;

  // Fonction pour extraire les parties principales et aside
  const parseContent = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Récupérer toutes les colonnes
    const columns = doc.querySelectorAll(".wp-block-column");
    const firstColumn = columns[0] ? columns[0].innerHTML : ""; // Contenu de la première colonne

    // Deuxième colonne
    let asideTitle = "";
    let asideList = "";

    if (columns[1]) {
      const secondColumn = columns[1];

      // Extraire le titre (h2)
      const titleElement = secondColumn.querySelector("h2");
      asideTitle = titleElement ? titleElement.textContent : "";

      // Extraire le reste (ul ou autre contenu)
      const listElement = secondColumn.querySelector("ul");
      asideList = listElement ? listElement.outerHTML : "";

      // Supprimer la deuxième colonne pour éviter les doublons dans le contenu principal
      secondColumn.remove();
    }

    // Retourner le contenu principal et les données de l'aside
    return {
      filteredContent: doc.body.innerHTML, // Contenu principal sans la deuxième colonne
      asideTitle,
      asideList,
    };
  };

  const { filteredContent, asideTitle, asideList } = parseContent(
    page.content.rendered
  );

  return (
    <main>
      <section id="articles">
        <article>
          <header>
            <h2>{page.title.rendered}</h2>
            <hr />
          </header>
          <table dangerouslySetInnerHTML={{ __html: filteredContent }} />
        </article>
      </section>
      <aside>
        <div>
          <h3 className="asideHeader">{asideTitle}</h3>
          <ul dangerouslySetInnerHTML={{ __html: asideList }}></ul>
        </div>
      </aside>
    </main>
  );
};

export default Logbook;
