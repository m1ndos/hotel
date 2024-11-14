import React, { useState } from 'react';

const HeaderNavigation = () => {
  const [activePage, setActivePage] = useState('home'); // состояние активной страницы
  const [isHovered, setIsHovered] = useState(false); // состояние для hover-эффекта

  const pages = ['Главная', 'Номерной фонд', 'Услуги', 'Мои бронирования', 'Личный кабинет'];

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
      {/* Кнопка Забронировать с hover-эффектом */}
      <button
        style={{
          ...bookButtonStyle,
          backgroundColor: isHovered ? '#50464D' : '#fff', // Изменяем цвет фона при наведении
        }}
        onClick={() => {
          // Обработка клика, например, переход на страницу бронирования
          alert('Перейти к бронированию');
        }}
        onMouseEnter={() => setIsHovered(true)} // При наведении
        onMouseLeave={() => setIsHovered(false)} // При уходе курсора
      >
        Забронировать
      </button>
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
  color: '#fff', // Цвет текста для активной страницы
  padding: '10px 50px',
};

const bookButtonStyle = {
  padding: '10px 30px',
  fontSize: '20px',
  backgroundColor: '#fff', // Рыжий цвет для кнопки
  color: '#FA8653', // Белый цвет текста
  border: 'none',
  borderRadius: 33,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginLeft: '50px', // Отступ от предыдущих кнопок
};

export default HeaderNavigation;
