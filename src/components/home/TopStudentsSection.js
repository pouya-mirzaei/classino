import React from 'react';
import TopStudentsRow from './TopStudentsRow';

export default function TopStudentsSection() {
  return (
    <section className="bg-primary-2 py-20 flex flex-col items-center gap-y-10">
      <h2 className="heading-secondary text-center text-white">انتخاب درست دانش آموزان سال‌های گذشته</h2>

      <TopStudentsRow year={1401} />
      <TopStudentsRow year={1400} />
    </section>
  );
}
