import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "../../../hooks/useForm";
import "./adminCourses.css";
import Input from "../../../Components/Form/Input";
import {
  maxValidator,
  minValidator,
  requiredValidator,
} from "../../../validators/rules";

const AdminCourses = () => {
  const localStorageToken = JSON.parse(localStorage.getItem("User-Token"));
  const [allCourse, setAllCourse] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [courseCategory, setCourseCategory] = useState(
    "6345cbd132c10de974957632"
  );
  const [status, setStatus] = useState("presell");
  const [courseCover, setCourseCover] = useState({});

  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCourses();

    fetch("http://localhost:4000/v1/category")
      .then((res) => res.json())
      .then((result) => {
        setAllCategory(result);
      });
  }, []);

  const getAllCourses = () => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((result) => {
        setAllCourse(result);
        console.log(allCourse);
      });
  };

  const deleteHandler = (id, e) => {
    e.preventDefault();

    swal({
      title: "آیا از حذف دوره مطمئن هستید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/courses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "این دوره با موفقیت حذف شد",
              icon: "success",
              buttons: "ok",
            }).then(() => {
              getAllCourses();
            });
          } else {
            swal({
              title: "این دوره حذف نشد",
              icon: "error",
              buttons: "ok",
            });
          }
        });
      }
    });
  };

  const editHandler = () => {};

  const selectCategory = (e) => {
    setCourseCategory(e.target.value);
  };

  const addNewCourse = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("categoryID", courseCategory);
    formData.append("price", formState.inputs.price.value);
    formData.append("support", formState.inputs.support.value);
    formData.append("status", status);
    formData.append("cover", courseCover);

    if (courseCategory === "-1") {
      swal({
        title: "لطفا یک دسته بندی انتخاب کنید.",
        icon: "warning",
        buttons: "ok",
      });
    } else {
      fetch(`http://localhost:4000/v1/courses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageToken.token}`,
        },
        body: formData,
      }).then((res) => {
        console.log(res);
        if (res.ok) {
          swal({
            title: "دوره جدید با موفقیت اضافه شد",
            icon: "success",
            buttons: "اوکی",
          }).then(() => {
            getAllCourses();
          });
        }
      });
    }
  };

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">نام دوره</label>
                <Input
                  type="text"
                  id="name"
                  element="input"
                  isValid="false"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  placeholder="لطفا نام دوره را وارد کنید..."
                  onInputHandler={onInputHandler}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title">توضیحات دوره</label>
                <Input
                  type="text"
                  element="input"
                  id="description"
                  isValid="false"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  placeholder="لطفا نام دوره را وارد کنید..."
                  onInputHandler={onInputHandler}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">قیمت دوره</label>
                <Input
                  element="input"
                  type="text"
                  id="price"
                  isValid="false"
                  validations={[
                    requiredValidator(),
                    minValidator(5),
                    maxValidator(20),
                  ]}
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                  onInputHandler={onInputHandler}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">url دوره</label>
                <Input
                  element="input"
                  type="text"
                  id="shortName"
                  isValid="false"
                  validations={[
                    requiredValidator(),
                    minValidator(1),
                    maxValidator(20),
                  ]}
                  placeholder="لطفا url دوره را وارد کنید..."
                  onInputHandler={onInputHandler}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">نحوه پشتیبانی دوره</label>
                <Input
                  element="input"
                  type="text"
                  id="support"
                  isValid="false"
                  validations={[
                    requiredValidator(),
                    minValidator(1),
                    maxValidator(20),
                  ]}
                  placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                  onInputHandler={onInputHandler}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  <option value="-1">لطفا دسته بندی را انتخاب کنید</option>
                  {allCategory.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="file">
                <label className="input-title">عکس دوره</label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setCourseCover(e.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="col-6">
                <div className="presell">
                  <label className="input-title">وضعیت دوره</label>
                  <div className="radios">
                    <div className="presell-true">
                      <label>
                        <span>پیش فروش</span>
                        <input
                          type="radio"
                          value="presell"
                          name="presell"
                          defaultChecked
                          onClick={(e) => setStatus(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="presell-false">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="presell"
                          onClick={(e) => setStatus(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="submit-btn">
                  <input type="submit" value="افزودن" onClick={addNewCourse} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="تمامی دوره ها">
        <table className="table">
          <thead>
            <tr>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allCourse.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>
                  {course.price === 0
                    ? "رایگان"
                    : course.price.toLocaleString()}
                </td>
                <td>
                  {course.isComplete === 0
                    ? "در حال برگزاری"
                    : "به اتمام رسیده"}
                </td>
                <td>
                  {course.categoryID === "6345cbd132c10de974957632"
                    ? "front-end"
                    : "back-end"}
                </td>

                <td>
                  <button
                    type="button"
                    className="btn btn-warning edit-btn"
                    onClick={() => editHandler(course._id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={(e) => deleteHandler(course._id, e)}
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

export default AdminCourses;
