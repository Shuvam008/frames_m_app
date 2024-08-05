import {
  Member_getUserListInit,
  Member_getUserListRejected,
  Member_getUserListResolved,
} from "../actions/getUserListActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const getUserListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_getUserListInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: false };
    })
    .addCase(Member_getUserListResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_getUserListRejected, (state, action) => {
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
