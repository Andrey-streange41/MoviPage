import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button";
import {
  clearList,
  removeFromFavoriteList,
} from "../../app/movieSlice";
import "./favorite.scss";
import { addToFavoriteList } from "../../app/movieSlice";

export const FavoriteList = () => {
  const favoriteList = useSelector((state) => state.movie.favoriteMovies);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(clearList())
    for (let i = 0; i < localStorage.length; i++) {
     const element = JSON.parse(localStorage.getItem(localStorage.key(i))) ;
     dispatch(addToFavoriteList({item:element.item, bg:element.bg, link:element.link}));
    }
 },[localStorage.length])

  return (
    <div className="movie-grid">
      {favoriteList.length > 0 ? (
        favoriteList.map((item, i) => (
          <div
            className="movie-card"
            style={{ backgroundImage: `url(${item.bg})` }}
            key={i}
          >
            <Link to={item.link}>
              <Button>
                <i className="bx bx-play"></i>
              </Button>
            </Link>

            <div
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeFromFavoriteList(item.id));
                localStorage.removeItem(item.id);
              }}
              className="heart"
            >
              <i className="bx bxs-trash"></i>
            </div>
          </div>
        ))
      ) : (
        <h1 style={{ width: "100vw", textAlign: "center" }}>
          Favorite list Empty !{" "}
        </h1>
      )}
    </div>
  );
};
