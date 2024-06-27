import React, { useEffect, useState } from "react";
import "./allArticle.css";
import BreadCrumb from "../../Components/BreadCrump/BreadCrumb";
import Pagintaion from "../../Components/Pagination/Pagintaion";
import TopBar from "../../Components/Header/TopBar/TopBar";
import NavBar from "../../Components/Header/NavBar/NavBar";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import Footer from "../../Components/Footer/Footer";

const AllArticle = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [showArticles, setShowArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((result) => {
        setAllArticles(result);
        console.log(allArticles);
      });
  }, []);

  return (
    <>
      <TopBar />
      <NavBar />
      <BreadCrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی مقاله ها",
            to: "articles/1",
          },
        ]}
      />

      {/* <!--------------------------------  Articles-Section  --------------------------------> */}

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {showArticles.map((article) => (
                  <ArticleBox {...article} key={article._id} />
                ))}
              </div>
            </div>
          </div>

          <Pagintaion
            items={allArticles}
            itemCount={3}
            pathname="/courses"
            setShowCourses={setShowArticles}
          />
        </div>
      </section>

      {/* <!--------------------------------  Articles-Section  --------------------------------> */}
      <Footer />
    </>
  );
};

export default AllArticle;
