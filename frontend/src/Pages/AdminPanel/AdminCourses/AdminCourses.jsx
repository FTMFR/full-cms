import React, { useEffect, useState } from "react";
// import CourseBox from "../../../Components/CourseBox/CourseBox";
import DataTable from "../DataTable/DataTable";

const AdminCourses = () => {
  const [allCourse, setAllCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((result) => {
        setAllCourse(result);
        console.log(allCourse);
      });
  }, []);

  const deleteHandler = () => {};

  const editHandler = () => {};

  return (
    <>
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
                    onClick={() => deleteHandler(course._id)}
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
