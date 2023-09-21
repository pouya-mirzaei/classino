import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavLinkBox({ name, icon, href }) {
  return (
    <NavLink
      to={href}
      className="basis-1/4 flex flex-col items-center justify-center gap-1 w-full text-black/70 font-medium dark:text-white">
      <div className="w-12">
        <svg>
          <use href={`/sprite/hero.svg#${icon}`}></use>
        </svg>
      </div>
      <span className="text-xs font-semibold">{name}</span>
    </NavLink>
  );
}
