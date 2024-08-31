import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/api/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  useEffect(() => {
    user && navigate('/panel/dashboard', { replace: true });
  }, [user]);
  return (
    <div className="flex items-center justify-center bg-[#eaeaea] w-full min-h-screen relative">
      <div className="squares">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <Outlet />
    </div>
  );
}
