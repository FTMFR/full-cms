import React, { useEffect, useState } from "react";
import "./popularCourses.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import CourseBox from "../CourseBox/CourseBox";

const PopularCourses = () => {
  const [allPopular, setAllPopular] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/popular")
      .then((res) => res.json())
      .then((result) => {
        setAllPopular(result);
      });
  }, []);


  return (
    <>
      <div className="popular">
        <div className="container">
          <SectionHeader
            title="محبوب ترین دوره ها"
            desc="دوره های محبوب بر اساس امتیاز دانشجوها"
            btnTitle="تمامی دوره ها"
            href="/popularCourses/1"
          />
        </div>
        <div className="course-content">
          <div className="container">
            <div className="row">
              <Swiper spaceBetween={50} slidesPerView={3}>
                {allPopular.map((popular, index) => (
                  <SwiperSlide key={index}>
                    <CourseBox {...popular} isSlider={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularCourses;
