import React from 'react';
import category1 from '../../images/СтандартКатегория.png';
import category2 from '../../images/УлучшенныйСтандартКатегория.png';
import category3 from '../../images/ЛюксКатегория.png';
import category4 from '../../images/СемейныйКатегория.png';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate(); // Хук для навигации

  // Ваши данные категорий, как раньше
  const categories = [
    {
      name: 'Стандарт',
      description: 'Просторные и комфортные номера, идеально подходящие для отдыха одного человека или пары. Эти номера предлагают оптимальное сочетание доступной цены и качества. В номере есть все необходимое для комфортного проживания: удобная кровать, телевизор, мини-холодильник и ванная комната. Просторное пространство и функциональный интерьер создают атмосферу уюта, а наличие стандартных удобств сделает ваш отдых максимально комфортным.',
      features: [
        'Одно- или двуспальная кровать',
        'Стандартные удобства',
        'Мини-холодильник',
        'Телевизор с кабельными каналами',
        'Светлая ванная комната с душевой кабиной'
      ],
      image: category1,
    },
    {
      name: 'Улучшенный стандарт',
      description: 'Номера улучшенного стандарта – это комфорт и удобства на новом уровне. В этих номерах просторнее, современнее и уютнее. Применены лучшие материалы для отделки, а дополнения, такие как мини-бар и балкон, создают дополнительный комфорт для гостей. Это отличный выбор для тех, кто ищет не только комфорт, но и приятную атмосферу в номере с возможностью наслаждаться свежим воздухом на балконе.',
      features: [
        'Просторные номера с улучшенной мебелью',
        'Мини-бар с напитками и закусками',
        'Балкон с видом на город',
        'Кофемашина в номере',
        'Современная ванная комната с ванной'
      ],
      image: category2,
    },
    {
      name: 'Люкс',
      description: 'Элегантные и стильные номера, предлагающие высокий уровень комфорта и эксклюзивности. Номера люкса предназначены для самых требовательных гостей, которые хотят почувствовать себя как дома, но в более роскошных условиях. Просторные комнаты с красивым видом, джакузи, отдельные зоны для отдыха – все это создает атмосферу уюта и роскоши. Это лучший выбор для тех, кто ценит комфорт, стиль и качество.',
      features: [
        'Просторные номера с красивым видом',
        'Джакузи для релаксации',
        'Отдельная зона для отдыха',
        'Массажное кресло',
        'Высококачественные отделочные материалы',
        'Палитра элитных косметических средств'
      ],
      image: category3,
    },
    {
      name: 'Семейный',
      description: 'Идеальные номера для семейного отдыха, предлагающие достаточно пространства для комфортного проживания нескольких человек. Эти номера оснащены несколькими кроватями, удобствами для детей, а также просторной ванной комнатой, чтобы у родителей и детей было достаточно места для отдыха и удобства. Семейный номер – это отличный выбор для тех, кто приезжает в отель с детьми и ценит комфортное и безопасное пространство.',
      features: [
        'Множество кроватей, подходящих для взрослых и детей',
        'Кроватка для младенцев по запросу',
        'Игровая зона для детей',
        'Детская ванная косметика и безопасные материалы',
        'Просторная ванная комната с душевой кабиной и ванной'
      ],
      image: category4,
    },
  ];

  // Функция для навигации на страницу категории
  const handleCategoryClick = (categoryName) => {
    console.log(categoryName);
    if(categoryName === "Стандарт") navigate('/category/standard')
    else if (categoryName === "Улучшенный стандарт") navigate('/category/improved_standard')
    else if (categoryName === "Люкс") navigate('/category/lux')
    else if (categoryName === "Семейный") navigate('/category/family')
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
            onClick={() => handleCategoryClick(category.name)} // При клике на карточку
          >
            <div style={descriptionContainerStyle}>
              <div style={nameCategoryStyle}>
                {category.name}
              </div>
              <div style={descriptionStyle}>
                {category.description}
              </div>
              <div style={featuresStyle}>
                <ul>
                  {category.features.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
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
  cursor: 'pointer', // Указатель курсора для кликабельных элементов
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

const featuresStyle = {
  fontSize: '20px',
  color: '#777',
  paddingLeft: '0px',
};

const imageStyle = {
  flex: 1,
  maxWidth: '700px',
  borderRadius: '8px',
  overflow: 'hidden',
};

export default Categories;
