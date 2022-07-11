import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovieList = createAsyncThunk();

const initialState = {
  error: null,
  status: "idle",
  favoriteMovies: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearList:(state, action) => {
      state.favoriteMovies = [];
    },
    addToFavoriteList: (state, action) => {
      const newFilm = {...action.payload.item};
      newFilm.link = action.payload.link;
      newFilm.bg = action.payload.bg;
      state.favoriteMovies = [...state.favoriteMovies, newFilm];

    },
    removeFromFavoriteList: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },

  extraReducers: {},
});

export const {addToFavoriteList,removeFromFavoriteList,clearList} = movieSlice.actions;

export default movieSlice.reducer;
