import React from "react";
import "./index.css";
import Header from "../../Components/Header/Header";
import LastCourse from "../../Components/LastCourse/LastCourse";
import AboutUs from "../../Components/AboutUs/AboutUs";
import PopularCourses from "../../Components/PopularCourses/PopularCourses";
import PreSellCourses from "../../Components/PreSell/PreSellCourses";
import LastArticles from "../../Components/LastArticles/LastArticles";

const Index = () => {
  return (
    <>
      <Header />

      <LastCourse />

      <PopularCourses />

      <PreSellCourses />

      <LastArticles />

      <AboutUs />
    </>
  );
};

export default Index;
