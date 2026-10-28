import {
  Member_save_updateSupplierInit,
  Member_save_updateSupplierRejected,
  Member_save_updateSupplierResolved,
  Member_save_updateSupplier,
  Member_resetSave_updateSupplier,
} from "../actions/save_updateSupplierActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const Save_updateSupplierReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(Member_save_updateSupplierInit, (state) => {
        return { ...state, data: {}, isError: false, isInProgress: true };
      })
      .addCase(Member_save_updateSupplier, (state, action) => {
        console.log("Member_save_updateSupplier called");
        return {
          ...state,
          data: action.payload,
          isError: false,
          isInProgress: true,
        };
      })
      .addCase(Member_save_updateSupplierResolved, (state, action) => {
        console.log(
          "Form submitted successfully>>Member_save_updateSupplierResolved called"
        );
        return {
          ...state,
          data: action.payload,
          isError: false,
          isInProgress: false,
        };
      })
      .addCase(Member_save_updateSupplierRejected, (state, action) => {
        console.log(
          "Form submitted successfully>>Member_save_updateSupplierRejected called"
        );
        return {
          ...state,
          data: action.payload,
          isError: true,
          isInProgress: false,
        };
      })
      .addCase(Member_resetSave_updateSupplier, (state, action) => {
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
  }
);
