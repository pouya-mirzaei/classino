import React, { useState } from 'react';
import './glow.css';
import SecondaryHeading from '../../components/panel/SecondaryHeading';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/api/useAuth';
import PreLoader from '../../components/PreLoader';
export default function LoginForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { loginWithProvider, signInWithEmailAndPassword } = useAuth();
  const query = useQueryClient();

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      setIsLoggingIn(true);
      signInWithEmailAndPassword.mutate(
        { email, password },
        {
          onSuccess: (data) => {
            toast.success('با موفقیت وارد شدید', {
              className: 'font-primary text-xs',
            });
            query.invalidateQueries({ queryKey: ['user'] });
          },
          onError: (error) => {
            toast.error(error.message, {
              className: 'font-primary text-xs',
            });
          },
          onSettled: () => {
            setIsLoggingIn(false);
          },
        }
      );
    },

    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'وارد کردن ایمیل الزامی است';
      }

      if (!values.password) {
        errors.password = 'وارد کردن رمز عبور الزامی است';
      }

      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(values.email)) {
        errors.email = 'ایمیل نامعتبر است';
      }

      return errors;
    },
  });
  const showError = (title) => <span className="text-red-500 text-xs">{title}</span>;

  return (
    <div className="bg-[#f6f8fc] max-w-md w-[400px] mx-5 z-20 rounded-lg">
      <PreLoader pending={isLoggingIn} title="در حال وارد شدن ..." />

      <div className="relative w-full z-10 rounded-lg bg-white flex items-center flex-col gap-5 p-5">
        <SecondaryHeading>ورود / عضویت</SecondaryHeading>
        <p className="text-xs text-center font-bold">برای ورود به سایت، ایمل و رمز عبور خود را وارد کنید</p>
        <form onSubmit={form.handleSubmit} className="w-full flex flex-col items-center gap-2.5" autoComplete="off">
          <div className="form-group w-full">
            <input
              type="email"
              className="placeholder:text-center text-center"
              placeholder="ایمیل"
              name="email"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.email}
            />
          </div>
          <div className="form-group w-full">
            <input
              type="password"
              className="placeholder:text-center text-center"
              placeholder="رمز عبور"
              name="password"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.password}
            />
          </div>
          {form.touched.email && form.touched.password && !form.isValid && showError(form.errors.email || form.errors.password)}

          <button
            type="submit"
            className="group transition-all overflow-hidden duration-200 bg-secondary-1 hover:bg-secondary-1/90 text-white w-full py-2.5 rounded-full flex items-center justify-center relative"
          >
            ادامه
            <svg className="w-5 h-5 -translate-x-52 group-hover:-translate-x-10 transition-all duration-200 absolute">
              <use href="/sprite/hero.svg#arrow-left"></use>
            </svg>
          </button>
        </form>

        <div className="w-full h-[1px] bg-slate-300"></div>

        <button
          onClick={() => loginWithProvider('google')}
          className="flex items-center justify-center gap-2 text-sm font-bold text-[#4285F4] bg-white border border-[#4285F4] w-full py-2.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#8AB4F8]"
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
          ادامه با Google
        </button>
        <Link to="/auth/register">
          <button className="text-primary-1 font-bold text-sm">ثبت نام</button>
        </Link>
      </div>

      <div className="glow-box -z-10"></div>
    </div>
  );
}
