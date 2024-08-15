import React from 'react';

export default function CourseDetailsHeader({ teacherImg, teacherName, className = '', children }) {
  return (
    <div className="bg-primary-1 w-full rounded-xl pt-5 lg:min-h-72 xl:min-h-80 min-h-[200px] flex flex-col lg:flex-row">
      <div className="lg:self-end hidden md:inline-block md:mb-5 lg:mb-0">
        <img src={teacherImg} alt={teacherName} className="xl:h-72 lg:h-64" />
      </div>
      <div className="grow flex flex-col justify-center gap-y-10 items-center text-white">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
