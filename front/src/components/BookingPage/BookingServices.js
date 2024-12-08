import React from 'react';

const BookingServices = ({ services, selectedServices, onChange }) => {
  const handleServiceChange = (service) => {
    if (selectedServices.some(s => s.id === service.id)) {
      onChange(selectedServices.filter(s => s.id !== service.id));
    } else {
      onChange([...selectedServices, service]);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={{ marginTop: '0' }}>Выберите услуги</h3>
      <div style={styles.servicesList}>
        {services.map(service => (
          <div
            key={service.id}
            style={{
              ...styles.serviceCard,
              ...(selectedServices.some(s => s.id === service.id) ? styles.selected : {}),
            }}
            onClick={() => handleServiceChange(service)} // Обработчик клика
          >
            <div style={styles.cardContent}>
              <h4>{service.name}</h4>
              <p>Цена: {service.price} ₽</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  servicesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  serviceCard: {
    width: '200px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    border: '2px solid #FA8653',  // Бордер для выбранной услуги
    boxShadow: '0 4px 20px rgba(250, 134, 83, 0.3)', // Легкая тень для выбранной услуги
  },
};

export default BookingServices;
