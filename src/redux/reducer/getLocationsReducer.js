import {
  Member_getLocationsInit,
  Member_getLocationsRejected,
  Member_getLocationsResolved,
} from "../actions/getLocationsActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const getLocationsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_getLocationsInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: false };
    })
    .addCase(Member_getLocationsResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_getLocationsRejected, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addDefaultCase((state) => {
      state;
    });
});
