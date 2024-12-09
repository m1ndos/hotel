import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрашиваем данные из всех необходимых таблиц
        const [usersRes, roomsRes, bookingsRes, ordersRes] = await Promise.all([
          fetch('http://localhost:8000/api/users'),
          fetch('http://localhost:8000/api/rooms'),
          fetch('http://localhost:8000/api/bookings'),
          fetch('http://localhost:8000/api/orders'),
        ]);

        if (!usersRes.ok || !roomsRes.ok || !bookingsRes.ok || !ordersRes.ok) {
          throw new Error('Ошибка при загрузке данных');
        }

        const [users, rooms, bookings, orders] = await Promise.all([
          usersRes.json(),
          roomsRes.json(),
          bookingsRes.json(),
          ordersRes.json(),
        ]);

        // Вычисляем статистику
        console.log(users, rooms, bookings, orders);
        
        const totalUsers = users.length;
        const paidBookings = bookings.filter((booking) => booking.status === 'paid').length;
        const unpaidBookings = bookings.filter((booking) => booking.status === 'unpaid').length;
        const totalRevenue = orders
          // .filter((order) => order.status === 'paid')
          .reduce((sum, order) => sum + order.total_price, 0);

        setStats({
          totalUsers,
          paidBookings,
          unpaidBookings,
          totalRevenue,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!stats) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>Панель администратора</h1>
      <ul>
        <li>Количество пользователей: {stats.totalUsers}</li>
        <li>Оплаченные бронирования: {stats.paidBookings}</li>
        <li>Неоплаченные бронирования: {stats.unpaidBookings}</li>
        <li>Общая выручка: {stats.totalRevenue.toLocaleString()} ₽</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
