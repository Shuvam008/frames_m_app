import {
  Member_getSuppliersInit,
  Member_getSuppliersRejected,
  Member_getSuppliersResolved,
} from "../actions/getSuppliersActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const getSuppliersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_getSuppliersInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: false };
    })
    .addCase(Member_getSuppliersResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_getSuppliersRejected, (state, action) => {
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
