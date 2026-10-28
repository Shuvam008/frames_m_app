import {
  Member_getAssetByLocationFetch,
  Member_getAssetByLocationInit,
  Member_getAssetByLocationRejected,
  Member_getAssetByLocationResolved,
} from '../actions/getAssetsByLocationActions';

import {createReducer} from '@reduxjs/toolkit';

const initialState = {data: {}, isInProgress: false, isError: false};

export const getAssetByLocationReducer = createReducer(initialState, builder => {
  builder
    .addCase(Member_getAssetByLocationInit, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_getAssetByLocationFetch, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_getAssetByLocationResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_getAssetByLocationRejected, (state, action) => {
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
});
