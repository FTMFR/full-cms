import React from "react";
import "./lastCourse.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";

const LastCourse = () => {
  return (
    <>
      <div className="course">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاب شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            href='courses'
          />

          <div className="course-content">
            <div className="container">
              <div className="row">
                <CourseBox />
                <CourseBox />
                <CourseBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastCourse;
