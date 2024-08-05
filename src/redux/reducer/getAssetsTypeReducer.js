import {Member_getAssetTypeInit, Member_getAssetTypeRejected, Member_getAssetTypeResolved} from "../actions/getAssetsTypeAction";

import { createReducer } from '@reduxjs/toolkit';

const initialState = { data: {},isInProgress: false,isError:false };

export const getAssetTypeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_getAssetTypeInit, (state) => {
        return {...state,data: {},isError: false,isInProgress: false};
    })
    .addCase(Member_getAssetTypeResolved, (state, action) => {
      return {...state,data: action.payload,isError: false,isInProgress: false};
    })
    .addCase(Member_getAssetTypeRejected, (state, action) => {
        return {...state,data: action.payload,isError: true,isInProgress: false};
    })
    .addDefaultCase((state)=>{state})
})