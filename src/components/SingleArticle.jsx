import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleCard } from "../api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticleCard(article_id).then((article) => {
      setArticle(article);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <main className="Article">
      {article.map((article) => {
        return <ArticleCard key={article.article_id} {...article} />;
      })}
    </main>
  );
};

export default SingleArticle;