import React from 'react';
import {Link} from 'react-router-dom';

const RoomCard = ({room}) => {
  return (
    <div style={roomCardStyle}>
      {room.images && room.images.length > 0 ? (
        <img src={room.images[0]} alt={`Room ${room.id}`} style={imageStyle}/>
      ) : (
        <div style={imagePlaceholderStyle}>Нет изображения</div>
      )}
      <Link to={`/room/${room.id}`} style={roomCardLinkStyle}>
        <h2 style={roomNameStyle}>{room.name}</h2>
      </Link>
      <p style={roomDescriptionStyle}>{room.description}</p>
      <p><strong>Цена:</strong> {room.price} ₽</p>
    </div>
  );
};

// Стили для ссылки (оборачиваем всю карточку)
const roomCardLinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'block', // Обеспечиваем, что ссылка охватывает всю карточку
};

// Стили для карточки комнаты
const roomCardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  width: '300px',
  textAlign: 'center',
  transition: 'transform 0.3s',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

// Стили для изображения
const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px',
};

// Стили для placeholder (если нет изображения)
const imagePlaceholderStyle = {
  width: '100%',
  height: '200px',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  color: '#888',
  fontSize: '18px',
};

// Стили для названия комнаты
const roomNameStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  textDecoration: 'underline',
  color: '#333',
  marginBottom: '10px',
};

// Стили для описания комнаты
const roomDescriptionStyle = {
  fontSize: '16px',
  color: '#777',
  marginBottom: '10px',
};

export default RoomCard;
