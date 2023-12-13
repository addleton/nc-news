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
    getAllArticles().then(({ data: { articles } }) => {
      setArticles(articles);
      if (paramValue) {
        const newArticles = getTopicArticles(articles, paramValue);
        setArticles(newArticles);
      }
      setIsLoading(false);
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
      <div id="article-filter">
        <select placeholder="filter" name="sort" id="">
          Sort
          <option value="">Date</option>
          <option value="">Comment Count</option>
          <option value="">Votes</option>
        </select>
        <input type="radio" value="asc" id='asc'></input>
        <label htmlFor="asc">ASC</label>
        <input type="radio" value="desc" id='desc'></input>
        <label htmlFor="desc">DESC</label>
      </div>
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
