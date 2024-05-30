import React, { useEffect, useState } from "react";
import "./courses.css";
import TopBar from "./../../Components/Header/TopBar/TopBar";
import NavBar from "./../../Components/Header/NavBar/NavBar";
import BreadCrumb from "./../../Components/BreadCrump/BreadCrumb";
import Footer from "./../../Components/Footer/Footer";
import CourseBox from "./../../Components/CourseBox/CourseBox";
import Pagintaion from "../../Components/Pagination/Pagintaion";

const Courses = () => {
  const [allCourse, setAllCourse] = useState([]);
  const [showCourses, setShowCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((result) => {
        setAllCourse(result);
        console.log(result);
      });
  }, []);

  console.log(allCourse);

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

      {/* <!--------------------------------  Courses-Section  --------------------------------> */}

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {showCourses.map((course) => (
                  <CourseBox {...course} key={course._id} />
                ))}
              </div>
            </div>
          </div>

          <Pagintaion
            items={allCourse}
            itemCount={3}
            pathname="/courses"
            setShowCourses={setShowCourses}
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Courses;
