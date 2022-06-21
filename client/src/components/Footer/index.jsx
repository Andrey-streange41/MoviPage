import React from 'react';
import './footer.scss';

import { Link } from 'react-router-dom';
import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/logo.png';

 const Footer = () => {
  return (
    <div className='footer' style={{backgroundImage:`url(${bg})`}}>
        <section className='footer__content'>
            <section className='footer__content__logo'>
                <div className='logo'>
                    <img src={logo} alt="logo" />
                    <Link to={"/"}>famCinema</Link>
                </div>
            </section>
            <section className='footer__content__menus'>
                <section className='footer__content__menu'>
                  <Link to={'/'}>Home</Link>
                  <Link to={'/'}>Contact as</Link>
                  <Link to={'/'}>Term of service</Link>
                  <Link to={'/'}>About us</Link>
                </section>
                <section className='footer__content__menu'>
                  <Link to={'/'}>Live</Link>
                  <Link to={'/'}>FAQ</Link>
                  <Link to={'/'}>Premium</Link>
                  <Link to={'/'}>Pravacy policy</Link>
                </section>
                <section className='footer__content__menu'>
                  <Link to={'/'}>You must watch</Link>
                  <Link to={'/'}>Recent release</Link>
                  <Link to={'/'}>Top IMDB</Link>
                 
                </section>
            </section>
        </section>
    </div>
  )
}

export default Footer;