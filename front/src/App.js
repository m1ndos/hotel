import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HeaderGround from './components/Header/HeaderGround';
import HeaderNavigation from './components/Header/HeaderNavigation';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer'
import Auth from './components/Auth/Auth'
import Categories from './components/Categories/Categories'
import BookingPage from './components/BookingPage/BookingPage';
import Category from './components/Category/Category'
import "slick-carousel/slick/slick.css"; // Импорт стилей slick
import "slick-carousel/slick/slick-theme.css"; // Импорт темы slick

function App() {
  return (
    <BrowserRouter>
      <div style={styles.app}>
        <HeaderGround/>
        <HeaderNavigation/>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/categories" element={<Categories />}/>
          <Route path="/booking" element={<BookingPage />}/>
          <Route path="/category/:name" element={<Category/>} />
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  app: {
    overflowX: 'hidden',
  }
}

export default App;