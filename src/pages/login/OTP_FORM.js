import React, { useState } from 'react';
import './glow.css';
import SecondaryHeading from '../../components/panel/SecondaryHeading';
export default function OTP_FORM({ onToggleLoginWithPassword: toggle }) {
  const [mobileInput, setMobileInput] = useState('');

  return (
    <div className="bg-[#f6f8fc] w-96 relative z-20 rounded-lg">
      <div className="relative w-full z-10 rounded-lg bg-white flex items-center flex-col gap-5 p-5">
        <SecondaryHeading>ورود / عضویت</SecondaryHeading>
        <p className="text-xs font-bold">برای ورود یا ثبت ‌نام شماره تلفن همراه خود را وارد کنید</p>
        <div className="form-group">
          <input
            type="text"
            className="placeholder:text-center w-full text-center"
            placeholder="شماره موبایل"
            value={mobileInput}
            onChange={(e) => setMobileInput(e.target.value)}
          />
        </div>
        <button className="group transition-all overflow-hidden duration-200 bg-secondary-1 hover:bg-secondary-1/90 text-white w-[90%] py-2.5 rounded-full flex items-center justify-center">
          ادامه
          <svg className="w-5 h-5 -translate-x-40 group-hover:-translate-x-1 transition-all duration-200">
            <use href="/sprite/hero.svg#arrow-left"></use>
          </svg>
        </button>

        <button className="text-primary-1 font-bold text-sm" onClick={toggle}>
          ورود با رمز عبور
        </button>
      </div>

      <div className="glow-box -z-10"></div>
    </div>
  );
}
