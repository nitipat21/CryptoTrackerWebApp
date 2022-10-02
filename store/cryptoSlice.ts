import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store"

// type of state
export interface cryptoState{
    currency:string;
}

// initial state
const initialState: cryptoState = {
    currency: "AUD",
}

// actual slice
export const cryptoSlice = createSlice({
    name: "crypto",
    initialState:initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
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

export const selectCurrencyState = (state: AppState) => state.crypto.currency;

export default cryptoSlice.reducer;
