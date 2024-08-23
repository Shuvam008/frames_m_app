import {
  Member_sendMailInit,
  Member_sendMailRejected,
  Member_sendMailResolved,
  Member_resetsendMail,
  Member_sendMail,
} from "../actions/sendMailActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const sendMailReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_sendMailInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: true };
    })
    .addCase(Member_sendMail, (state, action) => {
      console.log("Member_sendMail called");
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: true,
      };
    })
    .addCase(Member_sendMailResolved, (state, action) => {
      console.log("Form submitted successfully>>Member_sendMailResolved called");
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_sendMailRejected, (state, action) => {
      console.log("Form submitted successfully>>Member_sendMailRejected called");
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addCase(Member_resetsendMail, (state, action) => {
      console.log("Form submitted successfully>>Member_resetsendMail called");
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
