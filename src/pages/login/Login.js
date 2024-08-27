import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../../functions/Utilities';
import OTP_FORM from './OTP_FORM';

export default function Login() {
  let navigate = useNavigate();
  const [loginWithPassword, setLoginWithPassword] = useState(false);

  const toggleLoginWithPassword = () => {
    setLoginWithPassword(!loginWithPassword);
  };

  useEffect(() => {
    isUserLoggedIn() && navigate('/panel/dashboard', { replace: true });
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
      {loginWithPassword ? (
        <LoginForm onToggleLoginWithPassword={toggleLoginWithPassword} />
      ) : (
        <OTP_FORM onToggleLoginWithPassword={toggleLoginWithPassword} />
      )}
    </div>
  );
}
