import React, { useEffect, useState } from "react";
import "./category.css";
import TopBar from "../../Components/Header/TopBar/TopBar";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagintaion from "../../Components/Pagination/Pagintaion";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/Header/NavBar/NavBar";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [showCourses, setShowCourses] = useState([]);
  const [orderCourses, setOrderCourses] = useState([]);
  const [orderTitle, setOrderTitle] = useState("مرتب سازی پیش فرض");
  const [status, setStatus] = useState("default");
  const [searchValue, setSearchValue] = useState("");
  const [changeDiaplayType, setChangeDisplayType] = useState("row");
  const { categoryName } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((result) => {
        setCategory(result);
        setOrderCourses(result);
        console.log(category);
      })
      .catch((err) => setCategory("هیچ دوره ای یافت نشد"));
  }, [categoryName]);

  useEffect(() => {
    switch (status) {
      case "free": {
        const freeCourses = category.filter((course) => course.price === 0);
        setOrderCourses(freeCourses);
        console.log(orderCourses);
        break;
      }

      case "money": {
        const notFreeCourses = category.filter((course) => course.price !== 0);
        setOrderCourses(notFreeCourses);
        console.log(orderCourses);
        break;
      }

      case "last": {
        setOrderCourses(category);
        console.log(orderCourses);

        break;
      }

      case "first": {
        const reverseCategory = category.slice().reverse();
        setOrderCourses(reverseCategory);
        console.log(orderCourses);

        break;
      }

      default: {
        setOrderCourses(category);
        console.log(orderCourses);
        break;
      }
    }
  }, [status]);

  const setTitleChangeHandler = (e) => {
    setOrderTitle(e.target.textContent);
  };

  const searchInputHandler = (e) => {
    setSearchValue(e.target.value);
    const filteredCourses = category.filter((course) =>
      course.name.includes(e.target.value)
    );
    setOrderCourses(filteredCourses);
    console.log(searchValue);
  };

  return (
    <>
      <TopBar />
      <NavBar />

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {!category.length ? (
                  <div className="alert alert-danger">هیچ دوره ای یافت نشد</div>
                ) : (
                  <>
                    <div className="courses-top-bar">
                      <div className="courses-top-bar__right">
                        <div
                          className={`courses-top-bar__row-btn  ${
                            changeDiaplayType === "row"
                              ? "courses-top-bar__icon--active"
                              : ""
                          }`}
                          onClick={() => setChangeDisplayType("row")}
                        >
                          <i className="fas fa-border-all courses-top-bar__icon"></i>
                        </div>
                        <div
                          className={`courses-top-bar__column-btn  ${
                            changeDiaplayType === "column"
                              ? "courses-top-bar__icon--active"
                              : ""
                          }`}
                          onClick={() => setChangeDisplayType("column")}
                        >
                          <i className="fas fa-align-left courses-top-bar__icon"></i>
                        </div>

                        <div className="courses-top-bar__selection">
                          <span className="courses-top-bar__selection-title">
                            {orderTitle}
                            <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                          </span>
                          <ul className="courses-top-bar__selection-list">
                            <li
                              className="courses-top-bar__selection-item courses-top-bar__selection-item--active"
                              onClick={(e) => {
                                setStatus("default");
                                setTitleChangeHandler(e);
                              }}
                            >
                              مرتب سازی پیش فرض
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(e) => {
                                setStatus("free");
                                setTitleChangeHandler(e);
                              }}
                            >
                              مرتب سازی دوره های رایگان
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(e) => {
                                setStatus("free");
                                setTitleChangeHandler(e);
                              }}
                            >
                              مرتب سازی دوره های غیر رایگان
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(e) => {
                                setStatus("rate");
                                setTitleChangeHandler(e);
                              }}
                            >
                              مرتب سازی بر اساس امتیاز
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(e) => {
                                setStatus("latest");
                                setTitleChangeHandler(e);
                              }}
                            >
                              مرتب سازی بر اساس آخرین دوره
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(e) => {
                                setStatus("first");
                                setTitleChangeHandler(e);
                              }}
                            >
                              مرتب سازی بر اساس اولین دوره
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(e) => {
                                setStatus("cheeper");
                                setTitleChangeHandler(e);
                              }}
                            >
                              مرتب سازی بر اساس ارزان ترین
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(e) => {
                                setStatus("expensive");
                                setTitleChangeHandler(e);
                              }}
                            >
                              مرتب سازی بر اساس گران ترین
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="courses-top-bar__left">
                        <form className="courses-top-bar__form">
                          <input
                            type="text"
                            className="courses-top-bar__input"
                            placeholder="جستجوی دوره ..."
                            onChange={searchInputHandler}
                          />
                          <i className="fas fa-search courses-top-bar__search-icon"></i>
                        </form>
                      </div>
                    </div>
                    {showCourses.length === 0 ? (
                      <div className="alert alert-warning">
                        هیچ دوره‌ای برای {orderTitle} وجود ندارد
                      </div>
                    ) : (
                      <>
                        {changeDiaplayType === "row" ? (
                          <>
                            {showCourses.map((course) => (
                              <CourseBox {...course} />
                            ))}
                          </>
                        ) : (
                          <>
                            {showCourses.map((course) => (
                              <div class="col-12">
                                <div class="course-box">
                                  <div class="course__box-header">
                                    <div class="course__box-right">
                                      <a
                                        class="course__box-right-link"
                                        href="/"
                                      >
                                        <img
                                          src="/images/courses/fareelancer.png"
                                          class="course__box-right-img"
                                          alt="fareelancer"
                                        />
                                      </a>
                                    </div>
                                    <div class="course__box-left">
                                      <div class="course__box-left-top">
                                        <a
                                          href="/"
                                          class="course__box-left-link"
                                        >
                                          {course.name}
                                        </a>
                                      </div>
                                      <div class="course__box-left-center">
                                        <div class="course__box-left-teacher">
                                          <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                          <span class="course__box-left-name">
                                            محمد امین سعیدی راد
                                          </span>
                                        </div>
                                        <div class="course__box-left-stars">
                                          <span class="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" alt="star" />
                                          </span>
                                          <span class="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" alt="star"/>
                                          </span>
                                          <span class="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" alt="star" />
                                          </span>
                                          <span class="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" alt="star"/>
                                          </span>
                                          <span class="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" alt="star"/>
                                          </span>
                                        </div>
                                      </div>
                                      <div class="course__box-left-bottom">
                                        <div class="course__box-left-des">
                                          <p>{course.description}</p>
                                        </div>
                                      </div>
                                      <div class="course__box-footer">
                                        <div class="course__box-footer-right">
                                          <i class="course__box-footer-icon fa fa-users"></i>
                                          <span class="course__box-footer-count">
                                            202
                                          </span>
                                        </div>
                                        <span class="course__box-footer-left">
                                          {course.price === 0
                                            ? "رایگان"
                                            : course.price.toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    )}

                    <Pagintaion
                      items={orderCourses}
                      itemCount={3}
                      pathname={`/category-info/${categoryName}`}
                      setShowCourses={setShowCourses}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Category;
