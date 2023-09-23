import React from 'react';

export default function SocialBox({ name, color, link, icon, socialId }) {
  return (
    <a href={link} className="p-5 shadow-md shadow-black/20 bg-white dark:bg-dark-1 rounded-xl">
      <div className="flex items-center  w-full cursor-pointer">
        {/* icon */}
        <div className="w-10">
          <img src={`/images/social-media/${icon}.svg`} alt={icon} />
        </div>
        {/* content */}
        <div className="flex flex-col gap-5 items-center h-full w-full">
          {/* id */}
          <span className="text-2xl" style={{ color }}>
            {socialId}
          </span>
          {/* text */}
          <span className="text-xs dark:text-white">مارو توی {name} دنبال کنید</span>
        </div>
      </div>
    </a>
  );
}
