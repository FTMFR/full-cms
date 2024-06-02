import React, { useEffect, useState } from "react";
import "./preSellCourses.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import CourseBox from "../CourseBox/CourseBox";

const PreSellCourses = () => {
  const [allPreSells, setAllPreSells] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/presell")
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setAllPreSells(result);
      });
  }, []);

  return (
    <div className="presell">
      <div className="container">
        <SectionHeader
          title="دوره های در حال پیش فروش"
          desc="متن تستی برای توضیحات دروه های پیش فروش"
          btnTitle="تمامی دوره ها"
          href="/presellCourses/1"
        />
        <div className="course-content">
          <div className="container">
            <div className="row">
              <Swiper spaceBetween={50} slidesPerView={3}>
                {allPreSells.map((presell, index) => (
                  <SwiperSlide key={index}>
                    <CourseBox {...presell} isSlider={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSellCourses;
