import React, { useEffect } from 'react';
import PreLoader from '../../components/PreLoader';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Callback() {
  const { user, refetchUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    refetchUser().then(() => {
      if (!user) {
        navigate('/auth/login', { replace: true });
        return;
      }
      if (user?.grade) {
        navigate('/panel/dashboard', { replace: true });
      } else {
        toast.warning('لطفا اطلاعات خود را کامل کنید', {
          className: 'font-primary text-xs',
        });
        navigate('/panel/profile', { replace: true });
      }
    });
  }, []);

  return <PreLoader duration={10000} title={'درحال وارد شدن به سیستم'} />;
}
