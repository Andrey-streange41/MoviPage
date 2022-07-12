import React, { useCallback, useEffect, useState } from "react";
import "./movie-grid.scss";
import Button, { OutlineButton } from "../Button";
import MovieCard from "../MovieCard/index";
import { useHistory, useParams } from "react-router-dom";
import { category, movieType, tvType } from "../../DB/dbForApi";
import tmdbApi from "../../api/tmdbApi";
import Input from "../Input/index";

export const MovieGrid = (props) => {
  const { keyword } = useParams();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);  // <= Вместо нуля написал 1
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getList = async () => {
      let responce = null;

      if (keyword === undefined) {
        const params = {};
        try {
          responce = await tmdbApi.getMovieList(movieType.upcoming, {
            params,
          });
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          const params = {
            query: keyword,
          };
          responce = await tmdbApi.search(props.category, { params });
        } catch (error) {
          console.log(error.message);
        }
      }
      setItems(responce.results);
      setTotalPage(responce.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let responce = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };

      responce = await tmdbApi.getMovieList(movieType.upcoming, {
        params,
      });
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      responce = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...responce.results]);
    setPage(page + 1);
  };

  return (
    <>
      <section className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </section>
      <div className="movie-grid">
        {items.length > 0 ? (
          items.map((item, i) => (
            <MovieCard category={props.category} item={item} key={i} />
          ))
        ) : (
          <span className="foundNothing">Nothing found for your request !</span>
        )}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const history = useHistory();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, history]);

  useEffect(() => {
    goToSearch();
  }, [goToSearch, keyword]);
  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
};
