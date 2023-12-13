import { useEffect, useState } from "react";
import { getCommentsByArticle } from "../utils/api";
import SingleComment from "./SingleComment";
import CommentAdder from "./CommentAdder";

const Comments = ({ articleId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getCommentsByArticle(articleId).then(({ data: { comments } }) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [comments]);

  if (isLoading) {
    return <p>fetching comments...</p>;
  }

  return (
    <>
      <CommentAdder setComments={setComments} articleId={articleId} />
      <ul id="comment-section">
        {comments.map((comment) => {
          return <SingleComment comment={comment} key={comment.comment_id} />;
        })}
      </ul>
    </>
  );
};

export default Comments;
