import React, { useEffect, useState } from 'react';
import Header from '../../components/panel/header/Header';
import SideBar from '../../components/panel/side-bar/SideBar';

export default function Panel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    window.innerWidth < 575 && setIsSidebarOpen(false);
    window.addEventListener('resize', () => {
      setIsSidebarOpen(false);
    });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative">
        <Header onOpenSidebar={toggleSidebar} />
        <main className="relative flex">
          <SideBar isOpen={isSidebarOpen} />
          <div className="bg-red-500 grow text-center h-[1000px]">test</div>
        </main>
      </div>
    </>
  );
}
