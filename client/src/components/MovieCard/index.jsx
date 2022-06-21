import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button';
import { category } from '../../DB/dbForApi';
import {addToFavoriteList} from '../../app/movieSlice';
import apiConfig from '../../api/config';
import './movie-card.scss';
import {useDispatch} from 'react-redux';

const MovieCard = props => {
  const dispatch = useDispatch();
  const item = props.item;
  const link = '/' + category[props.category] + '/' + item.id;
  const bg = apiConfig.w500Image( item.poster_path||item.backdrop_path);
   
  return (
    <>
      <div className='movie-card' style={{backgroundImage:`url(${bg})`}}  >
        <Link to={link}>
          <Button>
            <i className="bx bx-play"></i>
          </Button>
        </Link>
        <Link to={'/favorite'}>
          <div onClick={(e)=> { dispatch(addToFavoriteList({item:item,bg:bg,link:link}))}} className='heart'>
              <i className='bx bxs-heart'></i>
            </div>
        </Link>
          
      </div>
      <h3>{item.title|| item.name}</h3>
    </>
   
  )
}

MovieCard.propTypes = {}

export default MovieCard