import React from "react";
import "./courses.css";
import TopBar from "./../../Components/Header/TopBar/TopBar";
import NavBar from "./../../Components/Header/NavBar/NavBar";
import BreadCrumb from "./../../Components/BreadCrump/BreadCrumb";
import Footer from "./../../Components/Footer/Footer";
import CourseBox from "./../../Components/CourseBox/CourseBox";

const Courses = () => {
  return (
    <>
      <TopBar />
      <NavBar />

      <BreadCrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses",
          },
        ]}
      />

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                <CourseBox />
                <CourseBox />
                <CourseBox />
                <CourseBox />
                <CourseBox />
                <CourseBox />
                <CourseBox />
              </div>
            </div>
          </div>

          <div class="courses-pagination">
            <ul class="courses__pagination-list">
              <li class="courses__pagination-item">
                <a href="/" class="courses__pagination-link">
                  <i class="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
                </a>
              </li>
              <li class="courses__pagination-item">
                <a
                  href="/"
                  class="courses__pagination-link courses__pagination-link--active"
                >
                  1
                </a>
              </li>
              <li class="courses__pagination-item">
                <a href="/" class="courses__pagination-link">
                  2
                </a>
              </li>
              <li class="courses__pagination-item">
                <a href="/" class="courses__pagination-link">
                  3
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Courses;
