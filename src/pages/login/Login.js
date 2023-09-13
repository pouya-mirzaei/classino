import React from 'react';

export default function Login() {
  return (
    <div className="flex items-center justify-center bg-[#eaeaea] w-full min-h-screen">
      <div className="w-[690px] max-w-[90%] rounded-lg overflow-hidden">
        {/* login form */}
        <div className="flex flex-col lg:flex-row">
          {/* form  */}
          <form className="grow bg-white flex items-center justify-center flex-col gap-y-3 py-10">
            <div>
              <img src="images/classino_Logo.08df55af.svg" alt="classino logo" />
            </div>

            <h1 className="text-lg font-medium">ورود کاربران کلاسینو</h1>

            <div className="form-group">
              <label className="block text-xs pr-2 mb-1 text-[#70657b]" htmlFor="username">
                شماره موبایل یا نام کاربری
              </label>
              <input type="text" id="username" placeholder="شماره موبایل یا نام کاربری" />
            </div>
            <div className="form-group">
              <label className="block text-xs pr-2 mb-1 text-[#70657b]" htmlFor="password">
                رمز عبور
              </label>
              <input type="text" id="password" placeholder="رمز عبور" />
            </div>
            <div className="form-group">
              <input type="submit" value="ورود" className="submit-btn" />
            </div>
          </form>

          {/* informations */}
          <div className="login-bg">
            <div className="login-bg__des">
              <p>
                در صورتیکه رمز عبور ندارید ، ابتدا از طریق "ورود با رمز یکبار مصرف" (ورود با SMS) وارد پنل کاربری خود
                شوید سپس به قسمت "ویرایش پروفایل" بروید و در انجا میتوانید برای خود رمز عبور تعیین کنید.
              </p>
            </div>
            <div className="w-[90%]">
              <button className="login-bg__btn"> تماس با پشتیبانی: 02191008020 </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
