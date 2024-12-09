import axios from "axios";

const API_URL =
  "https://dev-jumpquest-backend-wordpress.pantheonsite.io//wp-json/wp/v2/pages";

export const fetchPages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.log("Erreur lors de la récupération des pages :", error);
    return [];
  }
};

export const fetchPageBySlug = async (slug) => {
  try {
    const response = await axios.get(API_URL, {
      params: { slug },
    });
    return response.data[0];
  } catch (error) {
    console.log("Erreur lors de la récupération de la page ${slug} :", error);
    return null;
  }
};
