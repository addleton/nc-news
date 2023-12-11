const ArticleCard = ({ article }) => {
  return (
    <section className="article-card">
      <img src={article.article_img_url} alt="" className="article-card-img" />
      <h3>{article.title}</h3>
      <section className="article-card-info">
        <p>{article.topic}</p>
        <p>{article.author}</p>

        <p>{article.votes}</p>
      </section>
    </section>
  );
};

export default ArticleCard;
