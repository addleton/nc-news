import { useEffect, useState } from "react";
import { getAllArticles, getAllTopics, getArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";
import LinearProgress from "@mui/joy/LinearProgress";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [chosenTopic, setChosenTopic] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setChosenTopic(event.target.value);
  };

  useEffect(() => {
    getAllTopics().then(({ data: { topics } }) => {
      setTopics(topics);
    });
    if (!chosenTopic) {
      getAllArticles().then(({ data: { articles } }) => {
        setArticles(articles);
        setIsLoading(false);
      });
    } else {
      getArticlesByTopic(chosenTopic).then(({ data: { articles } }) => {
        setArticles(articles);
        setIsLoading(false);
      });
    }
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
      <select id="topic-selector" onChange={handleChange}>
        <option value="">All</option>
        {topics.map((topic) => {
          return <option value={`${topic.slug}`}>{`${topic.slug}`}</option>;
        })}
      </select>

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
