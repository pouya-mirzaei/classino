import React from 'react';

export default function HeaderBox({ icon, text, breakpoint, badge }) {
  return (
    <div
      className={`relative px-2 py-2.5 border rounded-md flex items-center gap-2 text-[#70657b] hover:bg-gray-200 focus:bg-gray-200 hover:text-black focus:text-black transition-all cursor-pointer ${
        breakpoint && breakpoint.full && 'hidden sm:flex'
      }`}>
      <div className="w-6 sm:w-7">
        <svg>
          <use href={`sprite/hero.svg#${icon}`}></use>
        </svg>
      </div>
      {text && <div className={`text-[13px] ${breakpoint && !breakpoint.full && 'hidden sm:block'}`}>{text}</div>}
      {badge && (
        <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/3 w-[18px] h-[18px] bg-[red] text-white flex items-center justify-center rounded-md text-xs font-semibold">
          {badge}
        </span>
      )}
    </div>
  );
}
