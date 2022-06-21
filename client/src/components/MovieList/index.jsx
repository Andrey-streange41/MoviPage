import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./movie-list.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Button from "../Button";
import tmdbApi from "../../api/tmdbApi";
import { category, movieType } from "../../DB/dbForApi";
import config from "../../api/config";
import MovieCard from "../MovieCard/index";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getList = async () => {
      let responce = null;
      const params = {};
      if (props.type !== "similar") {
        try {
          switch (props.category) {
          case category.movie:
            responce = await tmdbApi.getMovieList(props.type, { params });
            break;
          default:
            responce = await tmdbApi.getTVList(props.type, { params });
            break;
        }
        } catch (error) {
          console.log(error.message)
        }
        
      } else {
        try {
          responce = await tmdbApi.similar(props.category, props.id);
        } catch (error) {
          console.log(error.message)
        }
      }
      setItems(responce.results);
    };
    getList();
  }, []);

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <div className="movie-list">
      <Swiper
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
