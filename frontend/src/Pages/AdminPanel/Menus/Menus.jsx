import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import swal from "sweetalert";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "../../../validators/rules";

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const localStoragetoken = JSON.parse(localStorage.getItem("User-Token"));
  const [menuParent, setMenuParent] = useState("");

  const [formStats, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllMenus();
  }, []);

  const getAllMenus = () => {
    fetch("http://localhost:4000/v1/menus/all")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setMenus(result);
      });
  };

  const deleteHandler = (id, e) => {
    e.preventDefault();

    swal({
      title: "آیا از حذف اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/menus/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStoragetoken.token}`,
          },
        }).then((res) => {
          swal({
            title: "منوی مورد نظر با موفقیت حذف شد.",
            icon: "success",
            buttons: "ok",
          });
          getAllMenus();
          res.json();
        });
      }
    });
  };

  const createMenu = (e) => {
    e.preventDefault();

    const menuBody = {
      title: formStats.inputs.title.value,
      href: formStats.inputs.href.value,
      parent: menuParent === -1 ? undefined : menuParent,
    };

    swal({
      title: "آیا از اضافه کردن منو اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch("http://localhost:4000/v1/menus", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStoragetoken.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(menuBody),
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "منو با موفقیت اضافه شد.",
              icon: "success",
              buttons: "ok",
            });
            getAllMenus();
          }
        });
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="home-title">
          <span>افزودن کاربر جدید</span>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="title"
                type="text"
                isValid="false"
                placeholder="لطفا عنوان را وارد کنید..."
                validations={[minValidator(5)]}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">مقصد</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="href"
                type="text"
                isValid="false"
                validations={[minValidator(5)]}
                placeholder="لطفا URL مقصد را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <select
                className="select"
                onChange={(event) => setMenuParent(event.target.value)}
              >
                <option value="-1">منوی اصلی را انتخاب کنید</option>
                {menus.map((menu) => (
                  <>
                    {!Boolean(menu.parent) && (
                      <option value={menu._id}>{menu.title}</option>
                    )}
                  </>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" onClick={createMenu} />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title="منوها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>فرزند...</th>
              <th>حذف</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>
                  {menu.parent ? (
                    menu.parent.title
                  ) : (
                    <i className="fa fa-check"></i>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary delete-btn"
                    // onClick={(e) => editHandler(menu._id, e)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={(e) => deleteHandler(menu._id, e)}
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

export default Menus;
