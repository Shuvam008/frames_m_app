import {
  Member_getAssetBySupplierFetch,
  Member_getAssetBySupplierInit,
  Member_getAssetBySupplierRejected,
  Member_getAssetBySupplierResolved,
} from '../actions/getAssetBySupplierActions';

import {createReducer} from '@reduxjs/toolkit';

const initialState = {data: {}, isInProgress: false, isError: false};

export const getAssetBySupplierReducer = createReducer(initialState, builder => {
  builder
    .addCase(Member_getAssetBySupplierInit, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_getAssetBySupplierFetch, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_getAssetBySupplierResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_getAssetBySupplierRejected, (state, action) => {
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
