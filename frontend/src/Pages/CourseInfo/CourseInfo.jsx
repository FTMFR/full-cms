import React, { useEffect, useState } from "react";
import "./courseInfo.css";
import TopBar from "../../Components/Header/TopBar/TopBar";
import NavBar from "../../Components/Header/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import BreadCrumb from "../../Components/BreadCrump/BreadCrumb";
import CourseDetailBox from "../../Components/CourseDetailBox/CourseDetailBox";
import Accordion from "react-bootstrap/Accordion";
import { Link, useParams } from "react-router-dom";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";
import swal from "sweetalert";

const CourseInfo = () => {
  const localStorageData = JSON.parse(localStorage.getItem("User-Token"));
  const [oneCourse, setOneCourse] = useState({});
  const [breadCrumb, setBreadCrumb] = useState([]);
  const [creator, setCreator] = useState({});
  const [createdAt, setCreatedAt] = useState("");
  const [updateAt, setUpdateAt] = useState("");
  const [comments, setComment] = useState([]);
  const [session, setSession] = useState([]);
  const [newCommentBody, setNewCommentBody] = useState("");
  const [relatedCourse, setRelatedCourse] = useState([]);

  const { courseName } = useParams();

  useEffect(() => {
    getAllCourses();

    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
      .then((res) => res.json())
      .then((result) => {
        setRelatedCourse(result);
      });
  }, []);

  const getAllCourses = () => {
    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          localStorageData.token === null ? null : localStorageData.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((courseInfo) => {
        setOneCourse(courseInfo);
        setBreadCrumb(courseInfo.categoryID);
        setCreator(courseInfo.creator);
        setCreatedAt(courseInfo.createdAt);
        setUpdateAt(courseInfo.updatedAt);
        setComment(courseInfo.comments);
        setSession(courseInfo.sessions);
        console.log(courseInfo);
      });
  };

  const submitComment = (newCommentBody, scorecomment) => {
    const localStorageData = JSON.parse(localStorage.getItem("User-Token"));

    fetch("http://localhost:4000/v1/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: scorecomment,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "کامنت مورد نظر با موفقیت ثبت شد.",
          icon: "success",
          buttons: "تایید",
        });
        console.log(result);
        setNewCommentBody("");
      });
  };

  const registerInCourse = (id, price) => {
    console.log(id);

    if (price === 0) {
      fetch(`http://localhost:4000/v1/courses/${id}/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: price,
        }),
      }).then((res) => {
        res.json();
      });
    }
  };

  return (
    <>
      <TopBar />
      <NavBar />
      <BreadCrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: `${breadCrumb.title}`,
            to: `category-info/${breadCrumb.name}`,
          },
          {
            id: 3,
            title: `${oneCourse.name}`,
            to: `course-info/${oneCourse.shortName}`,
          },
        ]}
      />

      <section className="course-info">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Link to="/" className="course-info__link">
                آموزش {breadCrumb.title}
              </Link>
              <h1 className="course-info__title">{oneCourse.name}</h1>
              <p className="course-info__text">{oneCourse.description}</p>
              <div className="course-info__social-media">
                <Link to="/" className="course-info__social-media-item">
                  <i className="fab fa-telegram-plane course-info__icon"></i>
                </Link>
                <Link to="/" className="course-info__social-media-item">
                  <i className="fab fa-twitter course-info__icon"></i>
                </Link>
                <Link to="/" className="course-info__social-media-item">
                  <i className="fab fa-facebook-f course-info__icon"></i>
                </Link>
              </div>
            </div>

            <div className="col-6">
              <video
                src={`${oneCourse.cover}`}
                alt={oneCourse.name}
                poster={`${oneCourse.cover}`}
                className="course-info__video"
                controls
              ></video>
            </div>
          </div>
        </div>
      </section>

      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="course">
                <div className="course-boxes">
                  <div className="row">
                    <CourseDetailBox
                      icon="graduation-cap"
                      title="وضعیت دوره:"
                      desc={
                        oneCourse.status === "start"
                          ? "به اتمام رسیده"
                          : "در حال برگزاری"
                      }
                    />
                    <CourseDetailBox icon="clock" title=" مدت زمان دوره:" />
                    <CourseDetailBox
                      icon="calendar-alt"
                      title="شروع دوره :"
                      desc={createdAt.slice(0, 10)}
                    />
                    <CourseDetailBox
                      icon="graduation-cap"
                      title="مدرس"
                      desc={creator.name}
                    />
                    <CourseDetailBox
                      icon="clock"
                      title="قیمت دوره"
                      desc={oneCourse.price === 0 ? "رایگان" : oneCourse.price}
                    />
                    <CourseDetailBox
                      icon="calendar-alt"
                      title="آخرین بروزرسانی:"
                      desc={updateAt.slice(0, 10)}
                    />
                  </div>
                </div>

                <div className="course-progress">
                  <div className="course-progress__header">
                    <i className="fas fa-chart-line course-progress__icon"></i>
                    <span className="course-progress__title">
                      درصد پیشرفت دوره: {oneCourse.isComplete * 100}%
                    </span>
                  </div>
                  <div className="progress course-progress__bar">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-label="Animated striped example"
                      aria-valuemax="100"
                      aria-valuemin="0"
                      aria-valuenow="75"
                      style={{ width: `${oneCourse.isComplete * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="introduction">
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      {oneCourse.name}
                    </span>
                    <img
                      src={`${oneCourse.cover}`}
                      alt="course info"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد
                      و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود
                      که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون
                      بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت
                      خواهید شد و حتی ممکن است ناامید شوید!
                    </p>
                    <p className="introduction__text">
                      در این دوره نحوه کار با 20 مورد از پر استفاده ترین
                      کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان
                      آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار
                      نداشته باشید
                    </p>
                  </div>
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                      درآمد)
                    </span>
                    <img
                      src="/images/info/2.jpg"
                      alt="course info"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                      از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                      حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                      موقع از این کتابخانه ها استفاده نکرده بودم.
                    </p>
                    <p className="introduction__text">
                      همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از
                      مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به
                      بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار
                      کرده باشد
                    </p>
                    <p className="introduction__text">
                      همان طور که از اسم این دوره مشخص است، هدف از این دوره
                      آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه
                      های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با
                      قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه
                      دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت
                      وارد بازار کار شده و کسب درآمد کنید.
                    </p>
                    <p className="introduction__text">
                      شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                      کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                      جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                      آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                    </p>
                    <p className="introduction__text">
                      در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                      نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                      دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                      خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و
                      وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                    </p>
                  </div>
                  <div className="introduction__btns">
                    <a href="/" className="introduction__btns-item">
                      دانلود همگانی ویدیوها
                    </a>
                    <a href="/" className="introduction__btns-item">
                      دانلود همگانی پیوست‌ها
                    </a>
                  </div>

                  <div className="introduction__topic">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0" className="accordion">
                        <Accordion.Header>جلسات دوره</Accordion.Header>
                        {session.map((session, index) => (
                          <Accordion.Body
                            className="introduction__accordion-body"
                            key={index}
                          >
                            {session.free === 0 ? (
                              <>
                                <div className="introduction__accordion-right">
                                  <span className="introduction__accordion-count">
                                    {index + 1}
                                  </span>
                                  <i className="fab fa-youtube introduction__accordion-icon"></i>
                                  <Link
                                    to={`/courses/${courseName}/${session._id}`}
                                    className="introduction__accordion-link"
                                  >
                                    {session.title}
                                  </Link>
                                </div>
                                <div className="introduction__accordion-left">
                                  <span className="introduction__accordion-time">
                                    {session.time}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="introduction__accordion-right">
                                  <span className="introduction__accordion-count">
                                    {index + 1}
                                  </span>
                                  <i className="fab fa-youtube introduction__accordion-icon"></i>
                                  <span className="introduction__accordion-link">
                                    {session.title}
                                  </span>
                                </div>
                                <div className="introduction__accordion-left">
                                  <span className="introduction__accordion-time">
                                    {session.time}
                                  </span>
                                  <i className="fa fa-lock"></i>
                                </div>
                              </>
                            )}
                          </Accordion.Body>
                        ))}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>

                <div className="techer-details">
                  <div className="techer-details__header">
                    <div className="techer-details__header-right">
                      <img
                        src={`.${creator.profile}`}
                        alt="Teacher Profile"
                        className="techer-details__header-img"
                      />
                      <div className="techer-details__header-titles">
                        <a href="/" className="techer-details__header-link">
                          {creator.name}
                        </a>
                        <span className="techer-details__header-skill">
                          {creator.role}
                        </span>
                      </div>
                    </div>
                    <div className="techer-details__header-left">
                      <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                      <span className="techer-details__header-name">مدرس</span>
                    </div>
                  </div>
                  <p className="techer-details__footer">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2
                    سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در
                    زمینه وب فعالیت داشته باشم.و..
                  </p>
                </div>

                <CommentsTextArea
                  comments={comments}
                  submitComment={submitComment}
                  creator={creator}
                />
              </div>
            </div>

            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register">
                    {oneCourse.isUserRegisteredToThisCourse ? (
                      <span className="course-info__register-title">
                        <i className="fas fa-graduation-cap course-info__register-icon"></i>{" "}
                        دانشجوی دوره هستید
                      </span>
                    ) : (
                      <span
                        className="course-info__register-title"
                        onClick={() =>
                          registerInCourse(oneCourse._id, oneCourse.price)
                        }
                      >
                        <i className="fas fa-graduation-cap course-info__register-icon"></i>{" "}
                        ثبت نام در دوره
                      </span>
                    )}
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__total">
                    <div className="course-info__top">
                      <div className="course-info__total-sale">
                        <i className="fas fa-user-graduate course-info__total-sale-icon"></i>
                        <span className="course-info__total-sale-text">
                          {" "}
                          تعداد دانشجو:{" "}
                        </span>
                        <span className="course-info__total-sale-number">
                          {oneCourse.courseStudentsCount}
                        </span>
                      </div>
                    </div>
                    <div className="course-info__bottom">
                      <div className="course-info__total-comment">
                        <i className="far fa-comments course-info__total-comment-icon"></i>
                        <span className="course-info__total-comment-text">
                          {comments.length} دیدگاه
                        </span>
                      </div>
                      <div className="course-info__total-view">
                        <i className="far fa-eye course-info__total-view-icon"></i>
                        <span className="course-info__total-view-text">
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__header-short-url">
                    <i className="fas fa-link course-info__short-url-icon"></i>
                    <span className="course-info__short-url-text">
                      لینک کوتاه
                    </span>
                  </div>
                  <span className="course-info__short-url">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__topic-title">
                    سرفصل های دوره
                  </span>
                  <span className="course-info__topic-text">
                    برای مشاهده و یا دانلود دوره روی کلمه
                    <a href="/" style={{ color: "blue", fontWeight: "bold" }}>
                      {" "}
                      لینک
                    </a>{" "}
                    کلیک کنید
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__courses-title">
                    دوره های مرتبط
                  </span>
                  <ul className="course-info__courses-list">
                    {relatedCourse.length &&
                      relatedCourse.map((course) => (
                        <li
                          className="course-info__courses-list-item"
                          key={course._id}
                        >
                          <Link
                            to={`${course.shortName}`}
                            className="course-info__courses-link"
                          >
                            <img
                              src={`${course.cover}`}
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                            <span className="course-info__courses-text">
                              {course.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseInfo;
