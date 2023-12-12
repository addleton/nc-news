import { useEffect, useState } from "react";
import { getCommentsByArticle } from "../utils/api";
import SingleComment from "./SingleComment";

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getCommentsByArticle(articleId).then(({ data: { comments } }) => {
      setComments(comments);
    });
  }, []);

  return (
    <>
      <ul id='comment-section'>
        {comments.map((comment) => {
          return <SingleComment comment={comment} key={comment.comment_id} />;
        })}
      </ul>
    </>
  );
};

export default Comments;
