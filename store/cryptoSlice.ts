import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store"

// type of state
export interface cryptoState{
    coinList:any[];
    trendingList:any[];
}

// initial state
const initialState: cryptoState = {
    coinList: [],
    trendingList: [],
}

// actual slice
export const cryptoSlice = createSlice({
    name: "crypto",
    initialState:initialState,
    reducers: {
        setCoinList: (state, action) => {
          state.coinList = action.payload
        },
        setTrendingList: (state, action) => {
          state.trendingList = action.payload
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

export default cryptoSlice.reducer;
