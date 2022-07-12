import React, { useEffect, useState } from 'react';
import './App.scss';
import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import {BrowserRouter,Route} from 'react-router-dom';

import Routes from './config/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavoriteList, clearList } from './app/movieSlice';




function App() {
  const favoriteList = useSelector((s)=>s.movie.favoriteMovies);
  const dispatch = useDispatch();

 
  useEffect(() => {
     dispatch(clearList());
     for (let i = 0; i < localStorage.length; i++) {
      if("ally-supports-cache"===localStorage.key(i)) //   <= Теперь тут проверка
        continue;
      const element = JSON.parse(localStorage.getItem(localStorage.key(i))) ;
      dispatch(addToFavoriteList({item:element.item, bg:element.bg, link:element.link}));
     }
  },[localStorage.length])


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
