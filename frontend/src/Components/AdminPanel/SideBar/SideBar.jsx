import React, { useContext } from "react";
import "./sideBar.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";

const SideBar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();

    swal({
      title: "با موفقیت لاگ اوت کردید.",
      icon: "success",
      buttons: "ok",
    }).then(() => {
      authContext.logout();
      navigate("/");
    });
  };

  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <a href="/">
            <h1>LOGO</h1>
          </a>
        </div>

        <div className="sidebar-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="active-menu">
            <Link to="/p-admin">
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to="courses">
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="menus">
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to="articles">
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to="users">
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <a href="/">
              <span>کدهای تخفیف</span>
            </a>
          </li>
          <li>
            <Link to="category">
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          <li>
            <Link to="contact">
              <span>ارتباط با ما</span>
            </Link>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              <span>خروج</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
