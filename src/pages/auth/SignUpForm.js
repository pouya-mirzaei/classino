import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/api/useAuth';

export default function SignUpForm({ onToggleLoginWithPassword: toggle }) {
  const [registerState, setRegisterState] = useState(1);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { signUpWithEmailAndPassword } = useAuth();
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      grade: '-1',
      fieldOfStudy: '-1',
      gender: '-1',
    },
    onSubmit: (data) => handleSubmit(data),
    validate: (values) => {
      const errors = {};

      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(values.email)) {
        errors.email = 'ایمیل نامعتبر است';
      }
      if (!values.email) {
        errors.email = 'وارد کردن ایمیل الزامی است';
      }

      if (!values.password) {
        errors.password = 'وارد کردن رمز عبور الزامی است';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'وارد کردن تکرار رمز عبور الزامی است';
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'رمز عبور و تکرار آن یکسان نیست';
      }

      if (!values.name) {
        errors.name = 'وارد کردن نام و نام خانوادگی الزامی است';
      }

      if (values.grade === '-1') {
        errors.grade = 'وارد کردن مقطع تحصیلی الزامی است';
      }

      if (values.fieldOfStudy === '-1') {
        errors.fieldOfStudy = 'وارد کردن رشته تحصیلی الزامی است';
      }

      if (values.gender === '-1') {
        errors.gender = 'وارد کردن جنسیت الزامی است';
      }

      return errors;
    },
  });

  const handleSubmit = async (data) => {
    const { email, password, name, grade, fieldOfStudy, gender } = data;

    setIsFormSubmitting(true);

    signUpWithEmailAndPassword.mutate(
      { email, password, metaData: { name, grade, gender, fieldOfStudy } },
      {
        onSuccess: (data) => {
          toast.success('ثبت نام با موفقیت انجام شد', {
            className: 'font-primary text-xs',
          });
          navigate('/auth/confirm-email');
        },
        onError: (error) => {
          toast.error(error.message, {
            className: 'font-primary text-xs',
          });
        },
        onSettled: () => {
          setIsFormSubmitting(false);
        },
      }
    );
  };

  const nextStep = () => {
    if (
      !form.errors.email &&
      !form.errors.password &&
      !form.errors.confirmPassword &&
      !form.errors?.init &&
      (form.touched.email || form.touched.password || form.touched.confirmPassword)
    ) {
      setRegisterState(2);
    }
  };
  const previousStep = () => {
    setRegisterState(1);
  };

  return registerState === 1 ? (
    <EmailForm form={form} toggle={toggle} nextStep={nextStep} />
  ) : (
    <UserInformationForm form={form} isFormSubmitting={isFormSubmitting} previousStep={previousStep} />
  );
}
const ShowError = (title) => <span className="text-red-500 text-xs">{title}</span>;

