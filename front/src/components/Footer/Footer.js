import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={stripeStyle}></div>
      <div style={contentStyle}>
        <div style={leftSectionStyle}>
          <h2>Atlanta</h2>
        </div>
        <div style={rightSectionStyle}>
          <p>г. Сочи, ул. Морская, д. 1 </p>
          <p>8 (800) 888 20 00</p>
          <p>info@atlanta.com</p>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
    width: '100%',
    backgroundColor: '#fff',
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '60px',
  };
  
  const stripeStyle = {
    width: '80%',
    height: '2px', // Сделано тоньше
    backgroundColor: '#FA8653', // Рыжий цвет полоски
  };
  
  const contentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '80%', // Ширина футера
    maxWidth: '1200px', // Максимальная ширина
  };
  
  const leftSectionStyle = {
    flex: '1',
    fontFamily: "'Sail', cursive", // Подключаем шрифт, как у вас в шапке
    fontSize: '24px',
    color: '#FA8653',
    fontWeight: '100', // Тонкий шрифт
    letterSpacing: '5px', // Большой интервал между буквами
  };
  
  const rightSectionStyle = {
    flex: '1',
    textAlign: 'right',
    color: '#50464D',
  };

export default Footer;
