import React from 'react'
import Auth from './components/Auth/Auth';
import HeaderGround from './components/Header/HeaderGround';
import HeaderNavigation from './components/Header/HeaderNavigation';

function App() {
  return (
    <div style={styles.app}>
      <HeaderGround/>
      <HeaderNavigation/>
      <Auth/>
    </div>
  );
}

const styles = {
  app: {
    overflowX: 'hidden',
  }
}

export default App;
