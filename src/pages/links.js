import React, { useEffect, useState } from "react";
import { fetchPageBySlug } from "../api";

const Ressources = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      const data = await fetchPageBySlug("ressources");
      setPage(data);

      console.log("Fetched page", data[0]);
    };

    loadPage();
  }, []);

  if (!page) return <p>Loading...</p>;

  if (!page.content || !page.content.rendered) {
    console.log("no content found");
  }

  return (
    console.log("page", page),
    (
      <main>
        <section id="articles">
          <header>
            <h2>{page.title.rendered}</h2>
            <hr />
          </header>
          <div
            className="content-block"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          ></div>
        </section>
      </main>
    )
  );
};

export default Ressources;
