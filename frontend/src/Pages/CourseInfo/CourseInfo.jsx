import React from "react";
import "./courseInfo.css";
import TopBar from "../../Components/Header/TopBar/TopBar";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import BreadCrumb from "../../Components/BreadCrump/BreadCrumb";

const CourseInfo = () => {
  return (
    <>
      <TopBar />
      <NavBar />
      <BreadCrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "آموزش برنامه نویسی فرانت اند", to: "category-info/frontend" },
          { id: 3, title: "دوره متخصص جاوا اسکریپت", to: "course-info/js-expert" },
        ]}
      />
      <Footer />
    </>
  );
};

export default CourseInfo;
