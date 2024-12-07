import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import RoomCard from "../RoomCard/RoomCard";

const Category = () => {
  const {id} = useParams();
  const [rooms, setRooms] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Для ошибок (например, категория не найдена)

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      await fetchCategory();
      await fetchRoomsByCategory();
    } catch (err) {
      setError('Ошибка загрузки данных. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  // Функция для получения данных категории
  const fetchCategory = async () => {
    const response = await fetch(`http://localhost:8000/api/categories/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        setError('Категория не найдена');
      } else {
        throw new Error('Ошибка при получении категории');
      }
    } else {
      const data = await response.json();
      setCategory(data);
    }
  };

  // Функция для получения комнат
  const fetchRoomsByCategory = async () => {
    const response = await fetch(`http://localhost:8000/api/rooms/`);
    const data = await response.json();
    const filteredRooms = data.filter((room) => room.category_id === id);
    setRooms(filteredRooms);
  };

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!category) {
    return <p>Категория не найдена</p>;
  }

  return (
    <div style={mainContainerStyle}>
      <h1 style={headerStyle}>Комнаты категории: {category.name}</h1>
      {rooms.length > 0 ? (
        <div style={roomCardsContainerStyle}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room}/>
          ))}
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

// Стили для контейнера карточек комнат
const roomCardsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
};

export default Category;
