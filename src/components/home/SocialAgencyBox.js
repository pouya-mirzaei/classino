import React from 'react';

export default function SocialAgencyBox({ img, name }) {
  return (
    <div className="basis-[180px] bg-white text-[#575757] border border-black/10 aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 group">
      <img src={img} alt={name} className="w-3/5 grayscale transition-all group-hover:grayscale-0" />
      <p>{name}</p>
    </div>
  );
}
