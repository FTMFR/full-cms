import React, { useEffect, useState } from "react";
import {
  maxValidator,
  minValidator,
  requiredValidator,
} from "../../../validators/rules";
import DataTable from "../DataTable/DataTable";
import swal from "sweetalert";

const AdminContact = () => {
  const localStoragetoken = JSON.parse(localStorage.getItem("User-Token"));
  const [contacts, setContact] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = () => {
    fetch(`http://localhost:4000/v1/contact`)
      .then((res) => res.json())
      .then((result) => {
        setContact(result);
        console.log(contacts);
      });
  };

  const deleteHandler = (id, e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/v1/contact/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStoragetoken.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        getAllContacts();
      });
  };

  const showContactBody = (body) => {
    swal({
      title: body,
      buttons: "اوکی",
    });
  };

  const sendResponseHandler = (email, e) => {
    e.preventDefault();

    const response = {
      email: ``,
      answer: "",
    };

    swal({
      title: "پاسخ به موضوع",
      content: "input",
      buttons: "send",
    }).then((result) => {
      if (result.trim().length) {
        fetch(`http://localhost:4000/v1/contact/answer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStoragetoken.token}`,
          },
          body: JSON.stringify({
            email,
            answer: `${result}`,
          }),
        })
          .then((res) => {
            console.log(res);
            if (res.ok) {
              swal({
                title: "جواب با موفقیت ارسال شد.",
                icon: "success",
                buttons: "ok",
              });
              return res.json();
            }
          })
          .then((result) => {
            console.log(result);
          });
      }
    });
  };

  return (
    <>
      <DataTable title="پیغام‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showContactBody(contact.body)}
                  >
                    مشاهده پیغام
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={(e) => sendResponseHandler(contact.email, e)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={(e) => deleteHandler(contact._id, e)}
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

export default AdminContact;
