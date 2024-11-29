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

const Category = () => {
  const { name } = useParams(); // Получаем параметр категории из URL
  const [rooms, setRooms] = useState([]); // Состояние для хранения списка комнат
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0); // Индекс текущей комнаты

  useEffect(() => {
    // Запрос на получение комнат по категории
    const fetchRoomsByCategory = () => {
      fetch(`http://localhost:8000/api/rooms/category/${name}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка при загрузке комнат');
          }
          return response.json();
        })
        .then((data) => {
          setRooms(data); // 
          console.log(data);
          
        })
        .catch((error) => {
          console.error('Ошибка:', error); // Логируем ошибку в консоль
        });
    };

    fetchRoomsByCategory();
  }, [name]); // Эффект зависит от изменения параметра name

  // Настройки для слайдера с комнатами
  const roomSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Убираем автопрокрутку
    initialSlide: 0, // Начинаем с первого слайда
    nextArrow: <NextArrow />, // Кастомная стрелка вправо
    prevArrow: <PrevArrow />, // Кастомная стрелка влево
    afterChange: (index) => setCurrentRoomIndex(index), // Обновляем индекс текущей комнаты
  };

  // Настройки для слайдера с изображениями
  const imageSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Убираем автопрокрутку
    nextArrow: <NextArrow />, // Кастомная стрелка вправо для изображений
    prevArrow: <PrevArrow />, // Кастомная стрелка влево для изображений
  };

  // Функция для вывода характеристик комнаты
  const renderFeatures = (features) => {
    return features.map((feature, index) => (
      <div key={index} style={featureStyle}>
        <strong>• {feature.name}</strong>
      </div>
    ));
  };

  return (
    <div style={mainContainerStyle}>
      <h1 style={headerStyle}>Комнаты категории: {name}</h1>
      {rooms.length > 0 ? (
        <div style={sliderContainerStyle}>
          {/* Слайдер с названиями комнат */}
          <Slider {...roomSliderSettings}>
            {rooms.map((room, index) => (
              <div key={room.id} style={slideStyle}>
                <h2 style={roomNameStyle}>{room.name}</h2>
              </div>
            ))}
          </Slider>

          {/* Слайдер с изображениями для текущей комнаты */}
          <div style={{ marginTop: '30px' }}>
            {rooms[currentRoomIndex].images && rooms[currentRoomIndex].images.length > 0 ? (
              <Slider {...imageSliderSettings}>
                {rooms[currentRoomIndex].images.map((image, index) => (
                  <div key={index} style={imageSlideStyle}>
                    <img src={image} alt={`Room ${currentRoomIndex + 1}`} style={imageStyle} />
                  </div>
                ))}
              </Slider>
            ) : (
              <p>Нет изображений для этой комнаты.</p>
            )}

            {/* Описание комнаты */}
            {rooms[currentRoomIndex].description && (
              <p style={descriptionStyle}>{rooms[currentRoomIndex].description}</p>
            )}

            {/* Характеристики комнаты */}
            <div style={featuresContainerStyle}>
              <h3 style={detailsHeaderStyle}>Детали</h3>
              {renderFeatures(rooms[currentRoomIndex].features)}
            </div>
          </div>
        </div>
      ) : (
        <p>Нет доступных комнат в этой категории.</p>
      )}
    </div>
  );
};

// Стили для контейнера страницы
const mainContainerStyle = {
  padding: '110px 10%',
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

// Стили для контейнера слайдера
const sliderContainerStyle = {
  width: '60%',
  margin: '0 auto',
  backgroundColor: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

// Стили для слайдера
const slideStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

// Стили для названия комнаты
const roomNameStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#333',
};

// Стили для слайдера изображений
const imageSlideStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

// Стили для изображения
const imageStyle = {
  width: '100%', // Ширина изображения займет всю ширину контейнера
  height: '300px', // Фиксированная высота для всех изображений
  objectFit: 'contain', // Масштабирует изображение с сохранением пропорций без обрезки
  borderRadius: '8px', // Закругленные углы
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Тень для изображения
  userSelect: 'none', // Запрещает выделение текста и изображения
  outline: 'none', // Убирает обводку при фокусе
  WebkitUserSelect: 'none', // Для Safari, чтобы избежать выделения
};

// Стили для описания комнаты
const descriptionStyle = {
  marginTop: '20px',
  fontSize: '16px',
  color: '#666',
  textAlign: 'center',
  padding: '0 20px',
};

// Стили для заголовка секции деталей
const detailsHeaderStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginTop: '30px',
  textAlign: 'center',
  color: '#333',
};

// Стили для контейнера характеристик
const featuresContainerStyle = {
  marginTop: '20px',
  padding: '0 20px',
  color: '#666',
};

// Стили для отдельных характеристик
const featureStyle = {
  fontSize: '16px',
  marginBottom: '10px',
};

export default Category;
