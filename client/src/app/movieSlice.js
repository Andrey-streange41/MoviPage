import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovieList = createAsyncThunk();

const initialState = {
  error: null,
  status: "idle",
  localStorageFavoriteList: JSON.parse(localStorage.getItem("favoriteList"))?JSON.parse(localStorage.getItem("favoriteList")):[],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    updateFavoriteList :(state,action)=>{
       state.localStorageFavoriteList = [...action.payload];
    }
  },

  extraReducers: {},
});

export const {updateFavoriteList} = movieSlice.actions;

export default movieSlice.reducer;
