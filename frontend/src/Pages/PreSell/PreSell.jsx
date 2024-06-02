import React, { useEffect, useState } from "react";
import TopBar from "../../Components/Header/TopBar/TopBar";
import NavBar from "../../Components/Header/NavBar/NavBar";
import BreadCrumb from "../../Components/BreadCrump/BreadCrumb";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagintaion from "../../Components/Pagination/Pagintaion";
import Footer from "../../Components/Footer/Footer";

const Presell = () => {
  const [allPreSells, setAllPreSells] = useState([]);
  const [showCourses, setShowCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/presell")
      .then((res) => res.json())
      .then((result) => {
          setAllPreSells(result);
        });
    }, []);
    
    console.log(showCourses);

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

      {/* <!--------------------------------  PreSells-Section  --------------------------------> */}

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
            items={allPreSells}
            itemCount={3}
            pathname="/presellCourses"
            setShowCourses={setShowCourses}
          />
        </div>
      </section>

      {/* <!--------------------------------  PreSells-Section  --------------------------------> */}

      <Footer />
    </>
  );
};

export default Presell;
