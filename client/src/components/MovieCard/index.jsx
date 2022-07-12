import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { category } from "../../DB/dbForApi";
import apiConfig from "../../api/config";
import "./movie-card.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateFavoriteList, setLen } from "../../app/movieSlice";

const MovieCard = (props) => {
  const item = props.item;
  const link = "/" + category[props.category] + "/" + item.id;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  const localStorageList = useSelector((s) => s.movie.localStorageFavoriteList);
  const dispatch = useDispatch();
  const handleAdding = () => {
    const buffer = [...localStorageList];
    for (let i = 0; i < localStorageList.length; i++) {
      const element = localStorageList[i];
      if (element.item.id === item.id){ return;}
    }
    buffer.push({ item: item, bg: bg, link: link });
    localStorage.removeItem("favoriteList");
    localStorage.setItem("favoriteList", JSON.stringify(buffer));
    dispatch(updateFavoriteList(buffer));
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
          <div onClick={handleAdding} className="heart">
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
