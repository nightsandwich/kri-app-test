import React from 'react'

import Routes from './Routes'
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  return (
    <div style={{overflow: 'auto'}}>
      <Header />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
