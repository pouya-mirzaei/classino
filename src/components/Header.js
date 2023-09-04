import React, { useEffect, useState } from 'react';
import Courses from '../pages/Home/components/Courses';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    setScrolled(window.scrollY > 0 ? true : false);
  };
  const handleClick = (e) => {
    console.log(e);
  };

  return (
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
      <div className="flex items-center gap-x-2.5 lg:hidden h-full [&>*]:w-10">
        <svg>
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
  );
}