function UserInformationForm({ form, isFormSubmitting, previousStep }) {
  return (
    <div className="bg-[#f6f8fc] max-w-md w-[400px] mx-5 relative z-20 rounded-lg">
      <div className="relative w-full z-10 rounded-lg bg-white flex items-center flex-col gap-5 p-5">
        <span className="text-primary-1 underline self-start flex items-center cursor-pointer" onClick={previousStep}>
          <svg className="w-4 h-4 rotate-180">
            <use href="/sprite/hero.svg#arrow-left"></use>
          </svg>
          بازگشت
        </span>
        <form onSubmit={form.handleSubmit} className="w-full flex flex-col items-center gap-5" autoComplete="off">
          <div className="form-group w-full">
            <label className="block text-xs pr-2 mb-1 text-[#70657b]" htmlFor="name">
              نام و نام خانوادگی
            </label>

            <input
              type="text"
              name="name"
              style={{ fontSize: '14px' }}
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              id="name"
              placeholder="نام و نام خانوادگی"
            />
          </div>
          <div className="form-group w-full">
            <label className="block text-xs pr-2 mb-1 text-[#70657b]" htmlFor="grade">
              مقطع تحصیلی
            </label>

            <select
              name="grade"
              value={form.values.grade}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              id="grade"
              className="w-full form-control"
            >
              <option value="-1">مقطع تحصیلی</option>
              <option value="1">اول</option>
              <option value="2">دوم</option>
              <option value="3">سوم</option>
              <option value="4">چهارم</option>
              <option value="5">پنجم</option>
              <option value="6">ششم</option>
              <option value="7">هفتم</option>
              <option value="8">هشتم</option>
              <option value="9">نهم</option>
              <option value="10">دهم</option>
              <option value="11">یازدهم</option>
              <option value="12">دوازدهم</option>
              <option value="13">فارغ التحصیل</option>
            </select>
          </div>

          <div className="form-group w-full">
            <label className="block text-xs pr-2 mb-1 text-[#70657b]" htmlFor="fieldOfStudy">
              رشته تحصیلی
            </label>

            <select
              name="fieldOfStudy"
              value={form.values.fieldOfStudy}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              id="fieldOfStudy"
              className="w-full form-control"
            >
              <option value="-1">رشته تحصیلی</option>
              <option value="riazi">رشته ریاضی</option>
              <option value="tajrobi">رشته تجربی</option>
              <option value="honar">رشته هنر</option>
            </select>
          </div>
          <div className="form-group w-full">
            <label className="block text-xs pr-2 mb-1 text-[#70657b]" htmlFor="gender">
              جنسیت
            </label>

            <select
              name="gender"
              value={form.values.gender}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              id="gender"
              className="w-full form-control"
            >
              <option value="-1">جنسیت</option>
              <option value="male">پسر</option>
              <option value="female">دختر</option>
            </select>
          </div>

          {form.touched.name &&
            form.touched.grade &&
            form.touched.fieldOfStudy &&
            form.touched.gender &&
            !form.isValid &&
            ShowError(form.errors.name || form.errors.grade || form.errors.fieldOfStudy || form.errors.gender)}

          <button
            type="submit"
            className="group transition-all overflow-hidden duration-200 bg-secondary-1 hover:bg-secondary-1/90 text-white w-full py-2.5 rounded-full flex items-center justify-center relative"
          >
            {isFormSubmitting ? <div className="submit-btn-loader"></div> : <span>ثبت نام</span>}
            {/* ثبت نام */}
            <svg className="w-5 h-5 -translate-x-52 group-hover:-translate-x-10 transition-all duration-200 absolute">
              <use href="/sprite/hero.svg#arrow-left"></use>
            </svg>
          </button>
        </form>
      </div>

      <div className="glow-box -z-10"></div>
    </div>
  );
}

function EmailForm({ form, toggle, nextStep }) {
  const { loginWithProvider } = useAuth();
  return (
    <div className="w-[900px] max-w-[90%] rounded-lg overflow-hidden relative z-20">
      {/* login form */}
      <div className="flex flex-col lg:flex-row">
        {/* form  */}
        <form
          className="grow bg-white flex items-center justify-center flex-col gap-y-3 py-10"
          autoComplete="off"
          // onSubmit={(e) => {
          //   e.preventDefault();
          // }}
        >
          <div>
            <img src="/images/classino_Logo.08df55af.svg" alt="classino logo" />
          </div>

          <h1 className="text-lg font-medium">ورود کاربران کلاسینو</h1>

          <div className="form-group">
            <label className="block text-xs pr-2 mb-1 text-[#70657b]" htmlFor="email">
              ایمیل
            </label>
            <input
              type="email"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              id="email"
              placeholder="ایمیل"
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
              onBlur={form.handleBlur}
              id="password"
              placeholder="رمز عبور"
            />
          </div>
          <div className="form-group">
            <label className="block text-xs pr-2 mb-1 text-[#70657b]" htmlFor="confirmPassword">
              تکرار رمز عبور
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              id="confirmPassword"
              placeholder="تکرار رمز عبور"
            />
          </div>
          {form.touched.email &&
            form.touched.password &&
            form.touched.confirmPassword &&
            !form.isValid &&
            ShowError(form.errors.email || form.errors.password || form.errors.confirmPassword)}
          <div className="form-group">
            <button onClick={nextStep} className="submit-btn" type="button">
              <span>ادامه</span>
            </button>

            <div className="mt-5 w-full h-[1px] bg-slate-300"></div>

            <button
              onClick={() => loginWithProvider('google')}
              type="button"
              className="mt-5 flex items-center justify-center gap-2 text-sm font-bold text-[#4285F4] bg-white border border-[#4285F4] w-full py-2.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#8AB4F8]"
            >
              <svg
                className="w-6 h-6"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
                enableBackground="new 0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              ثبت نام با Google
            </button>
          </div>
          <Link to={'/auth/login'}>
            <button className="text-primary-1 font-bold text-xs" onClick={toggle} type="button">
              اکانت دارید ؟ ورود
            </button>
          </Link>
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
