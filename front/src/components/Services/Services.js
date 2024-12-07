import React, {useState, useEffect} from 'react';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await fetch('http://localhost:8000/api/services/');
    const data = await response.json();
    setServices(data);
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Наши услуги</h1>
      <div style={servicesContainerStyle}>
        {services.length > 0 ?
          (
            services.map((service, index) => (
              <div key={index} style={cardStyle}>
                <h2 style={serviceNameStyle}>{service.name}</h2>
                <p style={servicePriceStyle}>{service.price} ₽</p>
              </div>
            ))
          )
          :
          <p>Услуги не найдены</p>
        }
      </div>
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

// Стили для контейнера услуг
const servicesContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
};

// Стили для карточки услуги
const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  width: '200px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.3s ease',
};

const cardHoverStyle = {
  transform: 'scale(1.05)',
};

// Стили для названия услуги
const serviceNameStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#333',
};

// Стили для цены услуги
const servicePriceStyle = {
  fontSize: '18px',
  color: '#777',
};

export default Services;
