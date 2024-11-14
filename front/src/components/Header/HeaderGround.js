import React from 'react';
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
  return (
    <div style={containerStyle}>
      <h1 style={textStyle}>Atlanta</h1>
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
  // alignItems: 'flex-end',
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
};

export default HeaderGround;
