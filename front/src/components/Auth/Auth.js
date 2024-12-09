import React, { useState } from 'react';
import auth_icon from '../../images/auth_icon.svg';
import AuthTab from "./AuthTab";
import RegisterTab from "./RegisterTab";
import { useNavigate } from "react-router-dom";

const Auth = ({ setIsAuthenticated, setIsAdmin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()

  const handleSuccessAuth = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
    console.log(JSON.parse(localStorage.getItem('userInfo')));
    
    setIsAuthenticated(true);
    console.log(data.is_admin);
    
    // Устанавливаем роль администратора
    if (data.is_admin) {
      setIsAdmin(true);
      navigate('/admin'); // Перенаправляем на админку, если пользователь администратор
    } else {
      setIsAdmin(false);
      navigate('/'); // Перенаправляем на главную, если не администратор
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.btns_auth_reg}>
        <button
          style={isLogin ? styles.btnAuth : styles.btnReg}
          onClick={() => setIsLogin(true)}
        >
          Вход
        </button>
        <button
          style={!isLogin ? styles.btnAuth : styles.btnReg}
          onClick={() => setIsLogin(false)}
        >
          Регистрация
        </button>
      </div>
      <div style={styles.formContainer}>
        <div style={styles.imgContainer}>
          <img style={styles.img} src={auth_icon} alt="auth_icon" />
        </div>
        <div style={styles.form}>
          {isLogin ?
            <AuthTab handleSuccessAuth={handleSuccessAuth} />
            :
            <RegisterTab handleSuccessAuth={handleSuccessAuth} />
          }
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btns_auth_reg: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '35%',
    marginTop: '8%',
    marginBottom: '5%',
    height: '100px',
  },
  btnAuth: {
    width: '45%',
    height: '50%',
    borderRadius: '22px',
    border: 'none',
    fontSize: '25px',
    backgroundColor: '#FA8653',
    color: '#FFFFFF',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
  btnReg: {
    width: '45%',
    height: '50%',
    borderRadius: '22px',
    border: 'none',
    fontSize: '25px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',
    color: '#FA8653',
    cursor: 'pointer',
  },
  formContainer: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: '500px',
  },
  form: {
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: '4%',
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
};

export default Auth;
