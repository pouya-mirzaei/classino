import React from 'react';
import PrimaryHeading from '../../../components/panel/PrimaryHeading';
import PanelDetail from '../../../components/panel/PanelDetail/PanelDetail';
import './Profile.css';
import BtnSuccess from '../../../components/panel/Button/BtnSuccess';
export default function Profile() {
  return (
    <section className="p-section">
      <PrimaryHeading>ویرایش پروفایل</PrimaryHeading>

      <div className="flex flex-col items-start md:flex-row gap-8 w-full">
        <PanelDetail headerTitle="تغییر مشخصات کاربری" className="basis-1/2 w-full">
          <form className="space-y-8">
            <div>
              <label htmlFor="mobile" className="text-xs text-gray-500 mb-2 inline-block">
                شماره موبایل :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="شماره موبایل خود را وارد کنید"
                id="mobile"
                autoComplete="off"
                disabled
              />
            </div>
            <div>
              <label htmlFor="name" className="text-xs text-gray-500 mb-2 inline-block">
                نام و نام خانوادگی (فارسی):
              </label>
              <input type="text" className="form-control" placeholder="نام وارد کنید" id="name" autoComplete="off" />
            </div>
            <div>
              <label htmlFor="en-name" className="text-xs text-gray-500 mb-2 inline-block">
                نام و نام خانوادگی (انگلیسی) (در کلاس نمایش داده میشود):
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="نام و نام خانوادگی (اینگلیسی) را وارد کنید"
                id="en-name"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="state" className="text-xs text-gray-500 mb-2 inline-block">
                استان:
              </label>
              <select name="state" id="state" className="form-control">
                <option value="-1">انتخاب استان</option>
                <option value="tehran">تهران</option>
                <option value="esfahan">اصفهان</option>
                <option value="shiraz">شیراز</option>
                <option value="mashhad">مشهد</option>
                <option value="tabriz">تبریز</option>
              </select>
            </div>
            <div>
              <label htmlFor="city" className="text-xs text-gray-500 mb-2 inline-block">
                شهر:
              </label>
              <select name="state" id="city" className="form-control">
                <option value="-1">لطفا استان را انتخاب کنید</option>
              </select>
            </div>

            <div>
              <label htmlFor="grade" className="text-xs text-gray-500 mb-2 inline-block">
                پایه تحصیلی:
              </label>
              <select name="state" id="grade" className="form-control" value="old">
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
                <option value="old">فارغ التحصیل</option>
              </select>
            </div>
            <div>
              <label htmlFor="gender" className="text-xs text-gray-500 mb-2 inline-block">
                جنسیت:
              </label>
              <select name="state" id="grade" className="form-control">
                <option value="-1">انتخاب نشده</option>
                <option value="boy">پسر</option>
                <option value="girl">دختر</option>
              </select>{' '}
            </div>

            <BtnSuccess type="submit">تغییر مشخصات کاربری</BtnSuccess>
          </form>
        </PanelDetail>
        <PanelDetail headerTitle="تغییر رمز عبور" className="basis-1/2 w-full"></PanelDetail>
      </div>
    </section>
  );
}
