import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/home/Header';
import useAuth from '../../hooks/api/useAuth';

export default function EmailConfirmation() {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();

  const handleConfirmChange = () => {
    refetchUser().then(() => navigate('/panel/dashboard', { replace: true }));
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
        <h1 className="text-3xl font-semibold mb-6">ایمیلتان را چک کنید</h1>
        <p className="text-lg mb-8">
          ما لینک تأییدیه را به ایمیل شما ارسال کردیم. لطفاً صندوق ورودی (و پوشه اسپم) خود را بررسی کنید تا مراحل ثبت‌نام کامل
          شود.
        </p>
        <p className="text-gray-700">
          قبلاً تأیید کردید؟{' '}
          <span onClick={() => navigate('/panel/dashboard')} className="text-blue-600 hover:underline cursor-pointer">
            وارد شوید
          </span>
        </p>
      </div>
    </>
  );
}
