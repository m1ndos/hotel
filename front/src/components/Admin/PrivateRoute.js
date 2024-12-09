import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, isAuthenticated, isAdmin }) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" />; // Перенаправление на страницу входа, если пользователь не авторизован
  }

  if (isAdmin === false) {
    return <Navigate to="/" />; // Перенаправление на главную, если пользователь не администратор
  }

  return Element;
};

export default PrivateRoute;
