import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import SingleArticleCard from "./SingleArticleCard";
import Comments from "./Comments";
import Error from "./Error";

const SingleArticle = () => {
  const [singleArticle, setSingleArticle] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { articleid } = useParams();
  useEffect(() => {
    getArticleById(articleid)
      .then(({ data: { article } }) => {
        setSingleArticle(article);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setApiError({ status: response.status, message: response.data.msg });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>loading......</p>;
  } else if (apiError) {
    return <Error message={apiError.message} />;
  } else {
    return (
      <>
        <SingleArticleCard
          article={singleArticle}
          setSingleArticle={setSingleArticle}
        />
        <Comments articleId={singleArticle.article_id} />
      </>
    );
  }
};

export default SingleArticle;
