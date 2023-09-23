import React, { useEffect, useState } from 'react';
import Header from '../../components/panel/header/Header';
import SideBar from '../../components/panel/side-bar/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Copyright from '../../components/Copyright';

export default function Panel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.innerWidth < 575 && setIsSidebarOpen(false);
    window.addEventListener('resize', () => {
      window.innerWidth < 575 && setIsSidebarOpen(false);
    });

    if (window.location.pathname === '/panel') {
      navigate('/panel/dashboard');
    }
  }, []);

  useEffect(() => {
    darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark');
  }, [darkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      <div className="relative">
        <Header onOpenSidebar={toggleSidebar} dark={darkMode} onToggleDark={toggleDarkMode} />
        <main className="relative flex">
          <SideBar isOpen={isSidebarOpen} />
          {/* content */}
          <div className="bg-gray-200 dark:bg-dark-3 grow">
            <Outlet />
            <Copyright />
          </div>
        </main>
      </div>
    </>
  );
}
