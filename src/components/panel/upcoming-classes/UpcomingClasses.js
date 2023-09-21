import React, { useState } from 'react';

export default function UpcomingClasses() {
  const [display, setDisplay] = useState('today');

  const handleDisplay = (value) => {
    setDisplay(value);
  };

  return (
    <div className="basis-full lg:basis-1/3 px-4">
      {/* card */}
      <div className="bg-white rounded-xl card">
        <ul className="flex items-center border-b border-secondary-1 shadow-md shadow-black/20">
          <li
            onClick={() => handleDisplay('today')}
            className={`basis-1/2 p-5 text-xs text-center text-gray-700 cursor-pointer ${
              display === 'today' ? 'active' : ''
            }`}>
            کلاس های امروز من
          </li>
          <li
            onClick={() => handleDisplay('future')}
            className={`basis-1/2 p-5 text-xs text-center text-gray-700 cursor-pointer ${
              display === 'future' ? 'active' : ''
            }`}>
            کلاس های آینده من
          </li>
        </ul>
        {/* classes */}
        <div className="h-[350px] flex flex-col items-center justify-center overflow-y-scroll">
          {/* no classes */}
          <div className="w-10 text-primary-1">
            <svg>
              <use href="/sprite/hero.svg#frown"></use>
            </svg>
          </div>
          <span>امروز کلاسی ندارید</span>
        </div>
      </div>
    </div>
  );
}
