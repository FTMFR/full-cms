import React from "react";
import "./sectionHeader.css";

const SectionHeader = ({title, desc, btnTitle}) => {
  return (
    <div>
      <div class="courses-header">
        <div class="courses-header__right">
          <span class="courses-header__title title">{title}</span>
          <span class="courses-header__text">{desc}</span>
        </div>
        {btnTitle ? (
          <div class="courses-header__left">
            <a href="/" class="courses-header__link">
              تمامی دوره ها
              <i class="fas fa-arrow-left courses-header__icon"></i>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SectionHeader;
