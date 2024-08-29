import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

export default function PrivateRoutes({ children }) {
  const { user } = useAuth();

  // If user exists, render the children
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
