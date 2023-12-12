import { useContext, useState } from "react";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import { UserContext } from "../context/UserContext";
import { postCommentByArticle } from "../utils/api";

const CommentAdder = ({ setComments, articleId }) => {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [enabled, setEnabled] = useState(true);
  const { currentUser } = useContext(UserContext);
  const updateInput = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (input.length < 5) {
      setFeedback("Please post a longer message");
      setTimeout(() => {
        setFeedback("");
      }, 5000);
      return;
    }

    if (!enabled) {
      setFeedback("Please wait 5 seconds between comment posts");
      return;
    }
    postCommentByArticle(articleId, currentUser, input).then(
      ({ data: { comment } }) => {
        setComments((currentComments) => {
          return [comment, ...currentComments];
        });
        setInput("");
        setEnabled(false);
        setFeedback("Comment successfully posted!");
        setTimeout(() => {
          setFeedback("");
          setEnabled(true);
        }, 5000);
      }
    );
  };

  return (
    <form className="add-comment-form">
      <Textarea
        color="neutral"
        disabled={false}
        minRows={3}
        placeholder="Add comment..."
        size="lg"
        variant="outlined"
        onChange={updateInput}
        value={input}
      />
      <Button onClick={handleSubmit} color="neutral" size="sm" variant="solid">
        Post
      </Button>
      {feedback && <p>{feedback}</p>}
    </form>
  );
};

export default CommentAdder;
