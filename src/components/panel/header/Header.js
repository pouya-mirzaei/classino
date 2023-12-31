import React from 'react';
import { Link } from 'react-router-dom';
import HeaderBox from './HeaderBox';

export default function Header({ onOpenSidebar, onToggleDark, dark }) {
  return (
    <header className="panel-header">
      {/* header container */}
      <div className="p-2 sm:p-5 flex items-center justify-between flex-wrap h-full">
        {/* right side */}
        <div className="flex flex-row-reverse md:flex-row items-center gap-5 lg:gap-12">
          <div className="w-[100px] sm:w-auto">
            <Link to="dashboard">
              <img src="/images/classinoLogo.08df55af.svg" alt="classino logo" />
            </Link>
          </div>
          <div className="text-black dark:text-white w-6 cursor-pointer" onClick={onOpenSidebar}>
            <svg>
              <use href="/sprite/hero.svg#3-bars"></use>
            </svg>
          </div>
          <div className="text-black dark:text-white w-6 cursor-pointer hidden md:block" onClick={onToggleDark}>
            <svg>
              <use href={`/sprite/hero.svg#${dark ? 'sun' : 'moon'}`}></use>
            </svg>
          </div>
        </div>
        {/* left side */}
        <div className="flex items-center gap-2.5">
          <HeaderBox icon="chat-left" badge="0" />
          <HeaderBox icon="bell" badge="0" />
          <HeaderBox icon="shopping-cart" badge="0" />
          <Link to={'finance'}>
            <HeaderBox icon="wallet" text="اعتبار 0 ریال" breakpoint={{ full: true }} />
          </Link>
          <HeaderBox icon="user-circle" text="پویا میرزایی" breakpoint={{ full: false }} />
        </div>
      </div>
    </header>
  );
}
