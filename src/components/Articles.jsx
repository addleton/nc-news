import { useEffect, useState } from "react";
import { getAllArticles, getAllTopics, getArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";
import LinearProgress from "@mui/joy/LinearProgress";
import { useLocation, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getTopicArticles } from "../utils/utils";
import Error from "./Error";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortInput, setSortInput] = useState("created_at");
  const [orderInput, setOrderInput] = useState("desc");
  const [sortQuery, setSortQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSorting, setIsSorting] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const paramValue = query.get("topic");

  const updateSortInput = (e) => {
    setSortInput(e.target.value);
  };

  const updateOrderInput = (e) => {
    setOrderInput(e.target.value);
  };

  const handleSort = () => {
    setIsSorting(true);
    setSortQuery(`?sort_by=${sortInput}&order=${orderInput}`);
    setSearchParams(`?sort_by=${sortInput}&order=${orderInput}`);
  };

  useEffect(() => {
    getAllArticles(sortQuery).then(({ data: { articles } }) => {
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
      setIsSorting(false);
      setIsLoading(false);
    });
  }, [paramValue, sortQuery]);

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
        <div id="article-filter">
          <select
            onClick={updateSortInput}
            placeholder="filter"
            name="sort"
            id="sort-by-bar"
          >
            Sort
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
          <div id="order-by-buttons">
            <input
              onClick={updateOrderInput}
              type="radio"
              name="order"
              value="desc"
              id="desc"
            ></input>
            <label htmlFor="desc">DESC</label>
            <input
              onClick={updateOrderInput}
              type="radio"
              name="order"
              value="asc"
              id="asc"
            ></input>
            <label htmlFor="asc">ASC</label>
          </div>
          <button id="submit-sort-button" onClick={handleSort}>
            Sort
          </button>
        </div>
        {isSorting ? <p>Sorting...</p> : null}
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
