import React from "react";
import "./article.css";
import TopBar from "../../Components/Header/TopBar/TopBar";
import NavBar from "../../Components/Header/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import BreadCrumb from "../../Components/BreadCrump/BreadCrumb";
import Comments from "../../Components/Comments/Comments";

const Article = () => {
  return (
    <>
      <TopBar />
      <NavBar />

      <BreadCrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "مقاله ما", to: "category-info/frontend" },
          {
            id: 3,
            title: "vue در مقایسه با react",
            to: "category-info/vue-vs-react",
          },
        ]}
      />

      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="article">
                <h1 className="article__title">
                  معرفی بهترین سایت آموزش جاوا اسکریپت | تجربه محور + آموزش
                  رایگان
                </h1>
                <div className="article__header">
                  <div className="article-header__category article-header__item">
                    <i className="far fa-folder article-header__icon"></i>
                    <a href="/" className="article-header__text">
                      جاوا اسکریپت
                    </a>
                  </div>

                  <div className="article-header__category article-header__item">
                    <i className="far fa-user article-header__icon"></i>
                    <a href="/" className="article-header__text">
                      ارسال شده توسط فاطمه
                    </a>
                  </div>

                  <div className="article-header__category article-header__item">
                    <i className="far fa-eye article-header__icon"></i>
                    <a href="/" className="article-header__text">
                      بازدید 12.4k{" "}
                    </a>
                  </div>
                </div>
                <img
                  src="/images/blog/1.jpg"
                  alt="Article Cover"
                  className="article__banner"
                />

                <div className="article__score">
                  <div className="article__score-icon">
                    <img
                      src="/images/svgs/star_fill.svg"
                      alt="article score"
                      className="article__acore-icon"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      alt="article score"
                      className="article__acore-icon"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      alt="article score"
                      className="article__acore-icon"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      alt="article score"
                      className="article__acore-icon"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      alt="article score"
                      className="article__acore-icon"
                    />
                  </div>
                  <span className="article__score-text">امتیاز 5 - 4.2/5</span>
                </div>
                <p className="article__paragraph paragraph">
                  adipisicing elit. Obcaecati nam, mollitia dicta consequatur
                  culpa voluptas voluptatum officiis asperiores neque maiores
                  impedit! Praesentium, maiores? Quam, optio laborum! Saepe, non
                  iste voluptate, ipsa molestias soluta doloribus excepturi
                  ipsam vel fuga, explicabo minima voluptates culpa animi
                  officia magnam illum laboriosam nesciunt blanditiis inventore.
                </p>

                <div className="article-read">
                  <div className="article-read__title">
                    آنچه در این مقاله خواهید خواند:{" "}
                  </div>

                  <ul className="article-read__list">
                    <li className="article-read__item">
                      <a href="/" className="article-read__link">
                        معرفی بهترین سایت های آموزش جاوا اسکریپت
                      </a>
                    </li>
                    <li className="article-read__item">
                      <a href="/" className="article-read__link">
                        راه آسان تر، دوره های جاوا اسکریپت آکادمی سبزلرن
                      </a>
                    </li>
                    <li className="article-read__item">
                      <a href="/" className="article-read__link">
                        ثبت نام در دوره جاوا اسکریپت آکادمی سبزلرن
                      </a>
                    </li>
                  </ul>
                </div>

                <img
                  src="/images/blog/2.jpg"
                  alt="Article cover"
                  className="article__secondary-banner"
                />

                <div className="article-section">
                  <h2 className="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p className="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                  <img
                    src="/images/blog/4.png"
                    alt="article body img"
                    className="article-section__img"
                  />
                </div>
                <div className="article-section">
                  <h2 className="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p className="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                </div>
                <div className="article-section">
                  <h2 className="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p className="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                  <img
                    src="/images/blog/3.jpg"
                    alt="article body img"
                    className="article-section__img"
                  />
                </div>

                <div className="article-social-media">
                  <span className="article-social-media__text">
                    اشتراک گذاری :
                  </span>
                  <a href="/" className="article-social-media__link">
                    <i className="fab fa-telegram-plane article-social-media__icon"></i>
                  </a>
                  <a href="/" className="article-social-media__link">
                    <i className="fab fa-twitter article-social-media__icon"></i>
                  </a>
                  <a href="/" className="article-social-media__link">
                    <i className="fab fa-facebook-f article-social-media__icon"></i>
                  </a>
                </div>

                <div className="suggestion-articles">
                  <div className="row">
                    <div className="col-6">
                      <div className="suggestion-articles__right suggestion-articles__content">
                        <a href="/" className="suggestion-articles__icon-link">
                          <i className="fas fa-arrow-right suggestion-articles__icon"></i>
                        </a>
                        <a href="/" className="suggestion-articles__link">
                          سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                          تجربه برنامه نویسان
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="suggestion-articles__left suggestion-articles__content">
                        <a href="/" className="suggestion-articles__icon-link">
                          <i className="fas fa-arrow-left suggestion-articles__icon"></i>
                        </a>
                        <a href="/" className="suggestion-articles__link">
                          سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                          تجربه برنامه نویسان
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <Comments />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Article;
