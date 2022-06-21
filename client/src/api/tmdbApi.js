import { movieType, tvType, category } from "../DB/dbForApi";
import axiosClient from "./axiosClient";

const tmdbApi = {
  getMovieList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + '/' + id + '/videos';
    return axiosClient.get(url, {params: {}});
 },
  getCategory: (cate, id) => {
    const url = category[cate] + "/" + id + '/videos';
    return axiosClient.get(url, {params:{}});
  },
  search: (cate, params) => {
    const url = 'search/'  + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (cate,id, params) => {
    const url = category[cate]  + '/' + id;
    return axiosClient.get(url, params);
  },
  credits: (cate,id) => {
    const url = category[cate]  + '/' + id + '/credits';
    return axiosClient.get(url, {params:{}});
  },
  similar: (cate, id) => {
    const url = category[cate]  + '/' + id + '/similar';
    return axiosClient.get(url, {params:{}});
  },
};

export default tmdbApi;