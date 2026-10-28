import {
  Member_saveSubAssetInit,
  Member_saveSubAssetRejected,
  Member_saveSubAssetResolved,
  Member_saveSubAsset,
  Member_resetSubAsset,
} from "../actions/saveSubAssetActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const saveSubAssetReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_saveSubAssetInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: true };
    })
    .addCase(Member_saveSubAsset, (state, action) => {
      console.log("Member_saveSubAsset called");
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: true,
      };
    })
    .addCase(Member_saveSubAssetResolved, (state, action) => {
      console.log(
        "Form submitted successfully>>Member_saveSubAssetResolved called"
      );
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_saveSubAssetRejected, (state, action) => {
      console.log(
        "Form submitted successfully>>Member_saveSubAssetRejected called"
      );
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addCase(Member_resetSubAsset, (state, action) => {
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
