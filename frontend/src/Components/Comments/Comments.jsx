import React from "react";
import "./comments.css";

const Comments = () => {
  return (
    <div className="comments">
      <div className="comments__title">دیدگاهتان را بنویسید.</div>
      <span className="comments__text">
        <a href="/">با عنوان فاطی وارد شوید.</a>
        <a href="/">خارج میشوید؟</a>
        *بخش های مورد نیاز علامت گذاری شده اند.
      </span>
      <div className="comments-content">
        <span className="comments__content-title">دیدگاه *</span>
        <textarea className="comments__content-texterea"></textarea>
      </div>
      <button
        className="comments__button"
        type="submit"
        onClick={() => console.log("کامنت ثبت شد.")}
      >
        فرستادن دیدگاه
      </button>
    </div>
  );
};

export default Comments;
