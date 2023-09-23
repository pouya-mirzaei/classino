import React from 'react';
import Timer from '../Timer';
import Calendar from '../Calendar';

export default function Features() {
  return (
    <div className="basis-full md:basis-1/2 lg:basis-2/3">
      {/* container */}
      <div className="h-full flex flex-col items-center md:justify-between gap-y-5">
        {/* slider */}
        <div className="rounded-md overflow-hidden shadow-md shadow-black/20 cursor-pointer h-24">
          <img src="/images/swiper/panel/anoun-slider-1.png" className="bg-cover w-full h-full" />
        </div>
        {/* features */}
        <div className="flex flex-col lg:flex-row items-end justify-center gap-5 w-full">
          <Timer />
          <Calendar />
        </div>
      </div>
    </div>
  );
}
