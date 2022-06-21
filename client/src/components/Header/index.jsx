import React, { useEffect, useRef, useState } from "react";
import "./header.scss";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";




const Header = () => {
  const amount = useSelector(state=>state.movie.favoriteMovies.length)
  const { pathName } = useLocation();
  const headerRef = useRef(null);
  const [headerNav] = useState([
    {
      display: "Home",
      path: "/",
    },
    {
      display: "Movie",
      path: "/movie",
    },
    {
      display:"Favorite",
      path:"/favorite"
    }
  ]);
  useEffect(()=>{
    const shrinkHeader = ()=>{
        if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
            headerRef.current.classList.add('shrink');
        }
        else{
          headerRef.current.classList.remove('shrink')
        }
      }
        window.addEventListener('scroll',shrinkHeader)
    return () =>{
      window.removeEventListener('scroll',shrinkHeader);
    }
  },[])
  const active = headerNav.findIndex((el) => el.path === pathName);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">famCinema</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((el, i) => 
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={el.path}> {el.display} </Link>
            </li>
          )}
          <span>{amount} <i  className="bx bxs-heart"></i></span>
        </ul>
       
      </div>
    </div>
  );
};

export default Header;
