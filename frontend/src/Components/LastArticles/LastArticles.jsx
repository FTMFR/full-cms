import React, { useEffect, useState } from "react";
import "./lastArticles.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import ArticleBox from "../ArticleBox/ArticleBox";

const LastArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((result) => {
        setArticles(result);
        // console.log(result);
      });
  }, []);

  return (
    <div className="articles">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          href={`/articles/1`}
        />

        <div className="articles__content">
          <div className="row">
            {articles.slice(0, 3).map((article) => (
              <ArticleBox {...article} key={article._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastArticles;
