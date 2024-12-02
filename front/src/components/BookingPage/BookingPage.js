import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const BookingPage = () => {
  const [rooms, setRooms] = useState([]); // Все комнаты
  const [availableRooms, setAvailableRooms] = useState([]); // Фильтрованные комнаты
  const [features, setFeatures] = useState([]); // Список фич
  const [categories, setCategories] = useState([]); // Список категорий
  const [dateRange, setDateRange] = useState([null, null]);
  const [peopleCount, setPeopleCount] = useState(1);
  const [loading, setLoading] = useState(true);

  const [startDate, endDate] = dateRange;

  // Загрузка данных с бэкенда
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsResponse = await fetch('http://localhost:8000/api/rooms');
        if (!roomsResponse.ok) {
          throw new Error('Ошибка при загрузке комнат');
        }
        const roomsData = await roomsResponse.json();
        setRooms(roomsData);
        setAvailableRooms(roomsData);

        const featuresResponse = await fetch('http://localhost:8000/api/features');
        if (!featuresResponse.ok) {
          throw new Error('Ошибка при загрузке фич');
        }
        const featuresData = await featuresResponse.json();
        setFeatures(featuresData);

        const categoriesResponse = await fetch('http://localhost:8000/api/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Ошибка при загрузке категорий');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchRooms();
  }, []);

  // Получение имени категории по category_id
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Неизвестная категория';
  };

  const getFeatureNames = (featureIds) => {
    return features
      .filter(feature => featureIds.includes(feature.id))
      .map(feature => feature.name);
  };

  const handleSearchRooms = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/bookings');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке бронирований');
      }
      const bookings = await response.json();
      console.log("Полученные бронирования:", bookings);

      console.log("Выбранные даты:", startDate, "по", endDate);

      const filteredRooms = rooms.filter((room) => {
        const roomBookings = bookings.filter(booking => booking.room_id === room.id);
        console.log(roomBookings);

        const isAvailable = roomBookings.every(booking => {
          const bookingStart = new Date(booking.day_in);
          const bookingEnd = new Date(booking.day_out);
          return (
            endDate <= bookingStart || startDate >= bookingEnd
          );
        });

        const isCapacitySufficient = room.people_quantity >= peopleCount;

        return isAvailable && isCapacitySufficient;
      });

      console.log("Фильтрованные комнаты:", filteredRooms);
      setAvailableRooms(filteredRooms);
    } catch (error) {
      console.error("Ошибка при фильтрации комнат:", error);
    }
  };

  return (
    <div style={containerStyle}>
      {loading ? (
        <p>Загрузка данных...</p>
      ) : (
        <>
          <div style={filterStyle}>
            <div style={filterRowStyle}>
              <div style={filterItemStyle}>
                <label style={labelStyle}>Выберите диапазон дат:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    if (start && (!end || end > start)) {
                      setDateRange([start, end]);
                    }
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  minDate={new Date()} // Запрет выбора дат ранее сегодняшней
                  maxDate={endDate ? new Date(endDate) : undefined} // Ограничение для выбора даты окончания
                  placeholderText="Выберите даты"
                  popperPlacement="bottom-start"
                  className="custom-datepicker-input"
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
          </div>

          <div style={roomsStyle}>
            {availableRooms.length > 0 ? (
              availableRooms.map(room => (
                <div key={room.id} style={roomCardStyle}>
                  <img
                    src={room.images && room.images.length > 0 ? room.images[0] : 'default-image-url.jpg'}
                    alt={room.name}
                    style={roomImageStyle}
                  />
                  <div style={roomDescriptionStyle}>
                    <h3>{room.name}</h3>
                    <p>Категория: {getCategoryName(room.category_id)}</p>
                    <p>Особенности:</p>
                    <ul>
                      {getFeatureNames(room.feature_ids).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p style={noRoomsTextStyle}>Нет доступных номеров для выбранных фильтров.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Стили
const containerStyle = {
  padding: '100px',
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

const filterRowStyle = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
};

const filterItemStyle = {
  flex: 1,
};

const labelStyle = {
  fontSize: '18px',
  marginBottom: '10px',
  marginRight: "10px",
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
  padding: '15px 30px',
  backgroundColor: '#FA8653',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const roomsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
};

const roomCardStyle = {
  width: '400px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  overflow: 'hidden',
  textAlign: 'start',
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
