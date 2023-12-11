import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import SingleArticleCard from "./SingleArticleCard";

const SingleArticle = () => {
  const [singleArticle, setSingleArticle] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const { articleid } = useParams();
  useEffect(() => {
    getArticleById(articleid).then(({ data: { article } }) => {
      setSingleArticle(article);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>loading......</p>;
  }

  return (
    <>
      <SingleArticleCard article={singleArticle} />
    </>
  );
};

export default SingleArticle;
