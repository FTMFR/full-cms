import React from "react";
import "./footer.css";
import FooterItem from "../FooterItem/FooterItem";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-widgets">
          <div className="row">
            <FooterItem title="درباره ما">
              <p>
                وقتی تازه شروع به برنامه نویسی کردم، یکی از مشکلاتی که در فریاند
                یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود که
                باعث شد اونموقع تصمیم بگیرم اگر روزی توانایی مالی و فنی قابل
                قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم که خب
                امروز آکادمی آموزش برنامه نویسی به عنوان یک آکادمی خصوصی فعالیت
                میکنه و این به این معنی است که هر مدرسی اجازه تدریس در اون رو
                نداره و باید از فیلترینگ های خاص آکادمی رد شه این به این معنی
                است که ما برامون فن بیان و نحوه تعامل مدرس با دانشجو بسیار مهمه!
              </p>
            </FooterItem>

            <FooterItem title="آخرین مطالب">
              <div className="footer-widgets__links">
                <a href="/" className="footer-widgets__link">
                  نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                </a>
                <a href="/" className="footer-widgets__link">
                  چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن
                  پایتون
                </a>
                <a href="/" className="footer-widgets__link">
                  در مک، ویندوز و لینوکس | گام به گام آموزش نصب پایتون
                </a>
                <a href="/" className="footer-widgets__link">
                  معرفی بهترین سایت آموزش جاوا اسکریپت + آموزش رایگان
                </a>
              </div>
            </FooterItem>

            <FooterItem title="دسترسی سریع">
              <div className="row">
                <div className="col-6">
                  <a href="/" className="footer-widgets__link">
                    آموزش HTML
                  </a>
                </div>
                <div className="col-6">
                  <a href="/" className="footer-widgets__link">
                    آموزش CSS
                  </a>
                </div>
                <div className="col-6">
                  <a href="/" className="footer-widgets__link">
                    آموزش JS
                  </a>
                </div>
                <div className="col-6">
                  <a href="/" className="footer-widgets__link">
                    آموزش REACTJS
                  </a>
                </div>
                <div className="col-6">
                  <a href="/" className="footer-widgets__link">
                    آموزش VUEJS
                  </a>
                </div>
                <div className="col-6">
                  <a href="/" className="footer-widgets__link">
                    آموزش PYTHON
                  </a>
                </div>
                <div className="col-6">
                  <a href="/" className="footer-widgets__link">
                    درباره ما
                  </a>
                </div>
                <div className="col-6">
                  <Link to="/newsLetter" className="footer-widgets__link">
                    اشتراک در خبرنامه
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="/contact" className="footer-widgets__link">
                    ارتباط با ما
                  </Link>
                </div>
              </div>
            </FooterItem>
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        <span className="footer__copyright-text">
          کلیه حقوق برای آکادمی برنامه نویسی محفوظ است.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
