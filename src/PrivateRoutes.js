import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from './functions/Utilities';

export default function PrivateRoutes({ children }) {
  return <>{isUserLoggedIn() ? <>{children}</> : <Navigate to="/login" replace />}</>;
}
