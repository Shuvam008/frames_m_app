import {
  Member_login,
  Member_loginInit,
  Member_loginRejected,
  Member_loginResolved,
  Member_resetlogin,
} from "../actions/loginActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_loginInit, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_login, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_loginResolved, (state, action) => {
      console.log('Form submitted successfully>>Member_loginResolved called');
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_loginRejected, (state, action) => {
      console.log('Form submitted successfully>>Member_loginRejected called');
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addCase(Member_resetlogin, () => {
      return {data: {}, isError: false, isInProgress: false};
    })
    .addDefaultCase(state => {
      return state;
    });
});
