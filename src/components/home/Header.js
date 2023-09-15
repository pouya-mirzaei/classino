import React, { useEffect, useState } from 'react';
import Courses from './Courses';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // use effects

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setIsMobileMenuOpen(false);
  }, []);

  // functions

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      {/* assets */}

      <div className="absolute h-screen">
        {/* mobile menu */}
        <div
          className={`fixed w-4/5 min-h-screen z-[60] bg-[#f3f3f3] max-w-md transition-all duration-300 ${
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
            <Link to="/panel">
              <li className="flex justify-center items-center">
                <button className="btn-panel w-4/5">ورود به پنل کاربری</button>
              </li>
            </Link>
          </ul>
        </div>

        <div
          className={`fixed inset-0 bg-black/50 z-[52] ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          onClick={closeMobileMenu}></div>
      </div>
      <header
        className={`flex items-center justify-between lg:justify-around flex-row-reverse lg:flex-row bg-white transition-all h-20 sticky z-[51] top-0 px-3.5 ${
          isScrolled ? 'shadow-lg' : ' '
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
            <svg className="h-full p-2 rounded-full bg-primary-2 cursor-pointer text-white absolute left-0">
              <use href="sprite/hero.svg#magnifying-glass"></use>
            </svg>
          </div>
        </div>
        {/* left side */}
        <div className="hidden lg:inline-block">
          <Link to="/panel">
            <button className="btn-panel">ورود به پنل کاربری</button>
          </Link>
        </div>
        {/* mobile icons */}
        <div className="flex items-center gap-x-2.5 lg:hidden h-full [&>*]:w-10">
          <svg
            className="hover:border-b hover:border-black active:translate-y-0.5 inline-block transition-all"
            onClick={toggleMobileMenu}>
            <use href="sprite/hero.svg#3-bars"></use>
          </svg>
          <Link to="/panel">
            <svg className="hover:border-b hover:border-black active:translate-y-0.5 inline-block transition-all">
              <use href="sprite/hero.svg#user-circle"></use>
            </svg>
          </Link>
        </div>
      </header>
    </>
  );
}
