import axios from "axios";

const api = axios.create({ baseURL: "https://nc-news-xe7y.onrender.com/api" });

export const getAllArticles = () => {
  return api.get("/articles");
};

export const getArticleById = (articleId) => {
  return api.get(`/articles/${articleId}`);
};

export const getCommentsByArticle = (articleId) => {
  return api.get(`/articles/${articleId}/comments?order=asc`);
};

export const patchArticleVotes = (articleId, votes) => {
  const vote = {
    inc_votes: votes,
  };
  return api.patch(`/articles/${articleId}`, vote);
};

export const postCommentByArticle = (articleId, user, input) => {
  const comment = {
    username: user,
    body: input,
  };
  return api.post(`/articles/${articleId}/comments`, comment);
};

export const deleteSingleUserComment = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};

export const getAllTopics = () => {
  return api.get("/topics");
};

export const getArticlesByTopic = (topic) => {
  return api.get(`/articles?topic=${topic}`);
};