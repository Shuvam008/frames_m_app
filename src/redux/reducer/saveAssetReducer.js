import {
  Member_saveAssetInit,
  Member_saveAssetRejected,
  Member_saveAssetResolved,
  Member_resetAsset,
  Member_saveAsset,
} from "../actions/saveAssetAction";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const saveAssetReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_saveAssetInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: true };
    })
    .addCase(Member_saveAsset, (state, action) => {
      console.log("Member_saveAsset called");
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: true,
      };
    })
    .addCase(Member_saveAssetResolved, (state, action) => {
      console.log("Form submitted successfully>>Member_saveAssetResolved called");
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_saveAssetRejected, (state, action) => {
      console.log("Form submitted successfully>>Member_saveAssetRejected called");
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addCase(Member_resetAsset, (state, action) => {
      console.log("Form submitted successfully>>Member_resetAsset called");
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
