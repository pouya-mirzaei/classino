import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function NavLinkBox({ name, icon, href, onOpen }) {
  const handleClick = () => {
    window.innerWidth < 575 && onOpen(false);
  };

  const location = useLocation();
  const isActive = location.pathname.startsWith('/panel/courses/');

  return (
    <NavLink
      to={href}
      className={`basis-1/4 flex flex-col items-center justify-center gap-1 w-full text-black/70 font-medium dark:text-white ${
        isActive && href == 'mycourselist' ? 'active' : ''
      }`}
      onClick={handleClick}
    >
      <div className="w-12">
        <svg>
          <use href={`/sprite/hero.svg#${icon}`}></use>
        </svg>
      </div>
      <span className="text-xs text-center font-semibold">{name}</span>
    </NavLink>
  );
}
