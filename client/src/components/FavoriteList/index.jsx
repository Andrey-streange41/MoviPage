import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button";
import { removeFromFavoriteList } from "../../app/movieSlice";
import "./favorite.scss";

export const FavoriteList = () => {
  const favoriteList = useSelector((state) => state.movie.favoriteMovies);
  const dispatch = useDispatch();
  console.log(favoriteList);
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
            style={{cursor:"pointer"}}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeFromFavoriteList(item.id));
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
