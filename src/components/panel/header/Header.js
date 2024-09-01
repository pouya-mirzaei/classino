import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderBox from './HeaderBox';
import useAuth from '../../../hooks/api/useAuth';
import { useCart } from '../../../hooks/api/useCart';

export default function Header({ onOpenSidebar, onToggleDark, dark }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const { size } = useCart();

  useEffect(() => {
    if (isDropDownOpen)
      document.body.addEventListener(
        'click',
        (e) => {
          setIsDropDownOpen(false);
          if (e.target.dataset.signOut) {
            signOut();
          }
          if (e.target.dataset.link) {
            navigate(`/panel/${e.target.dataset.link}`);
          }
        },
        { once: true, capture: true }
      );
  }, [isDropDownOpen]);

  const openDropDown = () => {
    setIsDropDownOpen(true);
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
            <HeaderBox icon="shopping-cart" badge={size()} />
          </Link>
          <Link to={'finance'} className="hidden sm:inline-block">
            <HeaderBox icon="wallet" text={user.credit_balance.toLocaleString() + ' ریال'} breakpoint={{ full: true }} />
          </Link>
          <HeaderBox
            icon="user-circle"
            text={user.name}
            breakpoint={{ full: false }}
            onClick={openDropDown}
            avatar={user.avatar_url}
          />
          {isDropDownOpen && (
            <div
              className="absolute left-5 top-5 bg-white dar:bg-dark-2 rounded-lg shadow-md shadow-black/10 w-44"
              // onClick={() => setIsDropDownOpen(false)}
            >
              <div className="w-full h-full flex flex-col items-start justify-between py-5">
                <span className="text-xs py-3 px-5">{user.name}</span>
                <span className="text-xs py-3 px-5">اعتبار : {user.credit_balance.toLocaleString()} ریال</span>
                <span
                  className="text-xs py-3 px-5 hover:bg-gray-100 w-full transition-all duration-200 cursor-pointer"
                  data-link="profile"
                >
                  پروفایل
                </span>
                <span
                  className="text-xs py-3 px-5 hover:bg-gray-100 w-full transition-all duration-200 cursor-pointer"
                  data-sign-out
                >
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
