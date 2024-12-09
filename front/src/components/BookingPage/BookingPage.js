import React, {useState, useEffect} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import BookingFilters from "./BookingFilters";
import BookingRooms from "./BookingRooms";
import BookingServices from "./BookingServices";
import {useNavigate} from "react-router-dom";
import BookingConfirmationModal from "./BookingConfirmationModal";

const BookingPage = () => {
  const [rooms, setRooms] = useState([]); // Все комнаты
  const [availableRooms, setAvailableRooms] = useState([]); // Фильтрованные комнаты
  const [dateRange, setDateRange] = useState([null, null]);
  const [peopleCount, setPeopleCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // Только одна комната
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [startDate, endDate] = dateRange;
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Загрузка данных с бэкенда
  useEffect(() => {
    const fetchData = async () => {
      await fetchRooms();
      await fetchServices();
      await fetchBookings();
    }
    fetchData()
  }, []);

  const fetchRooms = async () => {
    try {
      const roomsResponse = await fetch('http://localhost:8000/api/rooms');
      if (!roomsResponse.ok) {
        throw new Error('Ошибка при загрузке комнат');
      }
      const roomsData = await roomsResponse.json();
      setRooms(roomsData);
      setAvailableRooms(roomsData);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/bookings');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке бронирований');
      }
      const data = await response.json();
      setBookings(data)
    } catch (error) {
      console.error("Ошибка при фильтрации комнат:", error);
      return [];
    }
  };

  const handleSearchRooms = async () => {
    const filteredRooms = rooms.filter((room) => {
      const roomBookings = bookings.filter(booking => booking.room_id === room.id);
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
    setAvailableRooms(filteredRooms);
  };

  useEffect(() => {
   
      handleSearchRooms();
      setSelectedRoom(null)
    
  }, [startDate, endDate, peopleCount]);


  useEffect(() => {
    validateBooking();
  }, [startDate, endDate, selectedRoom, selectedServices]);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/services');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке услуг');
      }
      const servicesData = await response.json();
      setServices(servicesData);
    } catch (error) {
      console.error("Ошибка при загрузке услуг:", error);
    }
  };



  // const handleSearchRooms = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8000/api/bookings');
  //     if (!response.ok) {
  //       throw new Error('Ошибка при загрузке бронирований');
  //     }
  //     const bookings = await response.json();

  //     const filteredRooms = rooms.filter((room) => {
  //       const roomBookings = bookings.filter(booking => booking.room_id === room.id);
  //       const isAvailable = roomBookings.every(booking => {
  //         const bookingStart = new Date(booking.day_in);
  //         const bookingEnd = new Date(booking.day_out);
  //         return (
  //           endDate <= bookingStart || startDate >= bookingEnd
  //         );
  //       });
  //       const isCapacitySufficient = room.people_quantity >= peopleCount;

  //       return isAvailable && isCapacitySufficient;
  //     });
  //     setAvailableRooms(filteredRooms);
  //   } catch (error) {
  //     console.error("Ошибка при фильтрации комнат:", error);
  //   }
  // };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц начинается с 0, поэтому прибавляем 1
    const day = String(date.getDate()).padStart(2, '0'); // День с 0, если меньше 10
    return `${year}-${month}-${day}`;
  };

  const createBooking = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const bookingData = {
      client_id: userInfo.client_id,
      room_id: selectedRoom.id,
      day_in: formatDate(startDate),
      day_out: formatDate(endDate),
      services: selectedServices.map(service => service.id) || null,
    };

    try {
      const response = await fetch('http://localhost:8000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || data.message);
      } else {
        return true;
      }
    } catch (err) {
      alert(err.error || err.message);
    }

    return null;

  }

  const calculateTotalAmount = () => {
    if (!selectedRoom) return 0;
    const roomPrice = selectedRoom.price;
    const servicesPrice = selectedServices.reduce((acc, service) => acc + service.price, 0);
    return roomPrice + servicesPrice;
  };

  const handleConfirmBooking = () => {
    const success = createBooking()
    if (!success) {
      return;
    }

    navigate('/bookings')

  };

  const validateBooking = () => {
    if (!startDate || !endDate || !selectedRoom) {
      setErrorMessage('Пожалуйста, выберите дату и комнату.');
    } else {
      setErrorMessage('');
    }
  };

  if (loading) {
    return <p>Загрузка данных...</p>
  }

  return (
    <div style={containerStyle}>

      <BookingFilters
        startDate={startDate}
        endDate={endDate}
        peopleCount={peopleCount}
        setDateRange={setDateRange}
        setPeopleCount={setPeopleCount}
        onSearchRooms={handleSearchRooms}
      />

      <BookingRooms
        rooms={availableRooms}
        selectedRoom={selectedRoom}
        onSelectRoom={(room) => setSelectedRoom(room)}
      />

      <BookingServices services={services} selectedServices={selectedServices} onChange={setSelectedServices}/>

      <button
        onClick={() => {
          setShowConfirmationModal(true);
        }}
        style={errorMessage ? {...bookingButtonStyle, ...disabledButtonStyle} : bookingButtonStyle}
        disabled={!!errorMessage}
        title={errorMessage} // Добавляем сообщение ошибки в качестве title
      >
        Забронировать
      </button>

      {showConfirmationModal && (
        <BookingConfirmationModal
          isOpen={showConfirmationModal}
          closeModal={() => setShowConfirmationModal(false)}
          room={selectedRoom}
          startDate={startDate}
          endDate={endDate}
          peopleCount={peopleCount}
          selectedServices={selectedServices}
          totalAmount={calculateTotalAmount()}
          onConfirm={handleConfirmBooking}
        />
      )}

    </div>
  );
};

const containerStyle = {
  padding: '100px',
  fontFamily: "Arial, sans-serif",
  display: 'flex',
  flexDirection: 'column',
  gap: '35px'
};

const bookingButtonStyle = {
  padding: '12px 25px',
  backgroundColor: '#FA8653',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  width: 'auto', // Убираем на всю ширину
};

const disabledButtonStyle = {
  backgroundColor: '#ccc',
  cursor: 'not-allowed',
};

export default BookingPage;
