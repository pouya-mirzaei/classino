import React, { useEffect, useState } from 'react';

export default function Courses() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  const handleShowCourses = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="hidden lg:inline-block relative">
      <button
        className="flex items-center gap-x-2.5 btn-panel bg-primary-1 text-white hover:bg-primary-2"
        onClick={handleShowCourses}>
        دوره ها
        <svg className="w-5">
          <use href="sprite/hero.svg#chevron-down"></use>
        </svg>
      </button>

      {/* sub menu */}
      <div
        className={`absolute z-20 top-[110%] right-0 w-[440px] bg-white rounded-2xl border ${
          isMenuOpen ? 'flex' : 'hidden'
        }`}>
        <ul className="divide-y-2 w-full [&>*]:py-4 text-lg">
          <li className="text-primary-2 text-center">کلاسینو</li>
          <li className="pr-5">سال تحصیلی 1402-1403</li>
          <li className="pr-5">انتخاب رشته کنکور 1402</li>
          <li className="pr-5">زبانینو</li>
          <li className="flex justify-center">
            <button className="text-center btn-panel bg-primary-1 text-white hover:bg-primary-2 w-4/5">
              دوره ها در یک نگاه
            </button>
          </li>
        </ul>
      </div>
      <div
        className={`fixed bg-black/50 w-screen h-screen z-10 scale-150 ${isMenuOpen ? 'block' : 'hidden'}`}
        onClick={closeMenu}></div>
    </div>
  );
}
