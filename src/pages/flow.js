import React, { useEffect, useState } from "react";
import { fetchPageBySlug } from "../api";

const Flow = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      const data = await fetchPageBySlug("flow");
      setPage(data);
    };

    loadPage();
  }, []);

  if (!page) return <p>Loading...</p>;

  return (
    <main>
      <section id="articles">
        <header>
          <h2>{page.title.rendered}</h2>
          <hr />
        </header>
        <div
          className="gallery"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        ></div>
      </section>
    </main>
  );
};

export default Flow;