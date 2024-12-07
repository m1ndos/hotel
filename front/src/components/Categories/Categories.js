import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Запрос на получение всех категорий
    const fetchCategories = () => {
      fetch('http://localhost:8000/api/categories')
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка при загрузке категорий');
          }
          return response.json();
        })
        .then(data => {
          setCategories(data);
        })
        .catch(error => {
          console.error('Ошибка:', error);
        });
    };

    fetchCategories();
  }, []);

  // Функция для навигации на страницу категории
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`)
  };

  return (
    <div>
      <main style={mainStyle}>
        {categories.map((category, index) => (
          <div
            key={index}
            style={{
              ...categoryStyle,
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', // Чередование
            }}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div style={descriptionContainerStyle}>
              <div style={nameCategoryStyle}>
                {category.name}
              </div>
              <div style={descriptionStyle}>
                {category.description}
              </div>
              <div style={priceStyle}>
                {category.price}
              </div>
            </div>
            <div style={imageStyle}>
              <img
                src={category.image}
                alt={category.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

const mainStyle = {
  padding: '110px 10%',
  backgroundColor: '#f7f7f7',
  fontFamily: 'Arial, sans-serif',
};

const categoryStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '40px',
  backgroundColor: '#fff',
  padding: '20px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  cursor: 'pointer',
};

const descriptionContainerStyle = {
  flex: 1,
  padding: '0 40px',
};

const nameCategoryStyle = {
  fontSize: '48px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '20px',
};

const descriptionStyle = {
  fontSize: '22px',
  color: '#666',
  marginBottom: '20px',
};

const priceStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '20px',
};

const imageStyle = {
  flex: 1,
  maxWidth: '700px',
  borderRadius: '8px',
  overflow: 'hidden',
};

export default Categories;
