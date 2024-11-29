import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

// Пример данных о номерах
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
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [peopleCount, setPeopleCount] = useState(1);
  const [availableRooms, setAvailableRooms] = useState(rooms);

  const [startDate, endDate] = dateRange;

  const handleSearchRooms = () => {
    const filteredRooms = rooms.filter(room => room.capacity >= peopleCount);
    setAvailableRooms(filteredRooms);
  };

  return (
    <div style={containerStyle}>
      <div style={filterStyle}>
        <div style={filterItemStyle}>
          <label style={labelStyle}>Выберите диапазон дат:</label>
          <DatePicker
            selected={startDate}
            onChange={(dates) => setDateRange(dates)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat="dd/MM/yyyy"
            placeholderText="Выберите даты"
            style={datePickerInputStyle}
            popperClassName="custom-datepicker-popper"
            calendarClassName="custom-calendar"
          />
        </div>
        <div style={filterItemStyle}>
          <label style={labelStyle}>Количество проживающих:</label>
          <div style={counterStyle}>
            <button style={counterButtonStyle} onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}>-</button>
            <span style={countStyle}>{peopleCount}</span>
            <button style={counterButtonStyle} onClick={() => setPeopleCount(peopleCount + 1)}>+</button>
          </div>
        </div>
        <button style={searchButtonStyle} onClick={handleSearchRooms}>Подобрать номера</button>
      </div>

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
          <p style={noRoomsTextStyle}>Нет доступных номеров для выбранных фильтров.</p>
        )}
      </div>
    </div>
  );
};

// Стили
const containerStyle = {
  padding: '50px',
  fontFamily: "Arial, sans-serif",
};

const filterStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginBottom: '40px',
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const filterItemStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  fontSize: '18px',
  marginBottom: '10px',
};

const counterStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const counterButtonStyle = {
  width: '50px',
  height: '50px',
  backgroundColor: '#FA8653',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontSize: '20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.3s',
};

const countStyle = {
  fontSize: '20px',
  padding: '0 20px',
};

const searchButtonStyle = {
  padding: '10px',
  backgroundColor: '#FA8653',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontSize: '20px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  marginTop: '10px',
};

const datePickerInputStyle = {
  width: '100%',
  padding: '15px',
  fontSize: '18px',
  borderRadius: '5px',
  border: '2px solid #FA8653',
};

const roomsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
};

const roomCardStyle = {
  width: '300px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
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
  padding: '20px',
  fontSize: '16px',
};

const noRoomsTextStyle = {
  fontSize: '18px',
  color: '#555',
  textAlign: 'center',
};

export default BookingPage;
