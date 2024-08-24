import React, { useEffect, useState } from 'react';
import PrimaryHeading from '../../../components/panel/PrimaryHeading';
import PanelDetail from '../../../components/panel/PanelDetail/PanelDetail';
import './Profile.css';
import BtnSuccess from '../../../components/panel/Button/BtnSuccess';
import { useFormik } from 'formik';
import { getAllStates, getCitiesWithStateId } from '../../../api/cities';
export default function Profile() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const { data } = await getAllStates();
      setStates(data);
    };

    fetchStates();
  }, []);

  const form = useFormik({
    initialValues: {
      mobile: '09123456789',
      name: 'پویا میرزائی',
      'en-name': '',
      state: '-1',
      city: '-1',
      grade: 'old',
      gender: '-1',
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const updatePassForm = useFormik({
    initialValues: {
      password: '',
      confirmPass: '',
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    if (form.values.state !== -1) {
      const fetchCities = async () => {
        const { data } = await getCitiesWithStateId(form.values.state);

        setCities(data);
      };

      fetchCities();
    }
  }, [form.values.state]);

  return (
    <section className="p-section">
      <PrimaryHeading>ویرایش پروفایل</PrimaryHeading>

      <div className="flex flex-col items-start lg:flex-row gap-8 w-full">
        <PanelDetail headerTitle="تغییر مشخصات کاربری" className="basis-1/2 w-full">
          <form className="space-y-8" onSubmit={form.handleSubmit}>
            <div>
              <label htmlFor="mobile" className="text-xs text-gray-500 mb-2 inline-block">
                شماره موبایل :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="شماره موبایل خود را وارد کنید"
                id="mobile"
                name="mobile"
                value={form.values.mobile}
                onChange={form.handleChange}
                autoComplete="off"
                disabled
              />
            </div>
            <div>
              <label htmlFor="name" className="text-xs text-gray-500 mb-2 inline-block">
                نام و نام خانوادگی (فارسی):
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="نام وارد کنید"
                id="name"
                autoComplete="off"
                name="name"
                value={form.values.name}
                onChange={form.handleChange}
              />
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
                name="en-name"
                value={form.values['en-name']}
                onChange={form.handleChange}
              />
            </div>
            <div>
              <label htmlFor="state" className="text-xs text-gray-500 mb-2 inline-block">
                استان:
              </label>
              <select name="state" id="state" className="form-control" onChange={form.handleChange} value={form.values.state}>
                <option value="-1">انتخاب استان</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="city" className="text-xs text-gray-500 mb-2 inline-block">
                شهر:
              </label>
              <select name="city" id="city" className="form-control" value={form.values.city} onChange={form.handleChange}>
                <option value="-1">لطفا استان را انتخاب کنید</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="grade" className="text-xs text-gray-500 mb-2 inline-block">
                پایه تحصیلی:
              </label>
              <select name="grade" id="grade" className="form-control" value={form.values.grade} onChange={form.handleChange}>
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
              <select name="gender" id="gender" className="form-control" value={form.values.gender} onChange={form.handleChange}>
                <option value="-1">انتخاب نشده</option>
                <option value="boy">پسر</option>
                <option value="girl">دختر</option>
              </select>{' '}
            </div>

            <BtnSuccess type="submit">تغییر مشخصات کاربری</BtnSuccess>
          </form>
        </PanelDetail>
        <PanelDetail headerTitle="تغییر رمز عبور" className="basis-1/2 w-full">
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
                />
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
                />
              </div>
            </div>
            <BtnSuccess type="submit">تغییر رمز عبور</BtnSuccess>
          </form>
        </PanelDetail>
      </div>
    </section>
  );
}
