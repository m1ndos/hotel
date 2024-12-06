import React, {useState} from 'react';

const AuthTab = ({handleSuccessAuth}) => {
  const [loginData, setLoginData] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Почта обязательна';
    if (!loginData.password) newErrors.password = 'Пароль обязателен';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    handleAuth()
  };

  const handleAuth = async () => {
    if (!validateForm()) return;  // Не продолжаем, если форма невалидна

    try {
      const response = await fetch('http://localhost:8000/api/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setAuthError('');
        handleSuccessAuth(data)
      } else {
        setAuthError(data.error || data.message);
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      setAuthError('Произошла ошибка, попробуйте снова.');
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <input
        style={styles.input}
        type="email"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        placeholder="Введите ваш email"
      />
      {errors.email && <span style={styles.error}>{errors.email}</span>}

      <input
        style={styles.input}
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        placeholder="Введите ваш пароль"
      />
      {errors.password && <span style={styles.error}>{errors.password}</span>}

      <button type="submit" style={styles.submitButton}>
        Войти
      </button>

      {authError && <div style={styles.errorMessage}>{authError}</div>}
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

export default AuthTab;
