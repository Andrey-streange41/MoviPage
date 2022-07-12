import React, { useEffect, useState } from 'react';
import './App.scss';
import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import {BrowserRouter,Route} from 'react-router-dom';

import Routes from './config/Routes';
import Header from './components/Header';
import Footer from './components/Footer';



function App() {
  return (
    <BrowserRouter>
      <Route render={(props)=>(<>
        <Header {...props}/>
        <Routes />
        <Footer />
      </>)}/>
    </BrowserRouter>
  );
}

export default App;
