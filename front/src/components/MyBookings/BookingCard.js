import React, {useState} from 'react';
import PaymentModal from "./PaymentModal";

const BookingCard = ({booking}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={bookingCardStyle}>
      <div style={leftSectionStyle}>
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

      <div style={rightSectionStyle}>
        <p style={statusStyle}>
          Статус: {booking.status === 'unpaid' ? 'Неоплачено' : booking.status}
        </p>
        {booking.status === 'unpaid' && (
          <button style={payButtonStyle} onClick={() => setIsModalOpen(true)}>
            Оплатить
          </button>
        )}
      </div>

      {isModalOpen && (
        <PaymentModal booking={booking} onClose={() => setIsModalOpen(false)}/>
      )}
    </div>
  );
};


const bookingCardStyle = {
  display: 'flex',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const leftSectionStyle = {
  flex: 1,
};

const rightSectionStyle = {
  marginLeft: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const roomNameStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
};

const addressStyle = {
  fontSize: '16px',
  color: '#777',
};

const bookingDateStyle = {
  fontSize: '16px',
  color: '#777',
};

const categoryStyle = {
  fontSize: '16px',
  color: '#333',
};

const descriptionStyle = {
  fontSize: '16px',
  color: '#333',
};

const featuresContainerStyle = {
  marginTop: '20px',
};

const featuresHeaderStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
};

const featureListStyle = {
  listStyleType: 'none',
  padding: 0,
};

const featureStyle = {
  fontSize: '16px',
  marginBottom: '8px',
};

const servicesContainerStyle = {
  marginTop: '20px',
};

const servicesHeaderStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
};

const serviceListStyle = {
  listStyleType: 'none',
  padding: 0,
};

const serviceStyle = {
  fontSize: '16px',
  marginBottom: '8px',
};

const statusStyle = {
  fontSize: '16px',
  marginBottom: '10px',
};

const payButtonStyle = {
  backgroundColor: '#FA8653',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
};

export default BookingCard;
