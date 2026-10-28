import {
  Member_save_updateLocationInit,
  Member_save_updateLocationRejected,
  Member_save_updateLocationResolved,
  Member_save_updateLocation,
  Member_resetSave_updateLocation,
} from "../actions/save_updateLocationActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const save_updateLocationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_save_updateLocationInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: true };
    })
    .addCase(Member_save_updateLocation, (state, action) => {
      console.log("Member_save_updateLocation called");
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: true,
      };
    })
    .addCase(Member_save_updateLocationResolved, (state, action) => {
      console.log(
        "Form submitted successfully>>Member_save_updateLocationResolved called"
      );
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_save_updateLocationRejected, (state, action) => {
      console.log(
        "Form submitted successfully>>Member_save_updateLocationRejected called"
      );
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addCase(Member_resetSave_updateLocation, (state, action) => {
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
