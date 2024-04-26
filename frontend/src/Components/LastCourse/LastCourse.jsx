import React from "react";
import "./lastCourse.css";
import SectionHeader from "../SectionHeader/SectionHeader";

const LastCourse = () => {
  return (
    <>
      <div class="courses">
        <div class="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
          />
        </div>
      </div>
    </>
  );
};

export default LastCourse;
