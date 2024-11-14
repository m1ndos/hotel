import React, { useState } from 'react';
import DatePicker from "react-datepicker"; // Это правильный импорт
import 'react-datepicker/dist/react-datepicker.css'; // Стиль для календаря

// Пример данных о номерах (в реальности это будут данные с сервера)
const rooms = [
  {
    id: 1,
    name: 'Стандарт',
    description: 'Просторные и комфортные номера для одного или двух человек.',
    capacity: 2,
    image: '/images/СтандартКатегория.png',
  },
  {
    id: 2,
    name: 'Улучшенный стандарт',
    description: 'Удобные номера с дополнительными удобствами для более комфортного проживания.',
    capacity: 3,
    image: '/images/УлучшенныйСтандартКатегория.png',
  },
  {
    id: 3,
    name: 'Люкс',
    description: 'Элегантные и стильные номера для требовательных гостей.',
    capacity: 4,
    image: '/images/ЛюксКатегория.png',
  },
  {
    id: 4,
    name: 'Семейный',
    description: 'Идеальны для семейного отдыха, с достаточно места для комфортного проживания нескольких человек.',
    capacity: 5,
    image: '/images/СемейныйКатегория.png',
  },
];

const BookingPage = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]); // Диапазон дат
  const [peopleCount, setPeopleCount] = useState(1); // Количество проживающих
  const [availableRooms, setAvailableRooms] = useState(rooms); // Доступные номера

  const [startDate, endDate] = dateRange;

  // Фильтрация номеров по количеству людей и диапазону дат
  const handleSearchRooms = () => {
    const filteredRooms = rooms.filter(room => room.capacity >= peopleCount);
    setAvailableRooms(filteredRooms);
  };

  return (
    <div style={containerStyle}>
      {/* Фильтры для диапазона дат и количества людей */}
      <div style={filterStyle}>
        <div style={filterItemStyle}>
          <label>Выберите диапазон дат:</label>
          <DatePicker
            selected={startDate}
            onChange={(dates) => setDateRange(dates)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat="dd/MM/yyyy"
            placeholderText="Выберите диапазон дат"
          />
        </div>
        <div style={filterItemStyle}>
          <label>Количество проживающих:</label>
          <button onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}>-</button>
          <span style={countStyle}>{peopleCount}</span>
          <button onClick={() => setPeopleCount(peopleCount + 1)}>+</button>
        </div>
        <button style={searchButtonStyle} onClick={handleSearchRooms}>Подобрать номера</button>
      </div>

      {/* Блок с номерами */}
      <div style={roomsStyle}>
        {availableRooms.length > 0 ? (
          availableRooms.map(room => (
            <div key={room.id} style={roomCardStyle}>
              <img src={room.image} alt={room.name} style={roomImageStyle} />
              <div style={roomDescriptionStyle}>
                <h3>{room.name}</h3>
                <p>{room.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Нет доступных номеров для выбранных фильтров.</p>
        )}
      </div>
    </div>
  );
};

// Стили
const containerStyle = {
  padding: '130px',
};

const filterStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  marginBottom: '20px',
};

const filterItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const countStyle = {
  padding: '0 10px',
};

const searchButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#FA8653',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const roomsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
};

const roomCardStyle = {
  width: '300px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  overflow: 'hidden',
  textAlign: 'center',
};

const roomImageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const roomDescriptionStyle = {
  padding: '10px',
};

export default BookingPage;
