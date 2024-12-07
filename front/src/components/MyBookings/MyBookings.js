import React, {useState, useEffect} from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const clientId = JSON.parse(localStorage.getItem('userInfo'))?.client_id;

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/bookings');
      const data = await response.json();
      const filteredBookings = data.filter((booking) => booking.client_id === clientId);
      setBookings(filteredBookings);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchBookings();
    } else {
      setError('Сначала необходимо авторизоваться!');
      setLoading(false);
    }
  }, [clientId]);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Мои бронирования</h1>

      {bookings.length > 0 ? (
        <div style={bookingsContainerStyle}>
          {bookings.map((booking) => (
            <div key={booking.id} style={bookingCardStyle}>
              <h2 style={roomNameStyle}>{booking.room.name}</h2>
              <p style={addressStyle}>{booking.room.address}</p>
              <p style={bookingDateStyle}>
                {`С ${booking.day_in} по ${booking.day_out}`}
              </p>

              <div style={categoryStyle}>
                <strong>Категория:</strong> {booking.room.category.name}
              </div>

              <div style={descriptionStyle}>
                <strong>Описание:</strong> {booking.room.description}
              </div>

              <div style={featuresContainerStyle}>
                <h3 style={featuresHeaderStyle}>Особенности:</h3>
                {booking.room.features && booking.room.features.length > 0 ? (
                  <ul style={featureListStyle}>
                    {booking.room.features.map((feature, index) => (
                      <li key={index} style={featureStyle}>
                        {feature.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Нет особенностей</p>
                )}
              </div>

              <div style={servicesContainerStyle}>
                <h3 style={servicesHeaderStyle}>Услуги:</h3>
                {booking.services && booking.services.length > 0 ? (
                  <ul style={serviceListStyle}>
                    {JSON.parse(booking.services).map((service, index) => (
                      <li key={index} style={serviceStyle}>
                        {service.name} - {service.price} ₽
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Нет услуг</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>У вас нет бронирований.</p>
      )}
    </div>
  );
};

// Стили для контейнера страницы
const containerStyle = {
  padding: '50px 10%',
  backgroundColor: '#f7f7f7',
  fontFamily: 'Arial, sans-serif',
};

// Стили для заголовка
const headerStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '30px',
  color: '#333',
};

// Стили для контейнера с бронированиями
const bookingsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

// Стили для карточки бронирования
const bookingCardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

// Стили для названия комнаты
const roomNameStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};

// Стили для адреса комнаты
const addressStyle = {
  fontSize: '16px',
  color: '#777',
  marginBottom: '10px',
};

// Стили для даты бронирования
const bookingDateStyle = {
  fontSize: '16px',
  color: '#777',
  marginBottom: '20px',
};

// Стили для категории комнаты
const categoryStyle = {
  fontSize: '16px',
  color: '#333',
  marginBottom: '10px',
};

// Стили для описания комнаты
const descriptionStyle = {
  fontSize: '16px',
  color: '#333',
  marginBottom: '10px',
};

// Стили для контейнера фич комнаты
const featuresContainerStyle = {
  marginTop: '20px',
};

// Стили для заголовка секции фич
const featuresHeaderStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};

// Стили для списка фич
const featureListStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

// Стили для отдельной фичи
const featureStyle = {
  fontSize: '16px',
  marginBottom: '8px',
};

// Стили для контейнера услуг
const servicesContainerStyle = {
  marginTop: '20px',
};

// Стили для заголовка секции услуг
const servicesHeaderStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};

// Стили для списка услуг
const serviceListStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

// Стили для отдельной услуги
const serviceStyle = {
  fontSize: '16px',
  marginBottom: '8px',
};

export default MyBookings;
