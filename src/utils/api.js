import axios from "axios";

const api = axios.create({ baseURL: "https://nc-news-xe7y.onrender.com/api" });

export const getAllArticles = () => {
  return api.get("/articles");
};
