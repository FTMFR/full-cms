import React, { useEffect, useState } from "react";
import "./session.css";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "../../../validators/rules";
import swal from "sweetalert";
import DataTable from "../DataTable/DataTable";

const Session = () => {
  const localStorageToken = JSON.parse(localStorage.getItem("User-Token"));
  const [sessionCourse, setSessionCourse] = useState("-1");
  const [videoUploader, setVideoUploader] = useState({});
  const [courses, setCourses] = useState([]);
  const [allSessions, setAllSessions] = useState([]);

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
    getAllCourses();
    getAllSessions();
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
      if (result) {
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
      }
    });
  };

  const getAllCourses = () => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((result) => setCourses(result));
  };

  const getAllSessions = () => {
    fetch("http://localhost:4000/v1/courses/sessions")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllSessions(result);
      });
  };

  const editHandler = () => {};
  const deleteHandler = (id, e) => {
    e.preventDefault();

    swal({
      title: "آیا از حذف جلسه اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/courses/sessions/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "جلسه با موفقیت حذف شد.",
              icon: "success",
              buttons: "ok",
            });

            getAllSessions();
          }
        });
      }
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
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان جلسه</label>
                <input
                  type="file"
                  onChange={(event) => setVideoUploader(event.target.files[0])}
                />
                <span className="error-message text-danger"></span>
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
      a
      <DataTable title="تمامی جلسات">
        <table className="table">
          <thead>
            <tr>
              <th>عنوان جلسه</th>
              <th>نام دوره</th>
              <th>زمان جلسه</th>
              <th>تاریخ ایجاد</th>
              <th>تاریخ آپدیت</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allSessions.map((session, index) => (
              <tr key={index}>
                <td>{session.title}</td>
                <td>{session.course.name}</td>
                <td>{session.time}</td>
                <td>{session.createdAt.slice(0, 10)}</td>
                <td>{session.updatedAt.slice(0, 10)}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-warning edit-btn"
                    onClick={() => editHandler(session._id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={(e) => deleteHandler(session._id, e)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
};

export default Session;
