import React, { useState } from "react";
import "./courseBox.css";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import { Link } from "react-router-dom";

const CourseBox = (props) => {
  const [isImgShow, setIsImgShow] = useState(false);

  const onImageLoader = () => {
    setIsImgShow(true);
  };

  const onImageError = (error) => {
    // console.log(error);
  };

  console.log(props);

  return (
    <div className="col-4" style={{ width: `${props.isSlider && "100%"}` }}>
      <div className="course-box">
        <Link to={`/course-info/${props.shortName}`}>
          <img
            src={`${props.cover}`}
            alt="Course img"
            className="course-box__img"
            onLoad={onImageLoader}
            onError={(e) => onImageError(e)}
          />
          {!isImgShow && <CircleSpinner />}
        </Link>
        <div className="course-box__main">
          <Link
            to={`/course-info/${props.shortName}`}
            className="course-box__title"
          >
            {props.name}
          </Link>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <Link to="/" className="course-box__teacher-link">
                {props.creator.name}
              </Link>
            </div>
            <div className="course-box__rating">
              {Array(5 - props.courseAverageScore)
                .fill(0)
                .map((star) => (
                  <img
                    src="/images/svgs/star.svg"
                    alt="rating"
                    className="course-box__star"
                  />
                ))}
              {Array(props.courseAverageScore)
                .fill(0)
                .map((star) => (
                  <img
                    src="/images/svgs/star_fill.svg"
                    alt="rating"
                    className="course-box__star"
                  />
                ))}
            </div>
          </div>

          <div className="course-box__status">
            <div className="course-box__users">
              <i className="fas fa-users course-box__users-icon"></i>
              <span className="course-box__users-text">{props.discount}</span>
            </div>
            <span className="course-box__price">
              {props.price === 0 ? "رایگان" : props.price.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link
            to={`/course-info/${props.shortName}`}
            className="course-box__footer-link"
          >
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseBox;
