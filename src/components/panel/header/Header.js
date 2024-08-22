import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderBox from './HeaderBox';
import { useCart } from '../../../Contexts/CartContext';

export default function Header({ onOpenSidebar, onToggleDark, dark }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { cartItems } = useCart();

  useEffect(() => {
    document.body.addEventListener(
      'click',
      () => {
        setIsDropDownOpen(false);
      },
      { once: true }
    );
  }, [isDropDownOpen]);

  const openDropDown = () => {
    setIsDropDownOpen(true);
    console.log('jello');
  };

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
          <Link to={'cart'}>
            <HeaderBox icon="shopping-cart" badge={cartItems.length} />
          </Link>
          <Link to={'finance'}>
            <HeaderBox icon="wallet" text="اعتبار 0 ریال" breakpoint={{ full: true }} />
          </Link>
          <HeaderBox icon="user-circle" text="پویا میرزایی" breakpoint={{ full: false }} onClick={openDropDown} />
          {isDropDownOpen && (
            <div
              className="absolute left-5 top-5 bg-white dar:bg-dark-2 rounded-lg shadow-md shadow-black/10 w-44"
              onClick={() => setIsDropDownOpen(false)}
            >
              <div className="w-full h-full flex flex-col items-start justify-between py-5">
                <span className="text-xs py-3 px-5">پویا میزایی</span>
                <span className="text-xs py-3 px-5">اعتبار 0 ریال</span>
                <span className="text-xs py-3 px-5 hover:bg-gray-100 w-full transition-all duration-200 cursor-pointer">
                  پروفایل
                </span>
                <span className="text-xs py-3 px-5 hover:bg-gray-100 w-full transition-all duration-200 cursor-pointer">
                  خروج
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
