import React from 'react'
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';
import HeaderGround from './components/Header/HeaderGround';
import HeaderNavigation from './components/Header/HeaderNavigation';

function App() {
  return (
    <>
      <Auth/>
      <HeaderGround/>
      <HeaderNavigation/>
    </>
  );
}

export default App;
