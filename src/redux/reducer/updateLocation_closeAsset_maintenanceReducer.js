import {
  Member_updateLocation_closeAsset_maintenanceInit,
  Member_updateLocation_closeAsset_maintenanceRejected,
  Member_updateLocation_closeAsset_maintenanceResolved,
  Member_updateLocation_closeAsset_maintenance,
  Member_resetupdateLocation_closeAsset_maintenance,
} from "../actions/updateLocation_closeAsset_maintenanceActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const updateLocation_closeAsset_maintenanceReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(Member_updateLocation_closeAsset_maintenanceInit, (state) => {
        return { ...state, data: {}, isError: false, isInProgress: true };
      })
      .addCase(
        Member_updateLocation_closeAsset_maintenance,
        (state, action) => {
          console.log("Member_updateLocation_closeAsset_maintenance called");
          return {
            ...state,
            data: action.payload,
            isError: false,
            isInProgress: true,
          };
        }
      )
      .addCase(
        Member_updateLocation_closeAsset_maintenanceResolved,
        (state, action) => {
          console.log(
            "Form submitted successfully>>Member_updateLocation_closeAsset_maintenanceResolved called"
          );
          return {
            ...state,
            data: action.payload,
            isError: false,
            isInProgress: false,
          };
        }
      )
      .addCase(
        Member_updateLocation_closeAsset_maintenanceRejected,
        (state, action) => {
          console.log(
            "Form submitted successfully>>Member_updateLocation_closeAsset_maintenanceRejected called"
          );
          return {
            ...state,
            data: action.payload,
            isError: true,
            isInProgress: false,
          };
        }
      )
      .addCase(
        Member_resetupdateLocation_closeAsset_maintenance,
        (state, action) => {
          console.log("Form submitted successfully>>Member_resetAsset called");
          return {
            ...state,
            data: action.payload,
            isError: false,
            isInProgress: false,
          };
        }
      )
      .addDefaultCase((state) => {
        return state;
      });
  }
);
