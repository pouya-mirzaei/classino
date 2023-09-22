import React from 'react';
import useCalendar from '../hooks/useCalendar';

export default function Calendar() {
  const currentDate = useCalendar();
  return (
    <div className="basis-5/12 w-full shadow-md shadow-black/20 rounded-xl">
      {/* header */}
      <div className="p-5 text-center bg-[#eb3b5a] dark:bg-dark-1 border-b-4 border-dashed border-white rounded-t-xl">
        <span className="text-white dark:text-[#eb3b5a] text-3xl font-semibold">{currentDate.month}</span>
      </div>
      {/* body */}
      <div className="bg-white dark:bg-dark-1 p-5 flex flex-col gap-8 justify-center text-center rounded-b-xl">
        <span className="text-[#eb3b5a] dark:text-white text-6xl font-semibold">{currentDate.day}</span>
        <span className="text-2xl font-medium dark:text-white">{currentDate.weekDay}</span>
      </div>
    </div>
  );
}
