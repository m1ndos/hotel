import React, {useState} from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import HeaderGround from './components/Header/HeaderGround';
import HeaderNavigation from './components/Header/HeaderNavigation';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer'
import Auth from './components/Auth/Auth'
import Categories from './components/Categories/Categories'
import BookingPage from './components/BookingPage/BookingPage';
import Category from './components/Category/Category'
import "slick-carousel/slick/slick.css"; // Импорт стилей slick
import "slick-carousel/slick/slick-theme.css";
import Services from "./components/Services/Services";
import MyBookings from "./components/MyBookings/MyBookings"; // Импорт темы slick

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userInfo'));

  return (
    <BrowserRouter>
      <div style={styles.app}>
        <HeaderGround/>
        <HeaderNavigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/bookings" element={<MyBookings/>}/>
          <Route path="/booking" element={<BookingPage/>}/>
          <Route path="/category/:id" element={<Category/>}/>
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