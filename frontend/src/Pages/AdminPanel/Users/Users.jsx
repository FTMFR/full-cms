import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import swal from "sweetalert";

const Users = () => {
  const localDataToken = JSON.parse(localStorage.getItem("User-Token"));
  const [usersData, setUsersData] = useState([]);

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
          })
        }
      });
    });
    console.log(id);
  };

  return (
    <>
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
