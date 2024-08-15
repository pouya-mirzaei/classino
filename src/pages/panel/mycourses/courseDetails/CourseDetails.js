import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourseData } from '../../../../functions/Utilities';
import CourseDetailsHeader from '../../../../components/panel/Courses/CourseDetailsHeader';

export default function CourseDetails() {
  const { id } = useParams();

  console.log(id);

  const { name, teacherImage, classes, teacherName } = getCourseData(Number(id));

  return (
    <div className="m-5">
      {/* <Header teacherImg={teacherImage} courseTitle={name} teacherName={teacherName} /> */}
      <CourseDetailsHeader teacherImg={teacherImage} teacherName={teacherName} className="px-5">
        <span className="xl:text-3xl lg:text-3xl md:text-2xl text-lg font-extrabold text-center">{name}</span>
        <div className="flex items-center justify-evenly gap-5 mt-5">
          <HoldingInfo title="زمان برگزاری" icon="/sprite/hero.svg#calendar" value="شنبه" />
          <HoldingInfo title="ساعت برگزاری" icon="/sprite/hero.svg#clock" value=" 01:00 تا 01:00 " />
        </div>
      </CourseDetailsHeader>

      <table className="w-full mt-5 dark:text-white">
        <thead>
          <tr className="text-right">
            <th>وضعیت</th>
            <th>عنوان جلسه</th>
            <th className="w-max">تاریخ برگزاری</th>
            <th className="min-w-[110px]">مشاهده</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 rounded-xl">
          {classes.map((Class) => (
            <tr key={Class.id} className="[&>*]:p-3 bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2">
              <td className="w-8">
                <svg className="w-8 text-primary-1">
                  <use href={`/sprite/hero.svg#lock-${Class.isLocked ? 'close' : 'open'}`}></use>
                </svg>
              </td>
              <td className="text-base max-w-lg">{Class.title}</td>
              <td className="max-w-[100px] text-xs md:text-sm">{Class.holdingDate}</td>
              <td>
                <Link to={'/panel/class/show/' + Class.id}>
                  <button className="bg-primary-1 hover:bg-primary-2 text-white w-full h-[45px] px-0.5 text-[.8rem] font-medium rounded-md transition-all duration-200">
                    نمایش کلاس
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Header({ courseTitle, holdingDays, holdingHours, teacherImg, teacherName }) {
  return (
    <div className="bg-primary-1 w-full rounded-xl pt-5 flex">
      <div className="basis-1/6 mr-5">
        <img src={teacherImg} alt={teacherName} />
      </div>
      <div className="grow flex flex-col justify-center gap-y-10 it ems-center text-white">
        <span className="text-3xl font-extrabold">{courseTitle}</span>
        <div className="flex items-center gap-5">
          <HoldingInfo title="زمان برگزاری" icon="/sprite/hero.svg#calendar" value="شنبه" />
          <HoldingInfo title="ساعت برگزاری" icon="/sprite/hero.svg#clock" value=" 01:00 تا 01:00 " />
        </div>
      </div>
    </div>
  );
}

function HoldingInfo({ title, icon, value }) {
  return (
    <div className="flex flex-col md:flex-row  items-center gap-x-2.5">
      {/* icon */}
      <div className="md:w-[50px] w-12 md:p-3 p-2 rounded-full text-primary-1 bg-white ">
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
