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
  const [shownCourses, setShownCourses] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          console.log(result);
          setCategory(result);
        } else {
          setCategory("");
        }
      })
      .catch((err) => setCategory("هیچ دوره ای یافت نشد"));
  }, [categoryName]);

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
                        <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
                          <i className="fas fa-border-all courses-top-bar__icon"></i>
                        </div>
                        <div className="courses-top-bar__column-btn">
                          <i className="fas fa-align-left courses-top-bar__icon"></i>
                        </div>

                        <div className="courses-top-bar__selection">
                          <span className="courses-top-bar__selection-title">
                            مرتب سازی پیش فرض
                            <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                          </span>
                          <ul className="courses-top-bar__selection-list">
                            <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active">
                              مرتب سازی پیش فرض
                            </li>
                            <li className="courses-top-bar__selection-item">
                              مرتب سازی بر اساس محبوبیت
                            </li>
                            <li className="courses-top-bar__selection-item">
                              مرتب سازی بر اساس امتیاز
                            </li>
                            <li className="courses-top-bar__selection-item">
                              مرتب سازی بر اساس آخرین
                            </li>
                            <li className="courses-top-bar__selection-item">
                              مرتب سازی بر اساس ارزان ترین
                            </li>
                            <li className="courses-top-bar__selection-item">
                              مرتب سازی بر اساس گران ترین
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="courses-top-bar__left">
                        <form action="#" className="courses-top-bar__form">
                          <input
                            type="text"
                            className="courses-top-bar__input"
                            placeholder="جستجوی دوره ..."
                          />
                          <i className="fas fa-search courses-top-bar__search-icon"></i>
                        </form>
                      </div>
                    </div>
                    
                    {shownCourses.map((course) => (
                      <CourseBox {...course} key={course._id} />
                    ))}


                    <Pagintaion
                      items={category}
                      itemCount={3}
                      pathname={`/category-info/${categoryName}`}
                      setShowCourses={setShownCourses}
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
