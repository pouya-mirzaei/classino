import React from 'react';
import { useParams } from 'react-router-dom';
import CourseDetailsHeader from '../../../components/panel/Courses/CourseDetailsHeader';
import { getAllCourses, getAllTeachers } from '../../../functions/Utilities';
import Alert from '../../../components/panel/Alert/Alert';

// for demo purposes, I'm getting the course from the props
// but we're gonna fetch the course data from the backend later
export default function ClassPreview() {
  const { id } = useParams();

  const course = getAllCourses()[1];
  const session = course.classes.find((session) => session.id == id);
  let teacher = getAllTeachers().find((tech) => tech.id == course.teacherId);
  session.status = 'live';
  const classStatus =
    session.status === 'live'
      ? 'success'
      : session.status === 'ended'
      ? 'warning'
      : session.status === 'not-started'
      ? 'warning'
      : 'danger';
  return (
    <section className="p-section">
      <CourseDetailsHeader
        teacherName={teacher.name}
        teacherImg={teacher.img}
        className="w-full h-4/5 flex md:items-start items-center md:mr-10 justify-evenly flex-col font-extrabold"
      >
        <span className="md:text-3xl text-lg block text-center mb-5">{course.name}</span>
        <span className="md:text-xl tel text-center mb-5">{session.title}</span>
        <span className="md:text-xl tel text-center">
          <span>زمان برگزاری:</span>
          <span>{session.holdingDate}</span>
        </span>
      </CourseDetailsHeader>

      {/* Class status */}
      <Alert status={classStatus} className="mt-10">
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <div className="flex items-center gap-4">
            <span className="rounded-full item-link text-white w-9 h-9 flex items-center justify-center align-middle font-extrabold">
              !
            </span>
            <span className="font-semibold text-lg">
              {session.status === 'ended' && 'کلاس قبلا برگزار شده است'}
              {session.status === 'live' && 'کلاس در حال برگزاری است'}
              {session.status === 'not-started' && 'کلاس هنوز شروع نشده است'}
            </span>
          </div>
          {session.status === 'ended' && (
            <button className="h-12 px-5 item-link text-sm font-bold text-white dark:text-[#3a3b38] rounded-3xl shadow-lg shadow-black/20 active:scale-95">
              نمایش فیلم ظبط شده
            </button>
          )}
          {session.status === 'live' && (
            <button className="h-12 px-5 item-link text-sm font-bold text-white rounded-3xl shadow-lg shadow-black/20 active:scale-95">
              ورود به کلاس
              <span className="text-xl font-semibold"> (classino content)</span>
            </button>
          )}
        </div>
      </Alert>

      {/* Class Features */}

      <div className="flex flex-col lg:flex-row items-center justify-between flex-nowrap gap-5 mt-10">
        <CourseFeatureBox text={'دریافت جزوه'} icon="file-download" />
        <CourseFeatureBox text={'آزمون کلاسی'} icon="pencil" disabled iconColor="text-[#ffa600]" />
        <CourseFeatureBox text={'ارسال تکلیف برای این کلاس غیر فعال است'} icon="pencil-square" disabled />
        <CourseFeatureBox text={'ارسال کارنامه'} icon="pencil-square" />
        <CourseFeatureBox text={'رفع اشکال آفلاین (پرسش و پاسخ)'} icon="pencil-square" disabled />
      </div>
    </section>
  );
}

function CourseFeatureBox({ text, icon, disabled = false, iconColor = 'text-primary-1' }) {
  let bgStyles = 'bg-white dark:bg-dark-1 cursor-pointer';
  if (disabled) bgStyles = 'bg-[#e4e4e4] dark:bg-[#4d5863] cursor-not-allowed';
  return (
    <div
      className={`${bgStyles} dark:text-white lg:basis-1/5 w-full h-40 rounded-lg shadow-md shadow-black/20 flex flex-col items-start justify-center gap-4 p-3`}
    >
      <svg className={`w-[50px] h-auto ${iconColor} mx-auto`}>
        <use href={`/sprite/hero.svg#${icon}`}></use>
      </svg>
      <span className="mx-auto text-sm">{text}</span>
    </div>
  );
}
