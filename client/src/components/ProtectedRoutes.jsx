import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ userType }) => {
  const isLoggedIn = window.localStorage.getItem('loggedIn') === 'true';

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedRoute;