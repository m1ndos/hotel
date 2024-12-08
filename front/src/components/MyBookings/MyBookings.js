import React, {useState, useEffect} from 'react';
import BookingCard from "./BookingCard";

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
            <BookingCard key={booking.id} booking={booking}/>
          ))}
        </div>
      ) : (
        <p>У вас нет бронирований.</p>
      )}
    </div>
  );
};

const containerStyle = {
  padding: '50px 10%',
  backgroundColor: '#f7f7f7',
  fontFamily: 'Arial, sans-serif',
};

const headerStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '30px',
  color: '#333',
};

const bookingsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};


export default MyBookings;
