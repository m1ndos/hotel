import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomCard from "../RoomCard/RoomCard";

const Category = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [newRoom, setNewRoom] = useState({
    name: '',
    address: '',
    category_id: id,
    description: '',
    people_quantity: 1,
    price: '',
    features: [],
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      await fetchCategory();
      await fetchRoomsByCategory();
      await fetchCategories();
      await fetchFeatures();
    } catch (err) {
      setError('Ошибка загрузки данных. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

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

  const fetchRoomsByCategory = async () => {
    const response = await fetch(`http://localhost:8000/api/rooms/`);
    const data = await response.json();
    const filteredRooms = data.filter((room) => room.category_id === id);
    setRooms(filteredRooms);
  };

  const fetchCategories = async () => {
    const response = await fetch('http://localhost:8000/api/categories/');
    const data = await response.json();
    setCategories(data);
  };

  const fetchFeatures = async () => {
    const response = await fetch('http://localhost:8000/api/features/');
    const data = await response.json();
    setFeatures(data);
  };

  const handleAddRoom = async () => {
    if (!newRoom.name || !newRoom.address || !newRoom.price) {
      alert('Заполните все обязательные поля!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/rooms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newRoom),
      });

      if (response.ok) {
        alert('Комната добавлена!');
        setNewRoom({
          name: '',
          address: '',
          category_id: id,
          description: '',
          people_quantity: 1,
          price: '',
          features: [],
          images: [],
        });
        fetchRoomsByCategory();
      } else {
        alert('Ошибка при добавлении комнаты');
      }
    } catch (error) {
      console.error('Ошибка при добавлении:', error);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту комнату?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/rooms/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Комната удалена!');
          fetchRoomsByCategory();
        } else {
          alert('Ошибка при удалении комнаты');
        }
      } catch (error) {
        console.error('Ошибка при удалении:', error);
      }
    }
  };

  const handleFeatureSelect = (e) => {
    const selectedFeature = e.target.value;
    if (!newRoom.features.includes(selectedFeature)) {
      setNewRoom((prevState) => ({
        ...prevState,
        features: [...prevState.features, selectedFeature],
      }));
    }
  };

  const handleFeatureRemove = (feature) => {
    setNewRoom((prevState) => ({
      ...prevState,
      features: prevState.features.filter((item) => item !== feature),
    }));
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
            <div key={room.id} style={roomCardContainerStyle}>
              <RoomCard room={room} />
              <button onClick={() => handleDeleteRoom(room.id)} style={deleteButtonStyle}>Удалить</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Нет доступных комнат в этой категории.</p>
      )}

      {/* Форма добавления новой комнаты */}
      <div style={addRoomFormStyle}>
        <h2>Добавить новую комнату</h2>
        <input
          type="text"
          placeholder="Название комнаты"
          value={newRoom.name}
          onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Адрес комнаты"
          value={newRoom.address}
          onChange={(e) => setNewRoom({ ...newRoom, address: e.target.value })}
          style={inputStyle}
        />
        <select
          value={newRoom.category_id}
          onChange={(e) => setNewRoom({ ...newRoom, category_id: e.target.value })}
          style={inputStyle}
        >
          <option value="">Выберите категорию</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Описание комнаты"
          value={newRoom.description}
          onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Количество людей"
          value={newRoom.people_quantity}
          onChange={(e) => setNewRoom({ ...newRoom, people_quantity: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Цена"
          value={newRoom.price}
          onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
          style={inputStyle}
        />
        
        {/* Селектор фич */}
        <select
          value=""
          onChange={handleFeatureSelect}
          style={inputStyle}
        >
          <option value="">Выберите фичи</option>
          {features.map((feature) => (
            <option key={feature.id} value={feature.id}>
              {feature.name}
            </option>
          ))}
        </select>

        {/* Отображение выбранных фич */}
        {newRoom.features.length > 0 && (
          <div style={featuresListStyle}>
            {newRoom.features.map((feature) => (
              <div key={feature} style={featureItemStyle}>
                {features.find((f) => f.id === feature)?.name}{' '}
                <button onClick={() => handleFeatureRemove(feature)} style={removeFeatureButtonStyle}>
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="text"
          placeholder="Ссылки на изображения (через запятую)"
          value={newRoom.images}
          onChange={(e) => setNewRoom({ ...newRoom, images: e.target.value.split(',') })}
          style={inputStyle}
        />
        <button onClick={handleAddRoom} style={addButtonStyle}>Добавить комнату</button>
      </div>
    </div>
  );
};

// Стили
const mainContainerStyle = {
  padding: '50px 10%',
  backgroundColor: '#f7f7f7',
};
const headerStyle = { fontSize: '36px', fontWeight: 'bold', textAlign: 'center' };
const roomCardsContainerStyle = { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' };
const roomCardContainerStyle = { position: 'relative' };
const addRoomFormStyle = { marginTop: '30px' };
const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' };
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
const featuresListStyle = {
  marginTop: '10px',
};
const featureItemStyle = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',
  color: '#555',
};
const removeFeatureButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: '#dc3545',
  fontSize: '18px',
  cursor: 'pointer',
};

export default Category;
