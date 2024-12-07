import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Компонент для стрелки влево
const PrevArrow = (props) => {
  const {onClick} = props;
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
  const {onClick} = props;
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
  const {roomId} = useParams(); // Получаем roomId из параметров URL
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Для хранения ошибки

  useEffect(() => {
    fetchRoomDetails();
  }, [roomId]);

  const fetchRoomDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/rooms/${roomId}`);
      if (!response.ok) {
        throw new Error('Комната не найдена');
      }
      const data = await response.json();
      console.log(data)
      setRoom(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p style={{color: 'red'}}>{error}</p>;
  }

  if (!room) {
    return <p>Комната не найдена.</p>;
  }

  // Настройки для слайдера изображений
  const imageSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: room.images.length > 1 ? 1 : 1,  // Отображаем один слайд, если картинка одна
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
  };


  return (
    <div style={roomDetailsContainerStyle}>
      <div style={roomMainContentStyle}>
        {room.images && room.images.length > 0 ?
          (
            <div style={{width: '40%'}}>
              {room.images.length > 1 ? (
                  <Slider {...imageSliderSettings}>
                    {room.images.map((image, index) => (
                      <div key={index} style={imageSlideStyle}>
                        <img src={image} alt={`Room ${roomId}`} style={imageStyle}/>
                      </div>
                    ))}
                  </Slider>
                )
                :
                (
                  <img src={room.images[0]} alt={`Room ${roomId}`} style={imageStyle}/>
                )}
            </div>
          )
          :
          (
            <div style={imagePlaceholderStyle}>Нет изображений</div>
          )}

        {/* Описание комнаты справа от изображения */}
        <div style={roomInfoStyle}>
          <h1 style={headerStyle}>{room.name}</h1>
          <p><strong>Адрес:</strong> {room.address}</p>
          <p><strong>Цена:</strong> {room.price} ₽</p>
          <p><strong>Количество людей:</strong> {room.people_quantity}</p>
          <p><strong>Доступность:</strong> {room.is_available ? 'Доступна' : 'Недоступна'}</p>
          <p>{room.description}</p>

          {/* Выводим особенности комнаты */}
          <h3>Особенности</h3>
          {room.features && room.features.length > 0 ? (
            <ul style={featuresListStyle}>
              {room.features.map((feature) => (
                <li key={feature.id} style={featureItemStyle}>{feature.name}</li>
              ))}
            </ul>
          ) : (
            <p>Нет особенностей</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Стили для страницы деталей комнаты
const roomDetailsContainerStyle = {
  padding: '30px',
  backgroundColor: '#f7f7f7',
  fontFamily: 'Arial, sans-serif',
};

const roomMainContentStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '2%',
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
  width: '30%',
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

const bookButtonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '5px',
  fontSize: '18px',
  marginTop: '20px',
  cursor: 'pointer',
};

export default RoomDetails;
