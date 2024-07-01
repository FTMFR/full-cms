import React, { useEffect, useState } from "react";
import "./session.css";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "../../../validators/rules";
import swal from "sweetalert";

const Session = () => {
  const localStorageToken = JSON.parse(localStorage.getItem("User-Token"));
  const [sessionCourse, setSessionCourse] = useState("-1");
  const [videoUploader, setVideoUploader] = useState({});
  const [courses, setCourses] = useState([]);

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((result) => setCourses(result));
  }, []);

  const sendSession = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", formState.inputs.title.value);
    formdata.append("time", formState.inputs.time.value);
    formdata.append("video", videoUploader, "[PROXY]");

    swal({
      title: "آیا از اضافه کردن این جلسه اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageToken.token}`,
        },
        body: formdata,
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "جلسه با موفقیت اضافه شد.",
            icon: "success",
            buttons: "ok",
          });
        }
      });
    });
  };

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  validations={[minValidator(5)]}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">مدت زمان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="time"
                  validations={[minValidator(5)]}
                  placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  className="select"
                  onChange={(event) => setSessionCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان جلسه</label>
                <input
                  type="file"
                  onChange={(event) => setVideoUploader(event.target.files[0])}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={(e) => sendSession(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Session;
