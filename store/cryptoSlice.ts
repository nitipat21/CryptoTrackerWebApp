import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store"

// type of state
export interface cryptoState{
    user:any;
    coinList:any[];
    trendingList:any[];
    search:string;
    sort:string;
}

// initial state
const initialState: cryptoState = {
    user: null,
    coinList: [],
    trendingList: [],
    search:"",
    sort:"market_cap"
}

// actual slice
export const cryptoSlice = createSlice({
    name: "crypto",
    initialState:initialState,
    reducers: {
        setCoinList: (state, action) => {
          state.coinList = action.payload;
        },
        setTrendingList: (state, action) => {
          state.trendingList = action.payload;
        },
        setSearch: (state, action) => {
          state.search = action.payload;
        },
        setSort: (state, action) => {
          state.sort = action.payload;
        },
        setUser: (state, action) => {
          state.user = action.payload;
        }
    },
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.app,
        };
      },
    },
})

export const selectCoinListState = (state:AppState) => state.crypto.coinList;

export const selectTrendingListState = (state:AppState) => state.crypto.trendingList;

export const selectSearchState = (state:AppState) => state.crypto.search;

export const selectSortState = (state:AppState) => state.crypto.sort;

export const selectUserState = (state:AppState) => state.crypto.user;

export default cryptoSlice.reducer;
