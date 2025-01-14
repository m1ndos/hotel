import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Компонент для стрелки влево
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '10px',
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        fontSize: '30px',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    >
      ←
    </div>
  );
};

// Компонент для стрелки вправо
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        right: '10px',
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        fontSize: '30px',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    >
      →
    </div>
  );
};

const RoomDetails = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchRoomDetails();
    checkAdminStatus();
  }, [roomId]);

  const checkAdminStatus = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setIsAdmin(user.is_admin);
    }
  };

  const fetchRoomDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/rooms/${roomId}`);
      if (!response.ok) {
        throw new Error('Комната не найдена');
      }
      const data = await response.json();
      setRoom(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRoom = async () => {
    const updatedData = {
      name: room.name,
      address: room.address,
      description: room.description,
      price: room.price,
      people_quantity: room.people_quantity,
      features: room.features.map((feature) => feature.id), // Массив ID особенностей
      images: room.images, // Массив URL-ов изображений
    };
  
    try {
      const response = await fetch(`http://localhost:8000/api/rooms/${roomId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Ошибка обновления данных');
      }
      
      const updatedRoom = await response.json();
      setRoom(updatedRoom);  // Обновляем состояние с новыми данными
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleEdit = (field) => {
    const newValue = prompt(`Введите новое значение для ${field}:`, room[field]);
    if (newValue !== null) {
      setRoom((prevRoom) => ({
        ...prevRoom,
        [field]: newValue,
      }));
      console.log(newValue);
      console.log(room.name);
      console.log(room);
      handleUpdateRoom(); // Обновляем данные после редактирования
    }
  };

  const handleAddFeature = (featureId) => {
    if (!room.features.some(feature => feature.id === featureId)) {
      const updatedFeatures = [...room.features, { id: featureId }];
      setRoom(prevRoom => ({ ...prevRoom, features: updatedFeatures }));
      handleUpdateRoom(); // Обновляем данные после добавления особенности
    }
  }  
  
  const handleDeleteFeature = (featureId) => {
    const updatedFeatures = room.features.filter(feature => feature.id !== featureId);
    setRoom(prevRoom => ({ ...prevRoom, features: updatedFeatures }));
    handleUpdateRoom(); // Обновляем данные после удаления особенности
  };

  const handleAddImage = () => {
    const imageUrl = prompt("Введите URL изображения:");
    if (imageUrl) {
      const updatedImages = [...room.images, imageUrl];
      setRoom(prevRoom => ({ ...prevRoom, images: updatedImages }));
      handleUpdateRoom(); // Обновляем данные после добавления изображения
    }
  };  

  const handleDeleteImage = (imageUrl) => {
    const updatedImages = room.images.filter(image => image !== imageUrl);
    setRoom(prevRoom => ({ ...prevRoom, images: updatedImages }));
    handleUpdateRoom(); // Обновляем данные после удаления изображения
  };
  

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!room) {
    return <p>Комната не найдена.</p>;
  }

  // Настройки для слайдера изображений
  const imageSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div style={roomDetailsContainerStyle}>
      <div style={roomMainContentStyle}>
        <div style={{ width: '40%' }}>
          {room.images.length > 0 ? (
            <Slider {...imageSliderSettings}>
              {room.images.map((image, index) => (
                <div key={index} style={imageSlideStyle}>
                  <img src={image} alt={`Room ${roomId}`} style={imageStyle} />
                  {isAdmin && (
                    <button style={deleteButtonStyle} onClick={() => handleDeleteImage(image)}>Удалить</button>
                  )}
                </div>
              ))}
            </Slider>
          ) : (
            <div style={imagePlaceholderStyle}>Нет изображений</div>
          )}
          {isAdmin && (
            <button style={addButtonStyle} onClick={handleAddImage}>Добавить фото</button>
          )}
        </div>

        <div style={roomInfoStyle}>
          <h1 style={headerStyle}>
            {room.name}
            {isAdmin && <button style={editButtonStyle} onClick={() => handleEdit('name')}>Редактировать</button>}
          </h1>
          <p>
            <strong>Адрес:</strong> {room.address}
            {isAdmin && <button style={editButtonStyle} onClick={() => handleEdit('address')}>Редактировать</button>}
          </p>
          <p>
            <strong>Цена:</strong> {room.price} ₽
            {isAdmin && <button style={editButtonStyle} onClick={() => handleEdit('price')}>Редактировать</button>}
          </p>
          <p>
            <strong>Количество людей:</strong> {room.people_quantity}
          </p>
          <p>
            <strong>Описание:</strong> {room.description}
            {isAdmin && <button style={editButtonStyle} onClick={() => handleEdit('description')}>Редактировать</button>}
          </p>

          <h3>Особенности</h3>
          {room.features && room.features.length > 0 ? (
            <ul style={featuresListStyle}>
              {room.features.map((feature) => (
                <li key={feature.id} style={featureItemStyle}>
                  {feature.name}
                  {isAdmin && (
                    <button style={deleteButtonStyle} onClick={() => handleDeleteFeature(feature.id)}>Удалить</button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Нет особенностей</p>
          )}

          {isAdmin && (
            <div>
              <select onChange={(e) => handleAddFeature(e.target.value)}>
                <option value="">Выберите особенность</option>
                {/* Подключите сюда список всех особенностей из базы */}
                {/* Пример: */}
                {/* {features.map(feature => (
                  <option key={feature.id} value={feature.id}>{feature.name}</option>
                ))} */}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const roomDetailsContainerStyle = {
  marginTop: '100px',
  fontFamily: 'Arial, sans-serif',
  display: 'flex',
  justifyContent: 'center',
};

const roomMainContentStyle = {
  display: 'flex',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  alignItems: 'flex-start',
  backgroundColor: '#f7f7f7',
  gap: '2%',
  padding: '30px',
  width: '70%',
};

const headerStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '8px',
};

const imageSlideStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

const imagePlaceholderStyle = {
  width: '40%',
  height: '400px',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  color: '#888',
  fontSize: '18px',
};

const roomInfoStyle = {
  width: '50%',
  fontSize: '18px',
  color: '#333',
  lineHeight: '1.6',
};

const featuresListStyle = {
  paddingLeft: '20px',
  marginTop: '10px',
};

const featureItemStyle = {
  fontSize: '16px',
  color: '#555',
};

const addButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px',
};

const editButtonStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  marginLeft: '10px',
};

const deleteButtonStyle = {
  backgroundColor: '#dc3545',
  color: '#fff',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  marginLeft: '10px',
};

export default RoomDetails;
