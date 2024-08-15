import React from 'react';
import { useParams } from 'react-router-dom';
import CourseDetailsHeader from '../../../components/panel/Courses/CourseDetailsHeader';
import { getAllCourses, getAllTeachers } from '../../../functions/Utilities';

// for demo purposes, I'm getting the course from the props
// but we're gonna fetch the course data from the backend later
export default function ClassPreview() {
  const { id } = useParams();

  const course = getAllCourses()[1];
  const session = course.classes.find((session) => session.id == id);
  let teacher = getAllTeachers().find((tech) => tech.id == course.teacherId);
  return (
    <section className="p-section">
      <CourseDetailsHeader
        teacherName={teacher.name}
        teacherImg={teacher.img}
        className="w-full h-4/5 flex items- mr-10 justify-evenly flex-col font-extrabold"
      >
        <h1 className="text-3xl">{course.name}</h1>
        <h2 className="text-xl">{session.title}</h2>
        <h2 className="text-xl">
          <span>زمان برگزاری:</span>
          <span>{session.holdingDate}</span>
        </h2>
      </CourseDetailsHeader>
    </section>
  );
}
