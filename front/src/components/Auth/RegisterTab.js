import React, {useState} from 'react';

const RegisterTab = ({handleSuccessAuth}) => {
  const [registerData, setRegisterData] = useState({name: '', email: '', password: '', confirmPassword: ''});
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState('')

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!registerData.name) newErrors.name = 'Имя обязательно';
    if (!registerData.email) newErrors.email = 'Email обязателен';
    if (!registerData.password) newErrors.password = 'Пароль обязателен';
    if (registerData.password !== registerData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Регистрация:', registerData);
    if (!validateForm()) {
      return;
    }

    const user = await handleRegisterUser(registerData)
    if (user) {
      const client = await handleCreateClient({name: registerData.name, id: user.id})
      const userInfo = {...user, client_id: client.id};
      handleSuccessAuth(userInfo)
    }

  };

  const handleRegisterUser = async (income) => {
    const body = {
      'email': income.email,
      'password': income.password,
    }
    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setRegisterError('');
        return data;
      } else {
        setRegisterError(data.error || data.message);
        return null;
      }

    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setRegisterError('Произошла ошибка, попробуйте снова.');
    }

  }

  const handleCreateClient = async (income) => {
    const body = {
      'name': income.name,
      'passport': `test ${Math.random() * 1000}`,
      'user_id': income.id
    }
    try {
      const response = await fetch('http://localhost:8000/api/clients/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        setRegisterError('');
        return data;
      } else {
        setRegisterError(data.error || data.message);
        return null;
      }

    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setRegisterError('Произошла ошибка, попробуйте снова.');
    }

  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <input
        style={styles.input}
        type="text"
        name="name"
        value={registerData.name}
        onChange={handleChange}
        placeholder="Введите ваше имя"
      />
      {errors.name && <span style={styles.error}>{errors.name}</span>}

      <input
        style={styles.input}
        type="email"
        name="email"
        value={registerData.email}
        onChange={handleChange}
        placeholder="Введите ваш email"
      />
      {errors.email && <span style={styles.error}>{errors.email}</span>}

      <input
        style={styles.input}
        type="password"
        name="password"
        value={registerData.password}
        onChange={handleChange}
        placeholder="Введите ваш пароль"
      />
      {errors.password && <span style={styles.error}>{errors.password}</span>}

      <input
        style={styles.input}
        type="password"
        name="confirmPassword"
        value={registerData.confirmPassword}
        onChange={handleChange}
        placeholder="Подтвердите ваш пароль"
      />
      {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}

      <button type="submit" style={styles.submitButton}>
        Зарегистрироваться
      </button>

      {registerError && <div style={styles.errorMessage}>{registerError}</div>}
    </form>
  );
};

const styles = {
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: '4% 0',
    paddingLeft: '20px',
    height: '50px',
    borderRadius: '27px',
    backgroundColor: '#FCF4C4',
    border: 'none',
    outline: 'none',
    width: '80%',
  },
  submitButton: {
    height: '50px',
    width: '85%',
    borderRadius: '27px',
    border: 'none',
    backgroundColor: '#FA8653',
    color: '#FFFFFF',
    marginTop: '3%',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginBottom: '10px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
    fontSize: '14px',
  },
};

export default RegisterTab;
