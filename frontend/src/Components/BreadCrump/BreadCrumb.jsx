import React from "react";
import "./breadCrumb.css";
import { Link } from "react-router-dom";

const BreadCrumb = ({ links }) => {
  return (
    <section className="breadcrumb">
      <div className="container">
        <div className="breadcrumb__content">
          <div className="breadcrumb__home-content-icon">
            <i className="fas fa-home breadcrumb__home-icon"></i>
          </div>
          <ul className="breadcrumb__list">
            {links.map((link,index) => (
              <li className="breadcrumb__item" key={index}>
                <Link to={`/${link.to}`} className="breadcrumb__link">
                  {link.title}
                  {link.id !== links.length ? (
                    <i className="fas fa-angle-left breadcrumb__icon"></i>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumb;
