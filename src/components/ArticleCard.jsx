import { Link } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { patchArticleVotes } from "../utils/api";
import { useState } from "react";
import Alert from "@mui/joy/Alert";

const ArticleCard = ({ article, setArticles }) => {
  const [isError, setIsError] = useState(false);

  const handleUpvote = (selectedArticle) => {
    setArticles((currentArticles) => {
      return currentArticles.map((article) => {
        if (article === selectedArticle) {
          return { ...article, votes: article.votes + 1 };
        }
        return article;
      });
    });
    patchArticleVotes(article.article_id, 1)
      .then(() => {
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  const handleDownvote = (selectedArticle) => {
    setArticles((currentArticles) => {
      return currentArticles.map((article) => {
        if (article === selectedArticle) {
          return { ...article, votes: article.votes - 1 };
        }
        return article;
      });
    });
    patchArticleVotes(article.article_id, -1)
      .then(() => {
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  if (isError) {
    <Alert color="danger" size="lg" variant="soft">
      There seems to have been an issue. Reload and try again.
    </Alert>;
  }

  return (
    <section className="article-card">
      <Card variant="soft" color="neutral" sx={{ width: 320 }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <Link to={`/articles/${article.article_id}`}>
              <img src={article.article_img_url} loading="lazy" alt="" />
            </Link>
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-md">{article.title}</Typography>
          <Typography level="body-sm">{article.topic}</Typography>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal" className="article-card-footer">
            <section className="article-card-footer-element">
              <Typography
                level="body-md"
                fontWeight="md"
                textColor="text.secondary"
              >
                {article.author}
              </Typography>
              <PersonOutlineOutlinedIcon />
            </section>
            <Divider orientation="vertical" />
            <div className="article-votes">
              <button
                onClick={() => {
                  handleUpvote(article);
                }}
              >
                <ThumbUpOffAltIcon fontSize="small" />
              </button>
              <p>{article.votes}</p>
              <button
                onClick={() => {
                  handleDownvote(article);
                }}
              >
                <ThumbDownOffAltIcon fontSize="small" />
              </button>
            </div>
          </CardContent>
        </CardOverflow>
      </Card>
    </section>
  );
};

export default ArticleCard;
