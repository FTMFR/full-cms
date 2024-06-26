import React from "react";
import "./aboutUs.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import AboutUsBox from "../AboutUsBox/AboutUsBox";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="container">
        <SectionHeader
          title="ما چه کمکی بهتون میکنیم؟"
          desc="از اونجایی که آکادمی آموزشی یک آکادمی خصوصی هست"
        />

        <div className="container">
          <div className="row">
            <AboutUsBox
              title="دوره های اختصاصی"
              desc="با پشتیبانی و کیفیت بالا ارائه میده !"
              icon="fa-brands fa-discourse"
            />
            <AboutUsBox
              title="سوالات متداول شما"
              desc="اگر از خرید پشیمان شویم، امکان بازگشت وجه وجود دارد؟"
              icon="fa-regular fa-circle-question"
            />
            <AboutUsBox
              title="نحوه دریافت تخفیف"
              desc="حداقل خرید برای دریافت تخفیف چقدر است؟"
              icon="fa-regular fa-registered"
            />
            <AboutUsBox
              title="تدریس در سایت"
              desc="شرایط اپلای برای تدریس در سایت چیست؟"
              icon="fa-solid fa-chalkboard-user"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
