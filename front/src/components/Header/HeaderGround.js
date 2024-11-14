import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для навигации
import BackgroundImage from "../../images/HeaderBackGround.png";

// Динамическое добавление шрифта в <head>
const fontImport = document.createElement("style");
fontImport.appendChild(
  document.createTextNode(
    `@import url('https://fonts.googleapis.com/css2?family=Sail&display=swap');`
  )
);
document.head.appendChild(fontImport);

const HeaderGround = () => {
  const navigate = useNavigate(); // Инициализируем хук навигации

  // Обработчик клика на название "Atlanta"
  const handleClick = () => {
    navigate('/'); // Переход на главную страницу
  };

  return (
    <div style={containerStyle}>
      <h1 
        style={textStyle} 
        onClick={handleClick} // Обрабатываем клик
      >
        Atlanta
      </h1>
    </div>
  );
};

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '360px', // Высота, на которой будет фон
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'visible', // Позволяет тексту выходить за границы
};

const textStyle = {
  fontFamily: "'Sail', cursive",
  fontWeight: '100', 
  fontSize: '240px',
  letterSpacing: '10px', // Увеличивает расстояние между буквами
  color: '#FA8653',
  position: 'relative',
  paddingTop: '190px', // Отрицательный отступ, чтобы часть текста находилась ниже изображения
  margin: 0,
  cursor: 'pointer', // Меняем курсор на указатель при наведении
};

export default HeaderGround;
