import React, { useEffect, useState } from 'react';
import PrimaryHeading from '../../../components/panel/PrimaryHeading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCourses from '../../../hooks/api/useCourses';
import PreLoader from '../../../components/PreLoader';
import { useCourseCategories } from '../../../hooks/api/uesCourseCategories';
import Alert from '../../../components/panel/Alert/Alert';
import { useCart } from '../../../hooks/api/useCart';
import { useEnrollments } from '../../../hooks/api/useEnrollments';
import { useTeachers } from '../../../hooks/api/useTeachers';

export default function Store() {
  const [searchInput, setSearchInput] = useState('');
  const [courseInput, setCourseInput] = useState('');
  const [gradeInput, setGradeInput] = useState('');
  const [lessonInput, setLessonInput] = useState('');
  const [teacherInput, setTeacherInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  // queries
  const { courses, isFetching, isError } = useCourses({ title: searchInput, category: courseInput, teacher: teacherInput });
  const { courseCategories, isLoading: isCategoryLoading } = useCourseCategories();
  const { teachers } = useTeachers();
  const { hasCourse } = useEnrollments();

  if (isError) {
    toast.error('مشکلی پیش آمد، لطفا بعدا تلاش کنید', {
      className: 'font-primary text-xs',
    });
  }

  const formatNumber = (num) => num.toLocaleString('fa-ir');

  const { addToCart, contains } = useCart();

  const handleAdd = async (course) => {
    setIsAdding(true);

    if (contains(course.id)) {
      toast.error('این محصول در سبد خرید شما موجود است', {
        className: 'font-primary text-xs',
      });
      setIsAdding(false);
      return;
    }

    const hasThisCourse = await hasCourse(course.id);
    if (hasThisCourse) {
      toast.error('شما این محصول را خریداری کرده اید', {
        className: 'font-primary text-xs',
      });
      setIsAdding(false);
      return;
    }

    addToCart.mutate(
      { courseId: course.id },
      {
        onSuccess: () => {
          toast.success('محصول مورد نظر به سبد خرید اضافه شد', {
            className: 'font-primary text-xs',
          });
        },
        onError: (error) => {
          toast.error(error.message, {
            className: 'font-primary text-xs',
          });
        },
        onSettled: () => {
          setIsAdding(false);
        },
      }
    );
  };

  return (
    <section className="p-section relative">
      <PrimaryHeading>فروشگاه</PrimaryHeading>

      {/* badge section */}
      <section className="m-0 flex flex-wrap items-center justify-around relative">
        <PreLoader pending={isCategoryLoading} title={'دسته بندی ها را انتخاب کنید'} />
        {courseCategories?.map((box) => (
          <BadgeBox key={box.id} cover_image_url={box.cover_image_url} onClick={() => setCourseInput(box.id)} />
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
              <select className="form-control" onChange={(e) => setCourseInput(e.target.value)} value={courseInput}>
                <option value="">همه دوره ها</option>
                {!isCategoryLoading &&
                  courseCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="store-sorting-input">
              <input
                type="text"
                placeholder="مقاطع تحصیلی"
                className="w-full py-2.5 px-5 rounded-lg shadow-md shadow-black/10"
                value={gradeInput}
                onChange={(e) => setGradeInput(e.target.value)}
                disabled
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
                disabled
              />
              <svg className="absolute w-3 left-5 top-1/2 -translate-y-1/2 text-gray-600">
                <use href="/sprite/hero.svg#chevron-down"></use>
              </svg>
            </div>
            <div className="store-sorting-input">
              <select className="form-control" onChange={(e) => setTeacherInput(e.target.value)} value={teacherInput}>
                <option value="">همه استاد ها</option>
                {teachers?.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <svg className="absolute w-3 left-5 top-1/2 -translate-y-1/2 text-gray-600">
                <use href="/sprite/hero.svg#chevron-down"></use>
              </svg>
            </div>
          </div>
        </div>

        {/* results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 relative">
          {!isFetching && courses.length === 0 && (
            <Alert status="warning" className="col-span-full">
              دوره ای برای نمایش وجود ندارد{' '}
            </Alert>
          )}

          <PreLoader pending={isFetching} title={'در حال بارگذاری...'} />
          <PreLoader pending={isAdding} title={'در حال اضافه کردن...'} />

          {courses?.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-dark-2 dark:text-white shadow-md shadow-black/10 overflow-hidden rounded-xl cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
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

function BadgeBox({ cover_image_url: img, ...props }) {
  return (
    <div
      {...props}
      className="lg:basis-[200px]  md:basis-1/2 l0g:m-2.5 my-2.5 transition-all duration-300 rounded-md overflow-hidden shadow-md hover:shadow-lg shadow-black/20 hover:scale-110 cursor-pointer"
    >
      <img src={img} alt="course box" className="w-full h-full bg-cover" />
    </div>
  );
}
