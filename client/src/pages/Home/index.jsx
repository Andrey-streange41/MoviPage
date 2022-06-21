import React from "react";
import { OutlineButton } from "../../components/Button";
import HeroSlide from "../../components/HeroSlide";
import { Link } from "react-router-dom";
import MovieList from "../../components/MovieList";
import { category, movieType, tvType } from "../../DB/dbForApi";
import MovieListContainer from "../../components/MovieListContainer";

const Home = () => {
  return (
    <div>
      <HeroSlide />
      <MovieListContainer
        title={"Trending movies"}
        to={"/Movie"}
        category={category.movie}
        type={movieType.popular}
      />

      <MovieListContainer
        title={"Top rated"}
        to={"/Movie"}
        category={category.movie}
        type={movieType.top_rated}
      />

      <MovieListContainer
        title={"Trending"}
        to={"/Movie"}
        category={category.movie}
        type={movieType.upcoming}
      />
    </div>
  );
};

export default Home;
