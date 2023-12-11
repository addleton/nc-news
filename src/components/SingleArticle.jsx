import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import SingleArticleCard from "./SingleArticleCard";

const SingleArticle = ({ articles, setArticles }) => {
  const { articleid } = useParams();
  useEffect(() => {
    getArticleById(articleid).then(({ data: { article } }) => {
      setArticles(article);
    });
  }, []);

  return (
    <>
    <SingleArticleCard article={articles}/>
    </>
  )
};

export default SingleArticle;
