import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { convertTime } from "../utils/utils";
import Divider from "@mui/joy/Divider";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { deleteSingleUserComment } from "../utils/api";

const SingleComment = ({ comment, setComments }) => {
  const [isError, setIsError] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { currentUser } = useContext(UserContext);
  const newTime = convertTime(comment.created_at);

  const handleDelete = () => {
    if (isDeleted) {
      return;
    }
    setIsDeleted(true);
    deleteSingleUserComment(comment.comment_id)
      .then(() => {
        setComments((currentComments) => {
          return currentComments.filter((selectedComment) => {
            return comment.comment_id !== selectedComment.comment_id;
          });
        });
        setIsDeleted(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  return (
    <>
      <Card
        className="comment-card"
        variant="plain"
        color="primary"
        invertedColors
        sx={{
          maxWidth: "100%",
          overflow: "auto",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip size="sm" variant="soft">
            Posted: {newTime}
          </Chip>
        </Box>
        <CardContent>
          <Typography level="title-lg">{comment.author}</Typography>
          <section id="single-comment">
            <Typography level="body-md" id="single-comment-body">
              {comment.body}
            </Typography>
            {currentUser === comment.author && !isDeleted && !isError && (
              <Typography level="body-md" id="single-delete-comment">
                <button id="delete-button" onClick={handleDelete}>
                  Delete comment
                </button>
              </Typography>
            )}
            {currentUser === comment.author && isDeleted && !isError && (
              <Typography id="delete-comment-text" level="body-md">
                Deleting...
              </Typography>
            )}
            {currentUser === comment.author && isError && (
              <Typography id="error-delete-comment-text" level="body-md">
                Error - Please try again
              </Typography>
            )}
            <Typography level="body-md" id="single-comment-vote">
              {comment.votes}
            </Typography>
          </section>
        </CardContent>
      </Card>
      <Divider orientation="horizontal" />
    </>
  );
};

export default SingleComment;
