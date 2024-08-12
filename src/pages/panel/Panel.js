import React, { useEffect, useState } from 'react';
import Header from '../../components/panel/header/Header';
import SideBar from '../../components/panel/side-bar/SideBar';
import { Outlet } from 'react-router-dom';
import Copyright from '../../components/Copyright';
import { CartProvider } from '../../Contexts/CartContext';
import { ToastContainer } from 'react-toastify';

export default function Panel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark') == 'true');

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
    localStorage.setItem('dark', !darkMode);
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      <CartProvider>
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
      </CartProvider>
      <ToastContainer limit={4} pauseOnFocusLoss={false} pauseOnHover={false} className={'font-primary'} />
    </>
  );
}
