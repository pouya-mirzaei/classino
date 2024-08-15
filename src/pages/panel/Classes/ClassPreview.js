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
        className="w-full h-4/5 flex md:items-start items-center md:mr-10 justify-evenly flex-col font-extrabold"
      >
        <span className="md:text-3xl text-lg block text-center mb-5">{course.name}</span>
        <span className="md:text-xl tel text-center mb-5">{session.title}</span>
        <span className="md:text-xl tel text-center">
          <span>زمان برگزاری:</span>
          <span>{session.holdingDate}</span>
        </span>
      </CourseDetailsHeader>
    </section>
  );
}
