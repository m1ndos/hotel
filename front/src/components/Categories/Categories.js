import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', price: '', description: '', image: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setIsAdmin(user.is_admin);
    }
  };

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

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const handleEditCategory = async (id) => {
    const newName = prompt('Введите новое название категории:');
    const newPrice = prompt('Введите новую цену категории:');
    const newDescription = prompt('Введите новое описание категории:');
    const newImage = prompt('Введите URL новой картинки:');

    if (!newName || !newPrice || !newDescription) {
      alert('Заполните все поля!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, price: newPrice, description: newDescription, image: newImage }),
      });

      if (response.ok) {
        alert('Категория обновлена!');
        fetchCategories();
      } else {
        alert('Ошибка при обновлении категории');
      }
    } catch (error) {
      console.error('Ошибка при редактировании:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Категория удалена!');
          fetchCategories();
        } else {
          alert('Ошибка при удалении категории');
        }
      } catch (error) {
        console.error('Ошибка при удалении:', error);
      }
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.price || !newCategory.description) {
      alert('Заполните все поля!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        alert('Категория добавлена!');
        setNewCategory({ name: '', price: '', description: '', image: '' });
        fetchCategories();
      } else {
        alert('Ошибка при добавлении категории');
      }
    } catch (error) {
      console.error('Ошибка при добавлении:', error);
    }
  };

  return (
    <div>
      <main style={mainStyle}>
        {categories.map((category, index) => (
          <div
            key={category.id}
            style={{
              ...categoryStyle,
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            }}
          >
            <div style={descriptionContainerStyle} onClick={() => handleCategoryClick(category.id)}>
              <div style={nameCategoryStyle}>{category.name}</div>
              <div style={descriptionStyle}>{category.description}</div>
              <div style={priceStyle}>{category.price}</div>
            </div>
            <div style={imageStyle}>
              <img
                src={category.image}
                alt={category.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                onClick={() => handleCategoryClick(category.id)}
              />
            </div>
            {isAdmin && (
              <div style={adminButtonsStyle}>
                <button onClick={() => handleEditCategory(category.id)} style={editButtonStyle}>Редактировать</button>
                <button onClick={() => handleDeleteCategory(category.id)} style={deleteButtonStyle}>Удалить</button>
              </div>
            )}
          </div>
        ))}
      </main>

      {/* Форма добавления новой категории для админа */}
      {isAdmin && (
        <div style={addFormStyle}>
          <input
            type="text"
            placeholder="Название категории"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Цена категории"
            value={newCategory.price}
            onChange={(e) => setNewCategory({ ...newCategory, price: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Описание категории"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Ссылка на картинку"
            value={newCategory.image}
            onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
            style={inputStyle}
          />
          <button onClick={handleAddCategory} style={addButtonStyle}>Добавить категорию</button>
        </div>
      )}
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
  position: 'relative', // Это добавлено для того, чтобы кнопки были снизу
};

const descriptionContainerStyle = {
  flex: 1,
  cursor: 'pointer',
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
  cursor: 'pointer',
  overflow: 'hidden',
};

const adminButtonsStyle = {
  display: 'flex',
  flexDirection: 'column', // Кнопки располагаются друг под другом
  gap: '10px',
  position: 'absolute', // Кнопки фиксируются внизу карточки
  bottom: '20px',
  right: '20px',
};

const addFormStyle = {
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  maxWidth: '700px', // Ограничиваем ширину формы добавления категории
  margin: '0 auto', // Центрируем форму
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

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

export default Categories;
