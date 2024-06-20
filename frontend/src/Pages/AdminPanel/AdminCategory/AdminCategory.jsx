import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import {
  maxValidator,
  minValidator,
  requiredValidator,
} from "../../../validators/rules";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../hooks/useForm";
import swal from "sweetalert";

const AdminCategory = () => {
  const localDataToken = JSON.parse(localStorage.getItem("User-Token"));
  const [allCategory, setAllCategory] = useState([]);
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((result) => {
        setAllCategory(result);
        console.log(result);
      });
  };

  const registerNewUser = (e) => {
    e.preventDefault();
    const categoryInfo = {
      title: formState.inputs.name.value,
      name: formState.inputs.title.value,
    };

    fetch(`http://localhost:4000/v1/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localDataToken.token}`,
      },
      body: JSON.stringify(categoryInfo),
    }).then((res) => {
      res.json();
      console.log(res);
      if (res.ok) {
        swal({
          title: "دسته بندی جدید با موفقیت اضافه شد.",
          icon: "success",
          buttons: "ok",
        }).then(() => {
          getAllUsers();
        });
      } else {
        swal({
          title: "متاسفانه دسته بندی جدید اضافه نشد..",
          icon: "warning",
          buttons: "ok",
        }).then(() => {
          getAllUsers();
        });
      }
    });
  };

  const deleteHandler = (id, e) => {
    e.preventDefault();
    swal({
      title: "آیا از حذف مطمئن هستید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      fetch(`http://localhost:4000/v1/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localDataToken.token}`,
        },
      }).then((res) => {
        res.json();
        if (res.ok) {
          swal({
            title: "این کاربر با موفقیت بن شد",
            icon: "success",
            buttons: "ok",
          }).then(() => {
            getAllUsers();
          });
        }
      });
    });
  };

  const editHandler = (id, e) => {
    e.preventDefault();

    swal({
      title: "عنوان جدید را وارد کنید...",
      content: "input",
      buttons: "تایید",
    })
      .then((result) => {
        console.log(result);
        if (result.trim().length) {
          fetch(`http://localhost:4000/v1/category/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localDataToken.token}`,
            },
            body: JSON.stringify({
              title: `${result}`,
            }),
          }).then(res=>res.json())
          .then(results=>{
            console.log(results);
            getAllUsers()
          })
        }
      })
     
  };

  return (
    <>
      <div className="home-content-edit">
        <div className="back-btn">
          <i className="fas fa-arrow-right"></i>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان دسته بندی</label>
              <Input
                type="text"
                className=""
                id="title"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا عنوان دوره را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">نام دسته بندی</label>
              <Input
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام دوره را وارد کنید..."
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
                  onClick={(e) => registerNewUser(e)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="دسته بندی ها">
        <table className="table">
          <thead>
            <tr>
              <th>عنوان دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allCategory.map((category) => (
              <tr key={category._id}>
                <td>{category.title}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={(e) => editHandler(category._id, e)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={(e) => deleteHandler(category._id, e)}
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

export default AdminCategory;
