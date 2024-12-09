import React, { useEffect, useState } from "react";
import { fetchPageBySlug } from "../api";

const Description = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      const data = await fetchPageBySlug("description-of-our-project");
      setPage(data);
    };

    loadPage();
  }, []);

  if (!page) return <p>Loading...</p>;

  return (
    <div>
      <main>
        <section id="articles">
          <article>
            <header>
              <h2>{page.title.rendered}</h2>
              <hr />
            </header>
            <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
          </article>
        </section>
      </main>
    </div>
  );
};

export default Description;
