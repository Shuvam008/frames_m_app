import {
  Member_editAsset,
  Member_editAssetInit,
  Member_editAssetRejected,
  Member_editAssetResolved,
  Member_resetAsset,
} from "../actions/editAssetAction";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const geteditAssetReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_editAssetInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: false };
    })
    .addCase(Member_editAsset, (state, action) => {
      // console.log(" Member_editAsset EDIT123 data >>>", action.payload);
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: true,
      };
    })
    .addCase(Member_editAssetResolved, (state, action) => {
      // console.log(" Member_editAssetResolved EDIT123 data >>>", action.payload);
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_editAssetRejected, (state, action) => {
      // console.log(" Member_editAssetRejected EDIT123 data >>>", action.payload);
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addCase(Member_resetAsset, (state, action) => {
      // console.log(" Member_resetAsset EDIT123 data >>>", action.payload);
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addDefaultCase((state) => {
      return state;
    });
});
