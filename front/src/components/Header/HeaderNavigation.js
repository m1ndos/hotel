import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Для отслеживания текущего пути
  const [isHovered, setIsHovered] = useState(false); // Для hover-эффекта

  const pages = [
    { name: 'Главная', path: '/' },
    { name: 'Номерной фонд', path: '/categories' },
    // { name: 'Услуги', path: '/services' },  // todo: реализовать
    // { name: 'Мои бронирования', path: '/bookings' }, //todo: реализовать
    // { name: 'Личный кабинет', path: '/profile' }, todo: реализовать
  ];

  const handleNavigation = (path) => {
    navigate(path); // Переход на нужный маршрут
  };
  const handleNavigationBooking = () => {
    navigate('/booking'); // Переход на нужный маршрут
  };

  return (
    <nav style={navStyle}>
      {pages.map((page) => (
        <button
          key={page.name}
          style={{
            ...buttonStyle,
            ...(location.pathname === page.path ? activeButtonStyle : {}),
          }}
          onClick={() => handleNavigation(page.path)} // Переход при клике
        >
          {page.name}
        </button>
      ))}
      <button
        style={{
          ...bookButtonStyle,
          backgroundColor: isHovered ? '#50464D' : '#fff', // Изменяем цвет фона при наведении
        }}
        onClick={() => handleNavigationBooking()} // Переход при клике
        onMouseEnter={() => setIsHovered(true)} // При наведении
        onMouseLeave={() => setIsHovered(false)} // При уходе курсора
      >
        Забронировать
      </button>
    </nav>
  );
};

const navStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '20px',
  padding: '20px 0 0 20px',
  overflowX: 'hidden',
  boxSizing: 'border-box',
};

const buttonStyle = {
  padding: '10px 30px',
  fontSize: '20px',
  color: '#50464D',
  backgroundColor: 'transparent',
  borderRadius: 33,
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s, border-color 0.3s',
};

const activeButtonStyle = {
  backgroundColor: '#50464D', // Цвет фона для активной страницы
  borderRadius: 33,
  color: '#fff',
  padding: '10px 30px',
};

const bookButtonStyle = {
  padding: '10px 30px',
  fontSize: '20px',
  backgroundColor: '#fff',
  color: '#FA8653',
  border: 'none',
  borderRadius: 33,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginLeft: '20px',
};

export default HeaderNavigation;
