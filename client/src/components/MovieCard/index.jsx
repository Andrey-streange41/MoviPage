import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { category } from "../../DB/dbForApi";
import apiConfig from "../../api/config";
import "./movie-card.scss";


const MovieCard = (props) => {
  const item = props.item;
  const link = "/" + category[props.category] + "/" + item.id;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);


  const handleAdding = () => {
    for(let i = 0; i < localStorage.length; i++){
      const element = JSON.stringify(localStorage.key(i));
      if(element.id===item.id)
        return;
    }
     localStorage.setItem(item.id,JSON.stringify({item:item,bg:bg,link:link}));
  };

  return (
    <>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Link to={link}>
          <Button>
            <i className="bx bx-play"></i>
          </Button>
        </Link>
        <Link to={"/favorite"}>
          <div
            onClick={handleAdding}
            className="heart"
          >
            <i className="bx bxs-heart"></i>
          </div>
        </Link>
      </div>
      <h3>{item.title || item.name}</h3>
    </>
  );
};

MovieCard.propTypes = {};

export default MovieCard;
