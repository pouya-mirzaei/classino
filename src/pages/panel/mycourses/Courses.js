import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEnrollments } from '../../../hooks/api/useEnrollments';
import PreLoader from '../../../components/PreLoader';
import Alert from '../../../components/panel/Alert/Alert';
import { toast } from 'react-toastify';

export default function Courses() {
  const { userCourses, isUserCoursesFetching, isError } = useEnrollments();

  if (isError) {
    toast.error('مشکلی پیش آمد، لطفا بعدا تلاش کنید', {
      className: 'font-primary text-xs',
    });
  }

  return (
    <section className="p-section relative h-full">
      <PreLoader pending={isUserCoursesFetching} title={'در حال بارگذاری...'} />
      {!isUserCoursesFetching && !userCourses?.length ? (
        <Alert status={'warning'}>
          <p>موردی برای نمایش وجود ندارد</p>
        </Alert>
      ) : (
        <ul className="space-y-2.5 dark:text-white relative">
          {userCourses?.map(({ courses: course }) => (
            <CourseBox
              key={course.id}
              id={course.id}
              title={course.title}
              image={course.course_image_url}
              slug={course.course_id}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function CourseBox({ id, title, image, slug }) {
  return (
    <li className="w-full bg-white dark:bg-dark-1 rounded-xl shadow shadow-black/10">
      <Link to={`/panel/courses/${slug}`} className="w-full h-full inline-block p-5">
        <div className="flex items-center flex-wrap gap-y-10">
          {/* course title and image */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start basis-full lg:basis-2/5 gap-5">
            <div className="shrink-0 w-[150px] h-[150px]">
              <img src={image} className="w-full h-full bg-cover" />
            </div>
            <div className="flex flex-col gap-5 mr-5">
              <span className="text-lg font-bold dark:text-[#a9d4ff]">درس :</span>
              <span className="text-sm">{title}</span>
            </div>
          </div>
          {/* course timing information */}
          <div className="flex items-center justify-around lg:justify-around basis-full lg:basis-3/5">
            <HoldingInfo title="زمان برگزاری" icon="/sprite/hero.svg#calendar" value="شنبه" />
            <HoldingInfo title="ساعت برگزاری" icon="/sprite/hero.svg#clock" value=" 01:00 تا 01:00 " />
          </div>
        </div>
      </Link>
    </li>
  );
}

function HoldingInfo({ title, icon, value }) {
  return (
    <div className="flex items-center gap-x-2.5">
      {/* icon */}
      <div className="w-[50px] p-3 rounded-full text-[#ffaf20] bg-[#ffedcc] dark:bg-[#3a3b38]">
        <svg>
          <use href={icon}></use>
        </svg>
      </div>
      {/* info */}
      <div className="flex flex-col gap-2.5 mr-2.5">
        <div className="text-base text-black/50 dark:text-white/80">{title}</div>
        <div>{value}</div>
      </div>
    </div>
  );
}
