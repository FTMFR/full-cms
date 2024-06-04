import React, { useEffect, useState } from "react";
import "./search.css";
import TopBar from "../../Components/Header/TopBar/TopBar";
import NavBar from "../../Components/Header/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

const Search = () => {
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);
  const { value } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setArticles(result.allResultArticles);
        setCourses(result.allResultCourses);
      });
  }, [value]);

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="courses">
        <div className="container">
          <div className="row">
            <SectionHeader
              title="نتیجه دوره ها برای جستجوی شما"
              desc="سکوی پرتاب شما به سوی موفقیت"
            />

            {courses.length === 0 ? (
              <div className="alert alert-warning">
                دوره ای برای جستجو یافت نشد.
              </div>
            ) : (
              <>
                {courses.map((course) => (
                  <CourseBox {...course} key={course._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
   
   
      <div className="courses">
        <div className="container">
          <div className="row">
            <SectionHeader
              title="نتیجه مقالات برای جستجوی شما"
              desc="سکوی پرتاب شما به سوی موفقیت"
            />

            {articles.length === 0 ? (
              <div className="alert alert-warning">
                مثاله ای برای جستجو یافت نشد.
              </div>
            ) : (
              <>
                {articles.map((article) => (
                  <ArticleBox {...article} key={article._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Search;
