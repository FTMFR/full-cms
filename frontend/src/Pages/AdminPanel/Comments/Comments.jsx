import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import swal from "sweetalert";

const Comments = () => {
  const localStorageToken = JSON.parse(localStorage.getItem("User-Token"));
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = () => {
    fetch(`http://localhost:4000/v1/comments`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setComments(result);
      });
  };

  const deleteHandler = (id) => {
    swal({
      title: "آیا از حذف کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کامنت با موفقیت حذف شد.",
              icon: "success",
              buttons: "ok",
            });
            getAllComments();
          }
        });
      }
    });
  };

  const answerHanlder = (id, index) => {
    swal({
      title: `${comments[index].body}`,
      content: "input",
      buttons: "send",
    }).then((result) => {
      console.log(result);
      if (result.trim().length) {
        fetch(`http://localhost:4000/v1/comments/answer/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageToken.token}`,
          },
          body: JSON.stringify({
            body: `${result}`,
          }),
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "پاسخ برای کاربر ارسال شد.",
              icon: "success",
              buttons: "ok",
            });
            getAllComments();
            res.json();
          }
        });
      }
    });
  };

  const banHandler = (userID, commentID) => {
    swal({
      title: "آیا از بن این کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت بن شد.",
              icon: "success",
              buttons: "ok",
            });
            deleteHandler(commentID);
            getAllComments();
            res.json();
          }
        });
      }
    });
  };

  return (
    <>
      <DataTable title="کامنت ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>متن کامنت</th>
              <th>دوره</th>
              <th>نام کاربر</th>
              <th>امتیاز کاربر</th>
              <th>پاسخ</th>
              <th>تایید</th>
              <th>رد / حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={index}>
                <td
                  className={
                    comment.answer === 1
                      ? "answer-contact"
                      : "no-answer-contact"
                  }
                >
                  {index + 1}
                </td>
                <td>{comment.body}</td>
                <td>{comment.course}</td>
                <td>{comment.creator.name}</td>
                <td>
                  {!comment.score
                    ? Array(5)
                        .fill(0)
                        .map((score) => (
                          <img src="/images/svgs/star.svg" alt="star" />
                        ))
                    : Array(5 - comment.score)
                        .fill(0)
                        .map((score) => (
                          <img src="/images/svgs/star_fill.svg" alt="star" />
                        ))}
                </td>

                <td>
                  <button
                    type="button"
                    className="btn btn-primary delete-btn"
                    onClick={() => answerHanlder(comment._id, index)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary delete-btn"
                    // onClick={(e) => editHandler(menu._id, e)}
                  >
                    تایید
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => deleteHandler(comment._id)}
                  >
                    رد
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => banHandler(comment.creator._id, comment._id)}
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

export default Comments;
