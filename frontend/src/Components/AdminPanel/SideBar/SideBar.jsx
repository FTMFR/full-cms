import React from "react";
import "./sideBar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
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
            <a href="/">
              <span>دسته‌بندی‌ها</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
