import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store"

// type of state
export interface cryptoState {
    user:any;
    userDocId:any;
    userTrackList:any[];
    coinList:any[];
    trendingList:any[];
    search:string;
    sort:string;
    alertStatus:string;
    alertMessage:string;
    alertTimeout:number;
}

// initial state
const initialState: cryptoState = {
    user: null,
    userDocId: null,
    userTrackList: [],
    coinList: [],
    trendingList: [],
    search:"",
    sort:"market_cap",
    alertStatus:"",
    alertMessage:"",
    alertTimeout:0,
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
        },
        setTrackList: (state, action) => {
          state.userTrackList = action.payload;
        },
        setUserDocId: (state, action) => {
          state.userDocId = action.payload;
        },
        addCoinToTrackList: (state, action) => {
          state.userTrackList.push(action.payload);
        },
        deleteCoinFromTrackList: (state, action) => {
          const index = state.userTrackList.indexOf(action.payload);
          if (index > -1) {
            state.userTrackList.splice(index, 1);
          }
        },
        setAlertStatus: (state, action) => {
          state.alertStatus = action.payload;
        },
        setAlertMessage: (state, action) => {
          state.alertMessage = action.payload;
        },
        setAlertTimeout: (state, action) => {
          state.alertTimeout = action.payload;
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

export const selectUserTrackListState = (state:AppState) => state.crypto.userTrackList;

export const selectUserDocIdState = (state:AppState) => state.crypto.userDocId;

export const selectAlertStatusState = (state:AppState) => state.crypto.alertStatus;

export const selectAlertMessageState = (state:AppState) => state.crypto.alertMessage;

export const selectAlertTimeout = (state:AppState) => state.crypto.alertTimeout;

export default cryptoSlice.reducer;
