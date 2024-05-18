import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
import AuthContext from "../../context/authContext";

const NavBar = () => {
  const [allNavbarLinks, setAllNavbarLinks] = useState([]);
  const authContext = useContext(AuthContext);
  // console.log(authContext);

  useEffect(() => {
    fetch("http://localhost:4000/v1/menus")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllNavbarLinks(data);
      });
  }, []);

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <h1>LOGO</h1>
            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to="/" className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>

           

              {allNavbarLinks.map((link) => (
                <li key={link._id} className="main-header__item">
                  <Link to={`/category-info/${link.href}`} className="main-header__link">
                    {link.title}
                    {link.submenus.length !==0 && (
                      <>
                        <i className="fas fa-angle-down main-header__link-icon"></i>
                        <ul className="main-header__dropdown">
                          {link.submenus.map((submneu) => (
                            <li
                              key={submneu._id}
                              className="main-header__dropdown-item"
                            >
                              <Link
                                to={`${submneu.href}`}
                                className="main-header__dropdown-link"
                              >
                                {submneu.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="main-header__left">
            <a href="/" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="/" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>
            {authContext.isLoggedIn ? (
              <Link to="/" className="main-header__profile">
                <span className="main-header__profile-text">
                  {authContext.userInfos.name}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="main-header__profile">
                <span className="main-header__profile-text">
                  ورود / ثبت نام
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
