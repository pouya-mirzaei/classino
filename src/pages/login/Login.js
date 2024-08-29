import React, { useEffect, useState } from 'react';
import SignUpForm from './SignUpForm';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../../functions/Utilities';
import LoginForm from './LoginForm';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  let navigate = useNavigate();

  const { user } = useAuth();
  const [loginWithPassword, setLoginWithPassword] = useState(false);

  const toggleLoginWithPassword = () => {
    setLoginWithPassword(!loginWithPassword);
  };

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
      {loginWithPassword ? (
        <SignUpForm onToggleLoginWithPassword={toggleLoginWithPassword} />
      ) : (
        <LoginForm onToggleLoginWithPassword={toggleLoginWithPassword} />
      )}
    </div>
  );
}
