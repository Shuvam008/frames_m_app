import {
  Member_addUserInit,
  Member_addUserRejected,
  Member_addUserResolved,
  Member_resetAddUser,
  Member_addUser,
} from "../actions/addUserAction";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const addUserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_addUserInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: true };
    })
    .addCase(Member_addUser, (state, action) => {
      console.log("Member_addUser called");
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: true,
      };
    })
    .addCase(Member_addUserResolved, (state, action) => {
      console.log("Form submitted successfully>>Member_addUserResolved called");
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_addUserRejected, (state, action) => {
      console.log("Form submitted successfully>>Member_addUserRejected called");
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addCase(Member_resetAddUser, (state, action) => {
      console.log("Form submitted successfully>>Member_resetAddUser called");
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
