import { useEffect, useState } from "react";
import { getCommentsByArticle } from "../utils/api";
import SingleComment from "./SingleComment";

const Comments = ({ articleId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getCommentsByArticle(articleId).then(({ data: { comments } }) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>fetching comments...</p>;
  }

  return (
    <>
      <ul id="comment-section">
        {comments.map((comment) => {
          return <SingleComment comment={comment} key={comment.comment_id} />;
        })}
      </ul>
    </>
  );
};

export default Comments;
