import axios from "axios";

const api = axios.create({ baseURL: "https://nc-news-xe7y.onrender.com/api" });

export const getAllArticles = () => {
  return api.get("/articles");
};

export const getArticleById = (articleId) => {
  return api.get(`/articles/${articleId}`);
};

export const getCommentsByArticle = (articleId) => {
  return api.get(`/articles/${articleId}/comments`);
};
