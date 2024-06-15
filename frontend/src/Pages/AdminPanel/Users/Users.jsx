import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import swal from "sweetalert";
import Input from "../../../Components/Form/Input";
import {
  emailValidator,
  maxValidator,
  minValidator,
  requiredValidator,
} from "../../../validators/rules";
import { useForm } from "../../../hooks/useForm";

const Users = () => {
  const localDataToken = JSON.parse(localStorage.getItem("User-Token"));
  const [usersData, setUsersData] = useState([]);

  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
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
    fetch(`http://localhost:4000/v1/users`, {
      headers: {
        Authorization: `Bearer ${localDataToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUsersData(result);
      });
  };

  function splitWordAtSpace(word) {
    const trimStartWord = word.trimStart();
    const indexOfSpace = trimStartWord.indexOf(" ");
    if (indexOfSpace === -1) {
      return [trimStartWord];
    }
    const firstPart = trimStartWord.slice(0, indexOfSpace);
    const secondPart = trimStartWord.slice(indexOfSpace + 1);
    return [firstPart, secondPart];
  }

  const deleteHandler = (id) => {
    swal({
      title: "آیا از حذف مطمئن هستید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      fetch(`http://localhost:4000/v1/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localDataToken.token}`,
        },
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "این کاربر با موفقیت حذف شد",
            icon: "success",
            buttons: "ok",
          }).then(() => {
            getAllUsers();
          });
        }
      });
    });
  };

  const banHandler = (id) => {
    swal({
      title: "آیا از بن مطمئن هستید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      fetch(`http://localhost:4000/v1/users/ban/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localDataToken.token}`,
        },
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "این کاربر با موفقیت بن شد",
            icon: "success",
            buttons: "ok",
          });
        }
      });
    });
    console.log(id);
  };

  const registerNewUser = (e) => {
    e.preventDefault();

    const userInfosData = {
      name: `${formState.inputs.name.value}`,
      username: `${formState.inputs.username.value}`,
      email: `${formState.inputs.email.value}`,
      phone: `${formState.inputs.phone.value}`,
      password: `${formState.inputs.password.value}`,
      confirmPassword: `${formState.inputs.password.value}`,
    };

    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfosData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        userInfosData.name = "";
        userInfosData.username = "";
        userInfosData.email = "";
        userInfosData.phone = "";
        userInfosData.password = "";
        userInfosData.confirmPassword = "";
        getAllUsers();
      });
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
              <label className="input-title">نام و نام خانوادگی</label>
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
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="family input">
              <label className="input-title">نام کاربری</label>
              <Input
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="email input">
              <label className="input-title">ایمیل</label>
              <Input
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="password input">
              <label className="input-title">رمز عبور</label>
              <Input
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="phone input">
              <label className="input-title">شماره تلفن</label>
              <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
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

      <DataTable title="کاربران">
        <table className="table">
          <thead>
            <tr>
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th>شماره</th>
              <th>ایمیل</th>
              <th>رمز عبور</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={index}>
                <td>{splitWordAtSpace(user.name)[0]}</td>
                <td>{splitWordAtSpace(user.name)[1]}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => deleteHandler(user._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning edit-btn"
                    onClick={() => banHandler(user._id)}
                  >
                    بن
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

export default Users;
