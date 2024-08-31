import React, { useEffect, useState } from 'react';
import PrimaryHeading from '../../../components/panel/PrimaryHeading';
import PanelDetail from '../../../components/panel/PanelDetail/PanelDetail';
import './Profile.css';
import BtnSuccess from '../../../components/panel/Button/BtnSuccess';
import { useFormik } from 'formik';
import { getAllStates, getCitiesWithStateId } from '../../../api/cities';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import PreLoader from '../../../components/PreLoader';
import { useStorage } from '../../../hooks/useStorage';
export default function Profile() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const {
    user: { phone_number, name, province, city, grade, gender, field_of_study, avatar_url },
    updateUser,
    refetchUser,
    changePassword,
  } = useAuth();
  const { uploadFile, getImagePublicUrl, deleteFile } = useStorage();

  useEffect(() => {
    const fetchStates = async () => {
      const { data } = await getAllStates();
      setStates(data);
    };

    fetchStates();
  }, []);

  const handleError = (error) => {
    toast.error(error.message, {
      className: 'font-primary text-xs',
    });
  };

  const handleUpdateUser = async (values) => {
    updateUser.mutate(values, {
      onSuccess: () => {
        toast.success('ویرایش با موفقیت انجام شد', {
          className: 'font-primary text-xs',
        });
      },
      onError: (error) => {
        toast.error(error.message, {
          className: 'font-primary text-xs',
        });
      },
      onSettled: () => {
        refetchUser();
        setIsLoading(false);
      },
    });
  };

  const form = useFormik({
    initialValues: {
      mobile: phone_number || '',
      name,
      'en-name': name,
      state: province || '-1',
      city: city || '-1',
      grade: grade || '-1',
      gender: gender || '-1',
      field_of_study: field_of_study || '-1',
    },
    validate: (values) => {
      const errors = {};

      const mobileRegex = /^09\d{9}$/;
      if (!mobileRegex.test(values.mobile)) {
        errors.mobile = 'شماره موبایل باید 11 رقم باشد و با 09 شروع شود';
      }

      if (!values.name) {
        errors.name = 'وارد کردن نام الزامی است';
      }

      if (values.state === '-1') {
        errors.state = 'وارد کردن استان الزامی است';
      }

      if (values.city === '-1') {
        errors.city = 'وارد کردن شهر الزامی است';
      }

      if (values.grade === '-1') {
        errors.grade = 'وارد کردن مقطع تحصیلی الزامی است';
      }

      if (values.gender === '-1') {
        errors.gender = 'وارد کردن جنسیت الزامی است';
      }

      if (values.field_of_study === '-1') {
        errors.field_of_study = 'وارد کردن رشته تحصیلی الزامی است';
      }

      if (!values['en-name']) {
        errors['en-name'] = 'وارد کردن نام خانوادگی الزامی است';
      }

      return errors;
    },
    onSubmit: async ({ name, mobile, state, grade, gender, city, field_of_study, avatar }) => {
      const updatedUser = {
        name: name,
        phone_number: mobile,
        province: state,
        city: city,
        grade: grade,
        gender: gender,
        field_of_study,
      };
      // setIsLoading(true);

      toast.warning('در حال ارسال اطلاعات...', {
        className: 'font-primary text-xs',
      });

      if (avatar) {
        uploadFile.mutate(
          {
            file: avatar,
            bucket: 'avatars',
          },
          {
            onSuccess: async (data) => {
              const url = await getImagePublicUrl({
                filePath: data.path,
                bucket: 'avatars',
              });

              updatedUser.avatar_url = url;

              handleUpdateUser(updatedUser);
            },

            onError: handleError,
          }
        );
      } else {
        handleUpdateUser(updatedUser);
      }
    },
  });

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
        <PanelDetail headerTitle="تغییر مشخصات کاربری" className="basis-1/2 w-full relative">
          <PreLoader pending={isLoading} title="لطفا صبر کنید ..." />
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
                onBlur={form.handleBlur}
                autoComplete="off"
              />
              {form.touched.mobile && form.errors.mobile && (
                <span className="text-red-500 text-[10px]">{form.errors.mobile}</span>
              )}
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
                onBlur={form.handleBlur}
              />
              {form.touched.name && form.errors.name && <span className="text-red-500 text-[10px]">{form.errors.name}</span>}
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
                onBlur={form.handleBlur}
              />
              {form.touched['en-name'] && form.errors['en-name'] && (
                <span className="text-red-500 text-[10px]">{form.errors['en-name']}</span>
              )}
            </div>
            <div>
              <label htmlFor="state" className="text-xs text-gray-500 mb-2 inline-block">
                استان:
              </label>
              <select
                name="state"
                id="state"
                className="form-control"
                onChange={form.handleChange}
                value={form.values.state}
                onBlur={form.handleBlur}
              >
                <option value="-1">انتخاب استان</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
              {form.touched.state && form.errors.state && <span className="text-red-500 text-[10px]">{form.errors.state}</span>}
            </div>
            <div>
              <label htmlFor="city" className="text-xs text-gray-500 mb-2 inline-block">
                شهر:
              </label>
              <select
                name="city"
                id="city"
                className="form-control"
                value={form.values.city}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                <option value="-1">لطفا استان را انتخاب کنید</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {form.touched.city && form.errors.city && <span className="text-red-500 text-[10px]">{form.errors.city}</span>}
            </div>

            <div>
              <label htmlFor="field_of_study" className="text-xs text-gray-500 mb-2 inline-block">
                رشته تحصیلی:
              </label>
              <select
                name="field_of_study"
                id="field_of_study"
                className="form-control"
                value={form.values.field_of_study}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                <option value="-1">لطفا رشته تحصیلی را انتخاب کنید</option>
                <option value="riazi">رشته ریاضی</option>
                <option value="tajrobi">رشته تجربی</option>
                <option value="honar">رشته هنر</option>
              </select>
              {form.touched.field_of_study && form.errors.field_of_study && (
                <span className="text-red-500 text-[10px]">{form.errors.field_of_study}</span>
              )}
            </div>

            <div>
              <label htmlFor="grade" className="text-xs text-gray-500 mb-2 inline-block">
                پایه تحصیلی:
              </label>
              <select
                name="grade"
                id="grade"
                className="form-control"
                value={form.values.grade}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                <option value="-1">لطفا پایه تحصیلی را انتخاب کنید</option>
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
              {form.touched.grade && form.errors.grade && <span className="text-red-500 text-[10px]">{form.errors.grade}</span>}
            </div>
            <div>
              <label htmlFor="gender" className="text-xs text-gray-500 mb-2 inline-block">
                جنسیت:
              </label>
              <select
                name="gender"
                id="gender"
                className="form-control"
                value={form.values.gender}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                <option value="-1">انتخاب نشده</option>
                <option value="male">پسر</option>
                <option value="female">دختر</option>
              </select>{' '}
              {form.touched.gender && form.errors.gender && (
                <span className="text-red-500 text-[10px]">{form.errors.gender}</span>
              )}
            </div>
            <div>
              <div className="w-44 aspect-square">
                <img src={avatarUrl || avatar_url || '/images/default-user.png'} alt={'user profile'} className="w-full" />
              </div>
              <span className="text-xs text-gray-500 mt-3 inline-block">تصویر (ابعاد تصویر مربعی باشد):</span>

              <div>
                <label
                  htmlFor="avatar"
                  className="w-full h-20 bg-slate-200 border-dashed border-gray-400 border-2 flex items-center justify-center"
                >
                  <span className="text-gray-500">
                    جهت درج تصویر جدید <span className="underline cursor-pointer">اینجا</span> کلیک کنید
                  </span>
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    form.setFieldValue('avatar', e.target.files[0]);
                    setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
            </div>

            <BtnSuccess type="submit">تغییر مشخصات کاربری</BtnSuccess>
          </form>
        </PanelDetail>
        <PanelDetail headerTitle="تغییر رمز عبور" className="basis-1/2 w-full relative">
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
        </PanelDetail>
      </div>
    </section>
  );
}
