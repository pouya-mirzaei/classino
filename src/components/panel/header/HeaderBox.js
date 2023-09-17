import React from 'react';

export default function HeaderBox({ icon, text }) {
  return (
    <div className="px-2 py-2.5 border rounded-md flex items-center gap-2 text-[#70657b] hover:bg-gray-200 hover:text-black transition-all cursor-pointer">
      <div className="w-7">
        <svg>
          <use href={`sprite/hero.svg#${icon}`}></use>
        </svg>
      </div>
      {text && <div className="text-[13px]">{text}</div>}
    </div>
  );
}
