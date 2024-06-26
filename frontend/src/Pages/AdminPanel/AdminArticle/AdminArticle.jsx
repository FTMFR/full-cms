import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "../../../hooks/useForm";
import Input from "../../../Components/Form/Input";
import { minValidator } from "../../../validators/rules";

const AdminArticle = () => {
  const [articles, setArticles] = useState([]);
  const localStorageToken = JSON.parse(localStorage.getItem("User-Token"));
  const [articleCover, setArticleCover] = useState({});
  const [artcleCategory, setArticleCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      body: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    fetch("http://localhost:4000/v1/category")
      .then((res) => res.json())
      .then((result) => setCategories(result));
    getAllArticles();
  }, []);

  const getAllArticles = () => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((result) => {
        setArticles(result);
      });
  };

  const deleteHandler = (id, e) => {
    e.preventDefault();

    swal({
      title: "آیا از حذف اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result === true) {
        fetch(`http://localhost:4000/v1/articles/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "حذف با موفقیت انجام شد.",
              icon: "success",
              buttons: "ok",
            }).then(() => {
              res.json();
              getAllArticles();
            });
          } else {
            swal({
              title: "حذف با شکست خورد.",
              icon: "warning",
              buttons: "ok",
            });
          }
        });
      }
    });
  };

  const postArticle = (e) => {
    e.preventDefault();

    const articleData = {
      title: `${formState.inputs.title.value}`,
      description: `${formState.inputs.description.value}`,
      body: `${formState.inputs.body.value}`,
      shortName: formState.inputs.shortName.value,
      categoryID: `${artcleCategory}`,
      cover: articleCover,
    };

    swal({
      title: "آیا از اضافه کردن این مقاله اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/articles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageToken.token}`,
          },
          body: JSON.stringify(articleData),
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "مقاله با موفقیت اضافه شد.",
              icon: "success",
              buttons: "ok",
            }).then(() => {
              res.json();
              getAllArticles();
            });
          } else {
            swal({
              title: "مقاله با شکست مواجه شد.",
              icon: "warning",
              buttons: "ok",
            });
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
            <span>افزودن مقاله جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <Input
                  element="input"
                  type="text"
                  id="title"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(8)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <Input
                  element="input"
                  type="text"
                  id="shortName"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                <Input
                  element="textarea"
                  type="text"
                  id="description"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  className="article-textarea"
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  متن مقاله
                </label>

                <Input
                  element="textarea"
                  type="text"
                  id="body"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  className="article-textarea"
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setArticleCover(event.target.files[0]);
                  }}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select
                  onChange={(event) => setArticleCategory(event.target.value)}
                >
                  <option value="-1">دسته بندی مقاله را انتخاب کنید</option>
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={(e) => postArticle(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="مقاله ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={(e) => deleteHandler(article._id, e)}
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

export default AdminArticle;
