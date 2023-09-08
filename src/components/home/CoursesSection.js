import React, { useState } from 'react';
import CourseBox from './CourseBox';
import PreLoader from '../PreLoader';

export default function CoursesSection() {
  const [coursesData, setCoursesData] = useState([
    { id: 0, name: '1', img: 'images/doreh/DoreJameDahomEshteraki1403-Big.8fd2f5b9.png' },
    { id: 1, name: '2', img: 'images/doreh/DoreJameDahomYazdahom1403-Big.d762d1a1.png' },
    { id: 2, name: '3', img: 'images/doreh/DoreJameDavazdahom1403-Big.e2f16463.png' },
    { id: 3, name: '4', img: 'images/doreh/DoreJameKonkoor1403-Big.4ddc5616.png' },
    { id: 4, name: '5', img: 'images/doreh/DoreJamePanjomTaNohom1403-Big.81a8226b.png' },
    { id: 5, name: '6', img: 'images/doreh/zabaninopng.png' },
  ]);

  return (
    <section className="container px-5 md:p-0">
      <h2 className="heading-secondary text-center">دوره های ۱۴۰۲-۱۴۰۳ کلاسینو</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 gap-y-5 mt-10 relative">
        <PreLoader title={'دوره های کلاسینو'} />
        {coursesData.map((course) => (
          <CourseBox key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}
