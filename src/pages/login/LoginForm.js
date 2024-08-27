import { useFormik } from 'formik';
import React, { useState } from 'react';

export default function LoginForm({ onToggleLoginWithPassword: toggle }) {
  const [isFormSubmited, setIsFormSubmited] = useState(false);

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (data) => handleSubmit(data),
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'وارد کردن ایمیل الزامی است';
      }

      if (!values.password) {
        errors.password = 'وارد کردن رمز عبور الزامی است';
      }

      return errors;
    },
  });

  const handleSubmit = (data) => {
    console.log(data);

    setIsFormSubmited(true);

    setTimeout(() => {
      setIsFormSubmited(false);
    }, 2500);
  };

  const showError = (title) => <span className="text-red-500 text-xs">{title}</span>;

  return (
    <div className="w-[690px] max-w-[90%] rounded-lg overflow-hidden relative z-20">
      {/* login form */}
      <div className="flex flex-col lg:flex-row">
        {/* form  */}
        <form
          className="grow bg-white flex items-center justify-center flex-col gap-y-3 py-10"
          autoComplete="off"
          onSubmit={form.handleSubmit}
        >
          <div>
            <img src="images/classino_Logo.08df55af.svg" alt="classino logo" />
          </div>

          <h1 className="text-lg font-medium">ورود کاربران کلاسینو</h1>

          <div className="form-group">
            <label className="block text-xs pr-2 mb-1 text-[#70657b]" htmlFor="email">
              شماره موبایل یا نام کاربری
            </label>
            <input
              type="text"
              value={form.values.email}
              name="email"
              onChange={form.handleChange}
              id="email"
              placeholder="شماره موبایل یا نام کاربری"
            />
          </div>
          <div className="form-group">
            <label className="block text-xs pr-2 mb-1 text-[#70657b]" htmlFor="password">
              رمز عبور
            </label>
            <input
              type="password"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              id="password"
              placeholder="رمز عبور"
            />
          </div>
          {(form.touched.email || form.touched.password) && showError(form.errors.email || form.errors.password)}
          <div className="form-group">
            <button className="submit-btn" type="submit" disabled={isFormSubmited}>
              {isFormSubmited ? <div className="submit-btn-loader"></div> : <span>ورود</span>}
            </button>
          </div>
          <button className="text-primary-1 font-bold text-sm" onClick={toggle}>
            ورود با رمز یک بار مصرف
          </button>
        </form>

        {/* informations */}
        <div className="login-bg">
          <div className="login-bg__des">
            <p>
              در صورتیکه رمز عبور ندارید ، ابتدا از طریق "ورود با رمز یکبار مصرف" (ورود با SMS) وارد پنل کاربری خود شوید سپس به
              قسمت "ویرایش پروفایل" بروید و در انجا میتوانید برای خود رمز عبور تعیین کنید.
            </p>
          </div>
          <div className="w-[90%]">
            <button className="login-bg__btn"> تماس با پشتیبانی: 02191008020 </button>
          </div>
        </div>
      </div>
    </div>
  );
}
