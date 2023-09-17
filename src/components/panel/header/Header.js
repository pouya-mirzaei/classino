import React from 'react';
import { Link } from 'react-router-dom';
import HeaderBox from './HeaderBox';

export default function Header() {
  return (
    <header className="panel-header">
      {/* header container */}
      <div className="p-5 flex items-center justify-between">
        {/* right side */}
        <div className="flex items-center gap-16">
          <div>
            <Link to="">
              <img src="images/classinoLogo.08df55af.svg" alt="classino logo" />
            </Link>
          </div>
          <div className="text-black w-6 cursor-pointer">
            <svg>
              <use href="sprite/hero.svg#3-bars"></use>
            </svg>
          </div>
          <div className="text-black w-6 cursor-pointer">
            <svg>
              <use href="sprite/hero.svg#moon"></use>
            </svg>
          </div>
        </div>
        {/* left side */}
        <div className="flex items-center gap-2.5">
          <HeaderBox icon="chat-left" />
          <HeaderBox icon="bell" />
          <HeaderBox icon="shopping-cart" />
          <HeaderBox icon="wallet" text="اعتبار 0 ریال" />
          <HeaderBox icon="user-circle" text="پویا میرزایی" />
        </div>
      </div>
    </header>
  );
}
