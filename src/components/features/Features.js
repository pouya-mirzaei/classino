import React from 'react';
import Timer from '../Timer';
import Calendar from '../Calendar';

export default function Features() {
  return (
    <div className="basis-full md:basis-1/2 lg:basis-[41.666667%] px-4">
      <div className="h-full flex flex-col items-center md:justify-between gap-y-5">
        <div className="rounded-md overflow-hidden shadow-md shadow-black/20 cursor-pointer h-24">
          <img src="/images/swiper/panel/anoun-slider-1.png" className="bg-cover w-full h-full" />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 w-full">
          <Timer />
          <Calendar />
        </div>
      </div>
    </div>
  );
}
