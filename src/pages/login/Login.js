import React, { useEffect } from 'react';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../../functions/Utilities';

export default function Login() {
  let navigate = useNavigate();

  useEffect(() => {
    isUserLoggedIn() && navigate('/panel', { replace: true });
  }, []);
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
      <LoginForm />
    </div>
  );
}
