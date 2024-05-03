import React from "react";
import "./navBar.css";

const NavBar = () => {
  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
           <h1>
            LOGO
           </h1>
            <ul className="main-header__menu">
              <li className="main-header__item">
                <a href="/" className="main-header__link">
                  صفحه اصلی
                </a>
              </li>

              <li className="main-header__item">
                <a href="/" className="main-header__link">
                  فرانت اند
                  <i className="fas fa-angle-down main-header__link-icon"></i>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        آموزش HTML
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        آموزش CSS
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        آموزش REACT
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        آموزش VUE
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        آموزش FLEXBOX
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        آموزش BOOTSTRAP
                      </a>
                    </li>
                  </ul>
                </a>
              </li>

              <li className="main-header__item">
                <a href="/" className="main-header__link">
                  امنیت
                  <i className="fas fa-angle-down main-header__link-icon"></i>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        آموزش کالی لینوکس
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        آموزش پایتون سیاه
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        آموزش جاوا اسکریپت سیاه
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        آموزش شبکه
                      </a>
                    </li>
                  </ul>
                </a>
              </li>

              <li className="main-header__item">
                <a href="/" className="main-header__link">
                  مقالات
                  <i className="fas fa-angle-down main-header__link-icon"></i>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        توسعه وب
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        جاوا اسکریپت
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        فرانت اند
                      </a>
                    </li>
                  </ul>
                </a>
              </li>

              <li className="main-header__item">
                <a href="/" className="main-header__link">
                  پایتون
                  <i className="fas fa-angle-down main-header__link-icon"></i>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        دوره متخصص پایتون
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        دوره هوش مصنوعی با پایتون
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="/" className="main-header__dropdown-link">
                        دوره متخصص جنگو
                      </a>
                    </li>
                  </ul>
                </a>
              </li>
              <li className="main-header__item">
                <a href="/" className="main-header__link">
                  مهارت های نرم
                </a>
              </li>
            </ul>
          </div>
          <div className="main-header__left">
            <a href="/" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="/" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>
            <a href="/" className="main-header__profile">
              <span className="main-header__profile-text">فاطمه فرج زاده</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
