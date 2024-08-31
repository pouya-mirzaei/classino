import { useFormik } from 'formik';
import React, { useState } from 'react';
import PreLoader from '../../../components/PreLoader';
import { toast } from 'react-toastify';
import BtnSuccess from '../../../components/panel/Button/BtnSuccess';
import useAuth from '../../../hooks/api/useAuth';

export default function UpdatePassword() {
  const [isLoading, setIsLoading] = useState(false);

  const { refetchUser, changePassword } = useAuth();

  const handleError = (error) => {
    toast.error(error.message, {
      className: 'font-primary text-xs',
    });
  };
  const updatePassForm = useFormik({
    initialValues: {
      password: '',
      confirmPass: '',
    },
    validate: (values) => {
      const errors = {};

      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!values.password) {
        errors.password = 'وارد کردن رمز عبور الزامی است';
      } else if (!passRegex.test(values.password)) {
        errors.password = 'رمز عبور باید حداقل 8 کاراکتر داشته باشد و شامل حروف بزرگ، کوچک و اعداد باشد';
      }

      if (!values.confirmPass) {
        errors.confirmPass = 'تکرار رمز عبور الزامی است';
      } else if (values.password !== values.confirmPass) {
        errors.confirmPass = 'رمز عبور و تکرار آن یکسان نیست';
      }

      return errors;
    },
    onSubmit: (data) => {
      setIsLoading(true);
      changePassword.mutate(data.password, {
        onSuccess: () => {
          toast.success('رمز عبور با موفقیت تغییر کرد', {
            className: 'font-primary text-xs',
          });
        },
        onError: handleError,
        onSettled: () => {
          refetchUser();
          setIsLoading(false);
        },
      });
    },
  });

  return (
    <>
      <PreLoader pending={isLoading} title={'تغییر رمز عبور...'} />
      <form className="space-y-8" onSubmit={updatePassForm.handleSubmit}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="basis-1/2 w-full">
            <label htmlFor="password" className="text-xs text-gray-500 mb-2 inline-block">
              رمز عبور :
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="رمز عبور"
              id="password"
              name="password"
              value={updatePassForm.values.password}
              onChange={updatePassForm.handleChange}
              onBlur={updatePassForm.handleBlur}
            />
            {updatePassForm.touched.password && updatePassForm.errors.password && (
              <span className="text-red-500 text-[10px]">{updatePassForm.errors.password}</span>
            )}
          </div>
          <div className="basis-1/2 w-full">
            <label htmlFor="confirmPass" className="text-xs text-gray-500 mb-2 inline-block">
              تکرار رمز عبور :
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="تکرار رمز عبور"
              id="confirmPass"
              name="confirmPass"
              value={updatePassForm.values.confirmPass}
              onChange={updatePassForm.handleChange}
              onBlur={updatePassForm.handleBlur}
            />
            {updatePassForm.touched.confirmPass && updatePassForm.errors.confirmPass && (
              <span className="text-red-500 text-[10px]">{updatePassForm.errors.confirmPass}</span>
            )}
          </div>
        </div>
        <BtnSuccess type="submit">تغییر رمز عبور</BtnSuccess>
      </form>
    </>
  );
}
