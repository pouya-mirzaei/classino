import React from 'react';
import { Navigate } from 'react-router-dom';

function isUserLoggedIn() {
  return false;
}

export default function PrivateRoutes({ children }) {
  return <>{isUserLoggedIn() ? <>{children}</> : <Navigate to="/login" />}</>;
}
