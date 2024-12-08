import React from 'react';

const BookingConfirmationModal = ({ isOpen, closeModal, startDate, endDate, room, peopleCount, selectedServices, totalAmount, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={modalBackdropStyle}>
      <div style={modalStyle}>
        <button onClick={closeModal} style={closeButtonStyle}>×</button>
        <h2>Подтверждение бронирования</h2>
        <div>
          <p><strong>Комната:</strong> {room.name}</p>
          <p><strong>Дата заезда:</strong> {startDate ? startDate.toLocaleDateString() : ''}</p>
          <p><strong>Дата выезда:</strong> {endDate ? endDate.toLocaleDateString() : ''}</p>
          <p><strong>Количество людей:</strong> {peopleCount}</p>

          {selectedServices.length > 0 && (
            <>
              <h3>Услуги:</h3>
              <ul style={servicesListStyle}>
                {selectedServices.map(service => (
                  <li key={service.id} style={serviceItemStyle}>
                    {service.name} - {service.price} ₽
                  </li>
                ))}
              </ul>
            </>
          )}

          <p><strong>Итоговая сумма:</strong> {totalAmount} ₽</p>
        </div>

        <div style={buttonContainerStyle}>
          <button onClick={onConfirm} style={confirmButtonStyle}>Забронировать</button>
        </div>
      </div>
    </div>
  );
};

const modalBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  minWidth: '300px',
  maxWidth: '500px',
  overflowY: 'auto', // для прокрутки если контент выходит за пределы
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'transparent',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
};

const servicesListStyle = {
  maxHeight: '200px', // Ограничение высоты списка услуг
  overflowY: 'auto',  // Прокрутка если элементов больше
  margin: 0,
  padding: 0,
};

const serviceItemStyle = {
  marginBottom: '10px',
};

const buttonContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
};

const confirmButtonStyle = {
  padding: '12px 25px',
  backgroundColor: '#FA8653',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default BookingConfirmationModal;
