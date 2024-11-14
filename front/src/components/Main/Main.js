import React from 'react'
import main_logo1 from '../../images/main_logo1.svg'
import auth_icon from '../../images/auth_icon.svg'

const Main = () => {
  return (
    <div style={styles.container}>
        <div style={styles.item1}>
            <p style={styles.p}>
            Добро пожаловать в отель Atlanta! Наш отель — это место, где вы всегда найдете уют и комфорт у самого побережья. Здесь вас ждут внимательный персонал, высокий уровень сервиса и атмосфера гостеприимства, которая сделает ваше пребывание в Atlanta приятным и незабываемым.
            </p>
            <img style={styles.img} src={main_logo1} alt='main_logo1'></img>
        </div>
        <div style={styles.item1}>
            <img style={styles.img} src={auth_icon} alt='main_logo1'></img>
            <p style={styles.p}>
            Добро пожаловать в отель Atlanta! Наш отель — это место, где вы всегда найдете уют и комфорт у самого побережья. Здесь вас ждут внимательный персонал, высокий уровень сервиса и атмосфера гостеприимства, которая сделает ваше пребывание в Atlanta приятным и незабываемым.
            </p>
        </div>
    </div>
  )
}

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: '8%',
        flexDirection: 'column'
    },
    item1: {
        width: '50%',
        display: 'flex',
        alignItems: 'start',
        marginBottom: '5%',
        gap: '40px'
    },
    img: {
        width: '450px',
        // height: '350px'
    },
    p: {
        fontSize: "25px",
        margin: '0'
    }
}

export default Main