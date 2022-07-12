import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import config from "../../api/config";
import "./details.scss";
import { CastList } from "./CastList";
import { VideoList } from "./VideoList";
import MovieList from "../../components/MovieList/index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFavoriteList } from "../../app/movieSlice";


const Details = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();
  const localStorageList = useSelector (s=>s.movie.localStorageFavoriteList);

  useEffect(() => {
    const getDetail = async () => {
      const responce = await tmdbApi.detail(category, id, { params: {} });
      setItem(responce);
      window.scroll(0, 0);
    };
    getDetail();
  }, [category, id]);

  const handleClick = () => {
   
    const buffer = [...localStorageList]
    for (const favorItem of localStorageList) {
        if(favorItem.item.id === item.id)
          return;
    }

    
     buffer.push({item:item,bg:`${config.originalimage(
      item.backdrop_path || item.poster_path
    )}`,link:`/${category}/${id}`});
     localStorage.removeItem("favoriteList");
     localStorage.setItem("favoriteList", JSON.stringify(buffer));
     dispatch(updateFavoriteList(buffer));
 }

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${config.originalimage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <section className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${config.originalimage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}
              ></div>
            </div>
            <article className="movie-content__info">
              <section style={{display:"flex",alignItems:'center'}}>
                  <h2 className="title">{item.title || item.name}</h2>
                <Link to={"/favorite"}>
                  <div
                    onClick={handleClick}
                    className="heart"
                  >
                    <i style={{fontSize:"4rem",marginLeft:"4rem"}} className="bx bxs-heart"></i>
                  </div>
                </Link>
              </section>
              
              <section className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span className="genres__item" key={i}>
                      {genre.name}
                    </span>
                  ))}
              </section>
              <p className="overview">{item.overview}</p>
              <section className="section_header">
                <h2>Casts</h2>
              </section>
              <CastList id={item.id} />
              <section className="container">
                <section className="section mb-3">
                  <VideoList id={item.id} />
                </section>
                <section className="section mb-3">
                  <section className="section__header mb-2">
                    <h2>Similar</h2>
                  </section>
                  <MovieList category={category} type="similar" id={item.id} />
                </section>
              </section>
            </article>
          </section>
        </>
      )}
    </>
  );
};

export default Details;
