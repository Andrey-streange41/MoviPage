import React from 'react';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../Button';
import MovieList from '../MovieList';

export const MovieListContainer = (props) => {
  return (
    <div className="container">
        <div className="section mb-3">
          <div className='section__header mb-2'>
              <h2>{props.title}</h2>
              <Link to={props.to}>
                  <OutlineButton className="small">
                    View more
                  </OutlineButton>
              </Link>
          </div>
          <MovieList category={props.category} type={props.type}/>
        </div>
      </div>

  )
}

export default MovieListContainer;
