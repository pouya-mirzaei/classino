import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourseData } from '../../../../functions/Utilities';
import CourseDetailsHeader from '../../../../components/panel/Courses/CourseDetailsHeader';

export default function CourseDetails() {
  const { id } = useParams();
  const { name, teacherImage, classes, teacherName } = getCourseData(Number(id));
  const [isLargeWindow, setIsLargeWindow] = useState(false);

  useEffect(() => {
    handleState();
    window.addEventListener('resize', handleState);
  }, []);

  const handleState = () => {
    window.innerWidth >= 768 ? setIsLargeWindow(true) : setIsLargeWindow(false);
  };

  return (
    <div className="m-5">
      <CourseDetailsHeader teacherImg={teacherImage} teacherName={teacherName} className="px-5">
        <span className="xl:text-3xl lg:text-3xl md:text-2xl text-lg font-extrabold text-center">{name}</span>
        <div className="flex items-center justify-evenly gap-5 mt-5">
          <HoldingInfo title="زمان برگزاری" icon="/sprite/hero.svg#calendar" value="شنبه" />
          <HoldingInfo title="ساعت برگزاری" icon="/sprite/hero.svg#clock" value=" 01:00 تا 01:00 " />
        </div>
      </CourseDetailsHeader>

      <div className="mt-5 h-12 font-extrabold text-xs bg-gray-300 text-black/60 flex items-center pr-5 rounded-lg rounded-b-none">
        <span>کلاس ها</span>
      </div>
      <table className="w-full dark:text-white">
        <thead>
          {isLargeWindow && (
            <tr className="text-right [&>*]:text-xs [&>*]:text-gray-500 [&>*]:h-12 bg-white dark:bg-dark-1 border-b-2 border-[#e5e7eb]">
              <th>وضعیت</th>
              <th>عنوان جلسه</th>
              <th>تاریخ برگزاری</th>
              <th>مشاهده</th>
            </tr>
          )}
        </thead>
        <tbody className="divide-y-2 rounded-xl">
          <DesktopCourseTable classes={classes} isLargeWindow={isLargeWindow} />
        </tbody>
      </table>
    </div>
  );
}

function DesktopCourseTable({ classes, isLargeWindow }) {
  return (
    <>
      {classes.map((Class) => (
        <tr key={Class.id} className="[&>*]:px-4 bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2">
          <td className="flex md:table-cell items-center justify-between mt-4 md:mt-0">
            {!isLargeWindow && <span className="text-sm font-semibold text-black/60  dark:text-white/80">وضعیت</span>}
            <svg className="w-8 text-primary-1">
              <use href={`/sprite/hero.svg#lock-${Class.isLocked ? 'close' : 'open'}`}></use>
            </svg>
          </td>
          <td className="lg:w-8/12 w-full md:w-8/12 text-sm flex gap-2 md:table-cell items-center mt-3 md:mt-0">
            {!isLargeWindow && <span className="text-sm font-semibold text-black/60  dark:text-white/80">عنوان جلسه </span>}
            <span className="text-black/90 font-bold dark:text-white/80">{Class.title}</span>
          </td>
          <td className="text-xs font-bold w-full md:w-1/5 mt-3 md:mt-0 flex md:table-cell items-center justify-between">
            {!isLargeWindow && <span className="text-sm font-semibold text-black/60 dark:text-white/80">تاریخ برگزاری</span>}
            <span className="text-black/90 font-bold dark:text-white/80">{Class.holdingDate}</span>
          </td>
          <td className="w-full md:w-1/5 flex items-center justify-between md:table-cell">
            {!isLargeWindow && <span className="text-sm font-semibold text-black/60 dark:text-white/80">مشاهده</span>}
            <Link
              to={`/panel/class/show/${Class.id}`}
              className="inline-block basis-2/5 text-center align-middle leading-[45px] bg-primary-1 hover:bg-primary-2 text-white h-[45px] w-full mx-1 my-4 text-[.8rem] font-medium rounded-md transition-all duration-200"
            >
              نمایش کلاس
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
}

function HoldingInfo({ title, icon, value }) {
  return (
    <div className="flex flex-col md:flex-row  items-center gap-x-2.5">
      {/* icon */}
      <div className="md:w-[50px] w-8 md:p-3 p-1 rounded-full text-primary-1 bg-white ">
        <svg>
          <use href={icon}></use>
        </svg>
      </div>
      {/* info */}
      <div className="flex flex-col items-center gap-2.5 md:mr-2.5">
        <div className="text-base text-white  ">{title}</div>
        <span className="w-max">{value}</span>
      </div>
    </div>
  );
}
