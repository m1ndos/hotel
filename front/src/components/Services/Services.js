import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', price: '' });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchServices();
    checkAdminStatus();
  }, []);

   // Функция для проверки роли из localStorage
   const checkAdminStatus = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setIsAdmin(user.is_admin); // Устанавливаем значение в состояние
    }
  };

  const fetchServices = async () => {
    const response = await fetch('http://localhost:8000/api/services/');
    const data = await response.json();
    setServices(data);
  };

  const handleAddService = async () => {
    if (!newService.name || !newService.price) {
      alert('Заполните все поля!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/services/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        alert('Услуга добавлена!');
        setNewService({ name: '', price: '' });
        fetchServices();
      } else {
        alert('Ошибка при добавлении услуги');
      }
    } catch (error) {
      console.error('Ошибка при добавлении:', error);
    }
  };

  const handleEditService = async (id) => {
    
    const newName = prompt('Введите новое название услуги:');
    const newPrice = prompt('Введите новую цену услуги:');
    if (!newName || !newPrice) {
      alert('Заполните оба поля!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, price: parseFloat(newPrice) }),
      });

      if (response.ok) {
        alert('Услуга успешно обновлена!');
        fetchServices();
      } else {
        alert('Ошибка при обновлении услуги');
      }
    } catch (error) {
      console.error('Ошибка при редактировании:', error);
    }
};

const handleDeleteService = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту услугу?')) {
        try {
            const response = await fetch(`http://localhost:8000/api/services/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Услуга удалена!');
                fetchServices();
            } else {
                alert('Ошибка при удалении услуги');
            }
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    }
};


return (
  <div style={containerStyle}>
    <h1 style={headerStyle}>Наши услуги</h1>
    <div style={servicesContainerStyle}>
      {services.length > 0 ? (
        services.map((service) => (
          <div key={service.id} style={cardStyle}>
            <h2 style={serviceNameStyle}>{service.name}</h2>
            <p style={servicePriceStyle}>{service.price} ₽</p>
            {isAdmin && (
              <>
                <button onClick={() => handleEditService(service.id)} style={editButtonStyle}>
                  Редактировать
                </button>
                <button onClick={() => handleDeleteService(service.id)} style={deleteButtonStyle}>
                  Удалить
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>Услуги не найдены</p>
      )}
    </div>

    {/* Форма добавления новой услуги */}
    {isAdmin && (
      <div style={addFormStyle}>
        <input
          type="text"
          placeholder="Название услуги"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Цена услуги"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
        />
        <button onClick={handleAddService} style={addButtonStyle}>Добавить услугу</button>
      </div>
    )}
  </div>
);
};

// Стили для компонентов
const containerStyle = { padding: '50px 10%', backgroundColor: '#f7f7f7' };
const headerStyle = { fontSize: '36px', fontWeight: 'bold', textAlign: 'center' };
const servicesContainerStyle = { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' };
const cardStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' };
const serviceNameStyle = { fontSize: '20px', fontWeight: 'bold' };
const servicePriceStyle = { fontSize: '18px' };
// const editButtonStyle = { backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', margin: '5px' };
// const deleteButtonStyle = { backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' };
const addFormStyle = { marginTop: '30px', display: 'flex', gap: '10px' };
// const addButtonStyle = { backgroundColor: '#008CBA', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' };
const addButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '12px 20px',
  borderRadius: '30px', // Сделаем кнопку с округленными углами
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px',
  border: 'none', // Убираем границу
  boxShadow: '0 4px 8px rgba(0, 123, 255, 0.3)', // Легкая тень для кнопки
  transition: 'all 0.3s ease', // Плавный переход
};

const editButtonStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '8px 16px',
  borderRadius: '30px', // Округление углов
  cursor: 'pointer',
  fontSize: '14px',
  marginLeft: '10px',
  border: 'none', // Убираем границу
  boxShadow: '0 4px 8px rgba(40, 167, 69, 0.3)', // Легкая тень для кнопки
  transition: 'all 0.3s ease', // Плавный переход
};

// Убираем границу, делаем округление и добавляем эффект тени
const deleteButtonStyle = {
  backgroundColor: '#dc3545',
  color: '#fff',
  padding: '8px 16px',
  borderRadius: '30px',
  cursor: 'pointer',
  fontSize: '14px',
  marginLeft: '10px',
  border: 'none', // Убираем границу
  boxShadow: '0 4px 8px rgba(220, 53, 69, 0.3)', // Легкая тень
  transition: 'all 0.3s ease', // Плавный переход
};
export default Services;