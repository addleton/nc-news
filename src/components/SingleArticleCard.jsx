const SingleArticleCard = ({ article }) => {
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
        <p>{article.votes}</p>
        <p>{article.comment_count}</p>
      </section>
    </article>
  );
};

export default SingleArticleCard;
