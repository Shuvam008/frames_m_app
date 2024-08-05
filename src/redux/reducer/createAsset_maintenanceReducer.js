import {
  Member_createAsset_maintenanceInit,
  Member_createAsset_maintenanceRejected,
  Member_createAsset_maintenanceResolved,
  Member_createAsset_maintenance,
  Member_resetAsset_maintenance,
} from "../actions/createAsset_maintenanceActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const createAsset_maintenanceReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(Member_createAsset_maintenanceInit, (state) => {
        return { ...state, data: {}, isError: false, isInProgress: true };
      })
      .addCase(Member_createAsset_maintenance, (state, action) => {
        console.log("Member_createAsset_maintenance called");
        return {
          ...state,
          data: action.payload,
          isError: false,
          isInProgress: true,
        };
      })
      .addCase(Member_createAsset_maintenanceResolved, (state, action) => {
        console.log(
          "Form submitted successfully>>Member_createAsset_maintenanceResolved called"
        );
        return {
          ...state,
          data: action.payload,
          isError: false,
          isInProgress: false,
        };
      })
      .addCase(Member_createAsset_maintenanceRejected, (state, action) => {
        console.log(
          "Form submitted successfully>>Member_createAsset_maintenanceRejected called"
        );
        return {
          ...state,
          data: action.payload,
          isError: true,
          isInProgress: false,
        };
      })
      .addCase(Member_resetAsset_maintenance, (state, action) => {
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
