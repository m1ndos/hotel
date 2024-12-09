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
import MyBookings from "./components/MyBookings/MyBookings";
import RoomDetails from "./components/RoomDetails/RoomDetails"; // Импорт темы slick
import AdminDashboard from "./components/Admin/AdminDashboard";
import PrivateRoute from './components/Admin/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userInfo'));
  const [isAdmin, setIsAdmin] = useState(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo?.is_admin === true; // Проверяем, является ли пользователь администратором
  });
  
  return (
    <BrowserRouter>
      <div style={styles.app}>
        <HeaderGround/>
        <HeaderNavigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin}/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/bookings" element={<MyBookings/>}/>
          <Route path="/booking" element={<BookingPage/>}/>
          <Route path="/category/:id" element={<Category/>}/>
          <Route path="/room/:roomId" element={<RoomDetails/>}/>
          {/* Приватный маршрут для администратора */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute 
                element={<AdminDashboard />} 
                isAuthenticated={isAuthenticated} 
                isAdmin={isAdmin} 
              />
            } 
          />
        </Routes>
        <Footer/>
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