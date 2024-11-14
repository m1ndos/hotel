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
  position: 'absolute', 
  top: '0', 
  left: '0',
  width: '100%',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '20px', // Уменьшение промежутка между кнопками
  padding: '20px 0 0 20px', // Паддинг для предотвращения выхода за пределы
  overflowX: 'hidden', // Отключение горизонтального скролла
  boxSizing: 'border-box', // Включаем учет паддингов в ширину
};

const buttonStyle = {
  padding: '10px 30px', // Уменьшены отступы для кнопок
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
  padding: '10px 30px', // Уменьшены отступы для кнопок
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
  marginLeft: '20px', // Отступ от предыдущих кнопок
};

export default HeaderNavigation;
