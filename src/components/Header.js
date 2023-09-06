import React, { useEffect, useState } from 'react';
import Courses from '../pages/Home/components/Courses';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  // use effects

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setIsMobileMenuOpen(true);
  }, []);

  // functions

  const handleScroll = () => {
    setScrolled(window.scrollY > 0 ? true : false);
  };

  const handleClick = (e) => {
    console.log(e);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`flex items-center transition-all justify-between lg:justify-around flex-row-reverse lg:flex-row h-20 sticky top-0 px-3.5 ${
          scrolled ? 'shadow-lg' : ''
        }`}>
        {/* right side */}

        <div className="flex items-center gap-x-5">
          {/* logo */}

          <div>
            <a href="/">
              <img src="images/classinoLogo.08df55af.svg" alt="classino logo" />
            </a>
          </div>

          {/* courses */}

          <Courses></Courses>

          {/* search bar */}

          <div className="relative hidden lg:flex">
            <input
              type="text"
              autoComplete="off"
              placeholder="جست و جو دوره، پایه تحصیلی، استاد"
              className="w-80 xl:w-[400px] rounded-[34px] outline-none py-2 px-5 bg-[#f0f0f1] shadow-lg placeholder:text-sm hover:bg-white focus:bg-white transition-all"
            />
            <svg
              className="h-full p-2 rounded-full bg-primary-2 cursor-pointer text-white absolute left-0"
              onClick={handleClick}>
              <use href="sprite/hero.svg#magnifying-glass"></use>
            </svg>
          </div>
        </div>

        {/* left side */}

        <div className="hidden lg:inline-block">
          <button className="btn-panel">ورود به پنل کاربری</button>
        </div>

        {/* mobile icons */}
        <div className="flex items-center gap-x-2.5 lg:hidden h-full [&>*]:w-10">
          <svg onClick={toggleMobileMenu}>
            <use href="sprite/hero.svg#3-bars"></use>
          </svg>
          <svg>
            <use href="sprite/hero.svg#magnifying-glass"></use>
          </svg>
          <svg>
            <use href="sprite/hero.svg#user-circle"></use>
          </svg>
        </div>
      </header>
      <div>
        <div
          className={`absolute top-0 bottom-0 w-4/5 z-20 bg-[#f3f3f3] max-w-md transition-all duration-300 ${
            isMobileMenuOpen ? 'menu-open' : 'menu-close'
          }`}>
          <ul className="flex flex-col pt-2 [&>*]:border-y [&>*]:py-5">
            <li className="flex justify-center">
              <a href="#">
                <img src="images/classino_Logo.08df55af.svg" alt="classni logo" />
              </a>
            </li>
            <li className="pr-5">
              <a className="hover:text-primary-1 transition-all" href="#">
                سال تحصیلی 1402-1403
              </a>
            </li>
            <li className="pr-5">
              <a className="hover:text-primary-1 transition-all" a href="#">
                انتخاب رشته کنکور 1402
              </a>
            </li>
            <li className="pr-5">
              <a className="hover:text-primary-1 transition-all" href="#">
                زبانینو
              </a>
            </li>

            <li className="flex justify-center items-center basis-full bg-white py-5">
              <button className="btn-panel bg-primary-1 text-white hover:bg-primary-2 w-4/5">دوره ها در یک نگاه</button>
            </li>
            <li className="flex justify-center items-center">
              <button className="btn-panel w-4/5">ورود به پنل کاربری</button>
            </li>
          </ul>
        </div>

        <div
          className={`absolute inset-0 bg-black/50 z-10 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          onClick={closeMobileMenu}></div>
      </div>
    </>
  );
}
