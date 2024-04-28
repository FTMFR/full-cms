import React from "react";
import "./lastArticles.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import ArticleBox from "../ArticleBox/ArticleBox";

const LastArticles = () => {
  return (
    <div className="articles">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
        />

        <div className="articles__content">
          <div className="row">
            <ArticleBox
              title="نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"
              desc="زبان پایتون هم مانند دیگر زبان های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع"
              cover="images/blog/3.jpg"
            />
            <ArticleBox
              title="نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"
              desc="زبان پایتون هم مانند دیگر زبان های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع"
              cover="images/blog/3.jpg"
            />
            <ArticleBox
              title="نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"
              desc="زبان پایتون هم مانند دیگر زبان های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع"
              cover="images/blog/3.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastArticles;
