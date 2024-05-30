import React from "react";
import "./articleBox.css";
import { Link } from "react-router-dom";

const ArticleBox = (props) => {
  return (
    <div className="col-4">
      <div className="article-card">
        <div className="article-card__header">
          <Link to={`/article-info/${props.shortName}`} className="article-card__link-img">
            <img
              src={`../images/blog/${props.cover}`}
              className="article-card__img"
              alt="article cover"
            />
          </Link>
        </div>
        <div className="article-card__content">
          <Link to={`/article-info/${props.shortName}`} className="article-card__link">
            {props.title}
          </Link>
          <p className="article-card_text">{props.description}</p>
          <button className="article-card__btn">
            <Link to={`/article-info/${props.shortName}`}>
            بیشتر بخوانید ...
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleBox;
