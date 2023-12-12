import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { patchArticleVotes } from "../utils/api";
import { useState } from "react";

const SingleArticleCard = ({ article }) => {
  const [singleVotes, setSingleVotes] = useState(article.votes);
  const handleUpvote = () => {
    setSingleVotes(singleVotes + 1);
    patchArticleVotes(article.article_id, 1);
  };
  const handleDownvote = () => {
    setSingleVotes(singleVotes - 1);
    patchArticleVotes(article.article_id, -1);
  };

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
