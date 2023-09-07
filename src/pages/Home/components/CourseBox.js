import React from 'react';

export default function CourseBox({ img, name }) {
  return (
    <div className="flex items-center justify-center transition-all duration-200 ease-in-out rounded-xl overflow-hidden cursor-pointer hover:scale-105">
      <img src={img} alt={name} className="w-full bg-cover" />
    </div>
  );
}
