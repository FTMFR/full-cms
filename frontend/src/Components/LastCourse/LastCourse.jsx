import React, { useEffect, useState } from "react";
import "./lastCourse.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";

const LastCourse = () => {
  const [allCourse, setAllCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((result) => {
        setAllCourse(result);
        // console.log(allCourse);
      });
  }, []);

  return (
    <>
      <div className="course">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاب شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            href="courses"
          />

          <div className="course-content">
            <div className="container">
              <div className="row">
                {allCourse.splice(0, 3).map((course) => (
                  <CourseBox key={course._id} {...course} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastCourse;
