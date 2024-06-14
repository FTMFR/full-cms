import React, { useContext } from "react";
import TopBar from "../../Components/Header/TopBar/TopBar";
import NavBar from "../../Components/Header/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import "./../LoginPage/login.css";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import { useForm } from "../../hooks/useForm";
import {
  emailValidator,
  minValidator,
  requiredValidator,
  maxValidator,
} from "../../validators/rules";
import AuthContext from "../../Components/context/authContext";
import swal from "sweetalert";

const Register = () => {
  const authContext = useContext(AuthContext);

  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const registerNewUser = (event) => {
    event.preventDefault();

    const newUserInfos = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    };

    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json().then((result) => {
          console.log(result);
          authContext.login(result.user, result.accessToken);
        });
      } else {
        if (res.status === 403) {
          swal({
            title: "این شماره تماس مسدود است",
            icon: "error",
            buttons: "ok",
          });
        }
        return;
      }
    });

    console.log("User Register");
  };

  return (
    <>
      <TopBar />
      <NavBar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">
              قبلا ثبت‌نام کرده‌اید؟{" "}
            </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                id="name"
                element="input"
                className="login-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
                validations={[
                  requiredValidator(),
                  minValidator(3),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <Input
                id="username"
                element="input"
                className="login-form__username-input"
                type="text"
                placeholder="نام کاربری"
                validations={[
                  requiredValidator(),
                  minValidator(5),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                id="email"
                element="input"
                className="login-form__password-input"
                type="email"
                placeholder="آدرس ایمیل"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(5),
                  maxValidator(20),
                  emailValidator(),
                ]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <Input
                id="phone"
                element="input"
                className="login-form__password-input"
                type="phone"
                placeholder="شماره تلفن"
                onInputHandler={onInputHandler}
                validations={[minValidator(10), maxValidator(12)]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <Input
                id="password"
                element="input"
                className="login-form__password-input"
                type="password"
                placeholder="رمز عبور"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type="submit"
              onClick={registerNewUser}
              disabled={!formState.isFormValid}
            >
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </Button>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Register;
