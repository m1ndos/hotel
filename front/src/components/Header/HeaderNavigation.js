import React, { useState } from 'react';

const HeaderNavigation = () => {
  const [activePage, setActivePage] = useState('home'); // состояние активной страницы

  const pages = ['Главная', 'Номерной фонд', 'Услуги', 'Мои бронирования', 'Личный кабинет']

  return (
    <nav style={navStyle}>
      {pages.map((page) => (
        <button
          key={page}
          style={{
            ...buttonStyle,
            ...(activePage === page ? activeButtonStyle : {}),
          }}
          onClick={() => setActivePage(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};

const navStyle = {
  position: 'absolute', // фиксируем навигацию вверху страницы
  top: '0', // привязываем к верхней части страницы
  left: '0',
  width: '100%',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '50px',
  padding: '20px 0px 0px 50px', // Отступы для удобства

};

const buttonStyle = {
  padding: '10px 50px',
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
//   borderColor: '#FA8653', // Цвет рамки для активной страницы
  color: '#fff', // Цвет текста для активной страницы
  padding: '10px 50px',
};

export default HeaderNavigation;
