import React, {useState, useEffect} from 'react';

const PaymentModal = ({booking, onClose, isAuthenticated}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({
    cardNumber: false,
    expiryDate: false,
  });

  const calculateTotalAmount = () => {
    const roomPrice = booking?.room?.price || 0; // Проверяем наличие room и price, устанавливаем значение 0 по умолчанию
    const services = booking?.services ? JSON.parse(booking.services) : []; // Если services есть, парсим их, иначе задаем пустой массив
    const servicesPrice = services?.reduce((acc, service) => acc + (service.price || 0), 0) || 0; // Используем reduce с защитой от null
    return roomPrice + servicesPrice; // Суммируем стоимость комнаты и услуг
  };
  

  const validateForm = () => {
    const cardRegex = /^[0-9]{16}$/; // 16 цифр для номера карты
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // MM/YY формат для срока действия
    const isCardValid = cardRegex.test(cardNumber);
    const isExpiryValid = expiryRegex.test(expiryDate);

    if (!isCardValid || !isExpiryValid) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  useEffect(() => {
    if (touched.cardNumber || touched.expiryDate) {
      validateForm();
    }
  }, [cardNumber, expiryDate, touched]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (! isValid) {
      return;
    }

    const success = await createOrder()
    if (success){
      window.location.reload()
    }
  };

  const createOrder = async () => {
    const body = { booking_id: booking.id };
    try {
      console.log('Отправляем запрос с телом:', body); // Логируем отправляемые данные
  
      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      console.log('Получен ответ с кодом:', response.status); // Логируем статус ответа
  
      const data = await response.json();
      console.log('Получены данные:', data); // Логируем данные из ответа
  
      if (!response.ok) {
        console.error('Ошибка сервера:', data.error || data.message); // Логируем ошибку
        setError(data.error || data.message);
        return null;
      } else {
        setError('');
      }
  
      return true;
    } catch (err) {
      console.error('Ошибка сети или другая ошибка:', err); // Логируем ошибки сети
      setError('Ошибка сети: ' + err.message);
      return null;
    }
  };
  

  const handleCardChange = (e) => {
    setCardNumber(e.target.value);
    setTouched((prevState) => ({...prevState, cardNumber: true}));
  };

  const handleExpiryChange = (e) => {
    setExpiryDate(e.target.value);
    setTouched((prevState) => ({...prevState, expiryDate: true}));
  };

  return (
    <div style={modalBackdropStyle}>
      <div style={modalContentStyle}>
        <h2 style={modalHeaderStyle}>Оплата бронирования</h2>
        {error && <p style={errorMessageStyle}>{error}</p>}

        <form onSubmit={onSubmitHandler} style={formStyle}>

          <div style={formGroupStyle}>
            <label style={labelStyle}>
              Сумма:
              <span style={amountStyle}> {calculateTotalAmount()} ₽</span>
            </label>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>
              Номер карты:
              <input
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                style={inputStyle}
                value={cardNumber}
                onChange={handleCardChange}
              />
            </label>
            {touched.cardNumber && !/^[0-9]{16}$/.test(cardNumber) && (
              <p style={errorMessageStyle}>Номер карты должен содержать 16 цифр.</p>
            )}
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>
              Срок действия:
              <input
                type="text"
                placeholder="MM/YY"
                style={inputStyle}
                value={expiryDate}
                onChange={handleExpiryChange}
              />
            </label>
            {touched.expiryDate && !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate) && (
              <p style={errorMessageStyle}>Введите срок действия в формате MM/YY.</p>
            )}
          </div>

          <button type="submit" style={payButtonStyle} disabled={!isValid}>
            Оплатить
          </button>
        </form>

        <button style={closeButtonStyle} onClick={onClose}>
          Закрыть
        </button>

      </div>
    </div>
  );
};

// Стилизация модалки
const modalBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  transition: 'opacity 0.3s ease',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const modalHeaderStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '20px',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const formGroupStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#555',
  marginBottom: '5px',
};

const amountStyle = {
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginTop: '5px',
  boxSizing: 'border-box',
};

const payButtonStyle = {
  backgroundColor: '#FA8653',
  color: '#fff',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '20px',
  transition: 'background-color 0.3s ease',
};

const closeButtonStyle = {
  marginTop: '15px',
  padding: '8px 15px',
  backgroundColor: '#ddd',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
};

const errorMessageStyle = {
  color: 'red',
  fontSize: '14px',
  marginTop: '5px',
};

export default PaymentModal;
