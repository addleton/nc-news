import { useEffect, useState } from "react";
import { getAllArticles, getAllTopics, getArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";
import LinearProgress from "@mui/joy/LinearProgress";
import { useLocation, useSearchParams } from "react-router-dom";
import { getTopicArticles } from "../utils/utils";
import Error from "./Error";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortInput, setSortInput] = useState("created_at");
  const [orderInput, setOrderInput] = useState("desc");
  const [sortQuery, setSortQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSorting, setIsSorting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [topicQuery, setTopicQuery] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const paramValue = query.get("topic");

  const handleTopicClick = (e) => {
    if (e.target.value) {
      setTopicQuery(`?topic=${e.target.value}`);
      setSearchParams(`?topic=${e.target.value}`);
      setSortQuery("");
    } else {
      setSortQuery("");
      setTopicQuery("");
    }
  };

  const updateSortInput = (e) => {
    setSortInput(e.target.value);
  };

  const updateOrderInput = (e) => {
    setOrderInput(e.target.value);
  };

  const handleSort = () => {
    setIsSorting(true);
    if (topicQuery) {
      setSortQuery(`&sort_by=${sortInput}&order=${orderInput}`);
      setSearchParams(`&sort_by=${sortInput}&order=${orderInput}`);
    } else {
      setSortQuery(`?sort_by=${sortInput}&order=${orderInput}`);
      setSearchParams(`?sort_by=${sortInput}&order=${orderInput}`);
    }
  };

  useEffect(() => {
    getAllArticles(sortQuery, topicQuery)
      .then(({ data: { articles } }) => {
        setIsError(false);
        setArticles(articles);
        setIsSorting(false);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setApiError({ status: response.status, message: response.data.msg });
      });
  }, [paramValue, sortQuery, topicQuery, isSorting]);

  if (isLoading) {
    return (
      <section className="loading-bar">
        <p>Retrieving content...</p>
        <LinearProgress color="danger" determinate={false} size="lg" />
      </section>
    );
  } else if (apiError) {
    return <Error message="Topic not found..." />;
  } else {
    return (
      <section id="article-container">
        <select onChange={handleTopicClick} name="topics" id="topic-selector">
          <option value="">Home</option>
          <option value="coding">Coding</option>
          <option value="cooking">Cooking</option>
          <option value="football">Football</option>
        </select>
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
