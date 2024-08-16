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
  session.status = 'ended';
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

      <Alert status={classStatus} className="mt-5">
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
              وارد شوید
            </button>
          )}
        </div>
      </Alert>
    </section>
  );
}
