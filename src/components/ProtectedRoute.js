import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, redirectTo, requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={redirectTo} />;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userRole = decodedToken.role;

    if (userRole !== requiredRole) {
      return <Navigate to={redirectTo} />;
    }

    return children;
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to={redirectTo} />;
  }
};

export default ProtectedRoute;
