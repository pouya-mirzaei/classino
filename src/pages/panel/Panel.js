import React, { useEffect, useState } from 'react';
import Header from '../../components/panel/header/Header';
import SideBar from '../../components/panel/side-bar/SideBar';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Copyright from '../../components/Copyright';

export default function Panel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const params = useLocation();

  useEffect(() => {
    // console.log(params);
  });

  useEffect(() => {
    window.innerWidth < 1000 && setIsSidebarOpen(false);
    window.innerWidth > 1000 && setIsSidebarOpen(true);
    window.addEventListener('resize', () => {
      window.innerWidth < 1000 && setIsSidebarOpen(false);
      window.innerWidth > 1000 && setIsSidebarOpen(true);
    });
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
        <div className="relative flex dark:bg-dark-2">
          <SideBar isOpen={isSidebarOpen} onOpen={setIsSidebarOpen} />
          {/* content */}
          <main className="panel-content">
            <Outlet />
            <Copyright />
          </main>
        </div>
      </div>
    </>
  );
}
