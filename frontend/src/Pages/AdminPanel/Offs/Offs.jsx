import React, { useEffect, useState } from "react";
import Input from "../../../Components/Form/Input";
import {
  maxValidator,
  minValidator,
  requiredValidator,
} from "../../../validators/rules";
import { useForm } from "../../../hooks/useForm";
import DataTable from "../DataTable/DataTable";
import swal from "sweetalert";

const Offs = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(-1);
  const [offs, setOffs] = useState([]);
  const localStorageToken = JSON.parse(localStorage.getItem("User-Token"));
  const [formState, onInputHandler] = useForm(
    {
      code: {
        value: "",
        isValid: false,
      },
      percent: {
        value: "",
        isValid: false,
      },
      max: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCourses();
    getAllOffs();
  }, []);

  const getAllOffs = () => {
    fetch("http://localhost:4000/v1/offs",{
      headers:{
        Authorization:`Bearer ${localStorageToken.token}`
      }
    })
      .then((res) => res.json())
      .then((result) => setOffs(result));
  };

  const getAllCourses = () => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((result) => setCourses(result));
  };

  const addNewOffs = (e) => {
    e.preventDefault();

    const newOffInfos = {
      code: formState.inputs.code.value,
      percent: formState.inputs.percent.value,
      course: course,
      max: formState.inputs.max.value,
    };

    fetch(`http://localhost:4000/v1/offs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOffInfos),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "کد تخفیف با موفقیت ایجاد شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllOffs();
        });
      }
    });
  };

  const removeOff = (id, e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/v1/offs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "کد تخفیف با موفقیت حذف شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllOffs();
        });
      }
    });
  };

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="price input">
                <label class="input-title">کد تخفیف</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="code"
                  validations={[minValidator(2)]}
                  placeholder="لطفا کد تخفیف را وارد نمایید"
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-6">
              <div class="price input">
                <label class="input-title">درصد تخفیف</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="percent"
                  validations={[requiredValidator()]}
                  placeholder="لطفا درصد تخفیف را وارد نمایید"
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-6">
              <div class="name input">
                <label class="input-title">حداکثر استفاده</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="max"
                  validations={[requiredValidator()]}
                  placeholder="حداکثر استفاده از کد تخفیف"
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-6">
              <div class="price input">
                <label class="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  class="select"
                  onChange={(event) => setCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={addNewOffs} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="کد های تخفیف">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کد</th>
              <th>درصد</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده</th>
              <th>سازنده</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {offs.map((off, index) => (
              <tr key={off._id}>
                <td>{index + 1}</td>
                <td>{off.code}</td>
                <td>{off.percent}</td>
                <td>{off.max}</td>
                <td>{off.uses}</td>
                <td>{off.creator}</td>

                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={(e) => removeOff(off._id, e)}
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

export default Offs;
