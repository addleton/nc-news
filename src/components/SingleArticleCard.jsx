import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { patchArticleVotes } from "../utils/api";
import { useState } from "react";
import Alert from "@mui/joy/Alert";

const SingleArticleCard = ({ article }) => {
  const [singleVotes, setSingleVotes] = useState(article.votes);
  const [isError, setIsError] = useState(false);
  const handleUpvote = () => {
    setSingleVotes(singleVotes + 1);
    patchArticleVotes(article.article_id, 1)
      .then(() => {
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  };
  const handleDownvote = () => {
    setSingleVotes(singleVotes - 1);
    patchArticleVotes(article.article_id, -1)
      .then(() => {
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  if (isError) {
    return (
      <Alert color="danger" size="lg" variant="soft">
        There seems to have been an issue. Reload and try again.
      </Alert>
    );
  }

  return (
    <article className="single-article-card">
      {" "}
      <h2>{article.title}</h2>
      <img
        src={article.article_img_url}
        alt=""
        className="single-article-card-img"
      />
      <p>{article.body}</p>
      <section className="single-article-card-footer">
        <p>{article.topic}</p>
        <p>{article.author}</p>
        <p>{article.comment_count}</p>
        <div className="article-votes">
          <button
            onClick={() => {
              handleUpvote();
            }}
          >
            <ThumbUpOffAltIcon fontSize="small" />
          </button>
          <p>{singleVotes}</p>
          <button
            onClick={() => {
              handleDownvote();
            }}
          >
            <ThumbDownOffAltIcon fontSize="small" />
          </button>
        </div>
      </section>
    </article>
  );
};

export default SingleArticleCard;
