import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { convertTime } from "../utils/utils";
import Divider from "@mui/joy/Divider";

const SingleComment = ({ comment }) => {
  const newTime = convertTime(comment.created_at);
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
