import React, { useEffect, useState } from 'react';
import PrimaryHeading from '../../../components/panel/PrimaryHeading';
import { useCart } from '../../../Contexts/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCourses from '../../../hooks/api/useCourses';
import PreLoader from '../../../components/PreLoader';

export default function Store() {
  const [searchInput, setSearchInput] = useState('');
  const [courseInput, setCourseInput] = useState('');
  const [gradeInput, setGradeInput] = useState('');
  const [lessonInput, setLessonInput] = useState('');
  const [teacherInput, setTeacherInput] = useState('');
  const { courses, isFetching, isError } = useCourses();

  if (isError) {
    toast.error('مشکلی پیش آمد، لطفا بعدا تلاش کنید', {
      className: 'font-primary text-xs',
    });
  }

  const badgeData = [
    { id: 0, img: '/images/doreh/DoreJameDahomEshteraki1403-Big.8fd2f5b9.png' },
    { id: 1, img: '/images/doreh/DoreJameDahomYazdahom1403-Big.d762d1a1.png' },
    { id: 2, img: '/images/doreh/DoreJameDavazdahom1403-Big.e2f16463.png' },
    { id: 3, img: '/images/doreh/DoreJameKonkoor1403-Big.4ddc5616.png' },
    { id: 4, img: '/images/doreh/DoreJamePanjomTaNohom1403-Big.81a8226b.png' },
    { id: 5, img: '/images/doreh/zabaninopng.png' },
  ];

  const formatNumber = (num) => num.toLocaleString('fa-ir');

  const cart = useCart();

  const handleAdd = (course) => {
    if (cart.contains(course.id)) {
      toast.error('این محصول در سبد خرید شما موجود است', {
        className: 'font-primary text-xs',
      });
    } else {
      cart.addToCart(course);
      toast.success('محصول مورد نظر به سبد خرید اضافه شد', {
        className: 'font-primary text-xs',
      });
    }
  };

  return (
    <section className="p-section relative">
      <PreLoader pending={isFetching} title={'در حال بارگذاری...'} />
      <PrimaryHeading>فروشگاه</PrimaryHeading>

      {/* badge section */}
      <section className="m-0 flex flex-wrap items-center justify-around">
        {badgeData.map((box) => (
          <BadgeBox key={box.id} {...box} />
        ))}
      </section>

      {/* store */}
      <section>
        {/* filtering */}
        <div className="flex items-center justify-center flex-col gap-5">
          {/* search */}
          <input
            type="text"
            placeholder="جستجور در دوره ها..."
            className="w-full md:w-80 py-2.5 px-5 rounded-lg shadow-md shadow-black/10"
            onFocus={(e) => (e.target.placeholder = 'نام دوره را وارد کنید')}
            onBlur={(e) => (e.target.placeholder = 'جستجور در دوره ها...')}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {/* sorting */}
          <div className="flex flex-wrap gap-5 items-center justify-center">
            <div className="store-sorting-input">
              <input
                type="text"
                placeholder="دوره"
                className="w-full py-2.5 px-5 rounded-lg shadow-md shadow-black/10"
                value={courseInput}
                onChange={(e) => setCourseInput(e.target.value)}
              />
              <svg className="absolute w-3 left-5 top-1/2 -translate-y-1/2 text-gray-600">
                <use href="/sprite/hero.svg#chevron-down"></use>
              </svg>
            </div>
            <div className="store-sorting-input">
              <input
                type="text"
                placeholder="مقاطع تحصیلی"
                className="w-full py-2.5 px-5 rounded-lg shadow-md shadow-black/10"
                value={gradeInput}
                onChange={(e) => setGradeInput(e.target.value)}
              />
              <svg className="absolute w-3 left-5 top-1/2 -translate-y-1/2 text-gray-600">
                <use href="/sprite/hero.svg#chevron-down"></use>
              </svg>
            </div>
            <div className="store-sorting-input">
              <input
                type="text"
                placeholder="درس"
                className="w-full py-2.5 px-5 rounded-lg shadow-md shadow-black/10"
                value={lessonInput}
                onChange={(e) => setLessonInput(e.target.value)}
              />
              <svg className="absolute w-3 left-5 top-1/2 -translate-y-1/2 text-gray-600">
                <use href="/sprite/hero.svg#chevron-down"></use>
              </svg>
            </div>
            <div className="store-sorting-input">
              <input
                type="text"
                placeholder="استاد"
                className="w-full py-2.5 px-5 rounded-lg shadow-md shadow-black/10"
                value={teacherInput}
                onChange={(e) => setTeacherInput(e.target.value)}
              />
              <svg className="absolute w-3 left-5 top-1/2 -translate-y-1/2 text-gray-600">
                <use href="/sprite/hero.svg#chevron-down"></use>
              </svg>
            </div>
          </div>
        </div>

        {/* results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {!isFetching &&
            !isError &&
            courses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-dark-2 dark:text-white shadow-md shadow-black/10 overflow-hidden rounded-xl cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
                onClick={() => console.log(course)}
              >
                <div>
                  <img src={course.course_image_url} alt={course.title} className="w-full h-80 bg-cover" />
                </div>
                <div className="py-5 px-2.5">
                  <span className="text-sm font-semibold">{course.title}</span>
                  {/* course details */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs">قیمت : </span>
                      <span className="text-xs font-bold">{formatNumber(course.price)} ریال</span>
                    </div>
                    <span className="text-xs text-blue-800 underline">بیشتر</span>
                  </div>
                  <div>
                    <button
                      className="mt-5 w-full bg-primary-1 text-white py-3 rounded-md shadow-md shadow-black/10 hover:bg-primary-2 active:scale-95 transition-all"
                      onClick={() => handleAdd(course)}
                    >
                      <div className="flex items-center justify-center gap-2.5">
                        <svg className="w-5 h-5 text-white">
                          <use href="/sprite/hero.svg#shopping-cart"></use>
                        </svg>
                        <span>افزودن به سبد خرید</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </section>
  );
}

function BadgeBox({ img }) {
  return (
    <div className="lg:basis-[200px]  md:basis-1/2 l0g:m-2.5 my-2.5 transition-all duration-300 rounded-md overflow-hidden shadow-md hover:shadow-lg shadow-black/20 hover:scale-110 cursor-pointer">
      <img src={img} alt="course box" className="w-full h-full bg-cover" />
    </div>
  );
}
