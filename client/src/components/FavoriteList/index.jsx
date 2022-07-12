import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button";
import { clearList, removeFromlocalStorageFavoriteList, updateFavoriteList } from "../../app/movieSlice";
import "./favorite.scss";

export const FavoriteList = () => {
  const dispatch = useDispatch();
  const localStorageList = useSelector((s) => s.movie.localStorageFavoriteList);
  const [list,setList] = useState([])
 
  useEffect(() => {
    setList(localStorageList)
  },[localStorageList])

  return (
    <div className="movie-grid">
      {list.length > 0 ? (
        list.map((item, i) => (
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
