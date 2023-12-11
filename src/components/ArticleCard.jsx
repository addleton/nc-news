import { Link } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const ArticleCard = ({ article }) => {
  return (
    <section className="article-card">
      <Card variant="soft" color="neutral" sx={{ width: 320 }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img src={article.article_img_url} loading="lazy" alt="" />
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
            <section className="article-card-footer-element">
              <Typography
                level="body-md"
                fontWeight="md"
                textColor="text.secondary"
              >
                {article.votes}
              </Typography>
              <ThumbUpOutlinedIcon />
            </section>
          </CardContent>
        </CardOverflow>
      </Card>
    </section>
  );
};

export default ArticleCard;
