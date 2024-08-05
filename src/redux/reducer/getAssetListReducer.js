import {Member_getAssetListFetch, Member_getAssetListInit, Member_getAssetListRejected, Member_getAssetListResolved} from "../actions/getAssetListActions";

import { createReducer } from '@reduxjs/toolkit';

const initialState = { data: {},isInProgress: false,isError:false };

export const getAssetListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_getAssetListInit, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_getAssetListFetch, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_getAssetListResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_getAssetListRejected, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addDefaultCase(state => {
      state;
    });
})