import React, { useState } from "react";
import "./index.css";
import Header from "../../Components/Header/Header";
import LastCourse from "../../Components/LastCourse/LastCourse";
import AboutUs from "../../Components/AboutUs/AboutUs";
import PopularCourses from "../../Components/PopularCourses/PopularCourses";
import PreSellCourses from "../../Components/PreSellCourses/PreSellCourses";
import LastArticles from "../../Components/LastArticles/LastArticles";
import Footer from "../../Components/Footer/Footer";

const Index = (props) => {
  const [show, setModalShow] = useState(true);

  return (
    <>
      <Header />

      <LastCourse />

      <PopularCourses />

      <PreSellCourses />

      <LastArticles />

      <AboutUs />

      <Footer />
    </>
  );
};

export default Index;
