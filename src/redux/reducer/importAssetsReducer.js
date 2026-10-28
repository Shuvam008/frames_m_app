import {
  Member_importAssetsInit,
  Member_importAssetsRejected,
  Member_importAssetsResolved,
  Member_resetImportAssets,
  Member_importAssets,
} from "../actions/importAssetsActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const importAssetsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_importAssetsInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: true };
    })
    .addCase(Member_importAssets, (state, action) => {
      console.log("Member_importAssets called");
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: true,
      };
    })
    .addCase(Member_importAssetsResolved, (state, action) => {
      console.log(
        "Form submitted successfully>>Member_importAssetsResolved called"
      );
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_importAssetsRejected, (state, action) => {
      console.log(
        "Form submitted successfully>>Member_importAssetsRejected called"
      );
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addCase(Member_resetImportAssets, (state, action) => {
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
