import { useEffect, useState } from "react";
import { getAllArticles, getAllTopics, getArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";
import LinearProgress from "@mui/joy/LinearProgress";
import { useLocation } from "react-router-dom";
import { getTopicArticles } from "../utils/utils";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const paramValue = query.get("topic");

  useEffect(() => {
    getAllArticles()
      .then(({ data: { articles } }) => {
        setArticles(articles);
        if (paramValue) {
          const newArticles = getTopicArticles(articles, paramValue);
          setArticles(newArticles);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [articles]);

  if (isLoading) {
    return (
      <section className="loading-bar">
        <p>Retrieving content...</p>
        <LinearProgress color="danger" determinate={false} size="lg" />
      </section>
    );
  }

  return (
    <section id="article-container">
      <ul>
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article={article}
              setArticles={setArticles}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Articles;
