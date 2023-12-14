import { useEffect, useState } from "react";
import { getAllArticles, getAllTopics, getArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";
import LinearProgress from "@mui/joy/LinearProgress";
import { useLocation } from "react-router-dom";
import { getTopicArticles } from "../utils/utils";
import Error from "./Error";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const paramValue = query.get("topic");

  useEffect(() => {
    getAllArticles().then(({ data: { articles } }) => {
      setIsError(false);
      setArticles(articles);
      if (paramValue) {
        const newArticles = getTopicArticles(articles, paramValue);
        if (!newArticles.length) {
          setIsError(true);
        } else {
          setIsError(false);
          setArticles(newArticles);
        }
      }
      setIsLoading(false);
    });
  }, [paramValue]);

  if (isLoading) {
    return (
      <section className="loading-bar">
        <p>Retrieving content...</p>
        <LinearProgress color="danger" determinate={false} size="lg" />
      </section>
    );
  } else if (isError) {
    return <Error message="Topic not found..." />;
  } else {
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
  }
};

export default Articles;
